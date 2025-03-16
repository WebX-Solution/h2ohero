'use client';

import Navbar from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Tag, ArrowLeft, AlertCircle, Clock, User, Share2, Facebook, Twitter, Linkedin, Copy, Check } from 'lucide-react';
import type { Database } from '@/types/supabase';
import { useState } from 'react';

type Tables = Database['public']['Tables']
type BlogPost = Tables['blog_posts']['Row']

interface BlogPostWithRelations extends BlogPost {
  category: {
    name: string;
  } | null;
  blog_posts_tags: {
    tag: {
      name: string;
    };
  }[] | null;
}

export function BlogPostContent({ post }: { post: BlogPostWithRelations }) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-white relative">
      <Navbar />
      {/* Hero Section with improved spacing and styling */}
      <section className="relative h-[90vh] min-h-[700px] flex items-center pt-32">
        <div className="absolute inset-0">
          <Image
            src={post?.featured_image || 'https://images.unsplash.com/photo-1600965962361-9035dbfd1c50'}
            alt={post?.title || 'Blog Post'}
            fill
            className="object-cover transition-transform duration-700 scale-105 brightness-75"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#002b56]/60 via-[#002b56]/80 to-[#002b56]" />
        </div>
        
        <div className="absolute inset-0 flex items-center justify-center animate-fade-in">
          <div className="max-w-4xl mx-auto px-8">
            <div className="flex items-center gap-6 text-sm text-white/90 mb-8">
              {post?.category && (
                <div className="flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors">
                  <Tag className="w-4 h-4" />
                  {post.category.name}
                </div>
              )}
              {post?.published_at && (
                <div className="flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors">
                  <Calendar className="w-4 h-4" />
                  {new Date(post.published_at).toLocaleDateString()}
                </div>
              )}
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight animate-fade-up tracking-tight">
              {post?.title}
            </h1>
            
            {post?.excerpt && (
              <p className="text-xl md:text-2xl text-white/90 leading-relaxed max-w-3xl animate-fade-up delay-100 font-light">
                {post.excerpt}
              </p>
            )}
            
            <div className="mt-16 flex items-center gap-4 animate-fade-up delay-200">
              <Avatar className="w-12 h-12 border-2 border-white/20">
                <Image
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
                  alt="Author"
                  width={48}
                  height={48}
                  className="object-cover"
                />
              </Avatar>
              <div className="space-y-1">
                <p className="text-white font-medium">Ralf Großmann</p>
                <p className="text-white/60 text-sm">H2oHero - Geschäftsführer</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {post && !post.content && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50">
          <div className="bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 backdrop-blur-sm">
            <AlertCircle className="w-5 h-5" />
            <span>Dieser Beitrag hat noch keinen Inhalt</span>
          </div>
        </div>
      )}
      
      {post && !post.published_at && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-yellow-500 text-white px-4 py-2 rounded-lg shadow-lg">
          Dieser Beitrag wurde noch nicht veröffentlicht
        </div>
      )}

      <article className="relative -mt-32 bg-white rounded-t-[3rem] shadow-2xl px-8 pt-16 pb-24">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-between items-center mb-16">
            <Link href="/blog">
              <Button
                variant="ghost"
                className="text-[#002b56] hover:bg-[#002b56]/5 transition-all font-medium"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Zurück zum Blog
              </Button>
            </Link>
            
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-[#002b56] hover:bg-[#002b56]/5 transition-all"
                onClick={() => window.open(`https://facebook.com/sharer/sharer.php?u=${window.location.href}`, '_blank')}
              >
                <Facebook className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-[#002b56] hover:bg-[#002b56]/5 transition-all"
                onClick={() => window.open(`https://twitter.com/intent/tweet?url=${window.location.href}`, '_blank')}
              >
                <Twitter className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-[#002b56] hover:bg-[#002b56]/5 transition-all"
                onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`, '_blank')}
              >
                <Linkedin className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-[#002b56] hover:bg-[#002b56]/5 transition-all"
                onClick={handleCopyLink}
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          {post?.content && (
            <div 
              className="prose prose-lg max-w-none
                prose-headings:text-[#002b56] prose-headings:font-bold prose-headings:leading-tight
                prose-p:text-[#002b56]/80 prose-p:leading-relaxed
                prose-a:text-[#002b56] prose-a:no-underline prose-a:border-b prose-a:border-[#002b56]/20 hover:prose-a:border-[#002b56] prose-a:transition-colors
                prose-strong:text-[#002b56] prose-strong:font-semibold
                prose-blockquote:border-l-4 prose-blockquote:border-[#002b56] prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-[#002b56]/80
                prose-pre:bg-[#002b56]/5 prose-pre:text-[#002b56] prose-pre:rounded-xl
                prose-img:rounded-xl prose-img:shadow-lg
                prose-ul:marker:text-[#002b56]/40
                prose-ol:marker:text-[#002b56]/40"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          )}

          {post?.blog_posts_tags && post.blog_posts_tags.length > 0 && (
            <div className="mt-16 pt-8 border-t border-[#002b56]/10 animate-fade-up">
              <h3 className="text-[#002b56] font-semibold mb-4">Verwandte Themen</h3>
              <div className="flex flex-wrap gap-3">
                {post.blog_posts_tags.map((pt, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-[#002b56]/5 text-[#002b56] rounded-full text-sm hover:bg-[#002b56]/10 transition-all duration-300 cursor-pointer hover:scale-105"
                  >
                    #{pt.tag.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>

      <Footer />
    </div>
  );
}