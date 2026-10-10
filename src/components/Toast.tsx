'use client';

import React from 'react';
import { Check } from 'lucide-react';
import { useTrip } from '@/context/TripContext';

export const Toast: React.FC = () => {
  const { toast } = useTrip();

  return (
    <div
      className={`fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-latte-900 text-white px-4 py-2.5 rounded-full text-xs font-semibold shadow-2xl transition-all duration-300 flex items-center space-x-2 pointer-events-none ${
        toast.visible
          ? 'opacity-100 translate-y-0 scale-100'
          : 'opacity-0 -translate-y-2 scale-95'
      }`}
    >
      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
      <span className="whitespace-nowrap">{toast.message}</span>
    </div>
  );
};
