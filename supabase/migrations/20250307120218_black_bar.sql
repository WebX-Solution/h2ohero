/*
  # Create Bookings System

  1. New Tables
    - `bookings` for storing course bookings and payment info
    - `booking_participants` for storing participant details
    
  2. Security
    - RLS policies for public booking creation
    - RLS policies for admin access
    
  3. Triggers
    - Update course slots on booking completion
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
CREATE POLICY "Enable insert for public"
  ON bookings FOR INSERT TO public
  WITH CHECK (true);

CREATE POLICY "Enable select for authenticated users"
  ON bookings FOR SELECT TO authenticated
  USING (user_email = auth.jwt()->>'email');

CREATE POLICY "Enable all for admin users"
  ON bookings FOR ALL TO authenticated
  USING (auth.jwt()->>'role' = 'admin');

-- Policies for booking participants
CREATE POLICY "Enable insert for public"
  ON booking_participants FOR INSERT TO public
  WITH CHECK (true);

CREATE POLICY "Enable select for authenticated users"
  ON booking_participants FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM bookings b
      WHERE b.id = booking_id
      AND b.user_email = auth.jwt()->>'email'
    )
  );

CREATE POLICY "Enable all for admin users"
  ON booking_participants FOR ALL TO authenticated
  USING (auth.jwt()->>'role' = 'admin');

-- Function to update course slots
CREATE OR REPLACE FUNCTION update_course_slots()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'completed' AND OLD.status = 'pending' THEN
    UPDATE courses
    SET 
      available_slots = available_slots - NEW.num_participants,
      sold_out = CASE 
        WHEN available_slots - NEW.num_participants <= 0 THEN true 
        ELSE false 
      END
    WHERE id = NEW.course_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger
CREATE TRIGGER update_course_slots_after_booking
  AFTER UPDATE ON bookings
  FOR EACH ROW
  EXECUTE FUNCTION update_course_slots();