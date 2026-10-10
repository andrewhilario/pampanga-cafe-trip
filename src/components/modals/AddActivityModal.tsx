'use client';

import React, { useState } from 'react';
import { X, Plus, Sparkles, Clock, CalendarHeart, Wand2 } from 'lucide-react';
import { useTrip } from '@/context/TripContext';

export const AddActivityModal: React.FC = () => {
  const { isAddActivityModalOpen, setIsAddActivityModalOpen, itineraryDay, addItineraryStop, showToast, spots } = useTrip();

  const [title, setTitle] = useState('');
  const [time, setTime] = useState('');
  const [description, setDescription] = useState('');
  const [orderRecommendation, setOrderRecommendation] = useState('');
  const [spotId, setSpotId] = useState<string | undefined>(undefined);

  if (!isAddActivityModalOpen) return null;

  const handleSelectSpot = (selectedId: string) => {
    if (!selectedId) return;
    const spot = spots.find((s) => s.id === selectedId);
    if (!spot) return;

    setTitle(spot.name);
    setDescription(spot.vibe);
    setOrderRecommendation(spot.mustOrder);
    setSpotId(spot.id);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      showToast('Please enter an activity title');
      return;
    }

    const matchedSpot = spotId ? spots.find((s) => s.id === spotId) : undefined;

    addItineraryStop(itineraryDay, {
      title: title.trim(),
      time: time.trim() || 'Flexible Time',
      description: description.trim() || 'Exciting couple activity planned together!',
      orderRecommendation: orderRecommendation.trim() || undefined,
      spotId: spotId || undefined,
      spotLabel: spotId ? 'View on Map' : undefined,
      icon: matchedSpot?.isTopSpot ? 'heart' : matchedSpot?.type === 'heritage' ? 'utensils' : 'coffee',
      badgeText: matchedSpot?.isTopSpot ? 'Top Pick 💜' : 'Custom Stop',
      isTopSpot: matchedSpot?.isTopSpot,
      tiktokUrl: matchedSpot?.tiktokUrl,
    });

    setTitle('');
    setTime('');
    setDescription('');
    setOrderRecommendation('');
    setSpotId(undefined);
    setIsAddActivityModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-latte-50 w-full max-w-md rounded-3xl p-5 border border-latte-300 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-2 border-b border-latte-200">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-latte-900 text-latte-100 flex items-center justify-center">
              <CalendarHeart className="w-4 h-4 text-terracotta-400" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base text-latte-900">
                Add Activity • Day {itineraryDay}
              </h3>
              <p className="text-[11px] text-latte-600">Plan a surprise or new adventure</p>
            </div>
          </div>
          <button
            onClick={() => setIsAddActivityModalOpen(false)}
            className="text-latte-500 hover:text-latte-800 p-1 rounded-full transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 1-Click Quick Select Cafe */}
        <div className="bg-white p-3 rounded-2xl border border-latte-200">
          <label className="font-bold text-latte-800 text-xs flex items-center gap-1.5 mb-1.5">
            <Wand2 className="w-3.5 h-3.5 text-terracotta-500" />
            <span>1-Click Auto-fill from Saved Cafes:</span>
          </label>
          <select
            value={spotId || ''}
            onChange={(e) => handleSelectSpot(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-latte-50 border border-latte-300 text-latte-900 focus:outline-none focus:ring-1 focus:ring-terracotta-500 text-xs"
          >
            <option value="">-- Choose a cafe to auto-fill details --</option>
            {spots.map((s) => (
              <option key={s.id} value={s.id}>
                {s.isTopSpot ? '⭐ [TOP SPOT] ' : s.tags.includes('tiktok') ? '🎵 [TikTok] ' : ''}
                {s.name} ({s.area})
              </option>
            ))}
          </select>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div>
            <label className="font-bold text-latte-700 block">Activity Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Sunset Picnic & Matchy Photos 📸"
              className="w-full mt-1 px-3 py-2 rounded-xl bg-white border border-latte-300 text-latte-900 focus:outline-none focus:ring-1 focus:ring-terracotta-500 text-xs"
              required
            />
          </div>

          <div>
            <label className="font-bold text-latte-700 block flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-latte-500" /> Planned Time
            </label>
            <input
              type="text"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              placeholder="e.g. 04:30 PM - 06:00 PM"
              className="w-full mt-1 px-3 py-2 rounded-xl bg-white border border-latte-300 text-latte-900 focus:outline-none focus:ring-1 focus:ring-terracotta-500 text-xs"
            />
          </div>

          <div>
            <label className="font-bold text-latte-700 block">Romantic Note / Details</label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What are we doing here? (e.g. 'Chill under the trees and share a matcha waffle')"
              className="w-full mt-1 px-3 py-2 rounded-xl bg-white border border-latte-300 text-latte-900 focus:outline-none focus:ring-1 focus:ring-terracotta-500 text-xs"
            />
          </div>

          <div>
            <label className="font-bold text-latte-700 block flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-terracotta-500" /> Must-Try / Order Note (Optional)
            </label>
            <input
              type="text"
              value={orderRecommendation}
              onChange={(e) => setOrderRecommendation(e.target.value)}
              placeholder="e.g. Iced Dirty Matcha, Butter Waffle"
              className="w-full mt-1 px-3 py-2 rounded-xl bg-white border border-latte-300 text-latte-900 focus:outline-none focus:ring-1 focus:ring-terracotta-500 text-xs"
            />
          </div>

          <div className="pt-2 flex items-center justify-end space-x-2">
            <button
              type="button"
              onClick={() => setIsAddActivityModalOpen(false)}
              className="px-4 py-2 rounded-xl bg-latte-200 text-latte-700 text-xs font-semibold hover:bg-latte-300 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-terracotta-500 hover:bg-terracotta-600 text-white text-xs font-bold shadow-md transition active:scale-95 flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add to Plan</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
