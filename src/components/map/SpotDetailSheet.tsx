'use client';

import React from 'react';
import { X, Sparkles, Clock, Heart, CheckCircle, Compass, Navigation } from 'lucide-react';
import { useTrip } from '@/context/TripContext';

export const SpotDetailSheet: React.FC = () => {
  const { selectedSpot, setSelectedSpot, favorites, toggleFavorite, visited, toggleVisited } = useTrip();

  if (!selectedSpot) return null;

  const isFav = !!favorites[selectedSpot.id];
  const isVisited = !!visited[selectedSpot.id];

  let badgeText = 'Day 1';
  let badgeClass = 'bg-terracotta-100 text-terracotta-600';

  if (selectedSpot.id === 'dau-terminal') {
    badgeText = 'Pickup Point';
    badgeClass = 'bg-latte-900 text-latte-100';
  } else if (selectedSpot.day === 'day2') {
    badgeText = 'Day 2';
    badgeClass = 'bg-emerald-100 text-emerald-700';
  } else if (selectedSpot.day === 'day3') {
    badgeText = 'Day 3';
    badgeClass = 'bg-amber-100 text-amber-700';
  } else if (selectedSpot.day === 'wishlist') {
    badgeText = 'Wishlist';
    badgeClass = 'bg-purple-100 text-purple-700';
  }

  return (
    <div className="absolute bottom-2 left-2 right-2 z-30 bg-latte-50 rounded-3xl p-4 shadow-drawer border border-latte-300 animate-in slide-in-from-bottom duration-200">
      <div className="flex items-center justify-between pb-2 border-b border-latte-200">
        <div className="flex items-center space-x-2">
          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${badgeClass}`}>
            {badgeText}
          </span>
          <span className="text-xs text-latte-600 font-medium">
            {selectedSpot.category}
          </span>
        </div>
        <button
          onClick={() => setSelectedSpot(null)}
          className="p-1 rounded-full text-latte-500 hover:bg-latte-200 transition"
          aria-label="Close details"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="pt-3 flex gap-3">
        <div className="w-20 h-20 rounded-2xl overflow-hidden bg-latte-200 shrink-0 relative shadow-sm">
          <img
            src={selectedSpot.photo}
            alt={selectedSpot.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-serif font-bold text-base text-latte-900 truncate">
            {selectedSpot.name}
          </h3>
          <p className="text-xs text-latte-600 truncate flex items-center gap-1 mt-0.5">
            <Sparkles className="w-3 h-3 text-terracotta-500 shrink-0" />
            <span className="truncate">{selectedSpot.vibe}</span>
          </p>
          <p className="text-xs text-terracotta-600 font-semibold mt-1 truncate">
            Must-try: {selectedSpot.mustOrder}
          </p>
          <p className="text-[11px] text-latte-500 mt-0.5 flex items-center gap-1">
            <Clock className="w-3 h-3 shrink-0" />
            <span>{selectedSpot.hours}</span>
          </p>
        </div>
      </div>

      <div className="mt-3.5 pt-3 border-t border-latte-200/80 flex items-center justify-between gap-2">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => toggleFavorite(selectedSpot.id)}
            className="p-2.5 rounded-xl border border-latte-300 bg-white text-latte-700 hover:text-terracotta-500 active:scale-95 transition"
            title="Wishlist"
          >
            <Heart
              className={`w-4 h-4 ${isFav ? 'text-terracotta-500 fill-terracotta-500' : 'text-latte-700'}`}
            />
          </button>
          <button
            onClick={() => toggleVisited(selectedSpot.id)}
            className="px-3 py-2 rounded-xl text-xs font-semibold border border-latte-300 bg-white text-latte-700 hover:bg-latte-100 active:scale-95 transition flex items-center gap-1.5"
          >
            <CheckCircle className={`w-4 h-4 ${isVisited ? 'text-sage-600 fill-sage-100' : 'text-latte-400'}`} />
            <span className={isVisited ? 'text-sage-600 font-bold' : 'text-latte-700'}>
              {isVisited ? 'Visited ✓' : 'Visited?'}
            </span>
          </button>
        </div>

        <div className="flex items-center space-x-2">
          <a
            href={selectedSpot.wazeUrl}
            target="_blank"
            rel="noreferrer"
            className="px-3 py-2 rounded-xl text-xs font-bold bg-latte-200 text-latte-800 hover:bg-latte-300 active:scale-95 transition flex items-center gap-1"
          >
            <Compass className="w-3.5 h-3.5 text-latte-700" />
            <span>Waze</span>
          </a>
          <a
            href={selectedSpot.mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="px-3.5 py-2 rounded-xl text-xs font-bold bg-terracotta-500 text-white shadow-md hover:bg-terracotta-600 active:scale-95 transition flex items-center gap-1"
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>Directions</span>
          </a>
        </div>
      </div>
    </div>
  );
};
