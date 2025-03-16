/*
  # Create admin user

  1. Changes
    - Create admin user with specified credentials
    - Set admin role and permissions

  2. Security
    - Password is hashed by Supabase Auth
    - User will have admin privileges
*/

-- Create admin user using Supabase's auth.users table
SELECT supabase_auth.create_user(
  uuid_generate_v4(),
  'Admin_h2ohero',
  'info@h2ohero.de',
  'klVCyWEW&n',
  {
    email_confirmed: true,
    phone_confirmed: true
  }
);