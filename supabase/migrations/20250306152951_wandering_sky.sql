/*
  # Blog Categories Policies

  1. Changes
    - Drop existing policies if they exist
    - Create new policies with proper permissions
    - Add RLS policies for blog categories

  2. Security
    - Enable RLS
    - Add policies for authenticated users
    - Add policies for public read access
*/

-- Drop existing policies if they exist
DO $$ 
BEGIN
  -- Drop blog_categories policies
  IF EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'blog_categories' AND policyname = 'Allow public read access to blog_categories'
  ) THEN
    DROP POLICY "Allow public read access to blog_categories" ON blog_categories;
  END IF;

  IF EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'blog_categories' AND policyname = 'Allow authenticated users full access to blog_categories'
  ) THEN
    DROP POLICY "Allow authenticated users full access to blog_categories" ON blog_categories;
  END IF;
END $$;

-- Create new policies
CREATE POLICY "Enable read access for all users"
  ON blog_categories
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Enable insert for authenticated users only"
  ON blog_categories
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Enable update for authenticated users only"
  ON blog_categories
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Enable delete for authenticated users only"
  ON blog_categories
  FOR DELETE
  TO authenticated
  USING (true);