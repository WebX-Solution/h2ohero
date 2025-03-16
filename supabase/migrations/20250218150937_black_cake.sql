/*
  # Fix Admin User Creation

  1. Changes
    - Removes existing admin user
    - Creates new admin user with proper UUID handling
    - Ensures all required fields are properly set

  2. Security
    - Maintains proper password hashing
    - Sets correct role and permissions
*/

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Remove existing admin user if exists
DELETE FROM auth.users WHERE email = 'info@h2ohero.de';

-- Create admin user with explicit UUID generation
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
    email_change_token_new,
    email_change_confirm_status,
    is_sso_user
)
SELECT
    gen_random_uuid(), -- Explicitly generate UUID for id
    '00000000-0000-0000-0000-000000000000'::uuid,
    'authenticated',
    'authenticated',
    'info@h2ohero.de',
    crypt('klVCyWEW&n', gen_salt('bf')),
    NOW(),
    NOW(),
    '{"provider": "email", "providers": ["email"], "role": "admin"}'::jsonb,
    '{"name": "Admin"}'::jsonb,
    TRUE,
    NOW(),
    NOW(),
    '',
    '',
    '',
    '',
    0,
    FALSE
WHERE NOT EXISTS (
    SELECT 1 FROM auth.users WHERE email = 'info@h2ohero.de'
);