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
      showToast('Please enter both the cafe name and your tasting note!');
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
    <section className="px-4 py-4 space-y-5">
      {/* Romantic Header Card */}
      <div className="bg-gradient-to-br from-latte-900 via-latte-800 to-terracotta-700 text-latte-50 p-4 rounded-3xl shadow-md">
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase font-bold tracking-widest text-terracotta-300">
            Shared Memories
          </span>
          <span className="inline-flex items-center gap-1.5 text-[11px] bg-white/20 px-2 py-0.5 rounded-full font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> Offline & Cloud Sync
          </span>
        </div>
        <h2 className="font-serif text-xl font-bold mt-1 text-white">Our Pampanga Taste Diary</h2>
        <p className="text-xs text-latte-200 mt-1 leading-relaxed">
          Save your reviews, favorite dishes, and funny moments together from Oct 17 to 19. Both of you can post here in real time!
        </p>
      </div>

      {/* Quick Add Diary Entry Box */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded-2xl border border-latte-200 shadow-sm space-y-3"
      >
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-xs uppercase tracking-wider text-latte-700 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-terracotta-500" />
            Write a Couple Tasting Note
          </h3>
          <span className="text-[11px] text-terracotta-600 font-semibold">Coffee or Food Review</span>
        </div>

        <div>
          <input
            type="text"
            value={spot}
            onChange={(e) => setSpot(e.target.value)}
            placeholder="Where did you go? (e.g. Porch Coffee Clark)"
            className="w-full px-3.5 py-2 rounded-xl bg-latte-50 border border-latte-300 text-xs focus:outline-none focus:ring-1 focus:ring-terracotta-500 text-latte-900"
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
          placeholder="What did you think of the coffee, vibe, or sisig? (e.g., 'Dirty Horchata was so creamy, super chill porch!')"
          className="w-full px-3.5 py-2 rounded-xl bg-latte-50 border border-latte-300 text-xs focus:outline-none focus:ring-1 focus:ring-terracotta-500 text-latte-900"
        />

        <button
          type="submit"
          className="w-full py-2.5 rounded-xl bg-terracotta-500 hover:bg-terracotta-600 active:scale-98 text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-1.5"
        >
          <Send className="w-3.5 h-3.5" />
          <span>Save Tasting Memory</span>
        </button>
      </form>

      {/* Diary Entries List */}
      <div className="space-y-3">
        {diaryEntries.length === 0 ? (
          <div className="p-6 text-center text-latte-500 text-xs bg-white rounded-2xl border border-latte-200">
            No memories logged yet. Add your first coffee or sisig review above!
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
