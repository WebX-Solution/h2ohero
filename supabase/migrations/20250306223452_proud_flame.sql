/*
  # Blog System Schema

  1. New Tables
    - `blog_posts`
      - `id` (uuid, primary key)
      - `title` (text)
      - `slug` (text, unique)
      - `content` (text)
      - `excerpt` (text)
      - `featured_image` (text)
      - `status` (text)
      - `published_at` (timestamptz)
      - `category_id` (uuid, foreign key)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `blog_categories`
      - `id` (uuid, primary key)
      - `name` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `blog_tags`
      - `id` (uuid, primary key)
      - `name` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `blog_posts_tags` (junction table)
      - `post_id` (uuid, foreign key)
      - `tag_id` (uuid, foreign key)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create blog_categories table
CREATE TABLE IF NOT EXISTS blog_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create blog_tags table
CREATE TABLE IF NOT EXISTS blog_tags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
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
CREATE TABLE IF NOT EXISTS blog_posts_tags (
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

-- Create policies for blog_posts
CREATE POLICY "Public users can read published posts"
  ON blog_posts
  FOR SELECT
  USING (status = 'published');

CREATE POLICY "Authenticated users can manage posts"
  ON blog_posts
  USING (auth.role() = 'authenticated');

-- Create policies for blog_categories
CREATE POLICY "Public users can read categories"
  ON blog_categories
  FOR SELECT
  TO PUBLIC;

CREATE POLICY "Authenticated users can manage categories"
  ON blog_categories
  USING (auth.role() = 'authenticated');

-- Create policies for blog_tags
CREATE POLICY "Public users can read tags"
  ON blog_tags
  FOR SELECT
  TO PUBLIC;

CREATE POLICY "Authenticated users can manage tags"
  ON blog_tags
  USING (auth.role() = 'authenticated');

-- Create policies for blog_posts_tags
CREATE POLICY "Public users can read post tags"
  ON blog_posts_tags
  FOR SELECT
  TO PUBLIC;

CREATE POLICY "Authenticated users can manage post tags"
  ON blog_posts_tags
  USING (auth.role() = 'authenticated');