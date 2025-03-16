/*
  # Add initial blog post and categories

  1. New Tables
    - Add initial blog category
    - Add initial blog post
    - Add initial blog tag
    
  2. Content
    - Category: "Schwimmkurse"
    - Post: "Warum Schwimmkurse für Kinder ab 5 Jahren so wichtig sind"
    - Tag: "Schwimmkurse"

  3. Changes
    - Ensures initial content is available
    - Provides example structure
*/

-- First create the blog category
INSERT INTO blog_categories (id, name, description, created_at, updated_at)
VALUES (
  'f47ac10b-58cc-4372-a567-0e02b2c3d479',
  'Schwimmkurse',
  'Artikel rund um unsere Schwimmkurse',
  NOW(),
  NOW()
) ON CONFLICT (id) DO NOTHING;

-- Create a blog tag
INSERT INTO blog_tags (id, name, created_at, updated_at)
VALUES (
  'b5f8c3e1-d3a2-4c1f-9e8b-7d6a2e4c8f9b',
  'Schwimmkurse',
  NOW(),
  NOW()
) ON CONFLICT (id) DO NOTHING;

-- Create the blog post
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
  'a1b2c3d4-e5f6-4a5b-9c3d-2e1f0a9b8c7d',
  'Warum Schwimmkurse für Kinder ab 5 Jahren so wichtig sind',
  'warum-schwimmkurse-fuer-kinder-ab-5-jahren-so-wichtig-sind',
  '<h2>Die Bedeutung des frühen Schwimmenlernens</h2>
   <p>Schwimmen ist eine grundlegende Fähigkeit, die jedes Kind erlernen sollte. Besonders im Alter von 5 Jahren sind Kinder in einer optimalen Entwicklungsphase, um diese wichtige Kompetenz zu erwerben.</p>
   
   <h3>Warum gerade mit 5 Jahren?</h3>
   <p>In diesem Alter haben Kinder bereits:</p>
   <ul>
     <li>Eine gut entwickelte Motorik</li>
     <li>Die Fähigkeit, Anweisungen zu verstehen und umzusetzen</li>
     <li>Ein natürliches Interesse am Wasser</li>
     <li>Die nötige Aufmerksamkeitsspanne für strukturiertes Lernen</li>
   </ul>

   <h3>Vorteile des frühen Schwimmenlernens</h3>
   <p>Die Vorteile des Schwimmenlernens in diesem Alter sind vielfältig:</p>
   <ul>
     <li>Entwicklung von Wassersicherheit und Selbstvertrauen</li>
     <li>Förderung der motorischen Entwicklung</li>
     <li>Stärkung des Herz-Kreislauf-Systems</li>
     <li>Verbesserung der Koordinationsfähigkeit</li>
     <li>Soziale Interaktion mit Gleichaltrigen</li>
   </ul>

   <h2>Unsere Schwimmkurse für 5-Jährige</h2>
   <p>In unseren speziell konzipierten Kursen lernen Kinder spielerisch und mit viel Spaß die grundlegenden Schwimmtechniken. Dabei legen wir besonderen Wert auf:</p>
   <ul>
     <li>Kleine Gruppengrößen für individuelle Betreuung</li>
     <li>Qualifizierte und erfahrene Schwimmlehrer</li>
     <li>Altersgerechte Lehrmethoden</li>
     <li>Regelmäßiges Feedback an die Eltern</li>
   </ul>',
  'Erfahren Sie, warum das Alter von 5 Jahren ideal ist, um mit dem Schwimmenlernen zu beginnen. Wir erklären die Vorteile und zeigen, wie unsere Kurse speziell auf diese Altersgruppe zugeschnitten sind.',
  'https://images.unsplash.com/photo-1560089000-7433a4ebbd64',
  'published',
  NOW(),
  'f47ac10b-58cc-4372-a567-0e02b2c3d479',
  NOW(),
  NOW()
) ON CONFLICT (id) DO NOTHING;

-- Link the post with the tag
INSERT INTO blog_posts_tags (post_id, tag_id, created_at)
VALUES (
  'a1b2c3d4-e5f6-4a5b-9c3d-2e1f0a9b8c7d',
  'b5f8c3e1-d3a2-4c1f-9e8b-7d6a2e4c8f9b',
  NOW()
) ON CONFLICT (post_id, tag_id) DO NOTHING;