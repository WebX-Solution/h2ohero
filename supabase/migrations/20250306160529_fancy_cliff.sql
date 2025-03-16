/*
  # Create initial blog post

  1. Purpose
    - Add a sample blog post to demonstrate functionality
    - Ensure blog system works with initial content
    - Provide example content structure

  2. Content
    - Title: "Warum Schwimmkurse für Kinder wichtig sind"
    - Category: General
    - Status: Published
    - Tags: Schwimmkurse, Kinder
*/

-- First ensure we have a general category
DO $$ 
BEGIN
  INSERT INTO blog_categories (name, description)
  VALUES ('Allgemein', 'Allgemeine Blog-Beiträge')
  ON CONFLICT (name) DO NOTHING
  RETURNING id INTO general_category_id;
END $$;

-- Create initial blog post
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
  'Warum Schwimmkurse für Kinder wichtig sind',
  'warum-schwimmkurse-fuer-kinder-wichtig-sind',
  '<h2>Die Bedeutung des Schwimmenlernens</h2>
   <p>Schwimmen ist eine lebenswichtige Fähigkeit, die jedes Kind erlernen sollte. Nicht nur für die Sicherheit im und am Wasser ist es wichtig, sondern auch für die motorische und soziale Entwicklung der Kinder.</p>
   <h3>Vorteile von Schwimmkursen</h3>
   <ul>
     <li>Sicherheit im Wasser</li>
     <li>Verbesserung der Motorik</li>
     <li>Stärkung des Selbstbewusstseins</li>
     <li>Gesunde körperliche Aktivität</li>
   </ul>',
  'Schwimmen ist eine lebenswichtige Fähigkeit. Erfahren Sie, warum Schwimmkurse für die Entwicklung Ihres Kindes so wichtig sind.',
  'https://images.unsplash.com/photo-1560089000-7433a4ebbd64',
  'published',
  NOW(),
  (SELECT id FROM blog_categories WHERE name = 'Allgemein' LIMIT 1)
);