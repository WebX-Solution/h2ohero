/*
  # Fix authentication schema and admin user

  1. Changes
    - Ensures auth schema exists with correct structure
    - Creates admin user with proper schema and permissions
    - Sets up all required fields and metadata
    - Handles schema conflicts properly

  2. Security
    - Uses proper password hashing
    - Sets up correct role and permissions
    - Enables immediate access
*/

-- Create auth schema if it doesn't exist
CREATE SCHEMA IF NOT EXISTS auth;

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Ensure we have the correct auth schema structure
DO $$ 
BEGIN
    -- Create auth.users if it doesn't exist
    IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'auth' AND tablename = 'users') THEN
        CREATE TABLE auth.users (
            instance_id uuid,
            id uuid NOT NULL PRIMARY KEY,
            aud varchar(255),
            role varchar(255),
            email varchar(255) UNIQUE,
            encrypted_password varchar(255),
            email_confirmed_at timestamptz,
            invited_at timestamptz,
            confirmation_token varchar(255),
            confirmation_sent_at timestamptz,
            recovery_token varchar(255),
            recovery_sent_at timestamptz,
            email_change_token_new varchar(255),
            email_change varchar(255),
            email_change_sent_at timestamptz,
            last_sign_in_at timestamptz,
            raw_app_meta_data jsonb,
            raw_user_meta_data jsonb,
            is_super_admin boolean,
            created_at timestamptz,
            updated_at timestamptz,
            phone varchar(255),
            phone_confirmed_at timestamptz,
            phone_change varchar(255),
            phone_change_token varchar(255),
            phone_change_sent_at timestamptz,
            email_change_token_current varchar(255),
            email_change_confirm_status smallint,
            banned_until timestamptz,
            reauthentication_token varchar(255),
            reauthentication_sent_at timestamptz,
            is_sso_user boolean DEFAULT false,
            deleted_at timestamptz
        );
    END IF;
END $$;

-- First, remove existing admin user if exists
DELETE FROM auth.users WHERE email = 'info@h2ohero.de';

-- Create new admin user with correct schema
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
    '',
    0,
    FALSE
);