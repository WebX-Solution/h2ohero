/*
  # Complete Auth Schema Setup and Configuration

  1. Changes
    - Ensures all required extensions are enabled
    - Creates complete auth schema with proper configuration
    - Sets up admin user with correct permissions
    - Configures authentication settings

  2. Security
    - Proper password hashing
    - Correct role assignments
    - Secure default settings
*/

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE EXTENSION IF NOT EXISTS pgjwt;

-- Create auth schema if it doesn't exist
CREATE SCHEMA IF NOT EXISTS auth;

-- Ensure auth.users table has the correct structure
CREATE TABLE IF NOT EXISTS auth.users (
    instance_id uuid,
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
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
    raw_app_meta_data jsonb DEFAULT '{"provider": "email", "providers": ["email"]}'::jsonb,
    raw_user_meta_data jsonb DEFAULT '{}'::jsonb,
    is_super_admin boolean DEFAULT false,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now(),
    phone varchar(255),
    phone_confirmed_at timestamptz,
    phone_change varchar(255),
    phone_change_token varchar(255),
    phone_change_sent_at timestamptz,
    email_change_token_current varchar(255),
    email_change_confirm_status smallint DEFAULT 0,
    banned_until timestamptz,
    reauthentication_token varchar(255),
    reauthentication_sent_at timestamptz,
    is_sso_user boolean DEFAULT false,
    deleted_at timestamptz
);

-- Create auth settings
CREATE TABLE IF NOT EXISTS auth.settings (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    mailer_enabled boolean DEFAULT false,
    mailer_host varchar(255),
    mailer_port integer,
    mailer_user varchar(255),
    mailer_pass varchar(255),
    mailer_from varchar(255),
    mailer_template_folder varchar(255),
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Create auth refresh tokens
CREATE TABLE IF NOT EXISTS auth.refresh_tokens (
    id bigserial PRIMARY KEY,
    token varchar(255) NOT NULL,
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
    revoked boolean DEFAULT false,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Create auth audit log
CREATE TABLE IF NOT EXISTS auth.audit_log_entries (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    payload json,
    ip_address varchar(64),
    created_at timestamptz DEFAULT now()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS users_email_idx ON auth.users (email);
CREATE INDEX IF NOT EXISTS users_instance_id_idx ON auth.users (instance_id);
CREATE INDEX IF NOT EXISTS refresh_tokens_token_idx ON auth.refresh_tokens (token);
CREATE INDEX IF NOT EXISTS refresh_tokens_user_id_idx ON auth.refresh_tokens (user_id);
CREATE INDEX IF NOT EXISTS audit_logs_created_at_idx ON auth.audit_log_entries (created_at);

-- Remove existing admin user if exists
DELETE FROM auth.users WHERE email = 'info@h2ohero.de';

-- Create admin user with proper configuration
INSERT INTO auth.users (
    instance_id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    raw_app_meta_data,
    raw_user_meta_data,
    is_super_admin
) VALUES (
    '00000000-0000-0000-0000-000000000000',
    'authenticated',
    'authenticated',
    'info@h2ohero.de',
    crypt('klVCyWEW&n', gen_salt('bf')),
    now(),
    jsonb_build_object(
        'provider', 'email',
        'providers', ARRAY['email']::text[],
        'role', 'admin'
    ),
    jsonb_build_object(
        'name', 'Admin',
        'role', 'admin'
    ),
    true
);

-- Create default auth settings if not exists
INSERT INTO auth.settings (mailer_enabled)
VALUES (false)
ON CONFLICT DO NOTHING;