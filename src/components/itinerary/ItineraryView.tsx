'use client';

import React from 'react';
import confetti from 'canvas-confetti';
import {
  Briefcase,
  Users,
  Coffee,
  Home,
  Utensils,
  Moon,
  Camera,
  Flower2,
  Pizza,
  Check,
  ShoppingBag,
  Bus,
  MapPin,
  CheckCircle2,
  Circle,
  Info,
  Sparkles,
} from 'lucide-react';
import { useTrip } from '@/context/TripContext';
import { ITINERARY_DAYS } from '@/data/itinerary';

export const ItineraryView: React.FC = () => {
  const { itineraryDay, setItineraryDay, completedStops, toggleStopCompleted, focusOnSpot } = useTrip();

  const currentDayData = ITINERARY_DAYS.find((d) => d.day === itineraryDay) || ITINERARY_DAYS[0];

  const triggerConfetti = (e: React.MouseEvent) => {
    try {
      const rect = (e.target as HTMLElement).getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;

      confetti({
        particleCount: 35,
        spread: 60,
        origin: { x, y },
        colors: ['#C86446', '#6A8E72', '#D4973B', '#2C1810'],
      });
    } catch {
      // safe fallback
    }
  };

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'briefcase':
        return <Briefcase className="w-2.5 h-2.5" />;
      case 'users':
        return <Users className="w-2.5 h-2.5" />;
      case 'coffee':
        return <Coffee className="w-2.5 h-2.5" />;
      case 'home':
        return <Home className="w-2.5 h-2.5" />;
      case 'utensils':
        return <Utensils className="w-2.5 h-2.5" />;
      case 'moon':
        return <Moon className="w-2.5 h-2.5" />;
      case 'camera':
        return <Camera className="w-2.5 h-2.5" />;
      case 'flower':
        return <Flower2 className="w-2.5 h-2.5" />;
      case 'pizza':
        return <Pizza className="w-2.5 h-2.5" />;
      case 'check':
        return <Check className="w-2.5 h-2.5" />;
      case 'shopping-bag':
        return <ShoppingBag className="w-2.5 h-2.5" />;
      case 'bus':
        return <Bus className="w-2.5 h-2.5" />;
      default:
        return <Coffee className="w-2.5 h-2.5" />;
    }
  };

  return (
    <section className="px-4 py-4 space-y-6">
      {/* Day Switcher Pills */}
      <div className="sticky top-14 z-20 bg-latte-50/95 backdrop-blur-md pt-1 pb-3">
        <div className="grid grid-cols-3 gap-2 bg-latte-200/70 p-1.5 rounded-2xl border border-latte-300/80 shadow-sm">
          <button
            onClick={() => setItineraryDay(1)}
            className={`py-2 rounded-xl text-xs font-bold text-center transition ${
              itineraryDay === 1
                ? 'bg-white text-terracotta-600 shadow-sm'
                : 'text-latte-700 hover:text-latte-900'
            }`}
          >
            Day 1 (Oct 17)
            <br />
            <span className="text-[10px] font-normal opacity-80">Arrival & Clark</span>
          </button>

          <button
            onClick={() => setItineraryDay(2)}
            className={`py-2 rounded-xl text-xs font-bold text-center transition ${
              itineraryDay === 2
                ? 'bg-white text-sage-600 shadow-sm'
                : 'text-latte-700 hover:text-latte-900'
            }`}
          >
            Day 2 (Oct 18)
            <br />
            <span className="text-[10px] font-normal opacity-80">Bakery & Feast</span>
          </button>

          <button
            onClick={() => setItineraryDay(3)}
            className={`py-2 rounded-xl text-xs font-bold text-center transition ${
              itineraryDay === 3
                ? 'bg-white text-mustard-600 shadow-sm'
                : 'text-latte-700 hover:text-latte-900'
            }`}
          >
            Day 3 (Oct 19)
            <br />
            <span className="text-[10px] font-normal opacity-80">Pasalubong Run</span>
          </button>
        </div>
      </div>

      {/* Day Banner Card */}
      <div
        className={`bg-gradient-to-r ${currentDayData.gradientClass} text-latte-50 p-4 rounded-3xl shadow-md`}
      >
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase font-bold tracking-widest text-latte-200">
            {currentDayData.date}
          </span>
          <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${currentDayData.badgeColor}`}>
            {currentDayData.badge}
          </span>
        </div>
        <h2 className="font-serif text-xl font-bold mt-1 text-white">{currentDayData.title}</h2>
        <p className="text-xs text-latte-100/90 mt-1 leading-relaxed">{currentDayData.subtitle}</p>
      </div>

      {/* Timeline Stops Container */}
      <div className="relative pl-6 space-y-5 before:content-[''] before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-latte-300">
        {currentDayData.stops.map((stop) => {
          const isDone = !!completedStops[stop.id];

          return (
            <div key={stop.id} className="relative flex items-start group">
              {/* Bullet Node */}
              <div
                className={`absolute -left-6 top-1 w-5 h-5 rounded-full border-2 border-white flex items-center justify-center text-white text-[10px] shadow-sm transition ${
                  isDone
                    ? 'bg-sage-600'
                    : itineraryDay === 1
                    ? 'bg-terracotta-500'
                    : itineraryDay === 2
                    ? 'bg-sage-500'
                    : 'bg-mustard-500'
                }`}
              >
                {renderIcon(stop.icon)}
              </div>

              {/* Stop Card */}
              <div
                className={`w-full bg-white p-3.5 rounded-2xl border transition shadow-sm ${
                  isDone
                    ? 'border-sage-300 bg-sage-50/40'
                    : 'border-latte-200 hover:border-terracotta-400'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs font-bold ${
                      isDone
                        ? 'text-sage-600 line-through opacity-80'
                        : itineraryDay === 1
                        ? 'text-terracotta-600'
                        : itineraryDay === 2
                        ? 'text-sage-600'
                        : 'text-mustard-600'
                    }`}
                  >
                    {stop.time}
                  </span>

                  {stop.badgeText ? (
                    <span className="text-[10px] font-semibold text-latte-600 bg-latte-100 px-2 py-0.5 rounded-md">
                      {stop.badgeText}
                    </span>
                  ) : (
                    <button
                      onClick={(e) => {
                        toggleStopCompleted(stop.id);
                        if (!isDone) triggerConfetti(e);
                      }}
                      className={`text-xs flex items-center gap-1 font-semibold transition active:scale-95 ${
                        isDone
                          ? 'text-sage-600 font-bold'
                          : 'text-latte-400 hover:text-sage-600'
                      }`}
                    >
                      {isDone ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-sage-600" />
                          <span>Done</span>
                        </>
                      ) : (
                        <>
                          <Circle className="w-4 h-4" />
                          <span>Check-in</span>
                        </>
                      )}
                    </button>
                  )}
                </div>

                <h4
                  className={`font-bold text-sm text-latte-900 mt-1 ${
                    isDone ? 'line-through text-latte-600' : ''
                  }`}
                >
                  {stop.title}
                </h4>

                <p className="text-xs text-latte-600 mt-1 leading-relaxed">{stop.description}</p>

                {stop.tip && (
                  <div className="mt-2 text-[11px] text-sage-600 font-medium flex items-center gap-1">
                    <Info className="w-3.5 h-3.5 shrink-0" />
                    <span>{stop.tip}</span>
                  </div>
                )}

                {stop.orderRecommendation && (
                  <div className="bg-latte-50 p-2 rounded-xl mt-2 border border-latte-200 text-xs">
                    <p className="font-semibold text-latte-800 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-terracotta-500" /> Order Recommendation:
                    </p>
                    <p className="text-latte-600 text-[11px] mt-0.5">{stop.orderRecommendation}</p>
                  </div>
                )}

                <div className="mt-2.5 flex items-center gap-2 flex-wrap">
                  {stop.spotId && (
                    <button
                      onClick={() => focusOnSpot(stop.spotId!)}
                      className="text-[11px] text-terracotta-600 bg-terracotta-50 hover:bg-terracotta-100 px-2.5 py-1 rounded-lg font-medium flex items-center gap-1 transition active:scale-95 border border-terracotta-200/50"
                    >
                      <MapPin className="w-3 h-3 text-terracotta-500" />
                      <span>{stop.spotLabel || 'View on Map'}</span>
                    </button>
                  )}

                  {stop.secondarySpotId && (
                    <button
                      onClick={() => focusOnSpot(stop.secondarySpotId!)}
                      className="text-[11px] text-latte-700 bg-latte-100 hover:bg-latte-200 px-2.5 py-1 rounded-lg font-medium flex items-center gap-1 transition active:scale-95"
                    >
                      <Bus className="w-3 h-3 text-terracotta-500" />
                      <span>{stop.secondarySpotLabel || 'Dau Terminal'}</span>
                    </button>
                  )}

                  {stop.driveNote && (
                    <span className="text-[11px] text-latte-400">{stop.driveNote}</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
