/*
  # Fix Blog Post Access and Relations

  1. Changes
    - Add proper indexes for performance
    - Update RLS policies for blog posts
    - Ensure proper relation handling
    
  2. Security
    - Public can read published posts and related data
    - Maintain data integrity with foreign key constraints
*/

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS blog_posts_slug_idx ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS blog_posts_status_idx ON blog_posts(status);
CREATE INDEX IF NOT EXISTS blog_posts_published_at_idx ON blog_posts(published_at);

-- Ensure RLS is enabled
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts_tags ENABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "public_read_published_blog_posts" ON blog_posts;
DROP POLICY IF EXISTS "public_read_blog_categories" ON blog_categories;
DROP POLICY IF EXISTS "public_read_blog_tags" ON blog_tags;
DROP POLICY IF EXISTS "public_read_blog_posts_tags" ON blog_posts_tags;

-- Create new policies
CREATE POLICY "public_read_published_blog_posts"
ON blog_posts FOR SELECT TO public
USING (
  status = 'published' 
  AND published_at IS NOT NULL 
  AND published_at <= now()
);

CREATE POLICY "public_read_blog_categories"
ON blog_categories FOR SELECT TO public
USING (true);

CREATE POLICY "public_read_blog_tags"
ON blog_tags FOR SELECT TO public
USING (true);

CREATE POLICY "public_read_blog_posts_tags"
ON blog_posts_tags FOR SELECT TO public
USING (
  EXISTS (
    SELECT 1 FROM blog_posts
    WHERE blog_posts.id = blog_posts_tags.post_id
    AND blog_posts.status = 'published'
    AND blog_posts.published_at IS NOT NULL
    AND blog_posts.published_at <= now()
  )
);

-- Add foreign key constraints if not exists
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'blog_posts_category_id_fkey'
  ) THEN
    ALTER TABLE blog_posts
    ADD CONSTRAINT blog_posts_category_id_fkey
    FOREIGN KEY (category_id) 
    REFERENCES blog_categories(id)
    ON DELETE SET NULL;
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'blog_posts_tags_post_id_fkey'
  ) THEN
    ALTER TABLE blog_posts_tags
    ADD CONSTRAINT blog_posts_tags_post_id_fkey
    FOREIGN KEY (post_id) 
    REFERENCES blog_posts(id)
    ON DELETE CASCADE;
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'blog_posts_tags_tag_id_fkey'
  ) THEN
    ALTER TABLE blog_posts_tags
    ADD CONSTRAINT blog_posts_tags_tag_id_fkey
    FOREIGN KEY (tag_id) 
    REFERENCES blog_tags(id)
    ON DELETE CASCADE;
  END IF;
END $$;