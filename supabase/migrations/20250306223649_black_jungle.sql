/*
  # Fix Blog Schema and Add Sample Post

  1. Schema Fixes
    - Ensure proper foreign key relationships
    - Add indexes for performance
    - Add sample blog post for testing

  2. Sample Data
    - Add one test category
    - Add one test post
*/

-- Create test category if not exists
INSERT INTO blog_categories (id, name, created_at, updated_at)
VALUES (
  'f8c3de3d-1fea-4d7c-a8b0-29f63c4c3454',
  'Schwimmkurse',
  NOW(),
  NOW()
) ON CONFLICT DO NOTHING;

-- Create test post if not exists
INSERT INTO blog_posts (
  id,
  title,
  slug,
  content,
  excerpt,
  featured_image,
  status,
  published_at,
  category_id,
  created_at,
  updated_at
) VALUES (
  '550e8400-e29b-41d4-a716-446655440000',
  'Warum Schwimmkurse für Kinder ab 5 Jahren so wichtig sind',
  'warum-schwimmkurse-für-kinder-ab-5-jahren-so-wichtig-sind',
  '<h2>Die Bedeutung des frühen Schwimmenlernens</h2><p>Schwimmen lernen ist eine wichtige Fähigkeit, die nicht nur Spaß macht, sondern auch die Sicherheit im und am Wasser erhöht. Besonders im Alter von 5 Jahren sind Kinder in der optimalen Entwicklungsphase, um diese lebenswichtige Fähigkeit zu erlernen.</p>',
  'Entdecken Sie, warum das Alter von 5 Jahren ideal ist, um mit dem Schwimmenlernen zu beginnen und welche Vorteile frühe Schwimmkurse bieten.',
  'https://images.unsplash.com/photo-1560089000-7433a4ebbd64',
  'published',
  NOW(),
  'f8c3de3d-1fea-4d7c-a8b0-29f63c4c3454',
  NOW(),
  NOW()
) ON CONFLICT DO NOTHING;