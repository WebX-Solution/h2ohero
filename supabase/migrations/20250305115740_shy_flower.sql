/*
  # Blog System Schema

  1. New Tables
    - `blog_categories`
      - `id` (uuid, primary key)
      - `name` (text)
      - `slug` (text, unique)
      - `description` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `blog_posts`
      - `id` (uuid, primary key)
      - `title` (text)
      - `slug` (text, unique)
      - `content` (text)
      - `excerpt` (text)
      - `featured_image` (text)
      - `category_id` (uuid, references blog_categories)
      - `author_id` (uuid, references auth.users)
      - `status` (post_status enum)
      - `published_at` (timestamptz)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `blog_tags`
      - `id` (uuid, primary key)
      - `name` (text)
      - `slug` (text, unique)
      - `created_at` (timestamptz)

    - `blog_posts_tags`
      - `post_id` (uuid, references blog_posts)
      - `tag_id` (uuid, references blog_tags)
      - Primary key (post_id, tag_id)

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access
    - Add policies for authenticated users to manage content
*/

-- Create post status enum
CREATE TYPE post_status AS ENUM ('draft', 'published', 'archived');

-- Create blog categories table
CREATE TABLE blog_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create blog posts table
CREATE TABLE blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  content text NOT NULL,
  excerpt text,
  featured_image text,
  category_id uuid REFERENCES blog_categories(id) ON DELETE SET NULL,
  author_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  status post_status NOT NULL DEFAULT 'draft',
  published_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create blog tags table
CREATE TABLE blog_tags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  created_at timestamptz DEFAULT now()
);

-- Create blog posts tags junction table
CREATE TABLE blog_posts_tags (
  post_id uuid REFERENCES blog_posts(id) ON DELETE CASCADE,
  tag_id uuid REFERENCES blog_tags(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, tag_id)
);

-- Enable Row Level Security
ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts_tags ENABLE ROW LEVEL SECURITY;

-- Create policies for blog categories
CREATE POLICY "Allow public read access to blog categories"
  ON blog_categories
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow authenticated users to manage blog categories"
  ON blog_categories
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create policies for blog posts
CREATE POLICY "Allow public read access to published blog posts"
  ON blog_posts
  FOR SELECT
  TO public
  USING (status = 'published');

CREATE POLICY "Allow authenticated users to manage blog posts"
  ON blog_posts
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create policies for blog tags
CREATE POLICY "Allow public read access to blog tags"
  ON blog_tags
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow authenticated users to manage blog tags"
  ON blog_tags
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create policies for blog posts tags
CREATE POLICY "Allow public read access to blog posts tags"
  ON blog_posts_tags
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow authenticated users to manage blog posts tags"
  ON blog_posts_tags
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX idx_blog_posts_status ON blog_posts(status);
CREATE INDEX idx_blog_posts_published_at ON blog_posts(published_at);
CREATE INDEX idx_blog_posts_category_id ON blog_posts(category_id);
CREATE INDEX idx_blog_posts_author_id ON blog_posts(author_id);
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_categories_slug ON blog_categories(slug);
CREATE INDEX idx_blog_tags_slug ON blog_tags(slug);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_blog_categories_updated_at
  BEFORE UPDATE ON blog_categories
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert some sample categories
INSERT INTO blog_categories (name, slug, description) VALUES
('Schwimmtechnik', 'schwimmtechnik', 'Artikel über verschiedene Schwimmtechniken und deren Verbesserung'),
('Sicherheit', 'sicherheit', 'Wichtige Informationen zur Sicherheit im und am Wasser'),
('Bädertechnik', 'baedertechnik', 'Technische Aspekte des Bäderbetriebs'),
('Ausbildung', 'ausbildung', 'Neuigkeiten und Informationen rund um die Schwimmausbildung');

-- Insert some sample tags
INSERT INTO blog_tags (name, slug) VALUES
('Anfänger', 'anfaenger'),
('Fortgeschrittene', 'fortgeschrittene'),
('Technik', 'technik'),
('Sicherheit', 'sicherheit'),
('Training', 'training'),
('Wartung', 'wartung'),
('Hygiene', 'hygiene'),
('Tipps', 'tipps');