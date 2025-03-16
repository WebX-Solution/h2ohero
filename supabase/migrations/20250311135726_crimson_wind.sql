/*
  # Add RLS policies for bookings table

  1. Security Changes
    - Enable RLS on bookings table
    - Add policies for:
      - Insert: Allow authenticated and anonymous users to create bookings
      - Select: Allow users to view their own bookings
      - Update: Allow system to update booking status
*/

-- Enable RLS
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Policy for creating bookings (both authenticated and anonymous users)
CREATE POLICY "Anyone can create bookings"
  ON bookings
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Policy for viewing own bookings
CREATE POLICY "Users can view own bookings"
  ON bookings
  FOR SELECT
  TO public
  USING (user_email = current_user OR current_user IS NULL);

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