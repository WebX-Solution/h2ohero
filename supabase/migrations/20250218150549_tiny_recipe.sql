/*
  # Fix admin user authentication

  1. Changes
    - Drops existing admin user to ensure clean slate
    - Creates admin user with correct schema structure
    - Sets up proper authentication fields and metadata
    - Ensures email is confirmed

  2. Security
    - Uses proper password hashing
    - Sets up correct role and permissions
    - Enables immediate access
*/

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- First, delete existing user to ensure clean slate
DELETE FROM auth.users WHERE email = 'info@h2ohero.de';

-- Create admin user with proper schema structure
INSERT INTO auth.users (
  id,
  instance_id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  last_sign_in_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  created_at,
  updated_at,
  confirmation_token,
  recovery_token,
  email_change_token_current,
  email_change_token_new
)
VALUES (
  uuid_generate_v4(),
  '00000000-0000-0000-0000-000000000000',
  'authenticated',
  'authenticated',
  'info@h2ohero.de',
  crypt('klVCyWEW&n', gen_salt('bf')),
  NOW(),
  NOW(),
  '{"provider": "email", "providers": ["email"]}',
  '{"name": "Admin"}',
  TRUE,
  NOW(),
  NOW(),
  '',
  '',
  '',
  ''
);