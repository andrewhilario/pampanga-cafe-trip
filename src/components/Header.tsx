'use client';

import React from 'react';
import { Coffee, Plus, Share2, KeyRound } from 'lucide-react';
import { useTrip } from '@/context/TripContext';

export const Header: React.FC = () => {
  const { setIsAddModalOpen, setIsShareModalOpen, setIsTokenModalOpen, mapboxToken } = useTrip();

  return (
    <header className="sticky top-0 z-30 bg-latte-50/90 backdrop-blur-md border-b border-latte-200/80 px-4 py-3 transition-all duration-300">
      <div className="max-w-2xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <div className="w-9 h-9 rounded-full bg-latte-900 text-latte-100 flex items-center justify-center shadow-md">
            <Coffee className="w-5 h-5 text-terracotta-400" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <h1 className="font-serif text-lg font-bold tracking-tight text-latte-900 leading-tight">
                Kape&apos;t Kwentuhan
              </h1>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-terracotta-500/10 text-terracotta-600 border border-terracotta-500/20">
                Oct 17-19
              </span>
            </div>
            <p className="text-[11px] text-latte-600 font-medium leading-none mt-0.5">
              Pampanga Weekend Getaway
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsTokenModalOpen(true)}
            className={`h-8 px-2.5 rounded-full text-xs font-semibold flex items-center space-x-1 transition active:scale-95 border ${
              mapboxToken
                ? 'bg-latte-100/90 hover:bg-latte-200 text-latte-800 border-latte-300'
                : 'bg-amber-100 text-amber-800 border-amber-300 animate-pulse'
            }`}
            title="Configure Mapbox Token"
          >
            <KeyRound className="w-3.5 h-3.5 text-terracotta-600" />
            <span className="hidden sm:inline">{mapboxToken ? 'Map Key' : 'Add Key'}</span>
          </button>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-2.5 py-1.5 rounded-full bg-latte-200/90 hover:bg-latte-300 text-latte-900 text-xs font-semibold flex items-center space-x-1 transition active:scale-95 border border-latte-300"
          >
            <Plus className="w-3.5 h-3.5 text-terracotta-600" />
            <span className="hidden sm:inline">Add Spot</span>
          </button>

          <button
            onClick={() => setIsShareModalOpen(true)}
            className="w-8 h-8 rounded-full bg-latte-200/80 hover:bg-latte-300 text-latte-800 flex items-center justify-center transition active:scale-95 border border-latte-300"
            title="Trip Info & Share"
          >
            <Share2 className="w-4 h-4 text-latte-700" />
          </button>
        </div>
      </div>
    </header>
  );
};
