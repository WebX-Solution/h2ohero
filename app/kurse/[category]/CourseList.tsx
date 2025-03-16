'use client';

import { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { Loader2, ArrowLeft, Image as ImageIcon, Link as LinkIcon, Tags, Search, Clock, Calendar, Euro, Users, Info } from 'lucide-react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { toast } from 'sonner';
import { BookingDialog } from '@/components/ui/booking-dialog';
import type { Database } from '@/types/supabase';
import { Card } from '@/components/ui/card';

// Helper function to get category title
function getCategoryTitle(category: string) {
  switch (category) {
    case '2026-2-12':
      return 'Schwimmkurse 2026 (2-12 Jahre)';
    case '2025-5-12':
      return 'Schwimmkurse 2025 (5-12 Jahre)';
    default:
      return 'Schwimmkurse';
  }
}

export type Course = Database['public']['Tables']['courses']['Row'];
export type Category = Database['public']['Tables']['categories']['Row'];

function CourseCard({ course }: { course: Course }) {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isAvailable, setIsAvailable] = useState(!course.sold_out && course.available_slots > 0);

  const handleBookingComplete = () => {
    setIsAvailable(false);
  };
  
  // Validate if course can be booked
  const canBook = course.available_slots > 0 && !course.sold_out;

  return (
    <Card className="group bg-white border-[#002b56]/10 rounded-2xl overflow-hidden hover:shadow-[0_0_30px_rgba(0,43,86,0.1)] transition-all duration-500">
      <div className="relative h-48">
        <Image
          src={course.image_url || 'https://images.unsplash.com/photo-1600965962361-9035dbfd1c50'}
          alt={course.title}
          fill
          className="object-cover"
          loading="lazy"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#002b56] via-[#002b56]/60 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6">
          <h2 className="text-lg font-bold mb-2 line-clamp-2 text-white">{course.title}</h2>
          <div className="flex items-center gap-2 text-white/80">
            <Clock className="w-4 h-4" />
            <span className="text-sm">{course.day}, {course.time}</span>
          </div>
        </div>
      </div>
                
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-[#002b56]/5 rounded-xl p-4">
            <Calendar className="w-5 h-5 text-[#002b56] mb-2" />
            <div className="space-y-1">
              <p className="text-sm text-[#002b56]/60">Zeitraum</p>
              <p className="font-medium text-[#002b56] text-sm">
                {new Date(course.start_date).toLocaleDateString()} - {new Date(course.end_date).toLocaleDateString()}
              </p>
            </div>
          </div>
                      
          <div className="bg-[#002b56]/5 rounded-xl p-4">
            <Euro className="w-5 h-5 text-[#002b56] mb-2" />
            <div className="space-y-1">
              <p className="text-sm text-[#002b56]/60">Preis</p>
              <p className="font-medium text-[#002b56] text-sm">{course.price} Euro</p>
            </div>
          </div>
        </div>
                    
        <div className="bg-[#002b56]/5 rounded-xl p-4">
          <Users className="w-5 h-5 text-[#002b56] mb-2" />
          <div className="space-y-1">
            <p className="text-sm text-[#002b56]/60">Teilnehmer</p>
            <p className="font-medium text-[#002b56] text-sm">Min. {course.min_participants} - Max. {course.max_participants} Personen</p>
          </div>
        </div>
                    
        <div className="bg-[#002b56]/5 rounded-xl p-4">
          <Users className="w-5 h-5 text-[#002b56] mb-2" />
          <div className="space-y-1">
            <p className="text-sm text-[#002b56]/60">Auslastung</p>
            <Progress 
              value={((course.max_participants - course.available_slots) / course.max_participants) * 100} 
              className="h-2 bg-[#002b56]/10"
            />
            <p className="text-xs text-[#002b56]/60 mt-2 text-right">
              {course.available_slots} Plätze verfügbar
            </p>
          </div>
        </div>
                    
        {course.special_note && (
          <div className="flex items-start gap-3 p-4 bg-[#002b56]/5 rounded-xl">
            <Info className="w-5 h-5 text-[#002b56] flex-shrink-0 mt-0.5" />
            <p className="text-sm text-[#002b56]">{course.special_note}</p>
          </div>
        )}
                    
        <Button 
          className={`w-full ${
            canBook 
              ? 'bg-[#002b56] hover:bg-[#002b56]/90 text-white' 
              : 'bg-red-500/10 text-red-500 cursor-not-allowed'
          }`}
          onClick={() => canBook && setIsBookingOpen(true)}
          disabled={!canBook}
        >
          {canBook ? 'Jetzt buchen' : 'Ausgebucht'}
        </Button>

        {canBook && (
          <BookingDialog
            course={course}
            isOpen={isBookingOpen}
            onClose={() => setIsBookingOpen(false)}
            onBookingComplete={handleBookingComplete}
          />
        )}
      </div>
    </Card>
  );
}

export function CourseList({ 
  category,
  initialCourses,
  categoryData
}: {
  category: string;
  initialCourses: Course[];
  categoryData: Category | null;
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [priceFilter, setPriceFilter] = useState('all');
  const [dayFilter, setDayFilter] = useState('all');
  const [courses, setCourses] = useState<Course[]>(initialCourses || []);
  const [loading, setLoading] = useState(true);
  const supabase = createClientComponentClient<Database>();

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      if (!categoryData) return;
      
      try {
        // Fetch courses for the specific category
        const { data: coursesData, error: coursesError } = await supabase
          .from('courses')
          .select('*')
          .eq('category_id', categoryData.id)
          .eq('is_active', true)
          .order('created_at', { ascending: false });

        if (coursesError) throw coursesError;

        if (mounted && coursesData) {
          setCourses(prev => {
            // Only update if data is different
            const currentIds = new Set(prev.map(c => c.id));
            const newCourses = coursesData.filter(c => !currentIds.has(c.id));
            return newCourses.length > 0 ? [...prev, ...newCourses] : prev;
          });
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Fehler beim Laden der Kurse');
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    // Subscribe to course changes for the specific category
    const coursesSubscription = supabase
      .channel('public_courses')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'courses',
          filter: categoryData ? `category_id=eq.${categoryData.id}` : undefined
        }, 
        (payload) => {
          if (!mounted) return;

          if (payload.eventType === 'INSERT') {
            const newCourse = payload.new as Course;
            if (newCourse.category_id === categoryData?.id) {
              setCourses(prev => [newCourse, ...prev]);
            }
          } else if (payload.eventType === 'UPDATE') {
            const updatedCourse = payload.new as Course;
            if (updatedCourse.category_id === categoryData?.id) {
              setCourses(prev => 
                prev.map(course => 
                  course.id === updatedCourse.id ? updatedCourse : course
                )
              );
            }
          } else if (payload.eventType === 'DELETE') {
            setCourses(prev => 
              prev.filter(course => course.id !== payload.old.id)
            );
          }
        }
      )
      .subscribe();

    return () => {
      mounted = false;
      supabase.removeChannel(coursesSubscription);
    };
  }, [supabase, categoryData, initialCourses]);
  
  const filteredCourses = courses?.filter(course => {
    if (!course || !course.title) return false;
    
    const matchesSearch = course.title?.toLowerCase().includes(searchTerm.toLowerCase()) || false;
    const matchesPrice = priceFilter === 'all' || 
      (priceFilter === 'under-120' && course.price <= 120) ||
      (priceFilter === 'over-120' && course.price > 120);
    const matchesDay = dayFilter === 'all' || course.day?.toLowerCase() === dayFilter.toLowerCase();
    
    return matchesSearch && matchesPrice && matchesDay;
  }) || [];

  return (
    <div className="min-h-screen bg-white">
      <div className="relative h-[60vh] min-h-[600px] flex items-center">
        <div className="absolute inset-0 bg-[#002b56]">
          <Image
            src={categoryData?.image_url || 'https://images.unsplash.com/photo-1600965962361-9035dbfd1c50'}
            alt="Swimming Course Hero"
            fill
            className="object-cover opacity-60"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#002b56]/60 via-[#002b56]/80 to-[#002b56]"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-16 pt-32">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6 text-white leading-tight">
              {categoryData?.title || getCategoryTitle(category)}
            </h1>
            {!categoryData && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6">
                <p className="text-red-100">
                  Diese Kategorie existiert nicht oder wurde entfernt. 
                  Bitte wählen Sie eine andere Kategorie oder kontaktieren Sie uns.
                </p>
              </div>
            )}
            <p className="text-xl text-white/90 leading-relaxed mb-8">
              Entdecken Sie unsere verfügbaren Schwimmkurse und wählen Sie den passenden Kurs für Ihr Kind.
              Professionelle Betreuung und moderne Lehrmethoden für optimalen Lernerfolg.
            </p>
            <div className="flex gap-4">
              <Button className="bg-white hover:bg-white/90 text-[#002b56] px-8 py-6 text-lg">
                Jetzt Kurs buchen
              </Button>
              <Button className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-6 text-lg">
                Mehr erfahren
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-16 py-20">
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-4 text-[#002b56]">Verfügbare Kurse</h2>
          <p className="text-[#002b56]/80 text-lg">
            Finden Sie den idealen Kurs für Ihr Kind
          </p>
        </div>
            
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Kurs suchen..."
              className="pl-10 bg-[#002b56]/5 border-[#002b56]/20 text-[#002b56] placeholder:text-[#002b56]/40"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Select value={priceFilter} onValueChange={setPriceFilter}>
            <SelectTrigger className="bg-[#002b56]/5 border-[#002b56]/20 text-[#002b56]">
              <SelectValue placeholder="Preis Filter" />
            </SelectTrigger>
            <SelectContent className="bg-white border-[#002b56]/20">
              <SelectItem value="all" className="text-[#002b56] hover:bg-[#002b56]/5">Alle Preise</SelectItem>
              <SelectItem value="under-120" className="text-[#002b56] hover:bg-[#002b56]/5">Bis 120€</SelectItem>
              <SelectItem value="over-120" className="text-[#002b56] hover:bg-[#002b56]/5">Über 120€</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={dayFilter} onValueChange={setDayFilter}>
            <SelectTrigger className="bg-[#002b56]/5 border-[#002b56]/20 text-[#002b56]">
              <SelectValue placeholder="Tag Filter" />
            </SelectTrigger>
            <SelectContent className="bg-white border-[#002b56]/20">
              <SelectItem value="all" className="text-[#002b56] hover:bg-[#002b56]/5">Alle Tage</SelectItem>
              <SelectItem value="samstags" className="text-[#002b56] hover:bg-[#002b56]/5">Samstags</SelectItem>
              <SelectItem value="sonntags" className="text-[#002b56] hover:bg-[#002b56]/5">Sonntags</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {filteredCourses.length === 0 ? (
          <div className="text-center py-12">
            <Info className="w-12 h-12 text-[#002b56] mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-[#002b56]">Keine Kurse gefunden</h3>
            <p className="text-[#002b56]/60">Bitte passen Sie Ihre Filterkriterien an.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <Suspense key={course.id} fallback={<Skeleton className="h-[600px] w-full" />}>
                <CourseCard course={course} />
              </Suspense>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}