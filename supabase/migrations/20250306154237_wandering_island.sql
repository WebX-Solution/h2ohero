/*
  # Blog Schema Setup

  1. Tables
    - blog_categories: Categories for blog posts
    - blog_tags: Tags for blog posts
    - blog_posts: Main blog posts table
    - blog_posts_tags: Junction table for post-tag relationships

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access
    - Add policies for authenticated users

  3. Triggers
    - Add updated_at triggers for all tables
*/

-- Create updated_at function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create blog_categories table
CREATE TABLE IF NOT EXISTS blog_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Create blog_tags table
CREATE TABLE IF NOT EXISTS blog_tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT,
  excerpt TEXT,
  featured_image TEXT,
  status TEXT DEFAULT 'draft',
  published_at TIMESTAMPTZ,
  category_id UUID REFERENCES blog_categories(id),
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Create blog_posts_tags junction table
CREATE TABLE IF NOT EXISTS blog_posts_tags (
  post_id UUID REFERENCES blog_posts(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES blog_tags(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (post_id, tag_id)
);

-- Create triggers for updated_at columns
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

-- Enable RLS
ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts_tags ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
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

CREATE POLICY "Enable public read access for blog_tags"
  ON blog_tags
  FOR SELECT
  TO PUBLIC
  USING (true);

CREATE POLICY "Enable authenticated users to manage blog_tags"
  ON blog_tags
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Enable public read access for published blog_posts"
  ON blog_posts
  FOR SELECT
  TO PUBLIC
  USING (status = 'published');

CREATE POLICY "Enable authenticated users to manage blog_posts"
  ON blog_posts
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Enable public read access for blog_posts_tags"
  ON blog_posts_tags
  FOR SELECT
  TO PUBLIC
  USING (true);

CREATE POLICY "Enable authenticated users to manage blog_posts_tags"
  ON blog_posts_tags
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);