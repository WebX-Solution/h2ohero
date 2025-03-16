/*
  # Fix booking types and constraints
  
  1. Changes
    - Add proper type checking for payment data
    - Add validation triggers
    - Update indexes for performance
  
  2. Security
    - Maintain existing RLS policies
*/

-- Add check constraint for payment data
ALTER TABLE bookings
ADD CONSTRAINT valid_payment_data 
CHECK (
  payment_data IS NULL OR 
  jsonb_typeof(payment_data) = 'object'
);

-- Create function to validate booking data
CREATE OR REPLACE FUNCTION validate_booking()
RETURNS TRIGGER AS $$
BEGIN
  -- Ensure course has available slots
  IF (
    SELECT available_slots 
    FROM courses 
    WHERE id = NEW.course_id
  ) < NEW.num_participants THEN
    RAISE EXCEPTION 'Not enough available slots';
  END IF;

  -- Ensure course is not sold out
  IF (
    SELECT sold_out 
    FROM courses 
    WHERE id = NEW.course_id
  ) THEN
    RAISE EXCEPTION 'Course is sold out';
  END IF;

  -- Set created_at if not provided
  IF NEW.created_at IS NULL THEN
    NEW.created_at = NOW();
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for booking validation
DROP TRIGGER IF EXISTS validate_booking_trigger ON bookings;
CREATE TRIGGER validate_booking_trigger
BEFORE INSERT ON bookings
FOR EACH ROW
EXECUTE FUNCTION validate_booking();

-- Update indexes for better query performance
DROP INDEX IF EXISTS idx_bookings_compound;
CREATE INDEX idx_bookings_compound ON bookings (
  course_id,
  status,
  payment_status,
  created_at DESC
);

-- Add partial index for active bookings
CREATE INDEX idx_active_bookings ON bookings (course_id, created_at)
WHERE status = 'completed' AND payment_status = 'paid';