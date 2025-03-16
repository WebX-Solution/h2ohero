'use client';

import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  message?: string;
}

export default function LoadingSpinner({ message }: LoadingSpinnerProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <Loader2 className="w-8 h-8 text-[#002b56] animate-spin mx-auto mb-4" />
        {message && (
          <p className="text-[#002b56]/60">{message}</p>
        )}
      </div>
    </div>
  );
}