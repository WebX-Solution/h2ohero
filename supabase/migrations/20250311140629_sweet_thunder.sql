/*
  # Update booking participants policies

  1. Changes
    - Drop existing policies
    - Create new policies with proper checks
    - Add RLS policies for booking participants table

  2. Security
    - Enable RLS
    - Add policies for authenticated and public access
    - Add proper checks for data access
*/

-- Drop existing policies if they exist
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "Public can view booking participants" ON booking_participants;
  DROP POLICY IF EXISTS "Public can create booking participants" ON booking_participants;
  DROP POLICY IF EXISTS "Public can update booking participants" ON booking_participants;
  DROP POLICY IF EXISTS "Public can delete booking participants" ON booking_participants;
EXCEPTION
  WHEN undefined_object THEN
    NULL;
END $$;

-- Create new policies with proper checks
CREATE POLICY "Authenticated users can view all booking participants"
  ON booking_participants
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Public can view own booking participants"
  ON booking_participants
  FOR SELECT
  TO public
  USING (
    EXISTS (
      SELECT 1 FROM bookings b
      WHERE b.id = booking_participants.booking_id
      AND b.user_email = current_user
    )
  );

CREATE POLICY "Public can create booking participants during booking"
  ON booking_participants
  FOR INSERT
  TO public
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM bookings b
      WHERE b.id = booking_participants.booking_id
      AND b.user_email = current_user
    )
  );

CREATE POLICY "Public can update own booking participants"
  ON booking_participants
  FOR UPDATE
  TO public
  USING (
    EXISTS (
      SELECT 1 FROM bookings b
      WHERE b.id = booking_participants.booking_id
      AND b.user_email = current_user
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM bookings b
      WHERE b.id = booking_participants.booking_id
      AND b.user_email = current_user
    )
  );

CREATE POLICY "Public can delete own booking participants"
  ON booking_participants
  FOR DELETE
  TO public
  USING (
    EXISTS (
      SELECT 1 FROM bookings b
      WHERE b.id = booking_participants.booking_id
      AND b.user_email = current_user
    )
  );