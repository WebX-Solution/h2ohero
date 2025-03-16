/*
  # Fix booking types and constraints
  
  1. Changes
    - Drop and recreate status types with proper constraints
    - Update existing data
    - Add proper foreign key constraints
  
  2. Security
    - Maintain existing RLS policies
*/

-- Drop existing types if they exist
DROP TYPE IF EXISTS booking_status CASCADE;
DROP TYPE IF EXISTS payment_status CASCADE;

-- Recreate types
CREATE TYPE booking_status AS ENUM ('pending', 'completed', 'cancelled');
CREATE TYPE payment_status AS ENUM ('pending', 'paid', 'refunded', 'failed');

-- Update bookings table
ALTER TABLE bookings
ALTER COLUMN status TYPE booking_status USING status::booking_status,
ALTER COLUMN payment_status TYPE payment_status USING payment_status::payment_status;

-- Add NOT NULL constraints
ALTER TABLE bookings
ALTER COLUMN status SET NOT NULL,
ALTER COLUMN payment_status SET NOT NULL;

-- Add foreign key constraint with cascade delete
ALTER TABLE bookings
DROP CONSTRAINT IF EXISTS bookings_course_id_fkey,
ADD CONSTRAINT bookings_course_id_fkey 
  FOREIGN KEY (course_id) 
  REFERENCES courses(id) 
  ON DELETE CASCADE;

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_bookings_compound 
ON bookings(course_id, status, payment_status);