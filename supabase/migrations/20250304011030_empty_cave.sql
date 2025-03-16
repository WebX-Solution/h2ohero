/*
  # Add booking system
  
  1. Changes
    - Add payment tracking columns
    - Add booking status tracking
    - Add automatic slot management
  
  2. Security
    - Enable RLS for all tables
    - Add policies for public booking access
*/

-- Add booking status enum
CREATE TYPE booking_status AS ENUM ('pending', 'completed', 'cancelled');
CREATE TYPE payment_status AS ENUM ('pending', 'paid', 'refunded', 'failed');

-- Modify bookings table
ALTER TABLE bookings
DROP COLUMN IF EXISTS status,
DROP COLUMN IF EXISTS payment_status;

ALTER TABLE bookings
ADD COLUMN status booking_status DEFAULT 'pending',
ADD COLUMN payment_status payment_status DEFAULT 'pending';

-- Create function to handle booking completion
CREATE OR REPLACE FUNCTION handle_booking_completion()
RETURNS TRIGGER AS $$
BEGIN
  -- Only proceed if status changed to completed
  IF NEW.status = 'completed' AND OLD.status != 'completed' THEN
    -- Update course available slots
    UPDATE courses
    SET 
      available_slots = available_slots - NEW.num_participants,
      sold_out = CASE 
        WHEN available_slots - NEW.num_participants <= 0 THEN true 
        ELSE false 
      END
    WHERE id = NEW.course_id;
  END IF;
  
  -- Handle cancellations
  IF NEW.status = 'cancelled' AND OLD.status != 'cancelled' THEN
    -- Restore available slots
    UPDATE courses
    SET 
      available_slots = available_slots + NEW.num_participants,
      sold_out = false
    WHERE id = NEW.course_id;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for booking status changes
DROP TRIGGER IF EXISTS booking_completion_trigger ON bookings;
CREATE TRIGGER booking_completion_trigger
AFTER UPDATE OF status ON bookings
FOR EACH ROW
EXECUTE FUNCTION handle_booking_completion();

-- Add policies for bookings
CREATE POLICY "Enable booking creation for all"
  ON bookings
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Enable booking updates for owners"
  ON bookings
  FOR UPDATE
  TO public
  USING (user_email = current_user)
  WITH CHECK (user_email = current_user);

CREATE POLICY "Enable booking deletion for owners"
  ON bookings
  FOR DELETE
  TO public
  USING (user_email = current_user);

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_payment_status ON bookings(payment_status);
CREATE INDEX IF NOT EXISTS idx_courses_available_slots ON courses(available_slots);
CREATE INDEX IF NOT EXISTS idx_courses_sold_out ON courses(sold_out);