'use client';

import { EditCourseForm } from './EditCourseForm';
import { notFound } from 'next/navigation';

export default function EditCoursePage({ params }: { params: { id: string } }) {
  // If the ID is "new", render the EditCourseForm with null course
  if (params.id === 'new') {
    return <EditCourseForm id={null} />;
  }

  return <EditCourseForm id={params.id} />;
}