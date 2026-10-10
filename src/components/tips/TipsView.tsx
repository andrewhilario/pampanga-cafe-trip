'use client';

import React from 'react';
import { Home, Navigation2, Wallet, CheckSquare } from 'lucide-react';
import { AIRBNB_NEIGHBORHOODS, COMMUTE_STEPS, BUDGET_ITEMS, INITIAL_CHECKLIST } from '@/data/tips';
import { useTrip } from '@/context/TripContext';

export const TipsView: React.FC = () => {
  const { checklist, toggleChecklist } = useTrip();

  return (
    <section className="px-4 py-4 space-y-5">
      {/* Header Banner */}
      <div className="bg-latte-100 border border-latte-300/80 p-4 rounded-3xl">
        <h2 className="font-serif text-lg font-bold text-latte-900">
          Pampanga Airbnb & Commute Playbook
        </h2>
        <p className="text-xs text-latte-600 mt-1 leading-relaxed">
          Local advice on where to book your stay, getting around from Dau Terminal, and budget hacks for your weekend trip.
        </p>
      </div>

      {/* Airbnb Best Neighborhoods */}
      <div className="space-y-3">
        <h3 className="font-bold text-xs uppercase tracking-wider text-latte-700 flex items-center gap-1.5">
          <Home className="w-4 h-4 text-terracotta-500" />
          Where to Book your Airbnb
        </h3>

        {AIRBNB_NEIGHBORHOODS.map((hood) => (
          <div
            key={hood.id}
            className="bg-white p-3.5 rounded-2xl border border-latte-200 shadow-sm space-y-1.5 hover:shadow-md transition"
          >
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-sm text-latte-900">
                {hood.number}. {hood.name}
              </h4>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${hood.badgeClass}`}>
                {hood.badge}
              </span>
            </div>
            <p className="text-xs text-latte-600">
              <strong>Vibe:</strong> {hood.vibe}
            </p>
            <p className="text-[11px] text-latte-500">
              <strong>Pros:</strong> {hood.pros}
              <br />
              <strong>Cons:</strong> {hood.cons}
            </p>
          </div>
        ))}
      </div>

      {/* Commute Tips */}
      <div className="space-y-3">
        <h3 className="font-bold text-xs uppercase tracking-wider text-latte-700 flex items-center gap-1.5">
          <Navigation2 className="w-4 h-4 text-terracotta-500" />
          Commute & Getting Around
        </h3>

        <div className="bg-white p-4 rounded-2xl border border-latte-200 shadow-sm space-y-3 text-xs text-latte-700">
          {COMMUTE_STEPS.map((step) => (
            <div key={step.step} className="flex items-start gap-2.5">
              <div className="w-6 h-6 rounded-full bg-latte-100 text-terracotta-600 flex items-center justify-center shrink-0 font-bold text-xs border border-latte-200">
                {step.step}
              </div>
              <div>
                <p className="font-bold text-latte-900">{step.title}</p>
                <p className="text-latte-600 text-[11px] mt-0.5 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Budget Planner */}
      <div className="bg-white p-4 rounded-2xl border border-latte-200 shadow-sm space-y-3">
        <h3 className="font-bold text-xs uppercase tracking-wider text-latte-700 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Wallet className="w-4 h-4 text-terracotta-500" /> Estimated Trip Budget (For 2)
          </span>
          <span className="text-terracotta-600 font-bold">~₱7,500 Total</span>
        </h3>

        <div className="space-y-1.5 text-xs">
          {BUDGET_ITEMS.map((item, index) => (
            <div key={index} className="flex justify-between py-1 border-b border-latte-100">
              <span className="text-latte-600">{item.category}</span>
              <span className="font-semibold text-latte-800">{item.amount}</span>
            </div>
          ))}
          <div className="flex justify-between py-1 text-latte-500 text-[11px]">
            <span>Split per person (approx.):</span>
            <span className="font-bold text-terracotta-600">~₱3,750 each</span>
          </div>
        </div>
      </div>

      {/* Packing Checklist */}
      <div className="bg-white p-4 rounded-2xl border border-latte-200 shadow-sm space-y-2.5">
        <h3 className="font-bold text-xs uppercase tracking-wider text-latte-700 flex items-center gap-1.5">
          <CheckSquare className="w-4 h-4 text-sage-600" />
          Couple&apos;s Pampanga Checklist
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-latte-700">
          {INITIAL_CHECKLIST.map((item) => {
            const isChecked = !!checklist[item.id];
            return (
              <label
                key={item.id}
                onClick={() => toggleChecklist(item.id)}
                className="flex items-center space-x-2.5 p-1 rounded-lg hover:bg-latte-50 cursor-pointer select-none"
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => {}}
                  className="rounded text-terracotta-500 focus:ring-0 accent-terracotta-500 w-4 h-4"
                />
                <span className={isChecked ? 'line-through text-latte-400' : 'text-latte-800'}>
                  {item.label}
                </span>
              </label>
            );
          })}
        </div>
      </div>
    </section>
  );
};
