'use client';

import React, { useState } from 'react';
import { Star, Send, Sparkles } from 'lucide-react';
import { useTrip } from '@/context/TripContext';

export const DiaryView: React.FC = () => {
  const { diaryEntries, addDiaryEntry, showToast } = useTrip();

  const [spot, setSpot] = useState('');
  const [author, setAuthor] = useState('Her (Tarlac)');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!spot.trim() || !comment.trim()) {
      showToast('Please enter both the cafe name and your note!');
      return;
    }

    addDiaryEntry({
      author,
      spot: spot.trim(),
      rating,
      comment: comment.trim(),
    });

    setSpot('');
    setComment('');
  };

  return (
    <section className="px-4 py-4 space-y-4">
      {/* Header Card */}
      <div className="bg-gradient-to-br from-[#2C1810] via-[#5F442D] to-[#C86446] text-white p-5 rounded-3xl shadow-lg border border-[#5F442D]">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs uppercase font-bold tracking-wider text-latte-200">
            Couple Memories
          </span>
          <span className="inline-flex items-center gap-1.5 text-[11px] bg-white/20 text-white px-2.5 py-0.5 rounded-full font-medium border border-white/20">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span> Saved Locally
          </span>
        </div>
        <h2 className="font-serif text-xl font-bold mt-1 text-white">Our Tasting Diary</h2>
        <p className="text-xs text-latte-100 mt-1 leading-relaxed">
          A sweet collection of our favorite coffee spots, bites, and laughs together.
        </p>
      </div>

      {/* Quick Add Diary Entry Box */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded-2xl border border-latte-200 shadow-sm space-y-3"
      >
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-xs uppercase tracking-wider text-latte-800 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-terracotta-500" />
            Add a Tasting Note
          </h3>
          <span className="text-[11px] text-terracotta-600 font-semibold">Coffee & Food Review</span>
        </div>

        <div>
          <input
            type="text"
            value={spot}
            onChange={(e) => setSpot(e.target.value)}
            placeholder="Where did we go? (e.g. Porch Coffee Clark)"
            className="w-full px-3.5 py-2.5 rounded-xl bg-latte-50 border border-latte-300 text-xs focus:outline-none focus:ring-1 focus:ring-terracotta-500 text-latte-900"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="px-3 py-2 rounded-xl bg-latte-50 border border-latte-300 text-xs text-latte-900 font-medium focus:outline-none focus:ring-1 focus:ring-terracotta-500"
          >
            <option value="Her (Tarlac)">Her 💁‍♀️ (Tarlac)</option>
            <option value="Him (Pampanga)">Him 🙋‍♂️ (Pampanga)</option>
            <option value="Both of Us">Both of Us 💑</option>
          </select>

          {/* Star selector */}
          <div className="flex-1 flex items-center justify-end space-x-1">
            {[1, 2, 3, 4, 5].map((starVal) => (
              <button
                key={starVal}
                type="button"
                onClick={() => setRating(starVal)}
                className="p-1 transition active:scale-125"
                title={`${starVal} Star${starVal > 1 ? 's' : ''}`}
              >
                <Star
                  className={`w-4 h-4 transition ${
                    starVal <= rating
                      ? 'text-amber-400 fill-amber-400'
                      : 'text-latte-300'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        <textarea
          rows={2}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="What made this spot special? (e.g. 'Dirty horchata was creamy, loved the quiet breeze!')"
          className="w-full px-3.5 py-2 rounded-xl bg-latte-50 border border-latte-300 text-xs focus:outline-none focus:ring-1 focus:ring-terracotta-500 text-latte-900"
        />

        <button
          type="submit"
          className="w-full py-2.5 rounded-xl bg-terracotta-500 hover:bg-terracotta-600 active:scale-98 text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-1.5"
        >
          <Send className="w-3.5 h-3.5" />
          <span>Save Memory 💖</span>
        </button>
      </form>

      {/* Diary Entries List */}
      <div className="space-y-3">
        {diaryEntries.length === 0 ? (
          <div className="p-6 text-center text-latte-500 text-xs bg-white rounded-2xl border border-latte-200">
            No memories logged yet. Add your first coffee review above!
          </div>
        ) : (
          diaryEntries.map((item) => (
            <div
              key={item.id}
              className="bg-white p-3.5 rounded-2xl border border-latte-200 shadow-sm space-y-1.5 hover:shadow-md transition"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-latte-900">{item.spot}</span>
                <div className="flex items-center space-x-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-3.5 h-3.5 ${
                        star <= item.rating
                          ? 'text-amber-400 fill-amber-400'
                          : 'text-latte-200'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-xs text-latte-700 italic leading-relaxed">
                “{item.comment}”
              </p>
              <div className="pt-1.5 border-t border-latte-100 flex items-center justify-between text-[11px] text-latte-400">
                <span className="font-semibold text-terracotta-600">{item.author}</span>
                <span>{item.time}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};
