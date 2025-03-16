/*
  # Blog Categories and Tags System

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

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users
    - Add policies for public read access
*/

-- Create blog_categories table if it doesn't exist
CREATE TABLE IF NOT EXISTS blog_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create blog_tags table if it doesn't exist
CREATE TABLE IF NOT EXISTS blog_tags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_tags ENABLE ROW LEVEL SECURITY;

-- Create policies for blog_categories
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

-- Create policies for blog_tags
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

-- Create updated_at trigger function if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'update_updated_at_column') THEN
    CREATE FUNCTION update_updated_at_column()
    RETURNS TRIGGER AS $$
    BEGIN
      NEW.updated_at = now();
      RETURN NEW;
    END;
    $$ language 'plpgsql';
  END IF;
END $$;

-- Create triggers for both tables
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_blog_categories_updated_at') THEN
    CREATE TRIGGER update_blog_categories_updated_at
      BEFORE UPDATE ON blog_categories
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_blog_tags_updated_at') THEN
    CREATE TRIGGER update_blog_tags_updated_at
      BEFORE UPDATE ON blog_tags
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
  END IF;
END $$;