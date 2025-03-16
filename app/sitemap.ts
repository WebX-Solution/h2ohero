import { MetadataRoute } from 'next';
import { createClient } from '@/lib/supabase';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = createClient();

  // Get all published blog posts
  const { data: posts } = await supabase
    .from('blog_posts')
    .select('slug, updated_at')
    .eq('status', 'published');

  // Get all active courses
  const { data: courses } = await supabase
    .from('courses')
    .select('id, updated_at')
    .eq('is_active', true);

  const baseUrl = 'https://baederbetrieb-gersthofen.de';

  // Static routes with priorities
  const routes = [
    { route: '', priority: 1.0 },
    { route: '/about', priority: 0.9 },
    { route: '/coaching', priority: 0.8 },
    { route: '/mentoring', priority: 0.8 },
    { route: '/technische-betreuung', priority: 0.8 },
    { route: '/ein-auswinterung', priority: 0.8 },
    { route: '/aufsichtspersonal', priority: 0.8 },
    { route: '/vortraege-seminare', priority: 0.8 },
    { route: '/blog', priority: 0.9 },
    { route: '/kurse/2026-2-12', priority: 1.0 },
    { route: '/kurse/2025-5-12', priority: 1.0 },
  ].map((route) => ({
    url: `${baseUrl}${route.route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'daily' as const,
    priority: route.priority,
  }));

  // Blog posts
  const blogUrls = (posts || []).map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.updated_at,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // Course pages
  const courseUrls = (courses || []).map((course) => ({
    url: `${baseUrl}/kurse/${course.id}`,
    lastModified: course.updated_at,
    changeFrequency: 'daily' as const,
    priority: 0.9,
  }));

  return [...routes, ...blogUrls, ...courseUrls];
}