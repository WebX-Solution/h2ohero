/*
  # Blog Schema Setup

  1. New Tables
    - blog_categories
      - id (uuid, primary key)
      - name (text, unique)
      - description (text, nullable)
      - created_at (timestamp)
      - updated_at (timestamp)
    - blog_tags
      - id (uuid, primary key)
      - name (text, unique)
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
    - blog_posts_tags
      - post_id (uuid, foreign key)
      - tag_id (uuid, foreign key)
      - created_at (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access
    - Add policies for authenticated users
*/

-- Drop existing tables if they exist
DO $$ 
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'blog_posts_tags') THEN
    DROP TABLE blog_posts_tags;
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'blog_posts') THEN
    DROP TABLE blog_posts;
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'blog_tags') THEN
    DROP TABLE blog_tags;
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'blog_categories') THEN
    DROP TABLE blog_categories;
  END IF;
END $$;

-- Create blog_categories table
CREATE TABLE blog_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create blog_tags table
CREATE TABLE blog_tags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
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
  category_id uuid REFERENCES blog_categories(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create blog_posts_tags table
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

-- Create policies for blog_categories
CREATE POLICY "Allow public read access to blog_categories" ON blog_categories
  FOR SELECT USING (true);

CREATE POLICY "Allow authenticated users to create blog_categories" ON blog_categories
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update blog_categories" ON blog_categories
  FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Allow authenticated users to delete blog_categories" ON blog_categories
  FOR DELETE TO authenticated USING (true);

-- Create policies for blog_tags
CREATE POLICY "Allow public read access to blog_tags" ON blog_tags
  FOR SELECT USING (true);

CREATE POLICY "Allow authenticated users to create blog_tags" ON blog_tags
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update blog_tags" ON blog_tags
  FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Allow authenticated users to delete blog_tags" ON blog_tags
  FOR DELETE TO authenticated USING (true);

-- Create policies for blog_posts
CREATE POLICY "Allow public read access to published blog_posts" ON blog_posts
  FOR SELECT USING (status = 'published' OR auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to create blog_posts" ON blog_posts
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update blog_posts" ON blog_posts
  FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Allow authenticated users to delete blog_posts" ON blog_posts
  FOR DELETE TO authenticated USING (true);

-- Create policies for blog_posts_tags
CREATE POLICY "Allow public read access to blog_posts_tags" ON blog_posts_tags
  FOR SELECT USING (true);

CREATE POLICY "Allow authenticated users to create blog_posts_tags" ON blog_posts_tags
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Allow authenticated users to delete blog_posts_tags" ON blog_posts_tags
  FOR DELETE TO authenticated USING (true);

-- Create updated_at triggers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_blog_categories_updated_at
  BEFORE UPDATE ON blog_categories
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_blog_tags_updated_at
  BEFORE UPDATE ON blog_tags
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();