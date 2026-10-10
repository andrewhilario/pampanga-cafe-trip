import { AirbnbNeighborhood, CommuteStep, BudgetItem, ChecklistItem, DiaryEntry } from '@/types';

export const AIRBNB_NEIGHBORHOODS: AirbnbNeighborhood[] = [
  {
    id: 'clark-freeport',
    number: 1,
    name: 'Clark Freeport Zone / Mimosa',
    badge: 'Most Relaxing',
    badgeClass: 'bg-emerald-100 text-emerald-800',
    vibe: 'Lush trees, jogging paths, wide roads, quiet and upscale. Walking distance to Baker J and Porch Coffee.',
    pros: 'Fresh air, romantic atmosphere, strict security.',
    cons: 'Grab cars take slightly longer, fewer 24/7 convenience stores within walking distance.'
  },
  {
    id: 'hensonville',
    number: 2,
    name: 'Hensonville / Malabanias (Angeles)',
    badge: 'Top Recommendation',
    badgeClass: 'bg-terracotta-100 text-terracotta-700',
    vibe: 'Bohemian residential neighborhood full of hidden boutique cafes (Amand Coffee Bar, Moon Cafe nearby) and cozy modern condo lofts.',
    pros: '8 mins from Dau Terminal, Grab cars arrive in 3 minutes, central to both Clark and food hubs.',
    cons: 'Narrower inner streets, requires Grab or private car to get into Clark gate.'
  },
  {
    id: 'friendship-korea-town',
    number: 3,
    name: 'Friendship Highway (Korea Town)',
    badge: 'Foodies & Night Owls',
    badgeClass: 'bg-amber-100 text-amber-800',
    vibe: '24-hour lively strip packed with Korean BBQs, bingsu cafes, convenience marts, and bakeries.',
    pros: 'Midnight cravings solved instantly, bustling nightlife, easy transport.',
    cons: 'Can get louder along main strip; book inside residential gated enclaves off the avenue.'
  }
];

export const COMMUTE_STEPS: CommuteStep[] = [
  {
    step: 1,
    title: 'Meeting at Dau Terminal (Oct 17, 9:30 AM)',
    description: 'Buses from Tarlac City (Genesis, Philippine Rabbit, Victory Liner) stop at Dau Terminal along MacArthur Highway. Meet at the passenger arrival shed or Dunkin/Jollibee Dau outside.'
  },
  {
    step: 2,
    title: 'GrabCar & Blue Taxis',
    description: "GrabCar is active in Angeles and Clark Freeport. You can also hail Clark's metered 'Blue Taxis' right at the Dau boundary or book directly via the Grab app."
  },
  {
    step: 3,
    title: 'Local Tricycles & Jeepneys',
    description: "Tricycles from Dau to Angeles inner hubs charge ~₱50-₱100. Jeepneys labeled 'Dau-Checkpoint' cost ₱13 and take you straight to Clark Main Gate."
  }
];

export const BUDGET_ITEMS: BudgetItem[] = [
  {
    category: 'Cozy Airbnb (2 Nights)',
    amount: '₱3,200 - ₱4,000'
  },
  {
    category: 'Cafe Hopping (6-8 drinks + pastries)',
    amount: '₱2,200'
  },
  {
    category: 'Heritage Dinners (Aling Lucing, Mila\'s, Didi\'s)',
    amount: '₱1,800'
  },
  {
    category: 'Pasalubong (Tibok-tibok, Toll House)',
    amount: '₱800'
  }
];

export const INITIAL_CHECKLIST: ChecklistItem[] = [
  { id: 'antacid', label: 'Antacid / Tums (for sisig!)' },
  { id: 'powerbank', label: 'Power bank & charger' },
  { id: 'tote', label: 'Eco-tote for pasalubong' },
  { id: 'umbrella', label: 'Umbrella & sunglasses' },
  { id: 'clothes', label: 'Loose comfortable clothes' },
  { id: 'camera', label: 'Digital camera / Film camera' }
];

export const INITIAL_DIARY_ENTRIES: DiaryEntry[] = [
  {
    id: 'default-note-1',
    author: 'Her (Tarlac)',
    spot: 'Porch Coffee Clark',
    rating: 5,
    comment: 'Can’t wait for their Dirty Horchata! The pine trees outside look so romantic in the photos.',
    time: 'Oct 12 • 4:20 PM'
  },
  {
    id: 'default-note-2',
    author: 'Him (Pampanga)',
    spot: 'Aling Lucing Sisig',
    rating: 5,
    comment: 'Prepared our tums! The crunchy charred pork with calamansi and cold beer is legendary.',
    time: 'Oct 13 • 7:15 PM'
  }
];
