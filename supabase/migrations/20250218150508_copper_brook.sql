/*
  # Create admin user with service role permissions

  1. Changes
    - Creates admin user with proper schema structure and service role
    - Uses secure password hashing
    - Sets up proper metadata and permissions

  2. Security
    - Uses service role for elevated permissions
    - Ensures proper user setup with confirmed email
    - Sets up admin privileges
*/

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create admin user with service role permissions
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  created_at,
  updated_at,
  confirmation_token
)
VALUES (
  '00000000-0000-0000-0000-000000000000',
  uuid_generate_v4(),
  'authenticated',
  'service_role',
  'info@h2ohero.de',
  crypt('klVCyWEW&n', gen_salt('bf')),
  NOW(),
  jsonb_build_object(
    'provider', 'email',
    'providers', ARRAY['email'],
    'role', 'admin'
  ),
  '{"name": "Admin"}',
  TRUE,
  NOW(),
  NOW(),
  ''
)
ON CONFLICT (email) DO UPDATE SET
  role = EXCLUDED.role,
  encrypted_password = EXCLUDED.encrypted_password,
  email_confirmed_at = EXCLUDED.email_confirmed_at,
  raw_app_meta_data = EXCLUDED.raw_app_meta_data,
  raw_user_meta_data = EXCLUDED.raw_user_meta_data,
  is_super_admin = EXCLUDED.is_super_admin,
  updated_at = NOW();