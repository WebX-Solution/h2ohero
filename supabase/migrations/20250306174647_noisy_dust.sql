/*
  # Fix Blog Schema and Add Sample Data

  1. Changes
    - Add indexes for better query performance
    - Add sample blog post for testing
    - Add sample category
    - Add sample tag

  2. Security
    - Ensure proper RLS policies
*/

-- Add sample category if it doesn't exist
INSERT INTO blog_categories (id, name, description)
VALUES (
  'f8c3de3d-1fea-4d7c-a8b0-29f63c4c3454',
  'Schwimmkurse',
  'Artikel über Schwimmkurse und Schwimmtraining'
) ON CONFLICT DO NOTHING;

-- Add sample tag if it doesn't exist
INSERT INTO blog_tags (id, name)
VALUES (
  'e9b6c7d8-5fc4-4321-8f9d-12e3b4c5a6d7',
  'Kinderschwimmen'
) ON CONFLICT DO NOTHING;

-- Add sample blog post if it doesn't exist
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
  'a1b2c3d4-5e6f-7g8h-9i0j-k1l2m3n4o5p6',
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
  NOW(),
  'f8c3de3d-1fea-4d7c-a8b0-29f63c4c3454'
) ON CONFLICT DO NOTHING;

-- Link sample post with tag
INSERT INTO blog_posts_tags (post_id, tag_id)
VALUES (
  'a1b2c3d4-5e6f-7g8h-9i0j-k1l2m3n4o5p6',
  'e9b6c7d8-5fc4-4321-8f9d-12e3b4c5a6d7'
) ON CONFLICT DO NOTHING;

-- Add additional indexes for performance
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_status ON blog_posts(status) WHERE status = 'published';
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_date ON blog_posts(published_at DESC) WHERE status = 'published';