/*
  # Blog System Setup

  1. New Tables
    - blog_categories
      - id (uuid, primary key)
      - name (text, unique)
      - description (text, nullable)
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
    
    - blog_posts_tags (junction table)
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
  name text NOT NULL UNIQUE,
  description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create blog_tags table
CREATE TABLE IF NOT EXISTS blog_tags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
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

-- Enable Row Level Security
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

CREATE POLICY "Allow authenticated users to manage blog_categories"
  ON blog_categories
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policies for blog_tags
CREATE POLICY "Allow public read access to blog_tags"
  ON blog_tags
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow authenticated users to manage blog_tags"
  ON blog_tags
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policies for blog_posts
CREATE POLICY "Allow public read access to published blog_posts"
  ON blog_posts
  FOR SELECT
  TO public
  USING (status = 'published');

CREATE POLICY "Allow authenticated users to manage blog_posts"
  ON blog_posts
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policies for blog_posts_tags
CREATE POLICY "Allow public read access to blog_posts_tags"
  ON blog_posts_tags
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow authenticated users to manage blog_posts_tags"
  ON blog_posts_tags
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Insert initial data
INSERT INTO blog_categories (name, description) VALUES
  ('Schwimmkurse', 'Informationen und Tipps rund um unsere Schwimmkurse'),
  ('Bädertechnik', 'Technische Aspekte des Bäderbetriebs'),
  ('Sicherheit', 'Sicherheitsrelevante Themen im Schwimmbad');

INSERT INTO blog_tags (name) VALUES
  ('Anfänger'),
  ('Fortgeschrittene'),
  ('Kinder'),
  ('Erwachsene'),
  ('Technik'),
  ('Sicherheit'),
  ('Tipps');

-- Insert sample blog post
INSERT INTO blog_posts (
  title,
  slug,
  content,
  excerpt,
  featured_image,
  status,
  published_at,
  category_id
) VALUES (
  'Warum Schwimmkurse für Kinder ab 5 Jahren so wichtig sind',
  'warum-schwimmkurse-für-kinder-ab-5-jahren-so-wichtig-sind',
  '<h2>Die Bedeutung des frühen Schwimmenlernens</h2><p>Schwimmen ist eine lebenswichtige Fähigkeit, die am besten früh erlernt wird. In diesem Alter sind Kinder besonders aufnahmefähig und können spielerisch wichtige Bewegungsabläufe erlernen.</p><h2>Vorteile des frühen Schwimmenlernens</h2><ul><li>Bessere motorische Entwicklung</li><li>Stärkung des Selbstbewusstseins</li><li>Sicherheit im und am Wasser</li><li>Gesunde körperliche Betätigung</li></ul>',
  'Erfahren Sie, warum der richtige Zeitpunkt zum Schwimmenlernen so wichtig ist und welche Vorteile frühe Schwimmkurse bieten.',
  'https://images.unsplash.com/photo-1560089000-7433a4ebbd64',
  'published',
  now(),
  (SELECT id FROM blog_categories WHERE name = 'Schwimmkurse')
);

-- Add tags to the sample post
INSERT INTO blog_posts_tags (post_id, tag_id)
SELECT 
  (SELECT id FROM blog_posts WHERE slug = 'warum-schwimmkurse-für-kinder-ab-5-jahren-so-wichtig-sind'),
  id
FROM blog_tags
WHERE name IN ('Anfänger', 'Kinder', 'Tipps');