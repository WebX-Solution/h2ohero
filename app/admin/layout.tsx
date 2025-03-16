import { AdminAuthProvider } from './AdminAuthProvider';
import { Suspense } from 'react';
import { headers } from 'next/headers';
import LoadingSpinner from '@/components/ui/loading-spinner';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white">
      <AdminAuthProvider>
        <Suspense fallback={<LoadingSpinner message="Laden..." />}>
          <div suppressHydrationWarning>
            <main>{children}</main>
          </div>
        </Suspense>
      </AdminAuthProvider>
    </div>
  );
}