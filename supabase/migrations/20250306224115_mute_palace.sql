/*
  # Fix Blog Categories and Posts

  1. Schema Updates
    - Ensure blog_categories table exists
    - Ensure blog_tags table exists
    - Ensure blog_posts table exists
    - Ensure blog_posts_tags table exists
    - Add proper indexes and foreign keys

  2. Initial Data
    - Add initial blog categories
    - Add initial blog tags
    - Add sample blog post with proper category reference
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
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'blog_posts' AND policyname = 'Allow public read access to published blog posts'
  ) THEN
    CREATE POLICY "Allow public read access to published blog posts"
      ON blog_posts
      FOR SELECT
      TO PUBLIC
      USING (status = 'published');
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'blog_categories' AND policyname = 'Allow public read access to blog categories'
  ) THEN
    CREATE POLICY "Allow public read access to blog categories"
      ON blog_categories
      FOR SELECT
      TO PUBLIC
      USING (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'blog_tags' AND policyname = 'Allow public read access to blog tags'
  ) THEN
    CREATE POLICY "Allow public read access to blog tags"
      ON blog_tags
      FOR SELECT
      TO PUBLIC
      USING (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'blog_posts_tags' AND policyname = 'Allow public read access to blog posts tags'
  ) THEN
    CREATE POLICY "Allow public read access to blog posts tags"
      ON blog_posts_tags
      FOR SELECT
      TO PUBLIC
      USING (true);
  END IF;
END $$;

-- Insert initial data
DO $$ 
DECLARE
  v_category_id UUID;
  v_post_id UUID;
  v_tag_id_1 UUID;
  v_tag_id_2 UUID;
BEGIN
  -- Insert category first and get its ID
  INSERT INTO blog_categories (name, description)
  VALUES ('Schwimmkurse', 'Artikel über Schwimmkurse und Schwimmausbildung')
  ON CONFLICT (name) DO UPDATE SET name = EXCLUDED.name
  RETURNING id INTO v_category_id;

  -- Insert tags
  INSERT INTO blog_tags (name)
  VALUES ('Kinder')
  ON CONFLICT (name) DO UPDATE SET name = EXCLUDED.name
  RETURNING id INTO v_tag_id_1;

  INSERT INTO blog_tags (name)
  VALUES ('Anfänger')
  ON CONFLICT (name) DO UPDATE SET name = EXCLUDED.name
  RETURNING id INTO v_tag_id_2;

  -- Insert blog post with the correct category_id
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
  VALUES (
    'Warum Schwimmkurse für Kinder ab 5 Jahren so wichtig sind',
    'warum-schwimmkurse-fuer-kinder-ab-5-jahren-so-wichtig-sind',
    '<h2>Die Bedeutung des frühen Schwimmenlernens</h2><p>Schwimmen lernen ist eine wichtige Fähigkeit, die nicht nur Spaß macht, sondern auch die Sicherheit im und am Wasser erhöht. Besonders im Alter von 5 Jahren sind Kinder in der optimalen Entwicklungsphase, um diese lebenswichtige Fähigkeit zu erlernen.</p>',
    'Entdecken Sie, warum das Alter von 5 Jahren ideal ist, um mit dem Schwimmenlernen zu beginnen und welche Vorteile frühe Schwimmkurse bieten.',
    'https://images.unsplash.com/photo-1560089000-7433a4ebbd64',
    'published',
    NOW(),
    v_category_id
  )
  ON CONFLICT (slug) DO UPDATE SET 
    title = EXCLUDED.title,
    content = EXCLUDED.content,
    excerpt = EXCLUDED.excerpt,
    featured_image = EXCLUDED.featured_image,
    status = EXCLUDED.status,
    published_at = EXCLUDED.published_at,
    category_id = EXCLUDED.category_id
  RETURNING id INTO v_post_id;

  -- Add tags to the blog post
  INSERT INTO blog_posts_tags (post_id, tag_id)
  VALUES 
    (v_post_id, v_tag_id_1),
    (v_post_id, v_tag_id_2)
  ON CONFLICT DO NOTHING;
END $$;