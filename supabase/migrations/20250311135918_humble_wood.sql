/*
  # Add booking policies

  1. Security Changes
    - Enable RLS on bookings table
    - Add policies for:
      - Select: Users can view their own bookings
      - Insert: Anyone can create bookings
      - Update: System can update booking status
      - Delete: Users can delete their own bookings
*/

-- Enable RLS
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Policy for viewing own bookings
CREATE POLICY "Users can view own bookings"
  ON bookings
  FOR SELECT
  TO public
  USING (user_email = auth.email());

-- Policy for creating bookings (both authenticated and anonymous users)
CREATE POLICY "Anyone can create bookings"
  ON bookings
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Policy for updating booking status
CREATE POLICY "System can update booking status"
  ON bookings
  FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

-- Policy for deleting bookings (restricted to authenticated users)
CREATE POLICY "Users can delete own bookings"
  ON bookings
  FOR DELETE
  TO authenticated
  USING (user_email = auth.email());

-- Enable RLS on booking_participants
ALTER TABLE booking_participants ENABLE ROW LEVEL SECURITY;

-- Policy for viewing own booking participants
CREATE POLICY "Users can view own booking participants"
  ON booking_participants
  FOR SELECT
  TO public
  USING (
    EXISTS (
      SELECT 1 FROM bookings b
      WHERE b.id = booking_participants.booking_id
      AND b.user_email = auth.email()
    )
  );

-- Policy for creating booking participants
CREATE POLICY "Anyone can create booking participants"
  ON booking_participants
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Policy for deleting booking participants
CREATE POLICY "Users can delete own booking participants"
  ON booking_participants
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM bookings b
      WHERE b.id = booking_participants.booking_id
      AND b.user_email = auth.email()
    )
  );