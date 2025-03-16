/*
  # Create Bookings and Participants Tables

  1. New Tables
    - `bookings`
      - `id` (uuid, primary key)
      - `course_id` (uuid, references courses)
      - `user_email` (text)
      - `user_name` (text)
      - `user_phone` (text, optional)
      - `booking_date` (timestamptz)
      - `num_participants` (integer)
      - `status` (text)
      - `payment_method` (text)
      - `payment_status` (text)
      - `total_amount` (numeric)
      - `payment_id` (text)
      - `payment_data` (jsonb)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `booking_participants`
      - `id` (uuid, primary key)
      - `booking_id` (uuid, references bookings)
      - `first_name` (text)
      - `last_name` (text)
      - `experience_level` (text)
      - `notes` (text, optional)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users
    - Add policies for public access to create bookings

  3. Triggers
    - Add trigger to update course available slots on booking
*/

-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id uuid REFERENCES courses(id) ON DELETE CASCADE,
  user_email text NOT NULL,
  user_name text NOT NULL,
  user_phone text,
  booking_date timestamptz DEFAULT now(),
  num_participants integer NOT NULL CHECK (num_participants > 0),
  status text NOT NULL DEFAULT 'pending',
  payment_method text NOT NULL,
  payment_status text NOT NULL DEFAULT 'pending',
  total_amount numeric NOT NULL CHECK (total_amount >= 0),
  payment_id text,
  payment_data jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create booking participants table
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
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE booking_participants ENABLE ROW LEVEL SECURITY;

-- Policies for bookings
CREATE POLICY "Public can create bookings"
  ON bookings
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view their bookings"
  ON bookings
  FOR SELECT
  TO authenticated
  USING (user_email = auth.jwt()->>'email');

CREATE POLICY "Admin can view all bookings"
  ON bookings
  FOR ALL
  TO authenticated
  USING (auth.jwt()->>'role' = 'admin');

-- Policies for booking participants
CREATE POLICY "Public can create booking participants"
  ON booking_participants
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view their booking participants"
  ON booking_participants
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM bookings b
      WHERE b.id = booking_id
      AND b.user_email = auth.jwt()->>'email'
    )
  );

CREATE POLICY "Admin can view all booking participants"
  ON booking_participants
  FOR ALL
  TO authenticated
  USING (auth.jwt()->>'role' = 'admin');

-- Function to update course available slots
CREATE OR REPLACE FUNCTION update_course_slots()
RETURNS TRIGGER AS $$
BEGIN
  -- Update available slots when booking is confirmed
  IF NEW.status = 'completed' AND OLD.status = 'pending' THEN
    UPDATE courses
    SET available_slots = available_slots - NEW.num_participants,
        sold_out = CASE 
          WHEN available_slots - NEW.num_participants <= 0 THEN true 
          ELSE false 
        END
    WHERE id = NEW.course_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for updating course slots
CREATE TRIGGER update_course_slots_on_booking
  AFTER UPDATE ON bookings
  FOR EACH ROW
  EXECUTE FUNCTION update_course_slots();