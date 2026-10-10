'use client';

import React, { useMemo } from 'react';
import { Search, Heart, Clock, MapPin, Navigation, Video, Plus, Sparkles } from 'lucide-react';
import { useTrip } from '@/context/TripContext';
import { CatalogTag } from '@/types';

export const CafeCatalogView: React.FC = () => {
  const {
    spots,
    catalogTag,
    setCatalogTag,
    searchQuery,
    setSearchQuery,
    favorites,
    toggleFavorite,
    visited,
    focusOnSpot,
    addSpotToItinerary,
  } = useTrip();

  const tags: { id: CatalogTag; label: string }[] = [
    { id: 'all', label: 'All Spots' },
    { id: 'friends', label: '💜 Her Top Pick (Friends)' },
    { id: 'tiktok', label: '🎵 TikTok Saves (7)' },
    { id: 'clark', label: 'Clark Freeport' },
    { id: 'angeles', label: 'Angeles City' },
    { id: 'sanfernando', label: 'San Fernando' },
    { id: 'heritage', label: 'Heritage Food' },
  ];

  const friendsSpot = useMemo(() => {
    return spots.find((s) => s.isTopSpot || s.tags?.includes('friends'));
  }, [spots]);

  const filteredSpots = useMemo(() => {
    let result = spots;

    if (catalogTag === 'friends') {
      result = result.filter((s) => s.isTopSpot || s.tags?.includes('friends'));
    } else if (catalogTag === 'tiktok') {
      result = result.filter((s) => s.tags && s.tags.includes('tiktok'));
    } else if (catalogTag === 'clark') {
      result = result.filter((s) => s.tags && s.tags.includes('clark'));
    } else if (catalogTag === 'angeles') {
      result = result.filter((s) => s.tags && s.tags.includes('angeles'));
    } else if (catalogTag === 'sanfernando') {
      result = result.filter((s) => s.tags && s.tags.includes('sanfernando'));
    } else if (catalogTag === 'heritage') {
      result = result.filter((s) => s.type === 'heritage');
    }

    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.category.toLowerCase().includes(q) ||
          s.vibe.toLowerCase().includes(q) ||
          s.mustOrder.toLowerCase().includes(q) ||
          s.area.toLowerCase().includes(q)
      );
    }

    return result;
  }, [spots, catalogTag, searchQuery]);

  return (
    <section className="px-4 py-4 space-y-4">
      {/* Search & Category Filters */}
      <div className="space-y-2.5">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-latte-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search coffee, sisig, pastry, or area..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-latte-300 text-sm focus:outline-none focus:ring-2 focus:ring-terracotta-400 text-latte-900 shadow-sm placeholder:text-latte-400"
          />
        </div>

        <div className="flex items-center space-x-1.5 overflow-x-auto hide-scrollbar pb-1">
          {tags.map((tag) => {
            const isActive = catalogTag === tag.id;
            return (
              <button
                key={tag.id}
                onClick={() => setCatalogTag(tag.id)}
                className={`px-3 py-1 rounded-xl text-xs font-semibold whitespace-nowrap transition duration-150 ${
                  isActive
                    ? 'bg-latte-900 text-latte-100 shadow-sm'
                    : 'bg-white text-latte-800 hover:bg-latte-100 border border-latte-200'
                }`}
              >
                {tag.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* FEATURED HERO: HER TOP PICK (F.R.I.E.N.D.S CAFE) */}
      {friendsSpot && catalogTag === 'all' && searchQuery.trim() === '' && (
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-900 via-indigo-950 to-[#2C1810] text-white p-4 shadow-xl border-2 border-purple-400/50">
          <div className="flex items-center justify-between mb-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider bg-yellow-400 text-purple-950 shadow-sm uppercase">
              <Sparkles className="w-3 h-3" /> Her Favorite Series • Top Spot
            </span>
            <span className="text-[11px] font-semibold text-purple-200">
              Sindalan, San Fernando
            </span>
          </div>

          <div className="flex gap-3 mt-2">
            <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0 border border-purple-400/40 relative shadow-inner">
              <img
                src={friendsSpot.photo}
                alt={friendsSpot.name}
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-1 right-1 bg-black/70 text-yellow-300 text-[9px] px-1 rounded font-bold">
                🛋️ Central Perk
              </span>
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="font-serif font-bold text-base text-yellow-200 leading-tight">
                {friendsSpot.name}
              </h3>
              <p className="text-xs text-purple-100 mt-1 line-clamp-2 leading-relaxed">
                {friendsSpot.vibe}
              </p>
              <p className="text-[11px] text-pink-300 font-semibold mt-1 truncate">
                Must-try: {friendsSpot.mustOrder}
              </p>
            </div>
          </div>

          <div className="mt-3 pt-2.5 border-t border-purple-800/80 flex items-center justify-between flex-wrap gap-2 text-xs">
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => focusOnSpot(friendsSpot.id)}
                className="px-2.5 py-1.5 rounded-xl bg-purple-700/80 hover:bg-purple-600 text-white font-bold text-[11px] flex items-center gap-1 transition active:scale-95 border border-purple-500/50 shadow-sm"
              >
                <MapPin className="w-3 h-3 text-yellow-300" />
                <span>View on Map</span>
              </button>
              {friendsSpot.tiktokUrl && (
                <a
                  href={friendsSpot.tiktokUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-2.5 py-1.5 rounded-xl bg-black/60 hover:bg-black/80 text-pink-300 font-bold text-[11px] flex items-center gap-1 transition active:scale-95 border border-pink-500/40 shadow-sm"
                >
                  <Video className="w-3 h-3" />
                  <span>TikTok Video</span>
                </a>
              )}
            </div>

            <div className="flex items-center gap-1">
              <span className="text-[10px] text-purple-200 font-semibold mr-1">Pin to:</span>
              <button
                onClick={() => addSpotToItinerary(friendsSpot.id, 1)}
                className="px-2 py-1 rounded-lg bg-white/20 hover:bg-white/30 text-white text-[10px] font-bold transition active:scale-95"
              >
                + Day 1
              </button>
              <button
                onClick={() => addSpotToItinerary(friendsSpot.id, 2)}
                className="px-2 py-1 rounded-lg bg-white/20 hover:bg-white/30 text-white text-[10px] font-bold transition active:scale-95"
              >
                + Day 2
              </button>
              <button
                onClick={() => addSpotToItinerary(friendsSpot.id, 3)}
                className="px-2 py-1 rounded-lg bg-yellow-400 hover:bg-yellow-300 text-purple-950 text-[10px] font-bold transition active:scale-95 shadow-sm"
              >
                + Day 3 (Recommended)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Spots Grid */}
      <div className="space-y-3.5">
        {filteredSpots.length === 0 ? (
          <div className="p-8 text-center text-latte-500 text-xs bg-white rounded-2xl border border-latte-200">
            No coffee or food spots match your search.
          </div>
        ) : (
          filteredSpots.map((spot) => {
            const isFav = !!favorites[spot.id];
            const isVisited = !!visited[spot.id];
            const isFriends = spot.isTopSpot || spot.tags?.includes('friends');
            const isTikTok = spot.tags?.includes('tiktok');

            let dayBadgeColor = 'bg-[#C86446] text-white';
            let dayText = 'Day 1';

            if (isFriends) {
              dayBadgeColor = 'bg-gradient-to-r from-purple-600 to-pink-600 text-white';
              dayText = 'Her Top Pick 💜';
            } else if (spot.id === 'dau-terminal') {
              dayBadgeColor = 'bg-[#2C1810] text-[#FDFBF7]';
              dayText = 'Pickup';
            } else if (spot.day === 'day2') {
              dayBadgeColor = 'bg-[#54755B] text-white';
              dayText = 'Day 2';
            } else if (spot.day === 'day3') {
              dayBadgeColor = 'bg-[#D4973B] text-white';
              dayText = 'Day 3';
            } else if (spot.day === 'wishlist') {
              dayBadgeColor = 'bg-[#8E44AD] text-white';
              dayText = 'Wishlist';
            }

            return (
              <div
                key={spot.id}
                className={`bg-white rounded-3xl p-3.5 border ${
                  isFriends ? 'border-purple-400 ring-2 ring-purple-200 shadow-md' : 'border-latte-200'
                } shadow-sm hover:shadow-md transition flex flex-col justify-between space-y-3`}
              >
                <div className="flex gap-3">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden bg-latte-200 shrink-0 relative shadow-inner">
                    <img
                      src={spot.photo}
                      alt={spot.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    {isVisited && (
                      <span className="absolute top-1 left-1 bg-sage-600 text-white text-[9px] px-1.5 py-0.5 rounded-full font-bold shadow-sm">
                        Visited
                      </span>
                    )}
                    {isTikTok && !isFriends && (
                      <span className="absolute bottom-1 right-1 bg-black/75 text-pink-400 text-[9px] px-1 rounded font-bold">
                        🎵 TikTok
                      </span>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${dayBadgeColor}`}>
                          {dayText}
                        </span>
                        {isTikTok && !isFriends && (
                          <span className="text-[9px] font-bold px-1.5 py-0.2 bg-slate-100 text-slate-700 rounded-md border border-slate-200">
                            Saved on TikTok
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => toggleFavorite(spot.id)}
                        className="text-latte-400 hover:text-terracotta-500 transition p-1 active:scale-90"
                        title="Add to wishlist"
                      >
                        <Heart
                          className={`w-4 h-4 ${
                            isFav ? 'text-terracotta-500 fill-terracotta-500' : 'text-latte-400'
                          }`}
                        />
                      </button>
                    </div>

                    <h4 className="font-serif font-bold text-sm text-latte-900 mt-1 truncate">
                      {spot.name}
                    </h4>
                    <p className="text-[11px] text-latte-500 truncate">
                      {spot.area} • {spot.category}
                    </p>
                    <p className="text-[11px] text-terracotta-600 font-semibold mt-1 truncate">
                      ✨ {spot.mustOrder}
                    </p>
                  </div>
                </div>

                {/* 1-Click Itinerary Quick Action */}
                <div className="pt-2 border-t border-latte-100 flex items-center justify-between text-xs">
                  <span className="text-[10px] font-semibold text-latte-500 flex items-center gap-0.5">
                    <Plus className="w-3 h-3 text-terracotta-500" />
                    <span>Add to:</span>
                  </span>
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => addSpotToItinerary(spot.id, 1)}
                      className="px-2 py-0.5 rounded-md bg-latte-100 hover:bg-terracotta-100 hover:text-terracotta-700 text-latte-700 text-[10px] font-bold transition active:scale-95"
                      title="Add to Day 1"
                    >
                      Day 1
                    </button>
                    <button
                      onClick={() => addSpotToItinerary(spot.id, 2)}
                      className="px-2 py-0.5 rounded-md bg-latte-100 hover:bg-sage-100 hover:text-sage-700 text-latte-700 text-[10px] font-bold transition active:scale-95"
                      title="Add to Day 2"
                    >
                      Day 2
                    </button>
                    <button
                      onClick={() => addSpotToItinerary(spot.id, 3)}
                      className="px-2 py-0.5 rounded-md bg-latte-100 hover:bg-mustard-100 hover:text-mustard-700 text-latte-700 text-[10px] font-bold transition active:scale-95"
                      title="Add to Day 3"
                    >
                      Day 3
                    </button>
                  </div>
                </div>

                <div className="pt-2 border-t border-latte-100 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-latte-400 flex items-center gap-1 truncate max-w-[140px]">
                    <Clock className="w-3 h-3 text-latte-400 shrink-0" />
                    <span className="truncate">{spot.hours}</span>
                  </span>

                  <div className="flex items-center space-x-1.5 shrink-0">
                    {spot.tiktokUrl && (
                      <a
                        href={spot.tiktokUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-2 py-1 rounded-xl bg-slate-900 hover:bg-slate-800 text-pink-400 font-bold text-[10px] flex items-center gap-1 transition active:scale-95 shadow-sm"
                        title="Watch TikTok video"
                      >
                        <Video className="w-3 h-3" />
                        <span>TikTok</span>
                      </a>
                    )}
                    <button
                      onClick={() => focusOnSpot(spot.id)}
                      className="px-2.5 py-1 rounded-xl bg-latte-100 hover:bg-latte-200 text-latte-800 font-medium text-[11px] flex items-center gap-1 transition active:scale-95"
                    >
                      <MapPin className="w-3 h-3 text-terracotta-500" />
                      <span>Pin</span>
                    </button>
                    <a
                      href={spot.mapsUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-2.5 py-1 rounded-xl bg-terracotta-50 hover:bg-terracotta-100 text-terracotta-600 font-semibold text-[11px] flex items-center gap-1 transition active:scale-95"
                    >
                      <Navigation className="w-3 h-3" />
                      <span>Maps</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
};
