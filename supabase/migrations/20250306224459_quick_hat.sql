/*
  # Blog Tables Schema

  1. New Tables
    - `blog_categories`
      - `id` (uuid, primary key)
      - `name` (text, unique)
      - `description` (text, nullable)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `blog_tags`
      - `id` (uuid, primary key) 
      - `name` (text, unique)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
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
    
    - `blog_posts_tags` (junction table)
      - `post_id` (uuid, foreign key)
      - `tag_id` (uuid, foreign key)
      - `created_at` (timestamptz)
*/

-- Create blog_categories table if it doesn't exist
DO $$ BEGIN
  CREATE TABLE IF NOT EXISTS blog_categories (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL UNIQUE,
    description text,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
  );
EXCEPTION
  WHEN duplicate_table THEN NULL;
END $$;

-- Create blog_tags table if it doesn't exist
DO $$ BEGIN
  CREATE TABLE IF NOT EXISTS blog_tags (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL UNIQUE,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
  );
EXCEPTION
  WHEN duplicate_table THEN NULL;
END $$;

-- Create blog_posts table if it doesn't exist
DO $$ BEGIN
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
EXCEPTION
  WHEN duplicate_table THEN NULL;
END $$;

-- Create blog_posts_tags junction table if it doesn't exist
DO $$ BEGIN
  CREATE TABLE IF NOT EXISTS blog_posts_tags (
    post_id uuid REFERENCES blog_posts(id) ON DELETE CASCADE,
    tag_id uuid REFERENCES blog_tags(id) ON DELETE CASCADE,
    created_at timestamptz DEFAULT now(),
    PRIMARY KEY (post_id, tag_id)
  );
EXCEPTION
  WHEN duplicate_table THEN NULL;
END $$;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS blog_posts_slug_idx ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS blog_posts_status_idx ON blog_posts(status);
CREATE INDEX IF NOT EXISTS blog_posts_published_at_idx ON blog_posts(published_at);
CREATE INDEX IF NOT EXISTS blog_posts_category_id_idx ON blog_posts(category_id);