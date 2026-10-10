'use client';

import React, { useState } from 'react';
import { X, Plus, Sparkles, Clock, CalendarHeart } from 'lucide-react';
import { useTrip } from '@/context/TripContext';

export const AddActivityModal: React.FC = () => {
  const { isAddActivityModalOpen, setIsAddActivityModalOpen, itineraryDay, addItineraryStop, showToast } = useTrip();

  const [title, setTitle] = useState('');
  const [time, setTime] = useState('');
  const [description, setDescription] = useState('');
  const [orderRecommendation, setOrderRecommendation] = useState('');

  if (!isAddActivityModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      showToast('Please enter an activity title');
      return;
    }

    addItineraryStop(itineraryDay, {
      title: title.trim(),
      time: time.trim() || 'Flexible Time',
      description: description.trim() || 'Exciting couple activity planned together!',
      orderRecommendation: orderRecommendation.trim() || undefined,
      icon: 'coffee',
    });

    setTitle('');
    setTime('');
    setDescription('');
    setOrderRecommendation('');
    setIsAddActivityModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-latte-50 w-full max-w-md rounded-3xl p-5 border border-latte-300 shadow-2xl space-y-4">
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
