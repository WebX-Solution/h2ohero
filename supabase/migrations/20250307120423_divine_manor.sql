/*
  # Create Booking System Tables
  
  1. New Tables
    - `bookings` for storing course bookings
    - `booking_participants` for participant details
    
  2. Security
    - RLS policies for authenticated and admin access
    - Policies for public booking creation
    
  3. Triggers
    - Automatic course slot updates
    - Booking status management
*/

-- Create bookings table
CREATE TABLE IF NOT EXISTS public.bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id uuid REFERENCES public.courses(id) ON DELETE CASCADE,
  user_email text NOT NULL,
  user_name text NOT NULL,
  user_phone text,
  booking_date timestamptz DEFAULT now(),
  num_participants integer NOT NULL CHECK (num_participants > 0),
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'cancelled')),
  payment_method text NOT NULL,
  payment_status text NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed')),
  total_amount numeric NOT NULL CHECK (total_amount >= 0),
  payment_id text,
  payment_data jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create booking participants table
CREATE TABLE IF NOT EXISTS public.booking_participants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id uuid REFERENCES public.bookings(id) ON DELETE CASCADE,
  first_name text NOT NULL,
  last_name text NOT NULL,
  experience_level text NOT NULL CHECK (experience_level IN ('none', 'beginner', 'intermediate')),
  notes text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.booking_participants ENABLE ROW LEVEL SECURITY;

-- Public booking creation policy
CREATE POLICY "Allow public booking creation" ON public.bookings
  FOR INSERT TO public
  WITH CHECK (true);

CREATE POLICY "Allow public participant creation" ON public.booking_participants
  FOR INSERT TO public
  WITH CHECK (true);

-- Authenticated user policies
CREATE POLICY "Users can view own bookings" ON public.bookings
  FOR SELECT TO authenticated
  USING (user_email = auth.jwt()->>'email');

CREATE POLICY "Users can view own participants" ON public.booking_participants
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.bookings b
      WHERE b.id = booking_id
      AND b.user_email = auth.jwt()->>'email'
    )
  );

-- Admin policies
CREATE POLICY "Admins have full access to bookings" ON public.bookings
  FOR ALL TO authenticated
  USING (auth.jwt()->>'role' = 'admin')
  WITH CHECK (auth.jwt()->>'role' = 'admin');

CREATE POLICY "Admins have full access to participants" ON public.booking_participants
  FOR ALL TO authenticated
  USING (auth.jwt()->>'role' = 'admin')
  WITH CHECK (auth.jwt()->>'role' = 'admin');

-- Function to update course slots
CREATE OR REPLACE FUNCTION public.update_course_slots()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'completed' AND OLD.status = 'pending' THEN
    UPDATE public.courses
    SET 
      available_slots = available_slots - NEW.num_participants,
      sold_out = CASE 
        WHEN available_slots - NEW.num_participants <= 0 THEN true 
        ELSE false 
      END,
      updated_at = now()
    WHERE id = NEW.course_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for slot updates
DROP TRIGGER IF EXISTS update_course_slots_after_booking ON public.bookings;
CREATE TRIGGER update_course_slots_after_booking
  AFTER UPDATE ON public.bookings
  FOR EACH ROW
  WHEN (NEW.status = 'completed' AND OLD.status = 'pending')
  EXECUTE FUNCTION public.update_course_slots();