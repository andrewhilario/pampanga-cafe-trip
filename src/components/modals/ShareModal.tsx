'use client';

import React, { useState, useEffect } from 'react';
import { X, Copy, Check, Heart, Sparkles } from 'lucide-react';
import { useTrip } from '@/context/TripContext';

export const ShareModal: React.FC = () => {
  const { isShareModalOpen, setIsShareModalOpen, showToast } = useTrip();
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setShareUrl(window.location.origin);
    }
  }, []);

  if (!isShareModalOpen) return null;

  const handleCopy = () => {
    if (navigator.clipboard && shareUrl) {
      navigator.clipboard.writeText(shareUrl).then(() => {
        setCopied(true);
        showToast('Trip link copied to clipboard! 📋');
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-latte-50 w-full max-w-sm rounded-3xl p-5 border border-latte-300 shadow-2xl space-y-3.5">
        <div className="flex items-center justify-between pb-2 border-b border-latte-200">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-latte-900 text-latte-100 flex items-center justify-center">
              <Heart className="w-4 h-4 text-terracotta-400" />
            </div>
            <h3 className="font-serif font-bold text-base text-latte-900">Share Trip with Partner</h3>
          </div>
          <button
            onClick={() => setIsShareModalOpen(false)}
            className="text-latte-500 hover:text-latte-800 p-1 rounded-full transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-latte-600 leading-relaxed">
          Send this trip web app link directly to her on Messenger/Telegram so both of you can view live markers and log food notes together!
        </p>

        <div className="p-3 bg-white rounded-2xl border border-latte-200 flex items-center justify-between shadow-sm">
          <span className="text-xs text-latte-800 truncate font-mono select-all">
            {shareUrl || 'https://kapampangan-cafe-trip.local'}
          </span>
          <button
            onClick={handleCopy}
            className="ml-2 px-3 py-1.5 rounded-xl bg-terracotta-500 hover:bg-terracotta-600 active:scale-95 text-white text-xs font-bold shrink-0 transition flex items-center gap-1 shadow-sm"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>

        <div className="p-3 bg-latte-100 rounded-2xl text-[11px] text-latte-700 space-y-1 border border-latte-200">
          <p className="font-semibold text-terracotta-600 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> Quick Trip Reminders:
          </p>
          <p>• Oct 17: User shift ends 9:00 AM. Meetup Dau Terminal 9:30 AM.</p>
          <p>• Oct 18: French croissants at Baker J & Clark acacia tree stroll.</p>
          <p>• Oct 19: San Fernando roasts, Tibok-tibok haul, Dau sendoff.</p>
        </div>

        <button
          onClick={() => setIsShareModalOpen(false)}
          className="w-full py-2.5 rounded-xl bg-latte-900 hover:bg-latte-800 text-white text-xs font-bold transition active:scale-95"
        >
          Done
        </button>
      </div>
    </div>
  );
};
