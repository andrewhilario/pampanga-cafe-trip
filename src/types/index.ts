export type TripDay = 'day1' | 'day2' | 'day3' | 'wishlist';

export type SpotType = 'specialty' | 'heritage' | 'meeting' | 'custom';

export type TabId = 'map' | 'itinerary' | 'cafes' | 'diary' | 'airbnb';

export type MapFilter = 'all' | 'friends' | 'tiktok' | 'day1' | 'day2' | 'day3' | 'specialty' | 'food';

export type CatalogTag = 'all' | 'friends' | 'tiktok' | 'clark' | 'angeles' | 'sanfernando' | 'heritage';

export interface Spot {
  id: string;
  name: string;
  category: string;
  area: string;
  day: TripDay;
  type: SpotType;
  lat: number;
  lng: number;
  hours: string;
  vibe: string;
  mustOrder: string;
  photo: string;
  mapsUrl: string;
  wazeUrl: string;
  tags: string[];
  tiktokUrl?: string;
  tiktokCreator?: string;
  isTopSpot?: boolean;
}

export interface DiaryEntry {
  id: string;
  author: string;
  spot: string;
  rating: number;
  comment: string;
  time: string;
  createdAt?: number;
}

export interface ItineraryStop {
  id: string;
  time: string;
  title: string;
  description: string;
  badgeText?: string;
  spotId?: string;
  spotLabel?: string;
  secondarySpotId?: string;
  secondarySpotLabel?: string;
  icon: 'briefcase' | 'users' | 'coffee' | 'home' | 'utensils' | 'moon' | 'camera' | 'flower' | 'pizza' | 'check' | 'shopping-bag' | 'bus' | 'heart' | 'sparkles' | 'film';
  orderRecommendation?: string;
  tip?: string;
  driveNote?: string;
  isTopSpot?: boolean;
  tiktokUrl?: string;
}

export interface ItineraryDay {
  day: 1 | 2 | 3;
  date: string;
  badge: string;
  title: string;
  subtitle: string;
  gradientClass: string;
  badgeColor: string;
  stops: ItineraryStop[];
}

export interface AirbnbNeighborhood {
  id: string;
  number: number;
  name: string;
  badge: string;
  badgeClass: string;
  vibe: string;
  pros: string;
  cons: string;
}

export interface CommuteStep {
  step: number;
  title: string;
  description: string;
}

export interface BudgetItem {
  category: string;
  amount: string;
}

export interface ChecklistItem {
  id: string;
  label: string;
}
