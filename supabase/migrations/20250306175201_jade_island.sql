/*
  # Blog Categories Unique Name Constraint

  1. Changes
    - Add unique constraint to blog_categories name column
    - Add new categories with unique names
    - Update existing categories if needed

  2. Security
    - Maintain existing RLS policies
*/

-- First check if category exists and only insert if it doesn't
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM blog_categories 
    WHERE name = 'Schwimmtechnik'
  ) THEN
    INSERT INTO blog_categories (name, description)
    VALUES (
      'Schwimmtechnik',
      'Artikel über verschiedene Schwimmtechniken und deren Verbesserung'
    );
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM blog_categories 
    WHERE name = 'Sicherheit im Wasser'
  ) THEN
    INSERT INTO blog_categories (name, description)
    VALUES (
      'Sicherheit im Wasser',
      'Wichtige Tipps und Informationen zur Sicherheit beim Schwimmen'
    );
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM blog_categories 
    WHERE name = 'Kinderschwimmen'
  ) THEN
    INSERT INTO blog_categories (name, description)
    VALUES (
      'Kinderschwimmen',
      'Spezielle Artikel über das Schwimmenlernen für Kinder'
    );
  END IF;
END $$;

-- Add unique constraint if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'blog_categories_name_key'
  ) THEN
    ALTER TABLE blog_categories
    ADD CONSTRAINT blog_categories_name_key UNIQUE (name);
  END IF;
END $$;