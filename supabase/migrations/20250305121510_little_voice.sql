/*
  # Blog Schema Simplification

  1. New Tables
    - `blog_posts_views` - Track post views
    - `blog_posts_likes` - Track post likes
    - `blog_posts_related` - Related posts junction table

  2. Changes
    - Add metadata fields to blog_posts
    - Add view_count and like_count to blog_posts
    - Add reading_time estimate to blog_posts

  3. Security
    - Enable RLS on new tables
    - Add policies for public/authenticated access
*/

-- Add metadata fields to blog_posts
ALTER TABLE blog_posts
ADD COLUMN meta_title text,
ADD COLUMN meta_description text,
ADD COLUMN meta_keywords text[],
ADD COLUMN view_count integer DEFAULT 0,
ADD COLUMN like_count integer DEFAULT 0,
ADD COLUMN reading_time integer; -- in minutes

-- Create blog_posts_views table
CREATE TABLE blog_posts_views (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid REFERENCES blog_posts(id) ON DELETE CASCADE,
  ip_address text,
  user_agent text,
  viewed_at timestamptz DEFAULT now()
);

-- Create blog_posts_likes table
CREATE TABLE blog_posts_likes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid REFERENCES blog_posts(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now()
);

-- Create blog_posts_related table
CREATE TABLE blog_posts_related (
  post_id uuid REFERENCES blog_posts(id) ON DELETE CASCADE,
  related_post_id uuid REFERENCES blog_posts(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, related_post_id)
);

-- Enable RLS
ALTER TABLE blog_posts_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts_related ENABLE ROW LEVEL SECURITY;

-- Create policies for blog_posts_views
CREATE POLICY "Allow insert for all users"
  ON blog_posts_views
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow select for authenticated users"
  ON blog_posts_views
  FOR SELECT
  TO authenticated
  USING (true);

-- Create policies for blog_posts_likes
CREATE POLICY "Allow authenticated users to like posts"
  ON blog_posts_likes
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create policies for blog_posts_related
CREATE POLICY "Allow public to view related posts"
  ON blog_posts_related
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow authenticated users to manage related posts"
  ON blog_posts_related
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX idx_blog_posts_views_post_id ON blog_posts_views(post_id);
CREATE INDEX idx_blog_posts_likes_post_id ON blog_posts_likes(post_id);
CREATE INDEX idx_blog_posts_related_post_id ON blog_posts_related(post_id);
CREATE INDEX idx_blog_posts_related_related_post_id ON blog_posts_related(related_post_id);

-- Create function to update post view count
CREATE OR REPLACE FUNCTION increment_post_view_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE blog_posts
  SET view_count = view_count + 1
  WHERE id = NEW.post_id;
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for post view count
CREATE TRIGGER increment_post_view_count_trigger
  AFTER INSERT ON blog_posts_views
  FOR EACH ROW
  EXECUTE FUNCTION increment_post_view_count();

-- Create function to update post like count
CREATE OR REPLACE FUNCTION update_post_like_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE blog_posts
    SET like_count = like_count + 1
    WHERE id = NEW.post_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE blog_posts
    SET like_count = like_count - 1
    WHERE id = OLD.post_id;
  END IF;
  RETURN NULL;
END;
$$ language 'plpgsql';

-- Create trigger for post like count
CREATE TRIGGER update_post_like_count_trigger
  AFTER INSERT OR DELETE ON blog_posts_likes
  FOR EACH ROW
  EXECUTE FUNCTION update_post_like_count();