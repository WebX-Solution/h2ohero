/*
  # Add booking system policies
  
  1. Changes
    - Add policies for bookings table
    - Add policies for course availability updates
  
  2. Security
    - Enable RLS for bookings
    - Add policies for public and authenticated access
*/

-- Enable RLS for bookings
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Allow public to create bookings
CREATE POLICY "Allow public to create bookings"
ON bookings
FOR INSERT
TO public
WITH CHECK (true);

-- Allow users to view their own bookings
CREATE POLICY "Allow users to view their own bookings"
ON bookings
FOR SELECT
TO public
USING (user_email = current_user);

-- Allow course availability updates
CREATE POLICY "Allow course availability updates"
ON courses
FOR UPDATE
TO public
USING (true)
WITH CHECK (true);

-- Add index for better performance
CREATE INDEX IF NOT EXISTS idx_bookings_course_id ON bookings(course_id);
CREATE INDEX IF NOT EXISTS idx_bookings_user_email ON bookings(user_email);
CREATE INDEX IF NOT EXISTS idx_courses_available_slots ON courses(available_slots);
CREATE INDEX IF NOT EXISTS idx_courses_sold_out ON courses(sold_out);