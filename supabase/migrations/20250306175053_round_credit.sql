/*
  # Blog System Setup

  1. New Tables
    - blog_categories
    - blog_tags
    - blog_posts
    - blog_posts_tags

  2. Sample Content
    - Initial category
    - Initial tag
    - Sample blog post
    - Tag association

  3. Security
    - RLS policies for each table
    - Proper indexes for performance
*/

-- Create blog categories table
CREATE TABLE IF NOT EXISTS blog_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create blog tags table
CREATE TABLE IF NOT EXISTS blog_tags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create blog posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  content text,
  excerpt text,
  featured_image text,
  status text DEFAULT 'draft',
  published_at timestamptz,
  category_id uuid REFERENCES blog_categories(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create blog posts tags junction table
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

-- Create RLS policies
CREATE POLICY "Allow public read access to published blog posts"
  ON blog_posts FOR SELECT
  USING (status = 'published');

CREATE POLICY "Allow public read access to categories"
  ON blog_categories FOR SELECT
  TO PUBLIC;

CREATE POLICY "Allow public read access to tags"
  ON blog_tags FOR SELECT
  TO PUBLIC;

CREATE POLICY "Allow public read access to post tags"
  ON blog_posts_tags FOR SELECT
  TO PUBLIC;

-- Insert sample category
INSERT INTO blog_categories (name, description)
VALUES (
  'Schwimmkurse',
  'Artikel über Schwimmkurse und Schwimmtraining'
);

-- Insert sample tag
INSERT INTO blog_tags (name)
VALUES ('Kinderschwimmen');

-- Insert sample blog post
WITH category AS (
  SELECT id FROM blog_categories WHERE name = 'Schwimmkurse' LIMIT 1
)
INSERT INTO blog_posts (
  title,
  slug,
  content,
  excerpt,
  featured_image,
  status,
  published_at,
  category_id
)
SELECT
  'Warum Schwimmkurse für Kinder ab 5 Jahren so wichtig sind',
  'warum-schwimmkurse-fuer-kinder-ab-5-jahren-so-wichtig-sind',
  '# Warum Schwimmkurse für Kinder ab 5 Jahren so wichtig sind

Schwimmen ist eine lebenswichtige Fähigkeit, die jedes Kind erlernen sollte. Besonders im Alter von 5 Jahren sind Kinder in der idealen Phase, um schwimmen zu lernen.

## Die Vorteile des frühen Schwimmenlernens

1. **Sicherheit im Wasser**
   - Selbstvertrauen entwickeln
   - Gefahren erkennen
   - Richtig reagieren können

2. **Gesundheitliche Aspekte**
   - Ganzheitliche Bewegung
   - Stärkung des Immunsystems
   - Förderung der Koordination

3. **Soziale Komponenten**
   - Gemeinsames Lernen
   - Neue Freundschaften
   - Teamgeist entwickeln',
  'Erfahren Sie, warum das Alter von 5 Jahren ideal ist, um mit dem Schwimmenlernen zu beginnen und welche Vorteile frühe Schwimmkurse bieten.',
  'https://images.unsplash.com/photo-1560089000-7433a4ebbd64',
  'published',
  now(),
  id
FROM category;

-- Link post with tag
WITH post AS (
  SELECT id FROM blog_posts 
  WHERE slug = 'warum-schwimmkurse-fuer-kinder-ab-5-jahren-so-wichtig-sind'
), tag AS (
  SELECT id FROM blog_tags 
  WHERE name = 'Kinderschwimmen'
)
INSERT INTO blog_posts_tags (post_id, tag_id)
SELECT p.id, t.id
FROM post p, tag t;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category_id);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published_at DESC) WHERE status = 'published';