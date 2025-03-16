/*
  # Fix Blog Schema and Add Initial Data

  1. Schema Updates
    - Create blog_categories table
    - Create blog_tags table
    - Create blog_posts table
    - Create blog_posts_tags junction table
    - Add proper indexes and foreign keys
    - Enable RLS

  2. Initial Data
    - Add initial categories and tags
    - Add sample blog post
*/

-- Create blog_categories table if not exists
CREATE TABLE IF NOT EXISTS blog_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create blog_tags table if not exists
CREATE TABLE IF NOT EXISTS blog_tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create blog_posts table if not exists
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT,
  excerpt TEXT,
  featured_image TEXT,
  status TEXT NOT NULL DEFAULT 'draft',
  published_at TIMESTAMPTZ,
  category_id UUID REFERENCES blog_categories(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create blog_posts_tags junction table if not exists
CREATE TABLE IF NOT EXISTS blog_posts_tags (
  post_id UUID REFERENCES blog_posts(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES blog_tags(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now(),
  PRIMARY KEY (post_id, tag_id)
);

-- Add indexes
CREATE INDEX IF NOT EXISTS blog_posts_slug_idx ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS blog_posts_status_idx ON blog_posts(status);
CREATE INDEX IF NOT EXISTS blog_posts_published_at_idx ON blog_posts(published_at);
CREATE INDEX IF NOT EXISTS blog_posts_category_id_idx ON blog_posts(category_id);

-- Enable RLS
ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts_tags ENABLE ROW LEVEL SECURITY;

-- Add RLS policies
CREATE POLICY "Allow public read access to published blog posts"
  ON blog_posts
  FOR SELECT
  TO PUBLIC
  USING (status = 'published');

CREATE POLICY "Allow public read access to blog categories"
  ON blog_categories
  FOR SELECT
  TO PUBLIC
  USING (true);

CREATE POLICY "Allow public read access to blog tags"
  ON blog_tags
  FOR SELECT
  TO PUBLIC
  USING (true);

CREATE POLICY "Allow public read access to blog posts tags"
  ON blog_posts_tags
  FOR SELECT
  TO PUBLIC
  USING (true);

-- Insert initial data
DO $$ 
BEGIN
  -- Insert categories
  INSERT INTO blog_categories (id, name, description)
  VALUES 
    ('2d9c7dcd-b0c4-4e1c-a166-8d6b61b4a1d6', 'Schwimmkurse', 'Artikel über Schwimmkurse und Schwimmausbildung'),
    ('3f9c7dcd-b0c4-4e1c-a166-8d6b61b4a1d7', 'Bädertechnik', 'Technische Aspekte des Bäderbetriebs'),
    ('4d9c7dcd-b0c4-4e1c-a166-8d6b61b4a1d8', 'Sicherheit', 'Sicherheit im und am Wasser')
  ON CONFLICT (name) DO NOTHING;

  -- Insert tags
  INSERT INTO blog_tags (id, name)
  VALUES 
    ('5d9c7dcd-b0c4-4e1c-a166-8d6b61b4a1d9', 'Kinder'),
    ('6d9c7dcd-b0c4-4e1c-a166-8d6b61b4a1da', 'Anfänger'),
    ('7d9c7dcd-b0c4-4e1c-a166-8d6b61b4a1db', 'Sicherheit')
  ON CONFLICT (name) DO NOTHING;

  -- Insert sample blog post
  INSERT INTO blog_posts (
    id,
    title,
    slug,
    content,
    excerpt,
    featured_image,
    status,
    published_at,
    category_id
  )
  VALUES (
    '8d9c7dcd-b0c4-4e1c-a166-8d6b61b4a1dc',
    'Warum Schwimmkurse für Kinder ab 5 Jahren so wichtig sind',
    'warum-schwimmkurse-fuer-kinder-ab-5-jahren-so-wichtig-sind',
    '<h2>Die Bedeutung des frühen Schwimmenlernens</h2><p>Schwimmen lernen ist eine wichtige Fähigkeit, die nicht nur Spaß macht, sondern auch die Sicherheit im und am Wasser erhöht. Besonders im Alter von 5 Jahren sind Kinder in der optimalen Entwicklungsphase, um diese lebenswichtige Fähigkeit zu erlernen.</p>',
    'Entdecken Sie, warum das Alter von 5 Jahren ideal ist, um mit dem Schwimmenlernen zu beginnen und welche Vorteile frühe Schwimmkurse bieten.',
    'https://images.unsplash.com/photo-1560089000-7433a4ebbd64',
    'published',
    NOW(),
    '2d9c7dcd-b0c4-4e1c-a166-8d6b61b4a1d6'
  )
  ON CONFLICT (slug) DO NOTHING;

  -- Add tags to the blog post
  INSERT INTO blog_posts_tags (post_id, tag_id)
  VALUES 
    ('8d9c7dcd-b0c4-4e1c-a166-8d6b61b4a1dc', '5d9c7dcd-b0c4-4e1c-a166-8d6b61b4a1d9'),
    ('8d9c7dcd-b0c4-4e1c-a166-8d6b61b4a1dc', '6d9c7dcd-b0c4-4e1c-a166-8d6b61b4a1da')
  ON CONFLICT DO NOTHING;
END $$;