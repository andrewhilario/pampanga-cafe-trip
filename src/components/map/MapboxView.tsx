'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Navigation as NavIcon, Maximize, Key, Compass, Layers } from 'lucide-react';
import { useTrip } from '@/context/TripContext';
import { Spot } from '@/types';
import { MapFilterBar } from './MapFilterBar';
import { SpotDetailSheet } from './SpotDetailSheet';

const DEFAULT_CENTER: [number, number] = [120.575, 15.158]; // Clark / Angeles centroid
const DEFAULT_ZOOM = 12.6;

export const MapboxView: React.FC = () => {
  const {
    spots,
    activeTab,
    mapFilter,
    setSelectedSpot,
    mapboxToken,
    setMapboxToken,
    showToast,
    focusedSpotId,
    clearFocusSpot,
  } = useTrip();

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const userMarkerRef = useRef<mapboxgl.Marker | null>(null);

  const [mapLoaded, setMapLoaded] = useState(false);
  const [tokenInput, setTokenInput] = useState('');
  const [currentStyle, setCurrentStyle] = useState<'light' | 'streets' | 'satellite'>('light');
  const [is3DPitched, setIs3DPitched] = useState(false);

  const getPinClass = (spot: Spot) => {
    if (spot.id === 'dau-terminal') return 'pin-dau';
    if (spot.day === 'day1') return 'pin-day1';
    if (spot.day === 'day2') return 'pin-day2';
    if (spot.day === 'day3') return 'pin-day3';
    return 'pin-custom';
  };

  const getPinEmoji = (spot: Spot) => {
    if (spot.id === 'dau-terminal') return '🚌';
    if (spot.type === 'heritage') return '🥢';
    if (spot.category.toLowerCase().includes('bakery')) return '🥐';
    return '☕';
  };

  // Initialize Mapbox map
  useEffect(() => {
    if (!mapboxToken || !mapContainerRef.current) return;

    try {
      mapboxgl.accessToken = mapboxToken;

      const styleUri =
        currentStyle === 'satellite'
          ? 'mapbox://styles/mapbox/satellite-streets-v12'
          : currentStyle === 'streets'
          ? 'mapbox://styles/mapbox/streets-v12'
          : 'mapbox://styles/mapbox/light-v11';

      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: styleUri,
        center: DEFAULT_CENTER,
        zoom: DEFAULT_ZOOM,
        pitch: 0,
        attributionControl: false,
      });

      map.addControl(new mapboxgl.NavigationControl({ showCompass: true }), 'top-right');

      map.on('load', () => {
        setMapLoaded(true);
      });

      map.on('error', (e) => {
        console.warn('Mapbox encountered an event:', e);
      });

      mapRef.current = map;

      return () => {
        map.remove();
        mapRef.current = null;
        setMapLoaded(false);
      };
    } catch (err) {
      console.error('Error initializing Mapbox:', err);
    }
  }, [mapboxToken, currentStyle]);

  // Ensure map resizes when returning to map tab
  useEffect(() => {
    if (activeTab === 'map' && mapRef.current) {
      const timer = setTimeout(() => {
        mapRef.current?.resize();
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [activeTab]);


  // Update Markers based on spots and mapFilter
  const renderMarkers = useCallback(() => {
    if (!mapRef.current || !mapLoaded) return;

    // Clear old markers
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    const filteredSpots = spots.filter((spot) => {
      if (mapFilter === 'all') return true;
      if (mapFilter === 'day1') return spot.day === 'day1';
      if (mapFilter === 'day2') return spot.day === 'day2';
      if (mapFilter === 'day3') return spot.day === 'day3';
      if (mapFilter === 'specialty') return spot.type === 'specialty';
      if (mapFilter === 'food') return spot.type === 'heritage';
      return true;
    });

    filteredSpots.forEach((spot) => {
      const el = document.createElement('div');
      el.className = `custom-map-pin ${getPinClass(spot)}`;
      el.style.width = '34px';
      el.style.height = '34px';
      el.style.fontSize = '15px';
      el.innerHTML = `<span>${getPinEmoji(spot)}</span>`;

      el.addEventListener('click', (e) => {
        e.stopPropagation();
        setSelectedSpot(spot);
        if (mapRef.current) {
          mapRef.current.flyTo({
            center: [spot.lng, spot.lat - 0.007],
            zoom: 14.5,
            duration: 1200,
            essential: true,
          });
        }
      });

      const marker = new mapboxgl.Marker({ element: el, anchor: 'center' })
        .setLngLat([spot.lng, spot.lat])
        .addTo(mapRef.current!);

      markersRef.current.push(marker);
    });
  }, [spots, mapFilter, mapLoaded, setSelectedSpot]);

  useEffect(() => {
    renderMarkers();
  }, [renderMarkers]);

  // Handle auto-focus from external triggers (Itinerary / Catalog)
  useEffect(() => {
    if (!focusedSpotId || !mapRef.current || !mapLoaded) return;

    const spot = spots.find((s) => s.id === focusedSpotId);
    if (spot) {
      mapRef.current.flyTo({
        center: [spot.lng, spot.lat - 0.007],
        zoom: 14.8,
        duration: 1400,
        essential: true,
      });
      setSelectedSpot(spot);
      clearFocusSpot();
    }
  }, [focusedSpotId, mapLoaded, spots, setSelectedSpot, clearFocusSpot]);

  // Live Location button
  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      showToast('Geolocation is not supported by your browser');
      return;
    }

    showToast('Locating your position in Pampanga...');

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;

        if (mapRef.current) {
          if (!userMarkerRef.current) {
            const el = document.createElement('div');
            el.className = 'user-live-pin';
            userMarkerRef.current = new mapboxgl.Marker({ element: el })
              .setLngLat([longitude, latitude])
              .addTo(mapRef.current);
          } else {
            userMarkerRef.current.setLngLat([longitude, latitude]);
          }

          mapRef.current.flyTo({
            center: [longitude, latitude],
            zoom: 15,
            duration: 1500,
            essential: true,
          });
          showToast('Located! You are here 📍');
        }
      },
      (err) => {
        console.warn('Geolocation error:', err);
        showToast('Could not fetch location. Check browser permissions.');
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  };

  // Reset View button
  const handleResetView = () => {
    if (!mapRef.current) return;
    mapRef.current.flyTo({
      center: DEFAULT_CENTER,
      zoom: DEFAULT_ZOOM,
      pitch: is3DPitched ? 45 : 0,
      bearing: 0,
      duration: 1200,
    });
    setSelectedSpot(null);
  };

  // Toggle 3D Tilt
  const toggle3DTilt = () => {
    if (!mapRef.current) return;
    const nextPitch = is3DPitched ? 0 : 45;
    mapRef.current.easeTo({ pitch: nextPitch, duration: 800 });
    setIs3DPitched(!is3DPitched);
    showToast(is3DPitched ? '2D Flat View' : '3D Perspective View ✨');
  };

  // Switch Style
  const cycleMapStyle = () => {
    const next = currentStyle === 'light' ? 'streets' : currentStyle === 'streets' ? 'satellite' : 'light';
    setCurrentStyle(next);
    showToast(`Map Style: ${next.toUpperCase()}`);
  };

  // Manual token submission fallback
  const handleManualTokenSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tokenInput.trim()) {
      showToast('Please enter your Mapbox token');
      return;
    }
    setMapboxToken(tokenInput.trim());
  };

  return (
    <div className="relative flex flex-col h-[calc(100vh-160px)] min-h-[480px] w-full overflow-hidden rounded-b-2xl sm:rounded-3xl border sm:border-latte-200 shadow-sm bg-latte-100">
      {/* Filter Bar overlay */}
      <MapFilterBar />

      {/* Mapbox Canvas or Token Onboarding */}
      {mapboxToken ? (
        <div ref={mapContainerRef} className="w-full h-full flex-1" />
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-latte-50 to-latte-200">
          <div className="max-w-md bg-white p-6 rounded-3xl shadow-warm-lg border border-latte-300 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-latte-900 text-latte-100 flex items-center justify-center mx-auto shadow-md">
              <Key className="w-6 h-6 text-terracotta-400" />
            </div>

            <div>
              <h3 className="font-serif font-bold text-lg text-latte-900">
                Activate Mapbox Vector Maps
              </h3>
              <p className="text-xs text-latte-600 mt-1">
                Paste your Mapbox Public Token below to render silky-smooth 60fps vector maps, 3D building perspective, and custom cafe pins.
              </p>
            </div>

            <form onSubmit={handleManualTokenSubmit} className="space-y-3">
              <input
                type="text"
                value={tokenInput}
                onChange={(e) => setTokenInput(e.target.value)}
                placeholder="pk.eyJ1IjoibWFwYm94LXVzZXIiLCJhIjoi..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-latte-50 border border-latte-300 text-xs font-mono text-latte-900 placeholder:text-latte-400 focus:outline-none focus:ring-2 focus:ring-terracotta-400"
              />

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-terracotta-500 hover:bg-terracotta-600 active:scale-95 text-white font-bold text-xs shadow-md transition"
              >
                Load Interactive Map
              </button>
            </form>

            <div className="text-[11px] text-latte-500 pt-1 border-t border-latte-100">
              <span>Or add to </span>
              <code className="bg-latte-100 px-1.5 py-0.5 rounded text-latte-800 font-mono">.env.local</code>:
              <p className="font-mono text-[10px] text-latte-700 bg-latte-100 p-1.5 rounded-lg mt-1 select-all">
                NEXT_PUBLIC_MAPBOX_TOKEN=pk.eyJ1...
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Map Control Floating Action Buttons */}
      {mapboxToken && (
        <div className="absolute bottom-6 right-3 z-20 flex flex-col space-y-2">
          <button
            onClick={toggle3DTilt}
            className={`w-11 h-11 rounded-2xl shadow-xl border border-latte-200 flex items-center justify-center active:scale-95 transition ${
              is3DPitched ? 'bg-latte-900 text-white' : 'bg-white text-latte-800 hover:bg-latte-100'
            }`}
            title="Toggle 3D View"
          >
            <Compass className={`w-5 h-5 ${is3DPitched ? 'text-terracotta-400' : 'text-latte-700'}`} />
          </button>

          <button
            onClick={cycleMapStyle}
            className="w-11 h-11 bg-white text-latte-900 rounded-2xl shadow-xl border border-latte-200 flex items-center justify-center hover:bg-latte-100 active:scale-95 transition"
            title="Cycle Map Style (Light / Streets / Satellite)"
          >
            <Layers className="w-5 h-5 text-latte-700" />
          </button>

          <button
            onClick={handleGetLocation}
            className="w-11 h-11 bg-white text-latte-900 rounded-2xl shadow-xl border border-latte-200 flex items-center justify-center hover:bg-latte-100 active:scale-95 transition"
            title="Locate Me in Pampanga"
          >
            <NavIcon className="w-5 h-5 text-terracotta-500" />
          </button>

          <button
            onClick={handleResetView}
            className="w-11 h-11 bg-white text-latte-900 rounded-2xl shadow-xl border border-latte-200 flex items-center justify-center hover:bg-latte-100 active:scale-95 transition"
            title="Reset Map View"
          >
            <Maximize className="w-5 h-5 text-latte-700" />
          </button>
        </div>
      )}

      {/* Selected Spot Detail Drawer */}
      <SpotDetailSheet />
    </div>
  );
};
