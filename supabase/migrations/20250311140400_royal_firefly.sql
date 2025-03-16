/*
  # Add booking participants table and enhance bookings

  1. New Tables
    - `booking_participants`: Store individual participant details for each booking
      - `id` (uuid, primary key)
      - `booking_id` (uuid, references bookings)
      - `first_name` (text)
      - `last_name` (text)
      - `experience_level` (text)
      - `notes` (text, optional)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on booking_participants table
    - Add policies for public access to booking_participants
*/

-- Create booking_participants table
CREATE TABLE IF NOT EXISTS booking_participants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id uuid REFERENCES bookings(id) ON DELETE CASCADE,
  first_name text NOT NULL,
  last_name text NOT NULL,
  experience_level text NOT NULL,
  notes text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE booking_participants ENABLE ROW LEVEL SECURITY;

-- Create policies for booking_participants
CREATE POLICY "Public can view booking participants"
  ON booking_participants
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Public can create booking participants"
  ON booking_participants
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Public can update booking participants"
  ON booking_participants
  FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Public can delete booking participants"
  ON booking_participants
  FOR DELETE
  TO public
  USING (true);