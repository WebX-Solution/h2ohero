/*
  # Create admin user

  1. Changes
    - Create admin user with specified credentials
    - Email verification is automatically enabled
    - User will have admin privileges
*/

-- Create admin user
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
  '{"provider":"email","providers":["email"]}',
  '{"name":"Admin_h2ohero"}',
  now(),
  now(),
  'authenticated'
);