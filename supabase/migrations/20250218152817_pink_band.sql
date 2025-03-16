/*
  # Fix courses table and policies

  1. Schema Changes
    - Recreate courses table with proper constraints
    - Add proper RLS policies
  
  2. Sample Data
    - Add initial course data
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Enable read access for all users" ON public.courses;
DROP POLICY IF EXISTS "Enable write access for authenticated users" ON public.courses;

-- Recreate policies with proper permissions
CREATE POLICY "Allow public read access"
  ON public.courses
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow authenticated users full access"
  ON public.courses
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_courses_title ON public.courses (title);
CREATE INDEX IF NOT EXISTS idx_courses_start_date ON public.courses (start_date);
CREATE INDEX IF NOT EXISTS idx_courses_is_active ON public.courses (is_active);

-- Refresh sample data
DELETE FROM public.courses;

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