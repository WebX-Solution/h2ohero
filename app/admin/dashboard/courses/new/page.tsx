'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, ArrowLeft } from 'lucide-react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { toast } from 'sonner';
import type { Database } from '@/types/supabase';

type Category = Database['public']['Tables']['categories']['Row'];

export default function NewCoursePage() {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category_id: '',
    start_date: '',
    end_date: '',
    time: '',
    day: '',
    price: '',
    min_participants: '',
    max_participants: '',
    image_url: '',
    special_note: '',
    is_active: true
  });

  const router = useRouter();
  const supabase = createClientComponentClient<Database>();

  // Fetch categories when component mounts
  useState(() => {
    const fetchCategories = async () => {
      const { data } = await supabase
        .from('categories')
        .select('*')
        .order('created_at', { ascending: false });

      if (data) {
        setCategories(data);
      }
    };

    fetchCategories();
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('courses')
        .insert([{
          ...formData,
          price: parseFloat(formData.price),
          min_participants: parseInt(formData.min_participants),
          max_participants: parseInt(formData.max_participants)
        }]);

      if (error) throw error;

      toast.success('Kurs erfolgreich erstellt');
      router.push('/admin/dashboard/courses');
    } catch (error: any) {
      toast.error('Fehler beim Erstellen des Kurses: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-[#002b56]">
      <div className="mb-8">
        <Button
          variant="ghost"
          className="mb-4 text-[#002b56] hover:bg-[#002b56]/5"
          onClick={() => router.push('/admin/dashboard/courses')}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Zurück
        </Button>
        <h1 className="text-2xl font-bold">Neuen Kurs erstellen</h1>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
        <div className="space-y-4">
          <div>
            <Label htmlFor="title">Titel</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
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
              rows={4}
            />
          </div>
          
          <div>
            <Label htmlFor="category">Kategorie</Label>
            <Select
              value={formData.category_id}
              onValueChange={(value) => setFormData({ ...formData, category_id: value })}
            >
              <SelectTrigger className="bg-[#002b56]/5 border-[#002b56]/20 text-[#002b56] mt-2">
                <SelectValue placeholder="Kategorie auswählen" />
              </SelectTrigger>
              <SelectContent className="bg-white border-[#002b56]/20">
                {categories.map((category) => (
                  <SelectItem 
                    key={category.id} 
                    value={category.id}
                    className="text-[#002b56] hover:bg-[#002b56]/5"
                  >
                    {category.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="start_date">Startdatum</Label>
              <Input
                id="start_date"
                type="date"
                value={formData.start_date}
                onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                className="bg-[#002b56]/5 border-[#002b56]/20 text-[#002b56] mt-2"
                required
              />
            </div>
            <div>
              <Label htmlFor="end_date">Enddatum</Label>
              <Input
                id="end_date"
                type="date"
                value={formData.end_date}
                onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                className="bg-[#002b56]/5 border-[#002b56]/20 text-[#002b56] mt-2"
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="time">Zeit</Label>
              <Input
                id="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="bg-[#002b56]/5 border-[#002b56]/20 text-[#002b56] mt-2"
                placeholder="z.B. 14:00 - 15:00"
                required
              />
            </div>
            <div>
              <Label htmlFor="day">Tag</Label>
              <Input
                id="day"
                value={formData.day}
                onChange={(e) => setFormData({ ...formData, day: e.target.value })}
                className="bg-[#002b56]/5 border-[#002b56]/20 text-[#002b56] mt-2"
                placeholder="z.B. Montags"
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="price">Preis (€)</Label>
              <Input
                id="price"
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="bg-[#002b56]/5 border-[#002b56]/20 text-[#002b56] mt-2"
                required
                min="0"
                step="0.01"
              />
            </div>
            <div>
              <Label htmlFor="min_participants">Min. Teilnehmer</Label>
              <Input
                id="min_participants"
                type="number"
                value={formData.min_participants}
                onChange={(e) => setFormData({ ...formData, min_participants: e.target.value })}
                className="bg-[#002b56]/5 border-[#002b56]/20 text-[#002b56] mt-2"
                required
                min="1"
              />
            </div>
            <div>
              <Label htmlFor="max_participants">Max. Teilnehmer</Label>
              <Input
                id="max_participants"
                type="number"
                value={formData.max_participants}
                onChange={(e) => setFormData({ ...formData, max_participants: e.target.value })}
                className="bg-[#002b56]/5 border-[#002b56]/20 text-[#002b56] mt-2"
                required
                min="1"
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="image_url">Bild-URL</Label>
            <Input
              id="image_url"
              value={formData.image_url}
              onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
              className="bg-[#002b56]/5 border-[#002b56]/20 text-[#002b56] mt-2"
              placeholder="https://..."
            />
          </div>
          
          <div>
            <Label htmlFor="special_note">Besondere Hinweise</Label>
            <Textarea
              id="special_note"
              value={formData.special_note}
              onChange={(e) => setFormData({ ...formData, special_note: e.target.value })}
              className="bg-[#002b56]/5 border-[#002b56]/20 text-[#002b56] mt-2"
              rows={2}
            />
          </div>
        </div>
        
        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            className="border-[#002b56]/20 text-[#002b56] hover:bg-[#002b56]/5"
            onClick={() => router.push('/admin/dashboard/courses')}
          >
            Abbrechen
          </Button>
          <Button
            type="submit"
            className="bg-[#002b56] hover:bg-[#002b56]/90 text-white"
            disabled={loading}
          >
            {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            {loading ? 'Erstelle...' : 'Erstellen'}
          </Button>
        </div>
      </form>
    </div>
  );
}