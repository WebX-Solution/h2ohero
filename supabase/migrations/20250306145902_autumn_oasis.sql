/*
  # Create blog tables

  1. New Tables
    - blog_categories
      - id (uuid, primary key)
      - name (text, unique)
      - created_at (timestamptz)
      - updated_at (timestamptz)
    
    - blog_tags
      - id (uuid, primary key)
      - name (text, unique)
      - created_at (timestamptz)
      - updated_at (timestamptz)
    
    - blog_posts
      - id (uuid, primary key)
      - title (text)
      - slug (text, unique)
      - content (text)
      - excerpt (text)
      - featured_image (text)
      - status (text)
      - published_at (timestamptz)
      - category_id (uuid, foreign key)
      - created_at (timestamptz)
      - updated_at (timestamptz)
    
    - blog_posts_tags
      - post_id (uuid, foreign key)
      - tag_id (uuid, foreign key)
      - created_at (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create blog_categories table
CREATE TABLE IF NOT EXISTS blog_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated users to read blog categories"
  ON blog_categories
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to create blog categories"
  ON blog_categories
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update blog categories"
  ON blog_categories
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to delete blog categories"
  ON blog_categories
  FOR DELETE
  TO authenticated
  USING (true);

-- Create blog_tags table
CREATE TABLE IF NOT EXISTS blog_tags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE blog_tags ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated users to read blog tags"
  ON blog_tags
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to create blog tags"
  ON blog_tags
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update blog tags"
  ON blog_tags
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to delete blog tags"
  ON blog_tags
  FOR DELETE
  TO authenticated
  USING (true);

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  content text,
  excerpt text,
  featured_image text,
  status text NOT NULL DEFAULT 'draft',
  published_at timestamptz,
  category_id uuid REFERENCES blog_categories(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated users to read blog posts"
  ON blog_posts
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to create blog posts"
  ON blog_posts
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update blog posts"
  ON blog_posts
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to delete blog posts"
  ON blog_posts
  FOR DELETE
  TO authenticated
  USING (true);

-- Create blog_posts_tags table
CREATE TABLE IF NOT EXISTS blog_posts_tags (
  post_id uuid REFERENCES blog_posts(id) ON DELETE CASCADE,
  tag_id uuid REFERENCES blog_tags(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  PRIMARY KEY (post_id, tag_id)
);

ALTER TABLE blog_posts_tags ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated users to read blog posts tags"
  ON blog_posts_tags
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to create blog posts tags"
  ON blog_posts_tags
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to delete blog posts tags"
  ON blog_posts_tags
  FOR DELETE
  TO authenticated
  USING (true);

-- Add public read policies for published posts
CREATE POLICY "Allow public to read published blog posts"
  ON blog_posts
  FOR SELECT
  TO public
  USING (status = 'published');

CREATE POLICY "Allow public to read blog categories"
  ON blog_categories
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public to read blog tags"
  ON blog_tags
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public to read blog posts tags"
  ON blog_posts_tags
  FOR SELECT
  TO public
  USING (true);