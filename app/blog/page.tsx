import { headers } from 'next/headers';
import { createClient } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import { BlogPostContent } from '@/app/blog/[slug]/BlogPostContent';
import type { Database } from '@/types/supabase';
import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';

type BlogPostWithRelations = Database['public']['Tables']['blog_posts']['Row'] & {
  category: {
    name: string;
  } | null;
  blog_posts_tags: {
    tag: {
      name: string;
    };
  }[] | null;
};

// Force dynamic rendering
export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function getPost(slug: string): Promise<BlogPostWithRelations | null> {
  const supabase = createClient();
  
  // Decode and validate slug
  const trimmedSlug = decodeURIComponent(slug?.trim() || '');
  if (!trimmedSlug) {
    console.warn('Invalid or empty slug provided');
    return null;
  }

  try {
    // First try to get any post with this slug
    const { data: post, error } = await supabase
      .from('blog_posts')
      .select(`
        *,
        category:blog_categories(name),
        blog_posts_tags(
          tag:blog_tags(name)
        )
      `)
      .eq('slug', trimmedSlug)
      .single();

    if (error) {
      console.error(`Database error fetching post (${slug}):`, {
        code: error.code,
        message: error.message,
        details: error.details
      });
      return null;
    }
    
    // If post exists but isn't published, return null
    if (post && (
      post.status !== 'published' ||
      !post.published_at ||
      new Date(post.published_at) > new Date()
    )) {
      return null;
    }
    
    return post as BlogPostWithRelations;
  } catch (error) {
    console.error(`Unexpected error fetching post (${slug}):`, error);
    return null;
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);
  
  if (!post) {
    notFound();
  }
  
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="w-8 h-8 text-[#002b56] animate-spin" />
      </div>
    }>
      <BlogPostContent post={post} />
    </Suspense>
  );
}