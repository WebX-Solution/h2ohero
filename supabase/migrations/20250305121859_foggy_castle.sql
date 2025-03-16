/*
  # Fix Blog Schema and Add Performance Improvements

  1. Schema Updates
    - Add missing indexes for performance
    - Add full-text search capabilities
    - Add automatic slug generation
    - Add automatic reading time calculation

  2. Performance Improvements
    - Add materialized view for post statistics
    - Add function to update reading time
    - Add function to generate unique slugs
*/

-- Add GIN index for full-text search
CREATE INDEX IF NOT EXISTS blog_posts_fts_idx ON blog_posts 
USING gin(to_tsvector('german', title || ' ' || content));

-- Create function to calculate reading time
CREATE OR REPLACE FUNCTION calculate_reading_time(content text)
RETURNS integer AS $$
DECLARE
  words_per_minute integer := 200;
  word_count integer;
BEGIN
  -- Count words (rough approximation)
  SELECT array_length(regexp_split_to_array(content, '\s+'), 1) INTO word_count;
  -- Return reading time in minutes, minimum 1 minute
  RETURN GREATEST(1, CEIL(word_count::float / words_per_minute));
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Create function to generate unique slug
CREATE OR REPLACE FUNCTION generate_unique_slug(title text, existing_slug text DEFAULT NULL)
RETURNS text AS $$
DECLARE
  base_slug text;
  new_slug text;
  counter integer := 1;
BEGIN
  -- If existing slug is provided and valid, return it
  IF existing_slug IS NOT NULL AND existing_slug != '' THEN
    RETURN existing_slug;
  END IF;

  -- Generate base slug from title
  base_slug := lower(regexp_replace(title, '[^a-zA-Z0-9\s]', '', 'g')); -- Remove special chars
  base_slug := regexp_replace(base_slug, '\s+', '-', 'g'); -- Replace spaces with hyphens
  new_slug := base_slug;

  -- Check for uniqueness
  WHILE EXISTS (
    SELECT 1 FROM blog_posts WHERE slug = new_slug
  ) LOOP
    counter := counter + 1;
    new_slug := base_slug || '-' || counter;
  END LOOP;

  RETURN new_slug;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to update reading time and slug before insert/update
CREATE OR REPLACE FUNCTION blog_post_before_save()
RETURNS TRIGGER AS $$
BEGIN
  -- Calculate reading time
  NEW.reading_time := calculate_reading_time(NEW.content);
  
  -- Generate slug if not provided
  NEW.slug := generate_unique_slug(NEW.title, NEW.slug);

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger
DROP TRIGGER IF EXISTS blog_post_before_save_trigger ON blog_posts;
CREATE TRIGGER blog_post_before_save_trigger
  BEFORE INSERT OR UPDATE ON blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION blog_post_before_save();

-- Create materialized view for post statistics
CREATE MATERIALIZED VIEW IF NOT EXISTS blog_post_stats AS
SELECT 
  p.id,
  p.title,
  p.view_count,
  p.like_count,
  COUNT(DISTINCT v.id) as unique_views,
  COUNT(DISTINCT l.id) as unique_likes,
  p.reading_time
FROM blog_posts p
LEFT JOIN blog_posts_views v ON p.id = v.post_id
LEFT JOIN blog_posts_likes l ON p.id = l.post_id
GROUP BY p.id, p.title, p.view_count, p.like_count, p.reading_time;

-- Create index on materialized view
CREATE UNIQUE INDEX IF NOT EXISTS blog_post_stats_id_idx ON blog_post_stats(id);

-- Create function to refresh materialized view
CREATE OR REPLACE FUNCTION refresh_blog_post_stats()
RETURNS trigger AS $$
BEGIN
  REFRESH MATERIALIZED VIEW CONCURRENTLY blog_post_stats;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create triggers to refresh materialized view
DROP TRIGGER IF EXISTS refresh_blog_post_stats_trigger ON blog_posts;
CREATE TRIGGER refresh_blog_post_stats_trigger
  AFTER INSERT OR UPDATE OR DELETE ON blog_posts
  FOR EACH STATEMENT
  EXECUTE FUNCTION refresh_blog_post_stats();