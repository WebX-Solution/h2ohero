/*
  # Add missing booking policies

  1. Security Changes
    - Add policies for:
      - Insert: Allow anyone to create bookings
      - Update: Allow system to update booking status
      - Delete: Allow users to delete their own bookings
*/

-- Enable RLS if not already enabled
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

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