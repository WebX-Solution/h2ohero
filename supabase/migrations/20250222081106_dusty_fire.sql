/*
  # Add categories table and relationships

  1. New Tables
    - `categories`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `age_range` (text)
      - `image_url` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Changes
    - Add category_id to courses table
    - Add foreign key constraint

  3. Security
    - Enable RLS
    - Add policies for public and authenticated access
*/

-- Create categories table
CREATE TABLE categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  age_range text NOT NULL,
  image_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Add category_id to courses
ALTER TABLE courses ADD COLUMN category_id uuid REFERENCES categories(id);

-- Enable RLS
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow public read access to categories"
  ON categories
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow authenticated users full access to categories"
  ON categories
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create indexes
CREATE INDEX idx_categories_title ON categories (title);
CREATE INDEX idx_courses_category_id ON courses (category_id);