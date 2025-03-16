/*
  # Blog Schema Enhancement

  1. New Tables
    - `blog_posts_views` - Track post views
    - `blog_posts_likes` - Track post likes
    - `blog_posts_comments` - User comments on posts
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

-- Create blog_posts_comments table
CREATE TABLE blog_posts_comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid REFERENCES blog_posts(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  parent_id uuid REFERENCES blog_posts_comments(id) ON DELETE CASCADE,
  content text NOT NULL,
  is_approved boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
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
ALTER TABLE blog_posts_comments ENABLE ROW LEVEL SECURITY;
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

-- Create policies for blog_posts_comments
CREATE POLICY "Allow public to view approved comments"
  ON blog_posts_comments
  FOR SELECT
  TO public
  USING (is_approved = true);

CREATE POLICY "Allow authenticated users to create comments"
  ON blog_posts_comments
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow users to manage their own comments"
  ON blog_posts_comments
  FOR ALL
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

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
CREATE INDEX idx_blog_posts_comments_post_id ON blog_posts_comments(post_id);
CREATE INDEX idx_blog_posts_comments_user_id ON blog_posts_comments(user_id);
CREATE INDEX idx_blog_posts_comments_parent_id ON blog_posts_comments(parent_id);
CREATE INDEX idx_blog_posts_related_post_id ON blog_posts_related(post_id);
CREATE INDEX idx_blog_posts_related_related_post_id ON blog_posts_related(related_post_id);

-- Create function to update comment updated_at
CREATE OR REPLACE FUNCTION update_comment_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for comment updated_at
CREATE TRIGGER update_blog_comments_updated_at
  BEFORE UPDATE ON blog_posts_comments
  FOR EACH ROW
  EXECUTE FUNCTION update_comment_updated_at();

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