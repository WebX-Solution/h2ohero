/*
  # Add Blog Posts Policies

  1. Add policies for blog_posts table
    - Allow authenticated users to manage all posts
    - Allow public users to read published posts only
*/

-- Create blog_posts table if not exists
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
  WHEN duplicate_table THEN
    NULL;
END $$;

-- Create blog_posts_tags junction table if not exists
DO $$ BEGIN
  CREATE TABLE IF NOT EXISTS blog_posts_tags (
    post_id uuid REFERENCES blog_posts(id) ON DELETE CASCADE,
    tag_id uuid REFERENCES blog_tags(id) ON DELETE CASCADE,
    created_at timestamptz DEFAULT now(),
    PRIMARY KEY (post_id, tag_id)
  );
EXCEPTION
  WHEN duplicate_table THEN
    NULL;
END $$;

-- Enable RLS if not already enabled
DO $$ BEGIN
  ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
EXCEPTION
  WHEN duplicate_object THEN
    NULL;
END $$;

DO $$ BEGIN
  ALTER TABLE blog_posts_tags ENABLE ROW LEVEL SECURITY;
EXCEPTION
  WHEN duplicate_object THEN
    NULL;
END $$;

-- Drop existing policies to avoid conflicts
DO $$ BEGIN
  DROP POLICY IF EXISTS "Allow public read access to published blog_posts" ON blog_posts;
  DROP POLICY IF EXISTS "Allow authenticated users to manage blog_posts" ON blog_posts;
  DROP POLICY IF EXISTS "Allow public read access to blog_posts_tags" ON blog_posts_tags;
  DROP POLICY IF EXISTS "Allow authenticated users to manage blog_posts_tags" ON blog_posts_tags;
EXCEPTION
  WHEN undefined_object THEN
    NULL;
END $$;

-- Create new policies
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

-- Insert sample blog post if not exists
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
  'warum-schwimmkurse-für-kinder-ab-5-jahren-so-wichtig-sind',
  '<h2>Die Bedeutung des frühen Schwimmenlernens</h2><p>Schwimmen ist eine lebenswichtige Fähigkeit, die am besten früh erlernt wird. In diesem Alter sind Kinder besonders aufnahmefähig und können spielerisch wichtige Bewegungsabläufe erlernen.</p><h2>Vorteile des frühen Schwimmenlernens</h2><ul><li>Bessere motorische Entwicklung</li><li>Stärkung des Selbstbewusstseins</li><li>Sicherheit im und am Wasser</li><li>Gesunde körperliche Betätigung</li></ul>',
  'Erfahren Sie, warum der richtige Zeitpunkt zum Schwimmenlernen so wichtig ist und welche Vorteile frühe Schwimmkurse bieten.',
  'https://images.unsplash.com/photo-1560089000-7433a4ebbd64',
  'published',
  now(),
  (SELECT id FROM blog_categories WHERE name = 'Schwimmkurse')
WHERE NOT EXISTS (
  SELECT 1 FROM blog_posts WHERE slug = 'warum-schwimmkurse-für-kinder-ab-5-jahren-so-wichtig-sind'
);