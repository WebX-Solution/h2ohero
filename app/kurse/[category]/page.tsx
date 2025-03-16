import { createClient } from '@/lib/supabase';
import { CourseList } from '@/app/kurse/[category]/CourseList';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import type { Database } from '@/types/supabase';

import type { Course, Category } from './CourseList';

const VALID_CATEGORIES = ['2025-5-12', '2026-2-12'];

const getCategoryPattern = (category: string) => {
  const [year] = category.split('-');
  return `%${year}%`;
};

export default async function CoursePage({ params }: { params: { category: string } }) {
  // First validate the category parameter
  if (!VALID_CATEGORIES.includes(params.category)) {
    notFound();
  }

  const supabase = createClient();
  const categoryPattern = getCategoryPattern(params.category);

  // Get category based on the URL parameter and title pattern
  const { data: categories, error: categoryError } = await supabase
    .from('categories')
    .select('*')
    .ilike('title', categoryPattern)
    .limit(1);

  if (categoryError) {
    console.error('Category error:', categoryError);
    notFound();
  }

  if (!categories || categories.length === 0) {
    notFound();
  }

  const selectedCategory = categories[0];

  // Get all active courses for this category
  const { data: courses, error: coursesError } = await supabase
    .from('courses')
    .select('*')
    .eq('category_id', selectedCategory.id)
    .eq('is_active', true)
    .order('created_at', { ascending: false });

  if (coursesError) {
    console.error('Courses error:', coursesError);
    notFound();
  }

  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="w-8 h-8 text-[#002b56] animate-spin" />
      </div>
    }>
      <CourseList
        category={params.category} 
        initialCourses={courses || []} 
        categoryData={selectedCategory} 
      />
    </Suspense>
  );
}