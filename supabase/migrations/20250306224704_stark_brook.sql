/*
  # Recreate Blog Security Policies

  1. Changes
    - Drop existing policies
    - Recreate policies with proper configuration
    
  2. Security
    - Maintain RLS on all blog tables
    - Ensure proper access control for public and authenticated users
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Allow public read access to blog_categories" ON blog_categories;
DROP POLICY IF EXISTS "Allow public read access to blog_tags" ON blog_tags;
DROP POLICY IF EXISTS "Allow public read access to published blog posts" ON blog_posts;
DROP POLICY IF EXISTS "Allow public read access to blog post tags" ON blog_posts_tags;
DROP POLICY IF EXISTS "Allow full access to authenticated users" ON blog_categories;
DROP POLICY IF EXISTS "Allow full access to authenticated users" ON blog_tags;
DROP POLICY IF EXISTS "Allow full access to authenticated users" ON blog_posts;
DROP POLICY IF EXISTS "Allow full access to authenticated users" ON blog_posts_tags;

-- Recreate policies with unique names
CREATE POLICY "blog_categories_public_read"
  ON blog_categories
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "blog_tags_public_read"
  ON blog_tags
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "blog_posts_public_read_published"
  ON blog_posts
  FOR SELECT
  TO public
  USING (status = 'published');

CREATE POLICY "blog_posts_tags_public_read"
  ON blog_posts_tags
  FOR SELECT
  TO public
  USING (
    EXISTS (
      SELECT 1 FROM blog_posts
      WHERE blog_posts.id = blog_posts_tags.post_id
      AND blog_posts.status = 'published'
    )
  );

-- Admin policies with unique names
CREATE POLICY "blog_categories_admin_all"
  ON blog_categories
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "blog_tags_admin_all"
  ON blog_tags
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "blog_posts_admin_all"
  ON blog_posts
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "blog_posts_tags_admin_all"
  ON blog_posts_tags
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);