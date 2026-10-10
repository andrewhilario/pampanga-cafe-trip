'use client';

import React, { useState } from 'react';
import { X, Plus, MapPin } from 'lucide-react';
import { useTrip } from '@/context/TripContext';
import { TripDay, SpotType } from '@/types';

export const AddSpotModal: React.FC = () => {
  const { isAddModalOpen, setIsAddModalOpen, addCustomSpot, showToast } = useTrip();

  const [name, setName] = useState('');
  const [day, setDay] = useState<TripDay>('day1');
  const [category, setCategory] = useState('Specialty Coffee');
  const [order, setOrder] = useState('');
  const [lat, setLat] = useState('15.1550');
  const [lng, setLng] = useState('120.5850');

  if (!isAddModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      showToast('Please provide a spot name');
      return;
    }

    const latitude = parseFloat(lat) || 15.1550;
    const longitude = parseFloat(lng) || 120.5850;

    let type: SpotType = 'specialty';
    if (category.toLowerCase().includes('food') || category.toLowerCase().includes('sisig')) {
      type = 'heritage';
    }

    addCustomSpot({
      name: name.trim(),
      category: category,
      area: 'Pampanga',
      day: day,
      type: type,
      lat: latitude,
      lng: longitude,
      hours: '08:00 AM - 10:00 PM',
      vibe: 'Custom romantic stop added by couple',
      mustOrder: order.trim() || 'Signature Drinks & Bites',
      photo: 'https://images.unsplash.com/photo-1507133750040-4a8f57021571?w=600&auto=format&fit=crop&q=80',
      mapsUrl: `https://maps.google.com/?q=${latitude},${longitude}`,
      wazeUrl: `https://waze.com/ul?ll=${latitude},${longitude}&navigate=yes`,
      tags: ['custom']
    });

    // Reset and close
    setName('');
    setOrder('');
    setIsAddModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-latte-50 w-full max-w-sm rounded-3xl p-5 border border-latte-300 shadow-2xl space-y-3.5">
        <div className="flex items-center justify-between pb-2 border-b border-latte-200">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-latte-900 text-latte-100 flex items-center justify-center">
              <MapPin className="w-4 h-4 text-terracotta-400" />
            </div>
            <h3 className="font-serif font-bold text-base text-latte-900">Add a New Pampanga Spot</h3>
          </div>
          <button
            onClick={() => setIsAddModalOpen(false)}
            className="text-latte-500 hover:text-latte-800 p-1 rounded-full transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-2.5 text-xs">
          <div>
            <label className="font-bold text-latte-700 block">Spot Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Vintage Cafe Clark"
              className="w-full mt-1 px-3 py-2 rounded-xl bg-white border border-latte-300 text-latte-900 focus:outline-none focus:ring-1 focus:ring-terracotta-500"
              required
            />
          </div>

          <div>
            <label className="font-bold text-latte-700 block">Day Planned</label>
            <select
              value={day}
              onChange={(e) => setDay(e.target.value as TripDay)}
              className="w-full mt-1 px-3 py-2 rounded-xl bg-white border border-latte-300 text-latte-900 font-medium focus:outline-none focus:ring-1 focus:ring-terracotta-500"
            >
              <option value="day1">Day 1 (Oct 17)</option>
              <option value="day2">Day 2 (Oct 18)</option>
              <option value="day3">Day 3 (Oct 19)</option>
              <option value="wishlist">Wishlist / Bonus</option>
            </select>
          </div>

          <div>
            <label className="font-bold text-latte-700 block">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full mt-1 px-3 py-2 rounded-xl bg-white border border-latte-300 text-latte-900 font-medium focus:outline-none focus:ring-1 focus:ring-terracotta-500"
            >
              <option value="Specialty Coffee">Specialty Coffee</option>
              <option value="Bakery / Brunch">Bakery / Brunch</option>
              <option value="Kapampangan Food">Kapampangan Food</option>
              <option value="Dessert & Pasalubong">Dessert & Pasalubong</option>
            </select>
          </div>

          <div>
            <label className="font-bold text-latte-700 block">Must Try / Note</label>
            <input
              type="text"
              value={order}
              onChange={(e) => setOrder(e.target.value)}
              placeholder="e.g. Spanish Latte, Butter Croissant"
              className="w-full mt-1 px-3 py-2 rounded-xl bg-white border border-latte-300 text-latte-900 focus:outline-none focus:ring-1 focus:ring-terracotta-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="font-bold text-latte-700 block">Latitude</label>
              <input
                type="number"
                step="0.0001"
                value={lat}
                onChange={(e) => setLat(e.target.value)}
                className="w-full mt-1 px-3 py-2 rounded-xl bg-white border border-latte-300 text-latte-900 focus:outline-none focus:ring-1 focus:ring-terracotta-500"
              />
            </div>
            <div>
              <label className="font-bold text-latte-700 block">Longitude</label>
              <input
                type="number"
                step="0.0001"
                value={lng}
                onChange={(e) => setLng(e.target.value)}
                className="w-full mt-1 px-3 py-2 rounded-xl bg-white border border-latte-300 text-latte-900 focus:outline-none focus:ring-1 focus:ring-terracotta-500"
              />
            </div>
          </div>

          <div className="pt-2 flex items-center justify-end space-x-2">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(false)}
              className="px-4 py-2 rounded-xl bg-latte-200 text-latte-700 text-xs font-semibold hover:bg-latte-300 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-terracotta-500 hover:bg-terracotta-600 text-white text-xs font-bold shadow-md transition active:scale-95 flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Spot
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
