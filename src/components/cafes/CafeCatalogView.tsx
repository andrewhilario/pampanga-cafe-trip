'use client';

import React, { useMemo } from 'react';
import { Search, Heart, Clock, MapPin, Navigation } from 'lucide-react';
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
  } = useTrip();

  const tags: { id: CatalogTag; label: string }[] = [
    { id: 'all', label: 'All Spots' },
    { id: 'clark', label: 'Clark Freeport' },
    { id: 'angeles', label: 'Angeles City' },
    { id: 'sanfernando', label: 'San Fernando' },
    { id: 'heritage', label: 'Kapampangan Heritage' },
  ];

  const filteredSpots = useMemo(() => {
    let result = spots;

    if (catalogTag === 'clark') {
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

            let dayBadgeColor = 'bg-terracotta-100 text-terracotta-700';
            let dayText = 'Day 1';

            if (spot.id === 'dau-terminal') {
              dayBadgeColor = 'bg-latte-900 text-latte-100';
              dayText = 'Pickup Point';
            } else if (spot.day === 'day2') {
              dayBadgeColor = 'bg-emerald-100 text-emerald-800';
              dayText = 'Day 2';
            } else if (spot.day === 'day3') {
              dayBadgeColor = 'bg-amber-100 text-amber-800';
              dayText = 'Day 3';
            } else if (spot.day === 'wishlist') {
              dayBadgeColor = 'bg-purple-100 text-purple-700';
              dayText = 'Wishlist';
            }

            return (
              <div
                key={spot.id}
                className="bg-white rounded-3xl p-3.5 border border-latte-200 shadow-sm hover:shadow-md transition flex flex-col justify-between space-y-3"
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
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${dayBadgeColor}`}>
                        {dayText}
                      </span>
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

                <div className="pt-2 border-t border-latte-100 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-latte-400 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-latte-400" />
                    <span>{spot.hours}</span>
                  </span>

                  <div className="flex items-center space-x-1.5">
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
