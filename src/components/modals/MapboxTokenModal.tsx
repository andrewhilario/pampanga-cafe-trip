'use client';

import React, { useState, useEffect } from 'react';
import { X, Key, ExternalLink, ShieldCheck, Check } from 'lucide-react';
import { useTrip } from '@/context/TripContext';

export const MapboxTokenModal: React.FC = () => {
  const { isTokenModalOpen, setIsTokenModalOpen, mapboxToken, setMapboxToken, showToast } = useTrip();
  const [inputVal, setInputVal] = useState(mapboxToken);

  useEffect(() => {
    setInputVal(mapboxToken);
  }, [mapboxToken]);

  if (!isTokenModalOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = inputVal.trim();
    if (!trimmed) {
      showToast('Please paste a valid Mapbox token (starts with pk.)');
      return;
    }
    setMapboxToken(trimmed);
    setIsTokenModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-latte-50 w-full max-w-md rounded-3xl p-6 border border-latte-300 shadow-2xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-latte-200">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-latte-900 text-latte-100 flex items-center justify-center">
              <Key className="w-4 h-4 text-terracotta-400" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base text-latte-900">Mapbox Token Settings</h3>
              <p className="text-[11px] text-latte-600">Power interactive maps & 3D tiles</p>
            </div>
          </div>
          <button
            onClick={() => setIsTokenModalOpen(false)}
            className="text-latte-500 hover:text-latte-800 p-1 rounded-full transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-latte-800 mb-1">
              Public Mapbox Access Token
            </label>
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="pk.eyJ1IjoieW91ci11c2VybmFtZSI..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-latte-300 text-xs font-mono text-latte-900 placeholder:text-latte-400 focus:outline-none focus:ring-2 focus:ring-terracotta-400"
            />
            <p className="text-[11px] text-latte-500 mt-1.5 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-sage-600 shrink-0" />
              Saved safely to your browser and environment.
            </p>
          </div>

          <div className="bg-latte-100 p-3.5 rounded-2xl border border-latte-200 text-xs space-y-2 text-latte-700">
            <p className="font-semibold text-latte-900 flex items-center gap-1.5">
              <span>💡 Need a free token?</span>
            </p>
            <p className="text-[11px] leading-relaxed text-latte-600">
              1. Sign up or log into{' '}
              <a
                href="https://account.mapbox.com/"
                target="_blank"
                rel="noreferrer"
                className="text-terracotta-600 underline font-semibold inline-flex items-center gap-0.5"
              >
                mapbox.com <ExternalLink className="w-2.5 h-2.5" />
              </a>
              .<br />
              2. Copy your <strong>Default public token</strong>.<br />
              3. You can also paste it into your project&apos;s <code className="bg-latte-200 px-1 py-0.5 rounded text-[10px]">.env.local</code> as:
            </p>
            <pre className="bg-latte-900 text-latte-100 p-2 rounded-lg text-[10px] font-mono overflow-x-auto">
              NEXT_PUBLIC_MAPBOX_TOKEN=pk.eyJ1...
            </pre>
          </div>

          <div className="pt-2 flex items-center justify-end space-x-2">
            <button
              type="button"
              onClick={() => setIsTokenModalOpen(false)}
              className="px-4 py-2 rounded-xl bg-latte-200 text-latte-700 text-xs font-semibold hover:bg-latte-300 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-terracotta-500 hover:bg-terracotta-600 text-white text-xs font-bold shadow-md transition active:scale-95 flex items-center gap-1.5"
            >
              <Check className="w-3.5 h-3.5" />
              Save & Activate
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
