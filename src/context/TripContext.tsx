'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { Spot, DiaryEntry, TabId, MapFilter, CatalogTag, ItineraryDay, ItineraryStop } from '@/types';
import { INITIAL_SPOTS } from '@/data/spots';
import { INITIAL_DIARY_ENTRIES, INITIAL_CHECKLIST } from '@/data/tips';
import { ITINERARY_DAYS } from '@/data/itinerary';

interface ToastState {
  message: string;
  visible: boolean;
}

interface TripContextType {
  activeTab: TabId;
  setActiveTab: (tab: TabId) => void;
  spots: Spot[];
  customSpots: Spot[];
  addCustomSpot: (spotData: Omit<Spot, 'id'>) => void;
  selectedSpot: Spot | null;
  setSelectedSpot: (spot: Spot | null) => void;
  mapFilter: MapFilter;
  setMapFilter: (filter: MapFilter) => void;
  catalogTag: CatalogTag;
  setCatalogTag: (tag: CatalogTag) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  itineraryDay: 1 | 2 | 3;
  setItineraryDay: (day: 1 | 2 | 3) => void;
  itineraryDays: ItineraryDay[];
  updateItineraryStop: (dayNumber: 1 | 2 | 3, stopId: string, updatedData: Partial<ItineraryStop>) => void;
  addItineraryStop: (dayNumber: 1 | 2 | 3, newStop: Omit<ItineraryStop, 'id'>) => void;
  deleteItineraryStop: (dayNumber: 1 | 2 | 3, stopId: string) => void;
  resetItinerary: () => void;
  editingStop: { day: 1 | 2 | 3; stop: ItineraryStop } | null;
  setEditingStop: (data: { day: 1 | 2 | 3; stop: ItineraryStop } | null) => void;
  isAddActivityModalOpen: boolean;
  setIsAddActivityModalOpen: (open: boolean) => void;
  favorites: Record<string, boolean>;
  toggleFavorite: (id: string) => void;
  visited: Record<string, boolean>;
  toggleVisited: (id: string) => void;
  completedStops: Record<string, boolean>;
  toggleStopCompleted: (id: string) => void;
  checklist: Record<string, boolean>;
  toggleChecklist: (id: string) => void;
  diaryEntries: DiaryEntry[];
  addDiaryEntry: (entry: { author: string; spot: string; rating: number; comment: string }) => void;
  mapboxToken: string;
  setMapboxToken: (token: string) => void;
  isAddModalOpen: boolean;
  setIsAddModalOpen: (open: boolean) => void;
  isShareModalOpen: boolean;
  setIsShareModalOpen: (open: boolean) => void;
  isTokenModalOpen: boolean;
  setIsTokenModalOpen: (open: boolean) => void;
  toast: ToastState;
  showToast: (message: string) => void;
  focusedSpotId: string | null;
  focusOnSpot: (id: string) => void;
  clearFocusSpot: () => void;
}

const TripContext = createContext<TripContextType | undefined>(undefined);

const STORAGE_KEY = 'pampanga_trip_state_v4';
const TOKEN_STORAGE_KEY = 'pampanga_mapbox_token';

export const TripProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<TabId>('map');
  const [customSpots, setCustomSpots] = useState<Spot[]>([]);
  const [selectedSpot, setSelectedSpot] = useState<Spot | null>(null);
  const [mapFilter, setMapFilter] = useState<MapFilter>('all');
  const [catalogTag, setCatalogTag] = useState<CatalogTag>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [itineraryDay, setItineraryDay] = useState<1 | 2 | 3>(1);
  const [itineraryDays, setItineraryDays] = useState<ItineraryDay[]>(ITINERARY_DAYS);
  const [editingStop, setEditingStop] = useState<{ day: 1 | 2 | 3; stop: ItineraryStop } | null>(null);
  const [isAddActivityModalOpen, setIsAddActivityModalOpen] = useState(false);

  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const [visited, setVisited] = useState<Record<string, boolean>>({});
  const [completedStops, setCompletedStops] = useState<Record<string, boolean>>({});
  const [checklist, setChecklist] = useState<Record<string, boolean>>(() => {
    const initCheck: Record<string, boolean> = {};
    INITIAL_CHECKLIST.forEach((item) => {
      initCheck[item.id] = true;
    });
    return initCheck;
  });
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>(INITIAL_DIARY_ENTRIES);
  const [mapboxToken, setMapboxTokenState] = useState<string>(() => {
    return process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';
  });

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isTokenModalOpen, setIsTokenModalOpen] = useState(false);
  const [focusedSpotId, setFocusedSpotId] = useState<string | null>(null);
  const [toast, setToast] = useState<ToastState>({ message: '', visible: false });

  // Load persisted user state on client mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.favorites) setFavorites(parsed.favorites);
        if (parsed.visited) setVisited(parsed.visited);
        if (parsed.completedStops) setCompletedStops(parsed.completedStops);
        if (parsed.checklist) setChecklist(parsed.checklist);
        if (parsed.diaryEntries && Array.isArray(parsed.diaryEntries)) setDiaryEntries(parsed.diaryEntries);
        if (parsed.customSpots && Array.isArray(parsed.customSpots)) setCustomSpots(parsed.customSpots);
        if (parsed.itineraryDays && Array.isArray(parsed.itineraryDays)) setItineraryDays(parsed.itineraryDays);
      }

      const storedToken = localStorage.getItem(TOKEN_STORAGE_KEY);
      if (storedToken) {
        setMapboxTokenState(storedToken);
      } else if (process.env.NEXT_PUBLIC_MAPBOX_TOKEN) {
        setMapboxTokenState(process.env.NEXT_PUBLIC_MAPBOX_TOKEN);
      }
    } catch {
      console.warn('Failed to rehydrate local state');
    }
  }, []);

  // Save changes to localStorage
  const saveStateToStorage = useCallback(
    (nextState: {
      favorites?: Record<string, boolean>;
      visited?: Record<string, boolean>;
      completedStops?: Record<string, boolean>;
      checklist?: Record<string, boolean>;
      diaryEntries?: DiaryEntry[];
      customSpots?: Spot[];
      itineraryDays?: ItineraryDay[];
    }) => {
      try {
        const current = localStorage.getItem(STORAGE_KEY);
        const parsed = current ? JSON.parse(current) : {};
        const merged = { ...parsed, ...nextState };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
      } catch {
        console.warn('Failed to persist local state');
      }
    },
    []
  );

  const showToast = useCallback((message: string) => {
    setToast({ message, visible: true });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 2800);
  }, []);

  const setMapboxToken = useCallback(
    (token: string) => {
      setMapboxTokenState(token);
      try {
        localStorage.setItem(TOKEN_STORAGE_KEY, token);
      } catch {}
      showToast('Mapbox API token saved!');
    },
    [showToast]
  );

  const spots = useMemo(() => {
    return [...INITIAL_SPOTS, ...customSpots];
  }, [customSpots]);

  const addCustomSpot = useCallback(
    (spotData: Omit<Spot, 'id'>) => {
      const newSpot: Spot = {
        ...spotData,
        id: `custom-${Date.now()}`,
      };
      setCustomSpots((prev) => {
        const next = [newSpot, ...prev];
        saveStateToStorage({ customSpots: next });
        return next;
      });
      showToast(`${newSpot.name} added to your Pampanga trip! 📍`);
    },
    [saveStateToStorage, showToast]
  );

  const updateItineraryStop = useCallback(
    (dayNumber: 1 | 2 | 3, stopId: string, updatedData: Partial<ItineraryStop>) => {
      setItineraryDays((prev) => {
        const next = prev.map((dayPlan) => {
          if (dayPlan.day !== dayNumber) return dayPlan;
          return {
            ...dayPlan,
            stops: dayPlan.stops.map((s) => (s.id === stopId ? { ...s, ...updatedData } : s)),
          };
        });
        saveStateToStorage({ itineraryDays: next });
        return next;
      });
      showToast('Activity updated! ✨');
    },
    [saveStateToStorage, showToast]
  );

  const addItineraryStop = useCallback(
    (dayNumber: 1 | 2 | 3, newStopData: Omit<ItineraryStop, 'id'>) => {
      const newStop: ItineraryStop = {
        ...newStopData,
        id: `custom-stop-${Date.now()}`,
      };
      setItineraryDays((prev) => {
        const next = prev.map((dayPlan) => {
          if (dayPlan.day !== dayNumber) return dayPlan;
          return {
            ...dayPlan,
            stops: [...dayPlan.stops, newStop],
          };
        });
        saveStateToStorage({ itineraryDays: next });
        return next;
      });
      showToast('New activity added to the plan! 🎉');
    },
    [saveStateToStorage, showToast]
  );

  const deleteItineraryStop = useCallback(
    (dayNumber: 1 | 2 | 3, stopId: string) => {
      setItineraryDays((prev) => {
        const next = prev.map((dayPlan) => {
          if (dayPlan.day !== dayNumber) return dayPlan;
          return {
            ...dayPlan,
            stops: dayPlan.stops.filter((s) => s.id !== stopId),
          };
        });
        saveStateToStorage({ itineraryDays: next });
        return next;
      });
      showToast('Activity removed from plan');
    },
    [saveStateToStorage, showToast]
  );

  const resetItinerary = useCallback(() => {
    setItineraryDays(ITINERARY_DAYS);
    saveStateToStorage({ itineraryDays: ITINERARY_DAYS });
    showToast('Reset itinerary back to curated plan ☕');
  }, [saveStateToStorage, showToast]);

  const toggleFavorite = useCallback(
    (id: string) => {
      setFavorites((prev) => {
        const next = { ...prev, [id]: !prev[id] };
        saveStateToStorage({ favorites: next });
        showToast(next[id] ? 'Added to couple wishlist ❤️' : 'Removed from wishlist');
        return next;
      });
    },
    [saveStateToStorage, showToast]
  );

  const toggleVisited = useCallback(
    (id: string) => {
      setVisited((prev) => {
        const next = { ...prev, [id]: !prev[id] };
        saveStateToStorage({ visited: next });
        showToast(next[id] ? 'Marked as visited! 🎉' : 'Marked unvisited');
        return next;
      });
    },
    [saveStateToStorage, showToast]
  );

  const toggleStopCompleted = useCallback(
    (id: string) => {
      setCompletedStops((prev) => {
        const next = { ...prev, [id]: !prev[id] };
        saveStateToStorage({ completedStops: next });
        if (next[id]) {
          showToast('Stop checked off! Enjoy the moment ✨');
        }
        return next;
      });
    },
    [saveStateToStorage, showToast]
  );

  const toggleChecklist = useCallback(
    (id: string) => {
      setChecklist((prev) => {
        const next = { ...prev, [id]: !prev[id] };
        saveStateToStorage({ checklist: next });
        return next;
      });
    },
    [saveStateToStorage]
  );

  const addDiaryEntry = useCallback(
    (entry: { author: string; spot: string; rating: number; comment: string }) => {
      const now = new Date();
      const timeStr = `${now.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} • ${now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`;
      const newEntry: DiaryEntry = {
        id: `note-${Date.now()}`,
        author: entry.author,
        spot: entry.spot,
        rating: entry.rating,
        comment: entry.comment,
        time: timeStr,
        createdAt: Date.now(),
      };
      setDiaryEntries((prev) => {
        const next = [newEntry, ...prev];
        saveStateToStorage({ diaryEntries: next });
        return next;
      });
      showToast('Tasting memory posted! ☕💖');
    },
    [saveStateToStorage, showToast]
  );

  const focusOnSpot = useCallback((id: string) => {
    setActiveTab('map');
    setFocusedSpotId(id);
  }, []);

  const clearFocusSpot = useCallback(() => {
    setFocusedSpotId(null);
  }, []);

  return (
    <TripContext.Provider
      value={{
        activeTab,
        setActiveTab,
        spots,
        customSpots,
        addCustomSpot,
        selectedSpot,
        setSelectedSpot,
        mapFilter,
        setMapFilter,
        catalogTag,
        setCatalogTag,
        searchQuery,
        setSearchQuery,
        itineraryDay,
        setItineraryDay,
        itineraryDays,
        updateItineraryStop,
        addItineraryStop,
        deleteItineraryStop,
        resetItinerary,
        editingStop,
        setEditingStop,
        isAddActivityModalOpen,
        setIsAddActivityModalOpen,
        favorites,
        toggleFavorite,
        visited,
        toggleVisited,
        completedStops,
        toggleStopCompleted,
        checklist,
        toggleChecklist,
        diaryEntries,
        addDiaryEntry,
        mapboxToken,
        setMapboxToken,
        isAddModalOpen,
        setIsAddModalOpen,
        isShareModalOpen,
        setIsShareModalOpen,
        isTokenModalOpen,
        setIsTokenModalOpen,
        toast,
        showToast,
        focusedSpotId,
        focusOnSpot,
        clearFocusSpot,
      }}
    >
      {children}
    </TripContext.Provider>
  );
};

export const useTrip = () => {
  const context = useContext(TripContext);
  if (!context) {
    throw new Error('useTrip must be used within a TripProvider');
  }
  return context;
};
