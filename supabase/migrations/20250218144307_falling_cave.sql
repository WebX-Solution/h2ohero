/*
  # Initial Schema Setup

  1. New Tables
    - `courses`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `start_date` (date)
      - `end_date` (date)
      - `time` (text)
      - `day` (text)
      - `price` (numeric)
      - `min_participants` (integer)
      - `max_participants` (integer)
      - `image_url` (text)
      - `special_note` (text)
      - `is_active` (boolean)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `bookings`
      - `id` (uuid, primary key)
      - `course_id` (uuid, foreign key)
      - `user_email` (text)
      - `user_name` (text)
      - `user_phone` (text)
      - `booking_date` (timestamptz)
      - `num_participants` (integer)
      - `status` (text)
      - `payment_method` (text)
      - `payment_status` (text)
      - `total_amount` (numeric)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `participants`
      - `id` (uuid, primary key)
      - `booking_id` (uuid, foreign key)
      - `first_name` (text)
      - `last_name` (text)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create courses table
CREATE TABLE courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  start_date date NOT NULL,
  end_date date NOT NULL,
  time text NOT NULL,
  day text NOT NULL,
  price numeric NOT NULL,
  min_participants integer NOT NULL,
  max_participants integer NOT NULL,
  image_url text,
  special_note text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create bookings table
CREATE TABLE bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id uuid REFERENCES courses(id),
  user_email text NOT NULL,
  user_name text NOT NULL,
  user_phone text,
  booking_date timestamptz DEFAULT now(),
  num_participants integer NOT NULL,
  status text NOT NULL,
  payment_method text NOT NULL,
  payment_status text NOT NULL,
  total_amount numeric NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create participants table
CREATE TABLE participants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id uuid REFERENCES bookings(id),
  first_name text NOT NULL,
  last_name text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE participants ENABLE ROW LEVEL SECURITY;

-- Create policies for courses
CREATE POLICY "Allow public read access to active courses"
  ON courses
  FOR SELECT
  USING (is_active = true);

CREATE POLICY "Allow authenticated users to manage courses"
  ON courses
  USING (auth.role() = 'authenticated');

-- Create policies for bookings
CREATE POLICY "Allow users to view their own bookings"
  ON bookings
  FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to manage bookings"
  ON bookings
  USING (auth.role() = 'authenticated');

-- Create policies for participants
CREATE POLICY "Allow users to view participants of their bookings"
  ON participants
  FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to manage participants"
  ON participants
  USING (auth.role() = 'authenticated');

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_courses_updated_at
  BEFORE UPDATE ON courses
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at
  BEFORE UPDATE ON bookings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();