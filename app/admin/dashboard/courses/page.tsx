'use client';

import { useState, useCallback, useMemo, memo } from 'react';
import { useRouter } from 'next/navigation';
import { useCourses } from '@/hooks/use-courses';
import { useCourseActions } from '@/hooks/use-course-actions';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import {
  Loader2,
  Search,
  Eye,
  Plus,
  Pencil,
  Trash2,
  AlertCircle
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import type { Database } from '@/types/supabase';

type Course = Database['public']['Tables']['courses']['Row'];

// Loading skeleton component
const CourseTableSkeleton = memo(() => (
  <div className="space-y-3">
    {[...Array(5)].map((_, i) => (
      <div key={i} className="flex gap-4">
        <Skeleton className="h-12 w-full bg-[#0D1526]" />
      </div>
    ))}
  </div>
));

CourseTableSkeleton.displayName = 'CourseTableSkeleton';

interface CourseRowProps {
  course: Course;
  onView: (course: Course) => void;
  onEdit: (course: Course) => void;
  onDelete: (course: Course) => void;
  onToggleStatus: (course: Course) => void;
}

const CourseRow = memo(({ course, onView, onEdit, onDelete, onToggleStatus }: CourseRowProps) => {
  return (
    <TableRow className="border-[#00A3FF]/20">
      <TableCell className="text-[#002b56] max-w-[200px] truncate">{course.title}</TableCell>
      <TableCell className="text-[#002b56]">
        {new Date(course.start_date).toLocaleDateString()} - {new Date(course.end_date).toLocaleDateString()}
      </TableCell>
      <TableCell className="text-[#002b56]">{course.time}</TableCell>
      <TableCell className="text-[#002b56]">{course.day}</TableCell>
      <TableCell className="text-[#002b56]">{course.min_participants}/{course.max_participants}</TableCell>
      <TableCell>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onToggleStatus(course)}
          className={`px-2 py-1 rounded-full ${
            course.is_active 
              ? 'bg-green-500/20 text-green-500 hover:bg-green-500/30' 
              : 'bg-red-500/20 text-red-500 hover:bg-red-500/30'
          } text-sm`}
        >
          {course.is_active ? 'Aktiv' : 'Inaktiv'}
        </Button>
      </TableCell>
      <TableCell className="text-white">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="hover:bg-[#00A3FF]/10"
            onClick={() => onView(course)}
          >
            <Eye className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="hover:bg-[#00A3FF]/10"
            onClick={() => onEdit(course)}
          >
            <Pencil className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="hover:bg-red-500/10 text-red-500"
            onClick={() => onDelete(course)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
});

CourseRow.displayName = 'CourseRow';

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { courses, loading, error } = useCourses(searchTerm);
  const { deleteCourse, updateCourse } = useCourseActions();

  const handleDelete = useCallback((course: Course) => {
    setSelectedCourse(course);
    setIsDeleteDialogOpen(true);
  }, []);

  const handleEdit = useCallback((course: Course) => {
    router.push(`/admin/dashboard/courses/${course.id}`);
  }, [router]);

  const handleView = useCallback((course: Course) => {
    setSelectedCourse(course);
    setIsViewDialogOpen(true);
  }, []);

  const confirmDelete = useCallback(async () => {
    if (!selectedCourse) return;
    
    setIsLoading(true);
    try {
      await deleteCourse(selectedCourse.id);
      toast.success('Kurs erfolgreich gelöscht');
    } catch (error) {
      console.error('Error deleting course:', error);
      toast.error('Fehler beim Löschen des Kurses');
    } finally {
      setIsLoading(false);
      setIsDeleteDialogOpen(false);
      setSelectedCourse(null);
    }
  }, [selectedCourse, deleteCourse]);

  const toggleCourseStatus = useCallback(async (course: Course) => {
    setIsLoading(true);
    try {
      await updateCourse(course.id, { is_active: !course.is_active });
      toast.success(`Kurs wurde ${course.is_active ? 'deaktiviert' : 'aktiviert'}`);
    } catch (error) {
      console.error('Error updating course status:', error);
      toast.error('Fehler beim Aktualisieren des Kursstatus');
    } finally {
      setIsLoading(false);
    }
  }, [updateCourse]);

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);

  const tableRows = useMemo(() => {
    if (loading) {
      return (
        <TableRow>
          <TableCell colSpan={7}>
            <CourseTableSkeleton />
          </TableCell>
        </TableRow>
      );
    }

    if (error) {
      return (
        <TableRow>
          <TableCell colSpan={7} className="text-center text-red-500">
            {error}
          </TableCell>
        </TableRow>
      );
    }

    if (courses.length === 0) {
      return (
        <TableRow>
          <TableCell colSpan={7} className="text-center text-gray-400">
            Keine Kurse gefunden
          </TableCell>
        </TableRow>
      );
    }

    return courses.map((course) => (
      <CourseRow
        key={course.id}
        course={course}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onToggleStatus={toggleCourseStatus}
      />
    ));
  }, [courses, loading, error, handleView, handleEdit, handleDelete, toggleCourseStatus]);

  // Memoize dialog content
  const dialogContent = useMemo(() => selectedCourse && (
    <div className="space-y-4">
      <div className="grid gap-4">
        <div>
          <Label>Titel</Label>
          <p className="mt-1">{selectedCourse.title}</p>
        </div>
        <div>
          <Label>Beschreibung</Label>
          <p className="mt-1">{selectedCourse.description}</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Startdatum</Label>
            <p className="mt-1">{new Date(selectedCourse.start_date).toLocaleDateString()}</p>
          </div>
          <div>
            <Label>Enddatum</Label>
            <p className="mt-1">{new Date(selectedCourse.end_date).toLocaleDateString()}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Zeit</Label>
            <p className="mt-1">{selectedCourse.time}</p>
          </div>
          <div>
            <Label>Tag</Label>
            <p className="mt-1">{selectedCourse.day}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Min. Teilnehmer</Label>
            <p className="mt-1">{selectedCourse.min_participants}</p>
          </div>
          <div>
            <Label>Max. Teilnehmer</Label>
            <p className="mt-1">{selectedCourse.max_participants}</p>
          </div>
        </div>
        <div>
          <Label>Preis</Label>
          <p className="mt-1">{selectedCourse.price}€</p>
        </div>
        {selectedCourse.special_note && (
          <div>
            <Label>Besondere Hinweise</Label>
            <p className="mt-1">{selectedCourse.special_note}</p>
          </div>
        )}
      </div>
    </div>
  ), [selectedCourse]);

  const handleCreateNew = useCallback(() => {
    router.push('/admin/dashboard/courses/new');
  }, [router]);

  return (
    <div className="text-[#002b56]">
      <div className="mb-8 text-[#002b56]">
        <h1 className="text-2xl font-bold mb-2 text-[#002b56]">Kurse</h1>
        <p className="text-[#002b56]/60">Verwalten Sie alle Schwimmkurse an einem Ort.</p>
      </div>

      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#002b56]/40 w-5 h-5" />
          <Input
            placeholder="Suche nach Kursen..."
            className="pl-10 bg-[#002b56]/5 border-[#002b56]/20 text-[#002b56] placeholder:text-[#002b56]/40"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <Button 
          className="bg-[#00A3FF] hover:bg-[#0088FF]"
          onClick={handleCreateNew}
        >
          <Plus className="w-4 h-4 mr-2" />
          Neuer Kurs
        </Button>
      </div>

      <div className="rounded-lg border border-[#00A3FF]/20 overflow-hidden">
        <Table>
          <TableHeader className="bg-[#0D1526]">
            <TableRow>
              <TableHead className="text-white">Kurs</TableHead>
              <TableHead className="text-white">Zeitraum</TableHead>
              <TableHead className="text-white">Zeit</TableHead>
              <TableHead className="text-white">Tag</TableHead>
              <TableHead className="text-white">Teilnehmer</TableHead>
              <TableHead className="text-white">Status</TableHead>
              <TableHead className="text-white">Aktionen</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableRows}
          </TableBody>
        </Table>
      </div>

      {/* View Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="bg-[#0D1526] text-white border-[#00A3FF]/20">
          <DialogHeader>
            <DialogTitle>Kursdetails</DialogTitle>
          </DialogHeader>
          {dialogContent}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent className="bg-[#0D1526] text-white border-[#00A3FF]/20">
          <AlertDialogHeader>
            <AlertDialogTitle>Kurs löschen</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              Sind Sie sicher, dass Sie diesen Kurs löschen möchten? Diese Aktion kann nicht rückgängig gemacht werden.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-transparent border-[#00A3FF]/20 text-white hover:bg-[#00A3FF]/10">
              Abbrechen
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-500 hover:bg-red-600"
              onClick={confirmDelete}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Löschen...
                </>
              ) : (
                'Löschen'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}