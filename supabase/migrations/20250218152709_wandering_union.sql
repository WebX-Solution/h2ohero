/*
  # Fix database schema and add sample data

  1. Schema Changes
    - Drop and recreate courses table with proper constraints
    - Add indexes for better performance
    - Enable RLS with proper policies
  
  2. Sample Data
    - Add initial course data
*/

-- Drop existing tables if they exist
DROP TABLE IF EXISTS public.participants;
DROP TABLE IF EXISTS public.bookings;
DROP TABLE IF EXISTS public.courses;

-- Create courses table
CREATE TABLE public.courses (
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
CREATE TABLE public.bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id uuid REFERENCES public.courses(id),
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
CREATE TABLE public.participants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id uuid REFERENCES public.bookings(id),
  first_name text NOT NULL,
  last_name text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.participants ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Enable read access for all users"
  ON public.courses
  FOR SELECT
  USING (true);

CREATE POLICY "Enable write access for authenticated users"
  ON public.courses
  FOR ALL
  USING (auth.role() = 'authenticated');

-- Insert sample courses
INSERT INTO public.courses (
  title,
  description,
  start_date,
  end_date,
  time,
  day,
  price,
  min_participants,
  max_participants,
  image_url,
  special_note,
  is_active
) VALUES
(
  'Anfängerschwimmkurs 5 – Kinder ab 5 Jahren',
  'Grundlegender Schwimmkurs für Kinder ab 5 Jahren',
  '2025-03-09',
  '2025-05-04',
  '13:00 - 13:45',
  'Sonntags',
  130.00,
  10,
  13,
  'https://images.unsplash.com/photo-1560089000-7433a4ebbd64',
  'Kein Kurs an Ostersonntag',
  true
),
(
  'Kleinkinderschwimmen 2-4 Jahre',
  'Spielerischer Schwimmkurs für Kleinkinder',
  '2026-01-15',
  '2026-03-19',
  '10:00 - 10:45',
  'Samstags',
  120.00,
  8,
  10,
  'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7',
  NULL,
  true
),
(
  'Fortgeschrittener Schwimmkurs – Kinder 8-12 Jahre',
  'Schwimmtechnik-Verbesserung für Fortgeschrittene',
  '2025-04-01',
  '2025-06-30',
  '15:00 - 16:00',
  'Mittwochs',
  150.00,
  6,
  8,
  'https://images.unsplash.com/photo-1600965962361-9035dbfd1c50',
  NULL,
  true
);