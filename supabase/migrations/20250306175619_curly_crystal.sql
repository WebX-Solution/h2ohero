/*
  # Fix Blog Policies

  1. Changes
    - Add conditional policy creation
    - Drop existing policies if they exist
    - Recreate policies with proper checks

  2. Security
    - Ensure RLS policies are properly configured
    - Maintain existing security model
*/

DO $$ 
BEGIN
  -- Drop existing policies if they exist
  DROP POLICY IF EXISTS "Allow public read access to blog_categories" ON blog_categories;
  DROP POLICY IF EXISTS "Allow authenticated users to manage blog_categories" ON blog_categories;
  DROP POLICY IF EXISTS "Allow public read access to published blog_posts" ON blog_posts;
  DROP POLICY IF EXISTS "Allow authenticated users to manage blog_posts" ON blog_posts;

  -- Create policies for blog_categories
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'blog_categories' 
    AND policyname = 'Allow public read access to blog_categories'
  ) THEN
    CREATE POLICY "Allow public read access to blog_categories"
      ON blog_categories
      FOR SELECT
      TO public
      USING (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'blog_categories' 
    AND policyname = 'Allow authenticated users to manage blog_categories'
  ) THEN
    CREATE POLICY "Allow authenticated users to manage blog_categories"
      ON blog_categories
      FOR ALL
      TO authenticated
      USING (true)
      WITH CHECK (true);
  END IF;

  -- Create policies for blog_posts
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'blog_posts' 
    AND policyname = 'Allow public read access to published blog_posts'
  ) THEN
    CREATE POLICY "Allow public read access to published blog_posts"
      ON blog_posts
      FOR SELECT
      TO public
      USING (status = 'published');
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'blog_posts' 
    AND policyname = 'Allow authenticated users to manage blog_posts'
  ) THEN
    CREATE POLICY "Allow authenticated users to manage blog_posts"
      ON blog_posts
      FOR ALL
      TO authenticated
      USING (true)
      WITH CHECK (true);
  END IF;
END $$;