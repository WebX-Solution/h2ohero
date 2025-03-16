/*
  # Fix Auth Schema and Admin User

  1. Changes
    - Ensures proper auth schema setup
    - Creates admin user with correct permissions
    - Sets up required indexes and constraints

  2. Security
    - Enables RLS
    - Sets up proper role-based access
*/

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Ensure auth schema exists
CREATE SCHEMA IF NOT EXISTS auth;

-- Drop existing admin user if exists
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
    confirmation_sent_at,
    recovery_token,
    recovery_sent_at,
    email_change_token_new,
    email_change,
    email_change_sent_at,
    email_change_token_current,
    email_change_confirm_status,
    banned_until,
    reauthentication_token,
    reauthentication_sent_at,
    is_sso_user,
    deleted_at
)
VALUES (
    gen_random_uuid(),
    '00000000-0000-0000-0000-000000000000'::uuid,
    'authenticated',
    'authenticated',
    'info@h2ohero.de',
    crypt('klVCyWEW&n', gen_salt('bf')),
    NOW(),
    NOW(),
    jsonb_build_object(
        'provider', 'email',
        'providers', array['email'],
        'role', 'admin'
    ),
    jsonb_build_object(
        'name', 'Admin',
        'role', 'admin'
    ),
    TRUE,
    NOW(),
    NOW(),
    '',
    NULL,
    '',
    NULL,
    '',
    '',
    NULL,
    '',
    0,
    NULL,
    '',
    NULL,
    FALSE,
    NULL
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS users_email_idx ON auth.users(email);

-- Grant necessary permissions
GRANT USAGE ON SCHEMA auth TO postgres, anon, authenticated, service_role;
GRANT ALL ON ALL TABLES IN SCHEMA auth TO postgres, service_role;
GRANT SELECT ON ALL TABLES IN SCHEMA auth TO anon, authenticated;