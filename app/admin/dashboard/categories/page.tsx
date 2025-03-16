'use client';

import { useState, useCallback, useMemo, memo } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useCategories } from '@/hooks/use-categories';
import { Loader2, Plus, Pencil, Trash2 } from 'lucide-react';
import type { Database } from '@/types/supabase';

type Category = Database['public']['Tables']['categories']['Row'];

// Memoize category row component
const CategoryRow = memo(({ 
  category,
  onEdit,
  onDelete 
}: { 
  category: Category;
  onEdit: (category: Category) => void;
  onDelete: (id: string) => void;
}) => (
  <TableRow className="border-[#00A3FF]/20">
    <TableCell className="text-[#002b56]">{category.title}</TableCell>
    <TableCell className="text-[#002b56]">{category.age_range}</TableCell>
    <TableCell className="text-[#002b56]">{category.description}</TableCell>
    <TableCell className="text-[#002b56]">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          className="hover:bg-[#00A3FF]/10"
          onClick={() => onEdit(category)}
        >
          <Pencil className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="hover:bg-red-500/10 text-red-500"
          onClick={() => onDelete(category.id)}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </TableCell>
  </TableRow>
));

CategoryRow.displayName = 'CategoryRow';

export default function CategoriesPage() {
  const { categories, loading: isLoading, error } = useCategories();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    age_range: '',
    image_url: ''
  });
  
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();


  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (selectedCategory) {
        const { error } = await supabase
          .from('categories')
          .update(formData)
          .eq('id', selectedCategory.id);

        if (error) throw error;
        toast.success('Kategorie erfolgreich aktualisiert');
      } else {
        const { error } = await supabase
          .from('categories')
          .insert([formData]);

        if (error) throw error;
        toast.success('Kategorie erfolgreich erstellt');
      }

      setIsDialogOpen(false);
    } catch (error: any) {
      toast.error('Fehler: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  }, [selectedCategory, formData, supabase]);

  const handleEdit = useCallback((category: Category) => {
    setSelectedCategory(category);
    setFormData({
      title: category.title,
      description: category.description || '',
      age_range: category.age_range,
      image_url: category.image_url || ''
    });
    setIsDialogOpen(true);
  }, []);

  const handleDelete = useCallback(async (id: string) => {
    if (!confirm('Möchten Sie diese Kategorie wirklich löschen?')) return;

    try {
      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success('Kategorie erfolgreich gelöscht');
    } catch (error: any) {
      toast.error('Fehler: ' + error.message);
    }
  }, [supabase]);

  return (
    <div className="text-[#002b56]">
      <div className="mb-8 text-[#002b56]">
        <h1 className="text-2xl font-bold mb-2 text-[#002b56]">Kategorien</h1>
        <p className="text-[#002b56]/60">Verwalten Sie Ihre Kurskategorien</p>
      </div>

      <div className="mb-6">
        <Button 
          onClick={() => {
            setSelectedCategory(null);
            setFormData({
              title: '',
              description: '',
              age_range: '',
              image_url: ''
            });
            setIsDialogOpen(true);
          }}
          className="bg-[#002b56] hover:bg-[#002b56]/90 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Neue Kategorie
        </Button>
      </div>

      <div className="rounded-lg border border-[#00A3FF]/20 overflow-hidden">
        <Table>
          <TableHeader className="bg-[#0D1526]">
            <TableRow>
              <TableHead className="text-white">Titel</TableHead>
              <TableHead className="text-white">Altersbereich</TableHead>
              <TableHead className="text-white">Beschreibung</TableHead>
              <TableHead className="text-white">Aktionen</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8">
                  <Loader2 className="w-6 h-6 text-[#00A3FF] animate-spin mx-auto" />
                </TableCell>
              </TableRow>
            ) : categories.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-gray-400 py-8">
                  Keine Kategorien gefunden
                </TableCell>
              </TableRow>
            ) : (
              categories.map((category) => (
                <CategoryRow
                  key={category.id}
                  category={category}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-[#0D1526] text-white border-[#00A3FF]/20">
          <DialogHeader>
            <DialogTitle>
              {selectedCategory ? 'Kategorie bearbeiten' : 'Neue Kategorie'}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title">Titel</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="bg-[#0B1121] border-[#00A3FF]/20 text-white mt-2"
                required
              />
            </div>

            <div>
              <Label htmlFor="age_range">Altersbereich</Label>
              <Input
                id="age_range"
                value={formData.age_range}
                onChange={(e) => setFormData({ ...formData, age_range: e.target.value })}
                className="bg-[#0B1121] border-[#00A3FF]/20 text-white mt-2"
                placeholder="z.B. 5-12 Jahre"
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Beschreibung</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="bg-[#0B1121] border-[#00A3FF]/20 text-white mt-2"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="image_url">Bild-URL</Label>
              <Input
                id="image_url"
                value={formData.image_url}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                className="bg-[#0B1121] border-[#00A3FF]/20 text-white mt-2"
                placeholder="https://..."
              />
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
                className="border-[#00A3FF]/20 text-white hover:bg-[#00A3FF]/10"
              >
                Abbrechen
              </Button>
              <Button
                type="submit"
                className="bg-[#00A3FF] hover:bg-[#0088FF]"
                disabled={isSubmitting}
              >
                {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                {selectedCategory ? 'Aktualisieren' : 'Erstellen'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}