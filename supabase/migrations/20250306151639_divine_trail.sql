/*
  # Blog System Setup Fix

  1. New Tables
    - blog_categories
      - id (uuid, primary key)
      - name (text)
      - created_at (timestamp)
      - updated_at (timestamp)
    
    - blog_tags
      - id (uuid, primary key)
      - name (text)
      - created_at (timestamp)
      - updated_at (timestamp)
    
    - blog_posts
      - id (uuid, primary key)
      - title (text)
      - slug (text, unique)
      - content (text)
      - excerpt (text)
      - featured_image (text)
      - status (text)
      - published_at (timestamp)
      - category_id (uuid, foreign key)
      - created_at (timestamp)
      - updated_at (timestamp)
    
    - blog_posts_tags (junction table)
      - post_id (uuid, foreign key)
      - tag_id (uuid, foreign key)
      - created_at (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
    - Add policies for public access to published posts
*/

-- Drop existing tables if they exist
DROP TABLE IF EXISTS blog_posts_tags CASCADE;
DROP TABLE IF EXISTS blog_posts CASCADE;
DROP TABLE IF EXISTS blog_tags CASCADE;
DROP TABLE IF EXISTS blog_categories CASCADE;

-- Create blog_categories table
CREATE TABLE blog_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create blog_tags table
CREATE TABLE blog_tags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create blog_posts table
CREATE TABLE blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  content text,
  excerpt text,
  featured_image text,
  status text NOT NULL DEFAULT 'draft',
  published_at timestamptz,
  category_id uuid REFERENCES blog_categories(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create blog_posts_tags junction table
CREATE TABLE blog_posts_tags (
  post_id uuid REFERENCES blog_posts(id) ON DELETE CASCADE,
  tag_id uuid REFERENCES blog_tags(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  PRIMARY KEY (post_id, tag_id)
);

-- Enable RLS
ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts_tags ENABLE ROW LEVEL SECURITY;

-- Policies for blog_categories
CREATE POLICY "Allow public read access to blog_categories"
  ON blog_categories
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow authenticated users full access to blog_categories"
  ON blog_categories
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policies for blog_tags
CREATE POLICY "Allow public read access to blog_tags"
  ON blog_tags
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow authenticated users full access to blog_tags"
  ON blog_tags
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policies for blog_posts
CREATE POLICY "Allow public read access to published blog_posts"
  ON blog_posts
  FOR SELECT
  TO public
  USING (status = 'published');

CREATE POLICY "Allow authenticated users full access to blog_posts"
  ON blog_posts
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policies for blog_posts_tags
CREATE POLICY "Allow public read access to blog_posts_tags"
  ON blog_posts_tags
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow authenticated users full access to blog_posts_tags"
  ON blog_posts_tags
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create function to update updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
DROP TRIGGER IF EXISTS update_blog_categories_updated_at ON blog_categories;
DROP TRIGGER IF EXISTS update_blog_tags_updated_at ON blog_tags;
DROP TRIGGER IF EXISTS update_blog_posts_updated_at ON blog_posts;

CREATE TRIGGER update_blog_categories_updated_at
  BEFORE UPDATE ON blog_categories
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blog_tags_updated_at
  BEFORE UPDATE ON blog_tags
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();