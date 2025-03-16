/*
  # Create admin user with correct credentials

  1. Changes
    - Create admin user with email info@h2ohero.de
    - Set password with proper encryption
    - Enable email confirmation
    - Set proper metadata and role
*/

-- Create admin user with proper encryption and metadata
INSERT INTO auth.users (
  id,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  role
)
VALUES (
  uuid_generate_v4(),
  'info@h2ohero.de',
  crypt('klVCyWEW&n', gen_salt('bf')),
  now(),
  '{"provider":"email","providers":["email"],"role":"admin"}',
  '{"name":"Admin_h2ohero"}',
  now(),
  now(),
  'authenticated'
)
ON CONFLICT (email) DO NOTHING;