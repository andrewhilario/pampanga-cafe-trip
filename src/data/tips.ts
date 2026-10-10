import { AirbnbNeighborhood, CommuteStep, BudgetItem, ChecklistItem, DiaryEntry } from '@/types';

export const AIRBNB_NEIGHBORHOODS: AirbnbNeighborhood[] = [
  {
    id: 'clark-freeport',
    number: 1,
    name: 'Clark Freeport / Mimosa',
    badge: 'Most Relaxing',
    badgeClass: 'bg-[#54755B] text-white',
    vibe: 'Wide leafy avenues, fresh breeze, and close to Baker J & Porch Coffee.',
    pros: 'Quiet, scenic, and romantic.',
    cons: 'Fewer 24/7 stores within walking distance.'
  },
  {
    id: 'hensonville',
    number: 2,
    name: 'Hensonville (Angeles City)',
    badge: 'Top Pick',
    badgeClass: 'bg-[#C86446] text-white',
    vibe: 'Boutique residential enclave near Amand Coffee & Moon Cafe.',
    pros: '8 mins from Dau Terminal, central to all food stops.',
    cons: 'Requires Grab to get into Clark gate.'
  },
  {
    id: 'friendship-korea-town',
    number: 3,
    name: 'Friendship Highway (Korea Town)',
    badge: 'Night Foodies',
    badgeClass: 'bg-[#D4973B] text-white',
    vibe: 'Lively strip filled with 24/7 Korean grills, bakeries, and desserts.',
    pros: 'Late-night cravings solved anytime.',
    cons: 'Livelier street atmosphere.'
  }
];

export const COMMUTE_STEPS: CommuteStep[] = [
  {
    step: 1,
    title: 'Meetup at Dau Terminal (Oct 17, 9:30 AM)',
    description: 'Buses from Tarlac City arrive at Dau along MacArthur Highway. Meet at the passenger arrival shed.'
  },
  {
    step: 2,
    title: 'GrabCar & Clark Taxis',
    description: 'Grab is active across Angeles and Clark. Metered Clark Blue Taxis are also stationed at the boundary.'
  },
  {
    step: 3,
    title: 'Local Tricycles & Jeepneys',
    description: 'Dau-Checkpoint jeepneys (₱13) take you straight to Clark Main Gate. Trikes charge ~₱60–₱100.'
  }
];

export const BUDGET_ITEMS: BudgetItem[] = [
  {
    category: 'Cozy Airbnb (2 Nights)',
    amount: '₱3,200 - ₱4,000'
  },
  {
    category: 'Cafe Hopping (Drinks + Pastries)',
    amount: '₱2,200'
  },
  {
    category: 'Heritage Dining (Sisig, Feast & Pizza)',
    amount: '₱1,800'
  },
  {
    category: 'Pasalubong (Tibok-tibok & Toll House)',
    amount: '₱800'
  }
];

export const INITIAL_CHECKLIST: ChecklistItem[] = [
  { id: 'antacid', label: 'Tums / Antacid (for sisig!)' },
  { id: 'powerbank', label: 'Power bank & phone cables' },
  { id: 'tote', label: 'Eco-tote for pasalubong goodies' },
  { id: 'umbrella', label: 'Sunnies & umbrella' },
  { id: 'clothes', label: 'Comfy cafe-hopping outfits' },
  { id: 'camera', label: 'Camera for couple photos' }
];

export const INITIAL_DIARY_ENTRIES: DiaryEntry[] = [
  {
    id: 'default-note-1',
    author: 'Her (Tarlac)',
    spot: 'Porch Coffee Clark',
    rating: 5,
    comment: 'Super excited for their Dirty Horchata! The porch looks so cozy for our morning coffee.',
    time: 'Oct 12 • 4:20 PM'
  },
  {
    id: 'default-note-2',
    author: 'Him (Pampanga)',
    spot: 'Aling Lucing Sisig',
    rating: 5,
    comment: 'Got the tums ready! Sizzling charred sisig with calamansi is going to be legendary.',
    time: 'Oct 13 • 7:15 PM'
  }
];
