/*
  # Add initial categories and link courses

  1. Insert Categories
    - Schwimmkurse 2026 (2-12 Jahre)
    - Schwimmkurse 2025 (5-12 Jahre)

  2. Link existing courses to categories
*/

-- Insert initial categories
INSERT INTO categories (title, description, age_range, image_url) VALUES
(
  'Schwimmkurse 2026 - 2-12 Jahre',
  'Verschiedene Schwimmkurs-Angebote von 2-4 Jahren und von 5-12 Jahren',
  '2 - 12 Jahre',
  'https://images.unsplash.com/photo-1560089000-7433a4ebbd64'
),
(
  'Schwimmkurse 2025 (5-12 Jahre)',
  'Schwimmkurse für Kinder im Alter von 5 bis 12 Jahren',
  '5 - 12 Jahre',
  'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7'
);

-- Link existing courses to categories
WITH cat_2026 AS (
  SELECT id FROM categories WHERE title LIKE 'Schwimmkurse 2026%'
),
cat_2025 AS (
  SELECT id FROM categories WHERE title LIKE 'Schwimmkurse 2025%'
)
UPDATE courses SET
  category_id = CASE
    WHEN title LIKE '%2-4 Jahre%' THEN (SELECT id FROM cat_2026)
    WHEN title LIKE '%5-12 Jahre%' THEN (SELECT id FROM cat_2025)
    ELSE (SELECT id FROM cat_2026)
  END;