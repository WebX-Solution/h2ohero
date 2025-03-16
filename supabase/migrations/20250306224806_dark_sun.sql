/*
  # Fix Blog Security Policies

  1. Changes
    - Drop existing policies
    - Add proper RLS policies for blog tables
    - Enable RLS on all blog tables
    
  2. Security
    - Public can read published blog posts and related data
    - Authenticated users have full access
*/

-- Enable RLS on all tables
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts_tags ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any
DROP POLICY IF EXISTS "blog_categories_public_read" ON blog_categories;
DROP POLICY IF EXISTS "blog_tags_public_read" ON blog_tags;
DROP POLICY IF EXISTS "blog_posts_public_read_published" ON blog_posts;
DROP POLICY IF EXISTS "blog_posts_tags_public_read" ON blog_posts_tags;
DROP POLICY IF EXISTS "blog_categories_admin_all" ON blog_categories;
DROP POLICY IF EXISTS "blog_tags_admin_all" ON blog_tags;
DROP POLICY IF EXISTS "blog_posts_admin_all" ON blog_posts;
DROP POLICY IF EXISTS "blog_posts_tags_admin_all" ON blog_posts_tags;

-- Public read access policies
CREATE POLICY "public_read_blog_categories"
  ON blog_categories
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "public_read_blog_tags"
  ON blog_tags
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "public_read_published_blog_posts"
  ON blog_posts
  FOR SELECT
  TO public
  USING (status = 'published');

CREATE POLICY "public_read_blog_posts_tags"
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

-- Admin access policies
CREATE POLICY "admin_all_blog_categories"
  ON blog_categories
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "admin_all_blog_tags"
  ON blog_tags
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "admin_all_blog_posts"
  ON blog_posts
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "admin_all_blog_posts_tags"
  ON blog_posts_tags
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);