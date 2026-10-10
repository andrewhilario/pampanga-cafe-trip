# Kape't Kwentuhan • Pampanga Cafe & Food Trip Planner

A production-grade Next.js (App Router, TypeScript, Tailwind CSS) trip planner and couple's memory companion for exploring Pampanga's cafe culture and culinary heritage (Clark Freeport, Angeles City, and San Fernando).

---

## ☕ Key Features

1. **Interactive Vector Map (Mapbox GL JS)**:
   - Full vector map support with 60fps rendering, 3D perspective pitch tilt, style switching (Light, Streets, Satellite).
   - Custom color-coded pins by day (Day 1 Terracotta, Day 2 Sage Green, Day 3 Mustard Gold, Dau Terminal Deep Espresso, Custom Stops Purple).
   - Bottom sheet drawer with cafe image, signature order recommendations, business hours, and direct navigation links to **Google Maps** and **Waze**.
   - User Geolocation ("Locate Me") with animated live pulsing blue pin.
   - Map filter overlay: Day 1, Day 2, Day 3, ☕ Specialty Only, 🍖 Heritage Food.

2. **3-Day Curated Weekend Itinerary**:
   - **Day 1 (Friday, Oct 17)**: 9:00 AM kickoff, Dau Terminal meetup (arrival from Tarlac City), Porch Coffee Clark brunch, Airbnb check-in, Moon Cafe, original Aling Lucing Sisig, Amand Coffee Bar nightcap.
   - **Day 2 (Saturday, Oct 18)**: Parisian breakfast at Baker J (Mimosa Plus), Clark Parade Grounds tree stroll, Matam-ih indigenous dining feast, Lala Garden botanical cafe, Didi's Pizza, Cafe Dia late-night glasshouse.
   - **Day 3 (Sunday, Oct 19)**: San Fernando specialty coffee at Sage Day, Mila's Tokwa't Baboy lunch, Susie's Cuisine & Toll House pasalubong run, Cuptus Coffee, Dau Bus Terminal sendoff.
   - Interactive stop check-ins with celebratory confetti and "View on Map" auto-pan shortcuts.

3. **Complete Cafe & Heritage Food Catalog**:
   - Instant search across cafe names, signature orders, and locations.
   - Filter chips for Clark Freeport, Angeles City, San Fernando, and Kapampangan Heritage.
   - Wishlist toggle (❤️) and Visited badge (✓).

4. **Couple's Shared Taste Diary**:
   - Log coffee and sisig tasting reviews in real time.
   - Author selection (*Her 💁‍♀️ Tarlac*, *Him 🙋‍♂️ Pampanga*, *Both of Us 💑*), 1-5 star ratings, and timestamped memories saved to persistent local storage.

5. **Airbnb & Commute Playbook**:
   - Best neighborhood recommendations with pros and cons (Clark Freeport Zone, Hensonville/Malabanias, Friendship Highway Korea Town).
   - Commute guide from Dau Terminal (bus bay, Grab, Blue Taxis, jeepneys).
   - Estimated budget calculator for two (~₱7,500 total, ~₱3,750 per person).
   - Interactive couple's packing checklist.

6. **Custom Spots & Partner Sharing**:
   - Add new custom cafes or stops with coordinates directly onto the map and itinerary.
   - 1-click share modal to copy trip link for your partner.

---

## 🗺️ Mapbox API Key Setup

You can set your Mapbox Access Token in any of these two ways:

### Option 1: Via `.env.local` (Recommended for Local Dev)
Open [`.env.local`](file:///g:/Personal%20Project/pampanga-cafe-trip/.env.local) and add your token:
```bash
NEXT_PUBLIC_MAPBOX_TOKEN=pk.eyJ1IjoieW91ci11c2VybmFtZSI...
```
*(Get a free public token at [account.mapbox.com](https://account.mapbox.com/))*

### Option 2: Directly in the UI
Click the **"Map Key"** or **"Add Key"** button in the top navigation bar of the application. Paste your `pk.eyJ...` token and click **"Save & Activate"**. It will be saved securely to your browser storage and will instantly load the map without restarting the dev server!

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build
```bash
npm run build
npm start
```

---

## 📁 Project Architecture

```
pampanga-cafe-trip/
├── src/
│   ├── app/
│   │   ├── globals.css         # Custom mapbox styling, pins, scrollbars
│   │   ├── layout.tsx          # Google Fonts (Playfair Display & Plus Jakarta Sans)
│   │   └── page.tsx            # Main application wrapper with TripProvider
│   ├── components/
│   │   ├── Header.tsx          # Sticky top bar with token config, add spot, share
│   │   ├── MeetupBanner.tsx    # Dau Terminal meetup announcement with live pin link
│   │   ├── BottomNav.tsx       # Floating 5-tab navigation bar
│   │   ├── Toast.tsx           # Floating notification toast
│   │   ├── MainPlanner.tsx     # View switcher with preserved WebGL map canvas
│   │   ├── map/
│   │   │   ├── MapboxView.tsx       # Mapbox GL JS engine with 3D tilt, styles & markers
│   │   │   ├── MapFilterBar.tsx     # Filter chips for day & category
│   │   │   └── SpotDetailSheet.tsx  # Bottom sheet drawer for spot information & directions
│   │   ├── itinerary/
│   │   │   └── ItineraryView.tsx    # 3-day timeline, check-ins, confetti, map focus
│   │   ├── cafes/
│   │   │   └── CafeCatalogView.tsx  # Searchable directory with tags & directions
│   │   ├── diary/
│   │   │   └── DiaryView.tsx        # Couple tasting note logger with star ratings
│   │   ├── tips/
│   │   │   └── TipsView.tsx         # Airbnb guide, commute tips, budget & checklist
│   │   └── modals/
│   │       ├── AddSpotModal.tsx     # Form to add custom coordinates & spot
│   │       ├── ShareModal.tsx       # Copy web app link and trip summary
│   │       └── MapboxTokenModal.tsx # In-app Mapbox key manager
│   ├── context/
│   │   └── TripContext.tsx     # Centralized state with LocalStorage persistence
│   ├── data/
│   │   ├── spots.ts            # Curated 16+ Pampanga cafes & heritage eateries
│   │   ├── itinerary.ts        # 3-day schedule data
│   │   └── tips.ts             # Neighborhoods, commute guide, budget, packing list
│   └── types/
│       └── index.ts            # Strict TypeScript definitions
├── tailwind.config.ts          # Warm latte, terracotta, sage & mustard theme
└── .env.local                  # Mapbox token configuration
```
