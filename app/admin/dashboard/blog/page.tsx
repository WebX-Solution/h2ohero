'use client'

import { useState, useEffect, useMemo } from 'react';
import Navbar from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Image from 'next/image';
import Link from 'next/link';
import { Search, Calendar, Tag, ArrowRight, Filter, X } from 'lucide-react';
import type { Database } from '@/types/supabase';

type BlogPost = Database['public']['Tables']['blog_posts']['Row'] & {
  category?: {
    name: string;
  } | null;
  blog_posts_tags?: {
    tag: {
      name: string;
    };
  }[];
};
type BlogCategory = Database['public']['Tables']['blog_categories']['Row'];
type BlogTag = Database['public']['Tables']['blog_tags']['Row'];

function BlogCard({ post, index }: { post: BlogPost; index: number }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
    >
      <div className="relative h-64 overflow-hidden">
        <Image
          src={post.featured_image || 'https://images.unsplash.com/photo-1600965962361-9035dbfd1c50'}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      <div className="relative p-6 pb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center gap-2 text-sm text-[#002b56]/60">
            <Calendar className="w-4 h-4" />
            {new Date(post.published_at || '').toLocaleDateString()}
          </div>
          {post.category && (
            <Badge variant="secondary" className="bg-[#002b56]/5 text-[#002b56] hover:bg-[#002b56]/10">
              {(post.category as any).name}
            </Badge>
          )}
        </div>

        <h2 className="text-xl font-semibold text-[#002b56] mb-3 line-clamp-2 group-hover:text-[#002b56]/80 transition-colors">
          {post.title}
        </h2>

        <p className="text-[#002b56]/70 mb-6 line-clamp-3">
          {post.excerpt}
        </p>

        <div className="absolute bottom-6 right-6">
          <ArrowRight className="w-5 h-5 text-[#002b56] transform transition-transform duration-300 group-hover:translate-x-2" />
        </div>
      </div>
    </Link>
  );
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [tags, setTags] = useState<BlogTag[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<{
    category: string | null;
    tag: string | null;
  }>({
    category: null,
    tag: null
  });
  const supabase = createClientComponentClient<Database>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch published blog posts
        const { data: postsData } = await supabase
          .from('blog_posts')
          .select(`
            *,
            category:blog_categories(name),
            blog_posts_tags:blog_posts_tags(
              tag:blog_tags(name)
            )
          `)
          .eq('status', 'published')
          .order('published_at', { ascending: false });

        // Fetch categories
        const { data: categoriesData } = await supabase
          .from('blog_categories')
          .select('*');

        // Fetch tags
        const { data: tagsData } = await supabase
          .from('blog_tags')
          .select('*');

        if (postsData) setPosts(postsData);
        if (categoriesData) setCategories(categoriesData);
        if (tagsData) setTags(tagsData);
      } catch (error) {
        console.error('Error fetching blog data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [supabase]);

  const filteredPosts = useMemo(() => {
    return posts?.filter(post => {
      if (!post || !post.title) return false;
      
      const matchesSearch = post.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) || false;
      const matchesCategory = !selectedFilters.category || post.category_id === selectedFilters.category;
      const matchesTag = !selectedFilters.tag || (post.blog_posts_tags || []).some(pt => pt.tag.name === selectedFilters.tag);
      
      return matchesSearch && matchesCategory && matchesTag;
    }) || [];
  }, [posts, searchTerm, selectedFilters]);

  const clearFilters = () => {
    setSelectedFilters({ category: null, tag: null });
    setSearchTerm('');
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[500px] flex items-center">
        <div className="absolute inset-0 bg-[#002b56]">
          <Image
            src="https://images.unsplash.com/photo-1544551763-46a013bb70d5"
            alt="Blog Hero"
            fill
            className="object-cover opacity-30"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#002b56]/60 via-[#002b56]/80 to-[#002b56]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-white leading-tight">
              Unser Blog
            </h1>
            <p className="text-lg sm:text-xl text-white/90 leading-relaxed">
              Aktuelle Einblicke, Expertentipps und Neuigkeiten rund um Schwimmen, Bädertechnik und mehr.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24">
        {/* Search and Filters */}
        <div className="mb-12 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Blog durchsuchen..."
              className="pl-10 bg-[#002b56]/5 border-[#002b56]/20 text-[#002b56] w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            </div>
            <Button
              variant="outline"
              className="border-[#002b56]/20 text-[#002b56] hover:bg-[#002b56]/5"
              onClick={clearFilters}
            >
              <Filter className="w-4 h-4 mr-2" />
              Filter zurücksetzen
            </Button>
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-sm text-[#002b56]/60 mr-2">Kategorien:</span>
            {categories.map((category) => (
              <Button
                key={category.id}
                variant="outline"
                className={`border-[#002b56]/20 ${
                  selectedFilters.category === category.id
                    ? 'bg-[#002b56] text-white'
                    : 'text-[#002b56] hover:bg-[#002b56]/5'
                }`}
                onClick={() => setSelectedFilters(prev => ({
                  ...prev,
                  category: prev.category === category.id ? null : category.id
                }))}
              >
                {category.name}
              </Button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-sm text-[#002b56]/60 mr-2">Tags:</span>
            {tags.map((tag) => (
              <Button
                key={tag.id}
                variant="outline"
                size="sm"
                className={`border-[#002b56]/20 ${
                  selectedFilters.tag === tag.name
                    ? 'bg-[#002b56] text-white'
                    : 'text-[#002b56] hover:bg-[#002b56]/5'
                }`}
                onClick={() => setSelectedFilters(prev => ({
                  ...prev,
                  tag: prev.tag === tag.name ? null : tag.name
                }))}
              >
                #{tag.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Blog Posts Grid */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl overflow-hidden shadow-sm"
              >
                <div className="h-64 bg-[#002b56]/10 animate-pulse" />
                <div className="p-6">
                  <div className="h-6 bg-[#002b56]/10 rounded w-3/4 mb-4 animate-pulse" />
                  <div className="h-4 bg-[#002b56]/10 rounded w-full mb-2 animate-pulse" />
                  <div className="h-4 bg-[#002b56]/10 rounded w-2/3 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredPosts.length === 0 ? (
          <div
            className="text-center py-12"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#002b56]/5 mb-4">
              <X className="w-8 h-8 text-[#002b56]/40" />
            </div>
            <h3 className="text-xl font-semibold text-[#002b56] mb-2">Keine Ergebnisse gefunden</h3>
            <p className="text-[#002b56]/60">
              Versuchen Sie es mit anderen Suchbegriffen oder Filtern
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <BlogCard key={post.id} post={post} index={index} />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}