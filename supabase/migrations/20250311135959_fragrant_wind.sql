/*
  # Fix booking policies

  1. Security Changes
    - Drop existing policies
    - Re-create policies with correct permissions:
      - Select: Public can view bookings
      - Insert: Public can create bookings
      - Update: Public can update bookings
      - Delete: Public can delete bookings
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view own bookings" ON bookings;
DROP POLICY IF EXISTS "Anyone can create bookings" ON bookings;
DROP POLICY IF EXISTS "System can update booking status" ON bookings;
DROP POLICY IF EXISTS "Users can delete own bookings" ON bookings;

-- Re-create policies with public access
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