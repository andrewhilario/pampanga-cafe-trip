'use client';

import React from 'react';
import { useTrip } from '@/context/TripContext';
import { MapFilter } from '@/types';

export const MapFilterBar: React.FC = () => {
  const { mapFilter, setMapFilter, spots } = useTrip();

  const filters: { id: MapFilter; label: string }[] = [
    { id: 'all', label: `All (${spots.length})` },
    { id: 'friends', label: '💜 Her Top Pick (Friends)' },
    { id: 'tiktok', label: '🎵 TikTok Saves (7)' },
    { id: 'day1', label: 'Day 1: Clark & Amsic' },
    { id: 'day2', label: 'Day 2: Mimosa & Eats' },
    { id: 'day3', label: 'Day 3: San Fernando' },
    { id: 'specialty', label: '☕ Specialty Only' },
    { id: 'food', label: '🍖 Heritage Food' },
  ];

  return (
    <div className="absolute top-3 left-3 right-3 z-20 flex flex-col gap-2 pointer-events-none">
      <div className="flex items-center space-x-1.5 overflow-x-auto hide-scrollbar pointer-events-auto bg-latte-50/90 p-1.5 rounded-2xl shadow-lg border border-latte-200/80 backdrop-blur-md">
        {filters.map((f) => {
          const isActive = mapFilter === f.id;
          return (
            <button
              key={f.id}
              onClick={() => setMapFilter(f.id)}
              className={`px-3 py-1 rounded-xl text-xs font-semibold whitespace-nowrap transition duration-150 ${
                isActive
                  ? 'bg-latte-900 text-latte-100 shadow-sm'
                  : 'bg-white text-latte-800 hover:bg-latte-100 border border-latte-200'
              }`}
            >
              {f.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
