'use client';

import React from 'react';
import { X, Sparkles, Clock, Heart, CheckCircle, Compass, Navigation, Plus, Video } from 'lucide-react';
import { useTrip } from '@/context/TripContext';

export const SpotDetailSheet: React.FC = () => {
  const {
    selectedSpot,
    setSelectedSpot,
    favorites,
    toggleFavorite,
    visited,
    toggleVisited,
    addSpotToItinerary,
  } = useTrip();

  if (!selectedSpot) return null;

  const isFav = !!favorites[selectedSpot.id];
  const isVisited = !!visited[selectedSpot.id];
  const isFriends = selectedSpot.isTopSpot || selectedSpot.tags?.includes('friends');

  let badgeText = 'Day 1';
  let badgeClass = 'bg-[#C86446] text-white';

  if (isFriends) {
    badgeText = 'Top Pick 💜 F.R.I.E.N.D.S';
    badgeClass = 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md';
  } else if (selectedSpot.id === 'dau-terminal') {
    badgeText = 'Pickup Point';
    badgeClass = 'bg-[#2C1810] text-[#FDFBF7]';
  } else if (selectedSpot.day === 'day2') {
    badgeText = 'Day 2';
    badgeClass = 'bg-[#54755B] text-white';
  } else if (selectedSpot.day === 'day3') {
    badgeText = 'Day 3';
    badgeClass = 'bg-[#D4973B] text-white';
  } else if (selectedSpot.day === 'wishlist') {
    badgeText = 'Wishlist';
    badgeClass = 'bg-[#8E44AD] text-white';
  }

  return (
    <div
      className={`absolute bottom-2 left-2 right-2 z-30 bg-[#FDFBF7] rounded-3xl p-4 shadow-2xl border-2 ${
        isFriends ? 'border-purple-400 ring-2 ring-purple-300/50' : 'border-latte-300'
      } animate-in slide-in-from-bottom duration-200`}
    >
      <div className="flex items-center justify-between pb-2 border-b border-latte-200">
        <div className="flex items-center space-x-2">
          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${badgeClass} shadow-sm`}>
            {badgeText}
          </span>
          <span className="text-xs text-latte-700 font-semibold truncate">
            {selectedSpot.category}
          </span>
        </div>
        <button
          onClick={() => setSelectedSpot(null)}
          className="p-1.5 rounded-full text-latte-600 hover:text-latte-900 hover:bg-latte-200 transition"
          aria-label="Close details"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="pt-3 flex gap-3">
        <div className="w-20 h-20 rounded-2xl overflow-hidden bg-latte-200 shrink-0 relative shadow-sm border border-latte-200">
          <img
            src={selectedSpot.photo}
            alt={selectedSpot.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          {isFriends && (
            <span className="absolute bottom-1 right-1 bg-purple-700/90 text-yellow-300 text-[10px] px-1 rounded font-bold">
              🛋️ FRIENDS
            </span>
          )}
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

      {/* Quick 1-Click Itinerary Integration */}
      <div className="mt-2.5 pt-2 border-t border-latte-100 flex items-center justify-between text-xs">
        <span className="text-[11px] font-semibold text-latte-600 flex items-center gap-1">
          <Plus className="w-3 h-3 text-terracotta-500" />
          <span>Add to Itinerary:</span>
        </span>
        <div className="flex items-center space-x-1.5">
          <button
            onClick={() => addSpotToItinerary(selectedSpot.id, 1)}
            className="px-2 py-1 rounded-lg bg-latte-200 hover:bg-terracotta-100 hover:text-terracotta-700 text-latte-800 text-[10px] font-bold transition active:scale-95"
            title="Add to Day 1 schedule"
          >
            + Day 1
          </button>
          <button
            onClick={() => addSpotToItinerary(selectedSpot.id, 2)}
            className="px-2 py-1 rounded-lg bg-latte-200 hover:bg-sage-100 hover:text-sage-700 text-latte-800 text-[10px] font-bold transition active:scale-95"
            title="Add to Day 2 schedule"
          >
            + Day 2
          </button>
          <button
            onClick={() => addSpotToItinerary(selectedSpot.id, 3)}
            className="px-2 py-1 rounded-lg bg-latte-200 hover:bg-mustard-100 hover:text-mustard-700 text-latte-800 text-[10px] font-bold transition active:scale-95"
            title="Add to Day 3 schedule"
          >
            + Day 3
          </button>
        </div>
      </div>

      <div className="mt-2.5 pt-2 border-t border-latte-200 flex items-center justify-between gap-2">
        <div className="flex items-center space-x-1.5">
          <button
            onClick={() => toggleFavorite(selectedSpot.id)}
            className="p-2 rounded-xl border border-latte-300 bg-white text-latte-700 hover:text-terracotta-500 active:scale-95 transition shadow-sm"
            title="Wishlist"
          >
            <Heart
              className={`w-4 h-4 ${isFav ? 'text-terracotta-500 fill-terracotta-500' : 'text-latte-700'}`}
            />
          </button>
          <button
            onClick={() => toggleVisited(selectedSpot.id)}
            className="px-2.5 py-1.5 rounded-xl text-xs font-semibold border border-latte-300 bg-white text-latte-700 hover:bg-latte-100 active:scale-95 transition flex items-center gap-1 shadow-sm"
          >
            <CheckCircle className={`w-3.5 h-3.5 ${isVisited ? 'text-sage-600 fill-sage-100' : 'text-latte-400'}`} />
            <span className={isVisited ? 'text-sage-600 font-bold text-[11px]' : 'text-latte-700 text-[11px]'}>
              {isVisited ? 'Visited ✓' : 'Visited?'}
            </span>
          </button>
          {selectedSpot.tiktokUrl && (
            <a
              href={selectedSpot.tiktokUrl}
              target="_blank"
              rel="noreferrer"
              className="px-2.5 py-1.5 rounded-xl text-[11px] font-bold bg-slate-900 text-white hover:bg-slate-800 active:scale-95 transition flex items-center gap-1 shadow-sm"
              title="Watch saved TikTok video"
            >
              <Video className="w-3.5 h-3.5 text-pink-400" />
              <span>TikTok</span>
            </a>
          )}
        </div>

        <div className="flex items-center space-x-1.5">
          <a
            href={selectedSpot.wazeUrl}
            target="_blank"
            rel="noreferrer"
            className="px-2.5 py-1.5 rounded-xl text-xs font-bold bg-latte-200 text-latte-800 hover:bg-latte-300 active:scale-95 transition flex items-center gap-1 border border-latte-300"
          >
            <Compass className="w-3.5 h-3.5 text-latte-700" />
            <span>Waze</span>
          </a>
          <a
            href={selectedSpot.mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="px-3 py-1.5 rounded-xl text-xs font-bold bg-terracotta-500 text-white shadow-md hover:bg-terracotta-600 active:scale-95 transition flex items-center gap-1"
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>Maps</span>
          </a>
        </div>
      </div>
    </div>
  );
};
