'use client';

import React from 'react';
import { useTrip } from '@/context/TripContext';
import { Header } from '@/components/Header';
import { MeetupBanner } from '@/components/MeetupBanner';
import { BottomNav } from '@/components/BottomNav';
import { Toast } from '@/components/Toast';
import { MapboxView } from '@/components/map/MapboxView';
import { ItineraryView } from '@/components/itinerary/ItineraryView';
import { CafeCatalogView } from '@/components/cafes/CafeCatalogView';
import { DiaryView } from '@/components/diary/DiaryView';
import { TipsView } from '@/components/tips/TipsView';
import { AddSpotModal } from '@/components/modals/AddSpotModal';
import { ShareModal } from '@/components/modals/ShareModal';
import { MapboxTokenModal } from '@/components/modals/MapboxTokenModal';
import { EditItineraryModal } from '@/components/modals/EditItineraryModal';
import { AddActivityModal } from '@/components/modals/AddActivityModal';

export const MainPlanner: React.FC = () => {
  const { activeTab } = useTrip();

  return (
    <div className="min-h-screen flex flex-col bg-latte-50">
      {/* Sticky Top Header */}
      <Header />

      {/* Meetup Reminder Banner */}
      <MeetupBanner />

      {/* Main Content Areas */}
      <main className="flex-1 max-w-2xl mx-auto w-full px-0 sm:px-4 pb-6">
        {/* Map Tab: Keep alive in DOM to avoid WebGL context loss */}
        <div className={activeTab === 'map' ? 'block' : 'hidden'}>
          <MapboxView />
        </div>

        {/* Tab 2: Itinerary */}
        {activeTab === 'itinerary' && <ItineraryView />}

        {/* Tab 3: Complete Cafes & Food Catalog */}
        {activeTab === 'cafes' && <CafeCatalogView />}

        {/* Tab 4: Couple's Food Diary */}
        {activeTab === 'diary' && <DiaryView />}

        {/* Tab 5: Airbnb & Commute Tips */}
        {activeTab === 'airbnb' && <TipsView />}
      </main>

      {/* Global Modals */}
      <AddSpotModal />
      <ShareModal />
      <MapboxTokenModal />
      <EditItineraryModal />
      <AddActivityModal />

      {/* Toast Notification */}
      <Toast />

      {/* Floating Bottom Navigation */}
      <BottomNav />
    </div>
  );
};
