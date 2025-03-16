/*
  # Update Blog Schema

  1. Changes
    - Drop existing triggers if they exist
    - Recreate triggers with proper error handling
    - Add description column to blog_categories
    - Update RLS policies

  2. Security
    - Ensure RLS is properly configured
    - Add updated policies for blog management
*/

-- First check if trigger exists and drop if it does
DO $$ 
BEGIN
  IF EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_blog_categories_updated_at') THEN
    DROP TRIGGER IF EXISTS update_blog_categories_updated_at ON blog_categories;
  END IF;
END $$;

-- Add description column if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'blog_categories' 
    AND column_name = 'description'
  ) THEN
    ALTER TABLE blog_categories ADD COLUMN description TEXT;
  END IF;
END $$;

-- Recreate the trigger
CREATE TRIGGER update_blog_categories_updated_at
  BEFORE UPDATE ON blog_categories
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Update RLS policies
DO $$
BEGIN
  -- Drop existing policies if they exist
  DROP POLICY IF EXISTS "Enable read access for all users" ON blog_categories;
  DROP POLICY IF EXISTS "Enable write access for authenticated users" ON blog_categories;
  
  -- Create new policies
  CREATE POLICY "Enable public read access for blog_categories"
    ON blog_categories
    FOR SELECT
    TO PUBLIC
    USING (true);

  CREATE POLICY "Enable authenticated users to manage blog_categories"
    ON blog_categories
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);
END $$;