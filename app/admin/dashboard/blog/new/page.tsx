'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, ArrowLeft, Image as ImageIcon, Link as LinkIcon, Tags } from 'lucide-react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { toast } from 'sonner';
import type { Database } from '@/types/supabase';
import { TipTapEditor } from '@/components/ui/tiptap-editor';
import { Card } from '@/components/ui/card';

type Category = Database['public']['Tables']['blog_categories']['Row'];
type Tag = Database['public']['Tables']['blog_tags']['Row'];

export default function NewBlogPostPage() {
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();

  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    category_id: '',
    featured_image: '',
    status: 'draft',
    selected_tags: [] as string[]
  });

  // Auth check effect
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.replace('/admin/login');
        return;
      }
      
      // Fetch categories and tags
      try {
        const [categoriesResponse, tagsResponse] = await Promise.all([
          supabase.from('blog_categories').select('*').order('name'),
          supabase.from('blog_tags').select('*').order('name')
        ]);

        if (categoriesResponse.data) setCategories(categoriesResponse.data);
        if (tagsResponse.data) setTags(tagsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Fehler beim Laden der Daten');
      }
    };

    checkSession();
  }, [router, supabase]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Create the blog post
      const { data: post, error: postError } = await supabase
        .from('blog_posts')
        .insert({
          title: formData.title,
          slug: formData.slug || formData.title.toLowerCase().replace(/\s+/g, '-'),
          content: formData.content,
          excerpt: formData.excerpt,
          category_id: formData.category_id,
          featured_image: formData.featured_image,
          status: formData.status,
          published_at: formData.status === 'published' ? new Date().toISOString() : null
        })
        .select()
        .single();

      if (postError) throw postError;

      // Add tags if selected
      if (formData.selected_tags.length > 0) {
        const { error: tagsError } = await supabase
          .from('blog_posts_tags')
          .insert(
            formData.selected_tags.map(tagId => ({
              post_id: post.id,
              tag_id: tagId
            }))
          );

        if (tagsError) throw tagsError;
      }

      toast.success('Blogbeitrag erfolgreich erstellt');
      setFormData({
        title: '',
        slug: '',
        content: '',
        excerpt: '',
        category_id: '',
        featured_image: '',
        status: 'draft',
        selected_tags: []
      });
      router.push('/admin/dashboard/blog');
    } catch (error: any) {
      toast.error('Fehler beim Erstellen des Blogbeitrags: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#002b56]">
      <div className="mb-8">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                className="text-[#002b56] hover:bg-[#002b56]/5"
                onClick={() => router.push('/admin/dashboard/blog')}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Zurück
              </Button>
              <h1 className="text-2xl font-bold">Neuen Blogbeitrag erstellen</h1>
            </div>
            <div className="flex items-center gap-4">
              <Button
                type="button"
                variant="outline"
                className="border-[#002b56]/20 text-[#002b56] hover:bg-[#002b56]/5"
                onClick={() => router.push('/admin/dashboard/blog')}
              >
                Abbrechen
              </Button>
              <Button
                type="submit"
                form="blog-form"
                className="bg-[#002b56] hover:bg-[#002b56]/90 text-white min-w-[120px]"
                disabled={loading}
              >
                {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                {loading ? 'Erstelle...' : 'Erstellen'}
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-8 pb-12">
        <form id="blog-form" onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-8 shadow-sm">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title" className="text-lg">Titel</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="bg-white border-[#002b56]/20 text-[#002b56] mt-2 text-lg h-12"
                    placeholder="Geben Sie hier den Titel ein..."
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="excerpt" className="text-lg">Auszug</Label>
                  <Textarea
                    id="excerpt"
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    className="bg-white border-[#002b56]/20 text-[#002b56] mt-2 min-h-[100px]"
                    placeholder="Eine kurze Zusammenfassung des Beitrags..."
                    rows={3}
                  />
                </div>
              </div>
            </Card>

            <Card className="p-8 shadow-sm">
              <Label htmlFor="content" className="text-lg mb-4 block">Inhalt</Label>
              <TipTapEditor
                content={formData.content}
                onChange={(content) => setFormData({ ...formData, content })}
                placeholder="Schreiben Sie hier Ihren Blogbeitrag..."
              />
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="p-8 shadow-sm">
              <h3 className="font-semibold mb-6 flex items-center gap-2 text-lg">
                <Tags className="w-5 h-5" />
                Kategorisierung
              </h3>
              <div className="space-y-6">
                <div>
                  <Label htmlFor="category">Kategorie</Label>
                  <Select
                    value={formData.category_id}
                    onValueChange={(value) => setFormData({ ...formData, category_id: value })}
                  >
                    <SelectTrigger className="bg-white border-[#002b56]/20 text-[#002b56] mt-2 h-12">
                      <SelectValue placeholder="Kategorie auswählen" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-[#002b56]/20">
                      {categories.map((category) => (
                        <SelectItem 
                          key={category.id} 
                          value={category.id}
                          className="text-[#002b56] hover:bg-[#002b56]/5"
                        >
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="slug">URL-Slug</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="bg-white border-[#002b56]/20 text-[#002b56] mt-2 h-12"
                    placeholder="automatisch-generiert"
                  />
                </div>
              </div>
            </Card>

            <Card className="p-8 shadow-sm">
              <h3 className="font-semibold mb-6 flex items-center gap-2 text-lg">
                <ImageIcon className="w-5 h-5" />
                Beitragsbild
              </h3>
              <div>
                <Label htmlFor="featured_image">Bild-URL</Label>
                <Input
                  id="featured_image"
                  value={formData.featured_image}
                  onChange={(e) => setFormData({ ...formData, featured_image: e.target.value })}
                  className="bg-white border-[#002b56]/20 text-[#002b56] mt-2 h-12"
                  placeholder="https://..."
                />
              </div>
            </Card>

            <Card className="p-8 shadow-sm">
              <h3 className="font-semibold mb-4">Veröffentlichung</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) => setFormData({ ...formData, status: value })}
                  >
                    <SelectTrigger className="bg-white border-[#002b56]/20 text-[#002b56] mt-2 h-12">
                      <SelectValue placeholder="Status auswählen" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft" className="text-[#002b56] hover:bg-[#002b56]/5">
                        Entwurf
                      </SelectItem>
                      <SelectItem value="published" className="text-[#002b56] hover:bg-[#002b56]/5">
                        Veröffentlicht
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>
          </div>
        </form>
      </div>
    </div>
  );
}