/*
  # Fix booking and payment status types
  
  1. Changes
    - Drop and recreate enum types with proper casting
    - Add temporary columns for safe migration
    - Update constraints and triggers
  
  2. Security
    - Maintain existing RLS policies
*/

-- Temporarily store status values
ALTER TABLE bookings 
ADD COLUMN temp_status text,
ADD COLUMN temp_payment_status text;

-- Copy current values
UPDATE bookings SET 
  temp_status = status::text,
  temp_payment_status = payment_status::text;

-- Drop existing columns and types
ALTER TABLE bookings 
DROP COLUMN status,
DROP COLUMN payment_status;

DROP TYPE IF EXISTS booking_status CASCADE;
DROP TYPE IF EXISTS payment_status CASCADE;

-- Recreate types
CREATE TYPE booking_status AS ENUM ('pending', 'completed', 'cancelled');
CREATE TYPE payment_status AS ENUM ('pending', 'paid', 'refunded', 'failed');

-- Add new columns with correct types
ALTER TABLE bookings
ADD COLUMN status booking_status NOT NULL DEFAULT 'pending',
ADD COLUMN payment_status payment_status NOT NULL DEFAULT 'pending';

-- Migrate data
UPDATE bookings SET 
  status = temp_status::booking_status,
  payment_status = temp_payment_status::payment_status;

-- Drop temporary columns
ALTER TABLE bookings 
DROP COLUMN temp_status,
DROP COLUMN temp_payment_status;

-- Recreate trigger function with proper type handling
CREATE OR REPLACE FUNCTION handle_booking_completion()
RETURNS TRIGGER AS $$
BEGIN
  -- Only proceed if status changed to completed
  IF NEW.status = 'completed'::booking_status AND 
     (OLD.status IS NULL OR OLD.status != 'completed'::booking_status) THEN
    -- Update course available slots
    UPDATE courses
    SET 
      available_slots = GREATEST(0, available_slots - NEW.num_participants),
      sold_out = CASE 
        WHEN available_slots - NEW.num_participants <= 0 THEN true 
        ELSE false 
      END
    WHERE id = NEW.course_id;
  END IF;
  
  -- Handle cancellations
  IF NEW.status = 'cancelled'::booking_status AND 
     (OLD.status IS NULL OR OLD.status != 'cancelled'::booking_status) THEN
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