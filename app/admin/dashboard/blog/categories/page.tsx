'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Loader2, Plus, Pencil, Trash2 } from 'lucide-react';
import type { Database } from '@/types/supabase';

type Category = Database['public']['Tables']['blog_categories']['Row'];

export default function BlogCategoriesPage() {
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();
  
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });

  // Auth check and fetch categories
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.replace('/admin/login');
        return;
      }
      
      // Fetch categories
      try {
        const { data, error } = await supabase
          .from('blog_categories')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setCategories(data || []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching categories:', error);
        toast.error('Fehler beim Laden der Kategorien');
        setLoading(false);
      }
    };

    checkSession();
  }, [router, supabase]);

  // Realtime subscription
  useEffect(() => {
    const channel = supabase
      .channel('blog_categories_changes')
      .on('postgres_changes', 
        { 
          event: '*',
          schema: 'public',
          table: 'blog_categories'
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setCategories(prev => [payload.new as Category, ...prev]);
            toast.success('Neue Kategorie wurde hinzugefügt');
          } else if (payload.eventType === 'UPDATE') {
            setCategories(prev => prev.map(category => 
              category.id === payload.new.id ? payload.new as Category : category
            ));
            toast.success('Kategorie wurde aktualisiert');
          } else if (payload.eventType === 'DELETE') {
            setCategories(prev => prev.filter(category => category.id !== payload.old.id));
            toast.success('Kategorie wurde gelöscht');
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (selectedCategory) {
        // Update existing category
        const { error } = await supabase
          .from('blog_categories')
          .update(formData)
          .eq('id', selectedCategory.id);

        if (error) throw error;
        toast.success('Kategorie erfolgreich aktualisiert');
      } else {
        // Create new category
        const { error } = await supabase
          .from('blog_categories')
          .insert([formData]);

        if (error) throw error;
        toast.success('Kategorie erfolgreich erstellt');
      }

      setIsDialogOpen(false);
      setSelectedCategory(null);
      setFormData({ name: '', description: '' });
    } catch (error: any) {
      toast.error('Fehler: ' + error.message);
    }
  };

  const handleEdit = (category: Category) => {
    setSelectedCategory(category);
    setFormData({
      name: category.name,
      description: category.description || ''
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (category: Category) => {
    if (!confirm('Möchten Sie diese Kategorie wirklich löschen?')) return;

    try {
      const { error } = await supabase
        .from('blog_categories')
        .delete()
        .eq('id', category.id);

      if (error) throw error;
      toast.success('Kategorie erfolgreich gelöscht');
    } catch (error: any) {
      toast.error('Fehler: ' + error.message);
    }
  };

  return (
    <div className="text-[#002b56]">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Blog-Kategorien</h1>
        <p className="text-[#002b56]/60">Verwalten Sie Ihre Blog-Kategorien.</p>
      </div>

      <div className="mb-6">
        <Button 
          className="bg-[#002b56] hover:bg-[#002b56]/90 text-white"
          onClick={() => {
            setSelectedCategory(null);
            setFormData({ name: '', description: '' });
            setIsDialogOpen(true);
          }}
        >
          <Plus className="w-4 h-4 mr-2" />
          Neue Kategorie
        </Button>
      </div>

      <div className="rounded-lg border border-[#002b56]/20 overflow-hidden">
        <Table>
          <TableHeader className="bg-[#002b56]/5">
            <TableRow>
              <TableHead className="text-[#002b56]">Name</TableHead>
              <TableHead className="text-[#002b56]">Beschreibung</TableHead>
              <TableHead className="text-[#002b56]">Aktionen</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-8">
                  <Loader2 className="w-6 h-6 text-[#002b56] animate-spin mx-auto" />
                </TableCell>
              </TableRow>
            ) : categories.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center text-[#002b56]/60 py-8">
                  Keine Kategorien vorhanden
                </TableCell>
              </TableRow>
            ) : (
              categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell className="text-[#002b56] font-medium">{category.name}</TableCell>
                  <TableCell className="text-[#002b56]/70">{category.description}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="hover:bg-[#002b56]/10"
                        onClick={() => handleEdit(category)}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="hover:bg-red-500/10 text-red-500"
                        onClick={() => handleDelete(category)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>
              {selectedCategory ? 'Kategorie bearbeiten' : 'Neue Kategorie'}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-[#002b56]/5 border-[#002b56]/20 text-[#002b56] mt-2"
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Beschreibung</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="bg-[#002b56]/5 border-[#002b56]/20 text-[#002b56] mt-2"
                rows={3}
              />
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
                className="border-[#002b56]/20 text-[#002b56] hover:bg-[#002b56]/5"
              >
                Abbrechen
              </Button>
              <Button
                type="submit"
                className="bg-[#002b56] hover:bg-[#002b56]/90 text-white"
              >
                {selectedCategory ? 'Aktualisieren' : 'Erstellen'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}