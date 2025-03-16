/*
  # Add Email Templates and Functions

  1. New Tables
    - `email_templates` - Stores email templates for different purposes
      - `id` (uuid, primary key)
      - `name` (text, unique)
      - `subject` (text)
      - `body` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Functions
    - `send_booking_confirmation` - Sends booking confirmation email
    - `format_booking_email` - Formats email template with booking data

  3. Triggers
    - Automatically sends confirmation email when booking is completed
*/

-- Create email templates table
CREATE TABLE email_templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  subject text NOT NULL,
  body text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE email_templates ENABLE ROW LEVEL SECURITY;

-- Create policy for email templates
CREATE POLICY "Allow authenticated users to manage email templates"
  ON email_templates
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Insert booking confirmation template
INSERT INTO email_templates (name, subject, body) VALUES (
  'booking_confirmation',
  'Buchungsbestätigung für Ihren Schwimmkurs',
  '
Sehr geehrte(r) {{user_name}},

vielen Dank für Ihre Buchung! Hier sind die Details Ihres Schwimmkurses:

Kurs: {{course_title}}
Datum: {{course_start_date}} - {{course_end_date}}
Zeit: {{course_time}}
Tag: {{course_day}}
Teilnehmer: {{num_participants}}
Gesamtbetrag: {{total_amount}}€

Zahlungsinformationen:
- Zahlungsmethode: {{payment_method}}
- Zahlungsstatus: {{payment_status}}
- Buchungs-ID: {{booking_id}}

Bitte beachten Sie folgende wichtige Informationen:
1. Bitte seien Sie 15 Minuten vor Kursbeginn vor Ort
2. Bringen Sie Badesachen, Handtuch und ggf. Badeschuhe mit
3. Duschen vor dem Schwimmen ist Pflicht

Bei Fragen stehen wir Ihnen gerne zur Verfügung.

Mit freundlichen Grüßen
Ihr Schwimmkurs-Team
'
);

-- Create function to format email template
CREATE OR REPLACE FUNCTION format_booking_email(
  template_name text,
  booking_id uuid
)
RETURNS text AS $$
DECLARE
  template text;
  booking record;
  course record;
  formatted_email text;
BEGIN
  -- Get template
  SELECT body INTO template
  FROM email_templates
  WHERE name = template_name;

  -- Get booking and course details
  SELECT b.*, c.title as course_title, c.start_date, c.end_date, c.time, c.day
  INTO booking
  FROM bookings b
  JOIN courses c ON b.course_id = c.id
  WHERE b.id = booking_id;

  -- Format template with booking data
  formatted_email := template;
  formatted_email := replace(formatted_email, '{{user_name}}', booking.user_name);
  formatted_email := replace(formatted_email, '{{course_title}}', booking.course_title);
  formatted_email := replace(formatted_email, '{{course_start_date}}', to_char(booking.start_date::date, 'DD.MM.YYYY'));
  formatted_email := replace(formatted_email, '{{course_end_date}}', to_char(booking.end_date::date, 'DD.MM.YYYY'));
  formatted_email := replace(formatted_email, '{{course_time}}', booking.time);
  formatted_email := replace(formatted_email, '{{course_day}}', booking.day);
  formatted_email := replace(formatted_email, '{{num_participants}}', booking.num_participants::text);
  formatted_email := replace(formatted_email, '{{total_amount}}', booking.total_amount::text);
  formatted_email := replace(formatted_email, '{{payment_method}}', booking.payment_method);
  formatted_email := replace(formatted_email, '{{payment_status}}', booking.payment_status::text);
  formatted_email := replace(formatted_email, '{{booking_id}}', booking.id::text);

  RETURN formatted_email;
END;
$$ LANGUAGE plpgsql;

-- Create function to send booking confirmation
CREATE OR REPLACE FUNCTION send_booking_confirmation()
RETURNS TRIGGER AS $$
DECLARE
  email_subject text;
  email_body text;
BEGIN
  -- Only send email when booking is completed and payment is received
  IF NEW.status = 'completed' AND NEW.payment_status = 'paid' THEN
    -- Get email template
    SELECT subject, format_booking_email('booking_confirmation', NEW.id)
    INTO email_subject, email_body
    FROM email_templates
    WHERE name = 'booking_confirmation';

    -- Send email using Supabase's built-in email functionality
    PERFORM net.http_post(
      url := 'https://api.supabase.com/v1/email/send',
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', current_setting('request.headers')::json->>'apikey'
      ),
      body := jsonb_build_object(
        'to', NEW.user_email,
        'subject', email_subject,
        'content', email_body,
        'type', 'text'
      )
    );
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for sending confirmation emails
CREATE TRIGGER send_booking_confirmation_trigger
AFTER INSERT OR UPDATE OF status, payment_status ON bookings
FOR EACH ROW
EXECUTE FUNCTION send_booking_confirmation();