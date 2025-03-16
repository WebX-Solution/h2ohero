/*
  # Add booking system functionality
  
  1. Changes
    - Add available_slots to courses table
    - Add sold_out flag to courses table
    - Add payment_id to bookings table
    - Add payment_data to bookings table
  
  2. Updates
    - Update existing courses with available_slots based on max_participants
*/

-- Add new columns to courses
ALTER TABLE courses 
ADD COLUMN available_slots integer,
ADD COLUMN sold_out boolean DEFAULT false;

-- Update existing courses
UPDATE courses 
SET available_slots = max_participants 
WHERE available_slots IS NULL;

-- Make available_slots NOT NULL after setting initial values
ALTER TABLE courses 
ALTER COLUMN available_slots SET NOT NULL;

-- Add payment columns to bookings
ALTER TABLE bookings
ADD COLUMN payment_id text,
ADD COLUMN payment_data jsonb;

-- Create function to update available slots
CREATE OR REPLACE FUNCTION update_course_availability()
RETURNS TRIGGER AS $$
BEGIN
  -- Update available slots when a booking is created/updated/deleted
  IF TG_OP = 'INSERT' THEN
    UPDATE courses
    SET 
      available_slots = available_slots - NEW.num_participants,
      sold_out = CASE 
        WHEN available_slots - NEW.num_participants <= 0 THEN true 
        ELSE false 
      END
    WHERE id = NEW.course_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE courses
    SET 
      available_slots = available_slots + OLD.num_participants,
      sold_out = false
    WHERE id = OLD.course_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for bookings
CREATE TRIGGER update_course_availability_trigger
AFTER INSERT OR DELETE ON bookings
FOR EACH ROW
EXECUTE FUNCTION update_course_availability();