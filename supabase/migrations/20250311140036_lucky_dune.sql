/*
  # Fix booking policies - Second attempt

  1. Security Changes
    - Drop existing policies
    - Re-create policies with correct permissions:
      - Select: Public can view bookings
      - Insert: Public can create bookings
      - Update: Public can update bookings
      - Delete: Public can delete bookings
    
  2. Changes
    - First drop all existing policies
    - Enable RLS on bookings table
    - Create new policies with public access
*/

-- First ensure RLS is enabled
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Drop all existing policies to start fresh
DO $$ 
BEGIN
  -- Drop policies if they exist
  IF EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'bookings' AND schemaname = 'public'
  ) THEN
    DROP POLICY IF EXISTS "Public can view bookings" ON bookings;
    DROP POLICY IF EXISTS "Public can create bookings" ON bookings;
    DROP POLICY IF EXISTS "Public can update bookings" ON bookings;
    DROP POLICY IF EXISTS "Public can delete bookings" ON bookings;
    DROP POLICY IF EXISTS "Users can view own bookings" ON bookings;
    DROP POLICY IF EXISTS "Anyone can create bookings" ON bookings;
    DROP POLICY IF EXISTS "System can update booking status" ON bookings;
    DROP POLICY IF EXISTS "Users can delete own bookings" ON bookings;
  END IF;
END $$;

-- Create new policies
CREATE POLICY "Public can view bookings"
  ON bookings
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Public can create bookings"
  ON bookings
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Public can update bookings"
  ON bookings
  FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Public can delete bookings"
  ON bookings
  FOR DELETE
  TO public
  USING (true);