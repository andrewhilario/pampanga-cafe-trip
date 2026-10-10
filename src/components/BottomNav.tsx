'use client';

import React from 'react';
import { Map, Calendar, Coffee, Heart, Home } from 'lucide-react';
import { useTrip } from '@/context/TripContext';
import { TabId } from '@/types';

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab } = useTrip();

  const tabs: { id: TabId; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'map', label: 'Map', icon: Map },
    { id: 'itinerary', label: 'Itinerary', icon: Calendar },
    { id: 'cafes', label: 'Cafes', icon: Coffee },
    { id: 'diary', label: 'Diary', icon: Heart },
    { id: 'airbnb', label: 'Tips', icon: Home },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-latte-50/95 backdrop-blur-lg border-t border-latte-200/90 py-2 px-3 shadow-lg">
      <div className="max-w-md mx-auto grid grid-cols-5 gap-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center justify-center py-1 rounded-xl transition duration-150 active:scale-95 ${
                isActive
                  ? 'text-terracotta-600 font-bold'
                  : 'text-latte-500 hover:text-terracotta-500 font-medium'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
              <span className="text-[10px] mt-1">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
