'use client';

import React from 'react';
import { useTrip } from '@/context/TripContext';

export const MeetupBanner: React.FC = () => {
  const { focusOnSpot } = useTrip();

  return (
    <div className="bg-latte-100/90 border-b border-latte-200 px-4 py-2 text-xs text-latte-800">
      <div className="max-w-2xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2 truncate">
          <span className="flex h-2 w-2 relative shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-terracotta-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-terracotta-500"></span>
          </span>
          <span className="truncate font-medium">
            <strong>Oct 17 @ 9:30 AM:</strong> Dau Terminal Meetup (Tarlac Bus Arrival)
          </span>
        </div>
        <button
          onClick={() => focusOnSpot('dau-terminal')}
          className="text-terracotta-600 hover:text-terracotta-700 font-bold ml-2 shrink-0 underline text-[11px] transition active:scale-95"
        >
          View Pin
        </button>
      </div>
    </div>
  );
};
