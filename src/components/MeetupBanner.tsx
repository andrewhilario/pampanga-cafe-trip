'use client';

import React from 'react';
import { useTrip } from '@/context/TripContext';

export const MeetupBanner: React.FC = () => {
  const { focusOnSpot } = useTrip();

  return (
    <div className="bg-latte-100/90 border-b border-latte-200 px-3 py-1.5 text-xs text-latte-800">
      <div className="max-w-2xl mx-auto flex items-center justify-between gap-2 overflow-x-auto hide-scrollbar">
        <div className="flex items-center space-x-1.5 shrink-0">
          <span className="flex h-2 w-2 relative shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-terracotta-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-terracotta-500"></span>
          </span>
          <span className="text-[11px] text-latte-800 whitespace-nowrap">
            <strong>Meetup:</strong> Oct 17 @ 9:30 AM • Dau Terminal
          </span>
          <button
            onClick={() => focusOnSpot('dau-terminal')}
            className="text-terracotta-600 hover:text-terracotta-700 font-bold underline text-[10px] transition active:scale-95 ml-0.5"
          >
            Pin
          </button>
        </div>

        <div className="flex items-center space-x-1 shrink-0 bg-purple-100/80 px-2 py-0.5 rounded-full border border-purple-200">
          <span className="text-[11px] text-purple-900 font-bold whitespace-nowrap">
            💜 Her F.R.I.E.N.D.S Cafe:
          </span>
          <button
            onClick={() => focusOnSpot('friends-milk-fridge')}
            className="text-purple-700 hover:text-purple-900 font-bold underline text-[10px] transition active:scale-95"
          >
            Central Perk Pin
          </button>
        </div>
      </div>
    </div>
  );
};
