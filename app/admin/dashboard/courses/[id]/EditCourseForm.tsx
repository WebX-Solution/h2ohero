'use client';

import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { useCourseActions } from '@/hooks/use-course-actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, ArrowLeft } from 'lucide-react';
import type { Database } from '@/types/supabase';

type Course = Database['public']['Tables']['courses']['Row'];
type Category = Database['public']['Tables']['categories']['Row'];

export function EditCourseForm({ id }: { id: string | null }) {
  const [course, setCourse] = useState<Course | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();
  const { getCourse, updateCourse, createCourse } = useCourseActions();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch course
        if (id) {
          const data = await getCourse(id);
          setCourse(data);
        } else {
          // Initialize empty course for new creation
          setCourse({
            id: '',
            title: '',
            description: null,
            category_id: '',
            start_date: '',
            end_date: '',
            time: '',
            day: '',
            price: 0,
            min_participants: 0,
            max_participants: 0,
            image_url: null,
            special_note: null,
            is_active: true,
            available_slots: 0,
            sold_out: false,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          });
        }
        
        // Fetch categories
        const { data: categoriesData } = await supabase
          .from('categories')
          .select('*')
          .order('created_at', { ascending: false });

        if (categoriesData) {
          setCategories(categoriesData || []);
        }
      } catch (error) {
        console.error('Error fetching course:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [id, getCourse, supabase, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!course) return;

    setSaving(true);
    try {
      if (id) {
        await updateCourse(course.id, { 
          ...course, 
          updated_at: new Date().toISOString() 
        });
      } else {
        await createCourse(course);
      }
      router.push('/admin/dashboard/courses');
    } catch (error) {
      console.error('Error updating course:', error);
    } finally {
      setSaving(false);
    }
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 text-[#00A3FF] animate-spin" />
      </div>
    );
  }
  
  if (!course) {
    return (
      <div className="text-center text-white">
        <p>Kurs nicht gefunden</p>
        <Button
          className="mt-4"
          onClick={() => router.push('/admin/dashboard/courses')}
        >
          Zurück zur Übersicht
        </Button>
      </div>
    );
  }
  
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
        <h1 className="text-2xl font-bold text-[#002b56]">{id ? 'Kurs bearbeiten' : 'Neuen Kurs erstellen'}</h1>
        <p className="text-[#002b56]/60 mt-2">
          {id ? 'Aktualisieren Sie die Details des ausgewählten Kurses.' : 'Erstellen Sie einen neuen Kurs mit den folgenden Details.'}
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl bg-white rounded-xl border border-[#002b56]/10 p-8">
        <div className="space-y-4">
          <div>
            <Label htmlFor="title">Titel</Label>
            <Input
              id="title"
              value={course.title}
              onChange={(e) => setCourse({ ...course, title: e.target.value })}
              className="bg-[#002b56]/5 border-[#002b56]/20 text-[#002b56] mt-2"
              placeholder="z.B. Anfängerschwimmkurs – Kinder ab 5 Jahren"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="description">Beschreibung</Label>
            <Textarea
              id="description"
              value={course.description || ''}
              onChange={(e) => setCourse({ ...course, description: e.target.value })}
              className="bg-[#002b56]/5 border-[#002b56]/20 text-[#002b56] mt-2"
              placeholder="Beschreiben Sie den Kurs und seine Ziele..."
              rows={4}
            />
          </div>
          
          <div>
            <Label htmlFor="category">Kategorie</Label>
            <Select
              value={course.category_id || ''}
              onValueChange={(value) => setCourse({ ...course, category_id: value })}
              required
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
          
          <div className="bg-[#002b56]/5 p-6 rounded-lg space-y-4">
            <h3 className="font-semibold text-[#002b56]">Zeitplan</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="start_date">Startdatum</Label>
                <Input
                  id="start_date"
                  type="date"
                  value={course.start_date}
                  onChange={(e) => setCourse({ ...course, start_date: e.target.value })}
                  className="bg-white border-[#002b56]/20 text-[#002b56] mt-2"
                  required
                />
              </div>
              <div>
                <Label htmlFor="end_date">Enddatum</Label>
                <Input
                  id="end_date"
                  type="date"
                  value={course.end_date}
                  onChange={(e) => setCourse({ ...course, end_date: e.target.value })}
                  className="bg-white border-[#002b56]/20 text-[#002b56] mt-2"
                  required
                />
              </div>
            </div>
          </div>
          
          <div className="bg-[#002b56]/5 p-6 rounded-lg space-y-4">
            <h3 className="font-semibold text-[#002b56]">Kurszeiten</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="time">Zeit</Label>
                <Input
                  id="time"
                  value={course.time}
                  onChange={(e) => setCourse({ ...course, time: e.target.value })}
                  className="bg-white border-[#002b56]/20 text-[#002b56] mt-2"
                  placeholder="z.B. 14:00 - 15:00"
                  required
                />
              </div>
              <div>
                <Label htmlFor="day">Tag</Label>
                <Input
                  id="day"
                  value={course.day}
                  onChange={(e) => setCourse({ ...course, day: e.target.value })}
                  className="bg-white border-[#002b56]/20 text-[#002b56] mt-2"
                  placeholder="z.B. Montags"
                  required
                />
              </div>
            </div>
          </div>
          
          <div className="bg-[#002b56]/5 p-6 rounded-lg space-y-4">
            <h3 className="font-semibold text-[#002b56]">Teilnehmer & Preis</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="price">Preis (€)</Label>
                <Input
                  id="price"
                  type="number"
                  value={course.price}
                  onChange={(e) => setCourse({ ...course, price: parseFloat(e.target.value) })}
                  className="bg-white border-[#002b56]/20 text-[#002b56] mt-2"
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
                  value={course.min_participants}
                  onChange={(e) => setCourse({ ...course, min_participants: parseInt(e.target.value) })}
                  className="bg-white border-[#002b56]/20 text-[#002b56] mt-2"
                  required
                  min="1"
                />
              </div>
              <div>
                <Label htmlFor="max_participants">Max. Teilnehmer</Label>
                <Input
                  id="max_participants"
                  type="number"
                  value={course.max_participants}
                  onChange={(e) => setCourse({ ...course, max_participants: parseInt(e.target.value) })}
                  className="bg-white border-[#002b56]/20 text-[#002b56] mt-2"
                  required
                  min="1"
                />
              </div>
            </div>
          </div>
          
          <div>
            <Label htmlFor="special_note">Besondere Hinweise</Label>
            <Textarea
              id="special_note"
              value={course.special_note || ''}
              onChange={(e) => setCourse({ ...course, special_note: e.target.value })}
              className="bg-[#002b56]/5 border-[#002b56]/20 text-[#002b56] mt-2"
              placeholder="Optionale Hinweise oder Besonderheiten zum Kurs..."
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
            disabled={saving}
          >
            {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            {saving ? 'Speichern...' : id ? 'Speichern' : 'Erstellen'}
          </Button>
        </div>
      </form>
    </div>
  );
}