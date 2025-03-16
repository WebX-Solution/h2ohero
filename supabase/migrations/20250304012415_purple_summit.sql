/*
  # Fix booking triggers and enum types
  
  1. Changes
    - Drop and recreate triggers in correct order
    - Fix enum type handling
    - Update booking completion logic
  
  2. Security
    - Maintain existing RLS policies
*/

-- Drop existing triggers and functions
DROP TRIGGER IF EXISTS booking_completion_trigger ON bookings;
DROP TRIGGER IF EXISTS update_course_availability_trigger ON bookings;
DROP FUNCTION IF EXISTS handle_booking_completion();
DROP FUNCTION IF EXISTS update_course_availability();

-- Create unified booking handler function
CREATE OR REPLACE FUNCTION handle_booking_changes()
RETURNS TRIGGER AS $$
BEGIN
  -- Handle INSERT
  IF TG_OP = 'INSERT' THEN
    -- Validate available slots
    IF (
      SELECT available_slots 
      FROM courses 
      WHERE id = NEW.course_id
    ) < NEW.num_participants THEN
      RAISE EXCEPTION 'Not enough available slots';
    END IF;

    -- Update course slots for completed bookings only
    IF NEW.status = 'completed' THEN
      UPDATE courses
      SET 
        available_slots = GREATEST(0, available_slots - NEW.num_participants),
        sold_out = CASE 
          WHEN available_slots - NEW.num_participants <= 0 THEN true 
          ELSE false 
        END
      WHERE id = NEW.course_id;
    END IF;
  
  -- Handle UPDATE
  ELSIF TG_OP = 'UPDATE' THEN
    -- Status changed to completed
    IF NEW.status = 'completed' AND OLD.status != 'completed' THEN
      UPDATE courses
      SET 
        available_slots = GREATEST(0, available_slots - NEW.num_participants),
        sold_out = CASE 
          WHEN available_slots - NEW.num_participants <= 0 THEN true 
          ELSE false 
        END
      WHERE id = NEW.course_id;
    
    -- Status changed to cancelled
    ELSIF NEW.status = 'cancelled' AND OLD.status != 'cancelled' THEN
      UPDATE courses
      SET 
        available_slots = available_slots + NEW.num_participants,
        sold_out = false
      WHERE id = NEW.course_id;
    END IF;
  
  -- Handle DELETE
  ELSIF TG_OP = 'DELETE' THEN
    -- Only restore slots for completed bookings
    IF OLD.status = 'completed' THEN
      UPDATE courses
      SET 
        available_slots = available_slots + OLD.num_participants,
        sold_out = false
      WHERE id = OLD.course_id;
    END IF;
  END IF;

  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Create new unified trigger
CREATE TRIGGER handle_booking_changes_trigger
AFTER INSERT OR UPDATE OR DELETE ON bookings
FOR EACH ROW
EXECUTE FUNCTION handle_booking_changes();

-- Refresh indexes
DROP INDEX IF EXISTS idx_bookings_compound;
CREATE INDEX idx_bookings_compound ON bookings (
  course_id,
  status,
  payment_status,
  created_at DESC
);

-- Add partial indexes for better performance
CREATE INDEX IF NOT EXISTS idx_completed_bookings 
ON bookings (course_id, created_at)
WHERE status = 'completed' AND payment_status = 'paid';

CREATE INDEX IF NOT EXISTS idx_pending_bookings 
ON bookings (course_id, created_at)
WHERE status = 'pending';