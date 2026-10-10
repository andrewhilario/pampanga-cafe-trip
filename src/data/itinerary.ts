import { ItineraryDay } from '@/types';

export const ITINERARY_DAYS: ItineraryDay[] = [
  {
    day: 1,
    date: 'Friday, Oct 17',
    badge: 'Day 1 • Out @ 9 AM',
    badgeColor: 'bg-white/20 text-white',
    title: 'Clark Welcome & Sunset Brews',
    subtitle: 'Dau Terminal reunion, Porch Coffee brunch, check-in, and original sisig.',
    gradientClass: 'from-[#2C1810] via-[#5F442D] to-[#C86446]',
    stops: [
      {
        id: 'stop-1-1',
        time: '09:00 AM',
        badgeText: 'Kickoff',
        title: 'Work Shift Done • Head to Dau',
        description: 'Wrap up work and take a quick ride to Dau Terminal to meet your partner arriving from Tarlac.',
        icon: 'briefcase',
        tip: 'Tarlac buses pull right into Dau arrival bay.'
      },
      {
        id: 'stop-1-2',
        time: '09:30 AM',
        title: 'Dau Bus Reunion 💕',
        description: 'Reunited! Grab cold drinks together before heading into Clark Freeport.',
        icon: 'users',
        spotId: 'dau-terminal',
        spotLabel: 'View Terminal'
      },
      {
        id: 'stop-1-3',
        time: '10:15 AM - 12:30 PM',
        title: 'Brunch @ Porch Coffee Clark',
        description: 'Sister cafe of Hatch Baguio. Cozy barn aesthetic under shady acacias.',
        icon: 'coffee',
        spotId: 'porch-coffee',
        spotLabel: 'View on Map',
        orderRecommendation: 'Dirty Horchata, Spanish Latte & Sourdough Toast.',
        driveNote: '~12 mins from Dau'
      },
      {
        id: 'stop-1-4',
        time: '01:00 PM - 02:45 PM',
        title: 'Airbnb Check-in & Recharge',
        description: 'Unpack bags, cool down in the AC, and take a sweet rest together.',
        icon: 'home',
        tip: 'Check out the Tips tab for stay recommendations.'
      },
      {
        id: 'stop-1-5',
        time: '03:15 PM - 05:15 PM',
        title: 'Aesthetic Coffee @ Moon Cafe',
        description: 'Minimalist Korean vibes with pretty mirror selfie arches.',
        icon: 'coffee',
        spotId: 'moon-cafe',
        spotLabel: 'View on Map',
        orderRecommendation: 'Strawberry Cloud Latte & Einspänner.'
      },
      {
        id: 'stop-1-6',
        time: '06:00 PM - 07:30 PM',
        title: 'Dinner @ Aling Lucing Sisig',
        description: 'The legendary birthplace of sizzling sisig. Smoky, crispy, and calamansi-charred perfection.',
        icon: 'utensils',
        spotId: 'aling-lucing',
        spotLabel: 'View on Map',
        orderRecommendation: 'Original Sisig + Chicken Inasal + Garlic Rice.'
      },
      {
        id: 'stop-1-7',
        time: '08:00 PM - 10:00 PM',
        title: 'Nightcap @ Amand Coffee Bar',
        description: 'Quiet garden terrace, warm ambient evening lights, and rich chocolate ganache cake.',
        icon: 'moon',
        spotId: 'amand-coffee',
        spotLabel: 'View on Map'
      }
    ]
  },
  {
    day: 2,
    date: 'Saturday, Oct 18',
    badge: 'Day 2 • Full Explorer',
    badgeColor: 'bg-white/20 text-white',
    title: 'French Pastries & Tree Walks',
    subtitle: 'Baker J croissants, acacia strolls, Matam-ih feast, and cozy evening cafe.',
    gradientClass: 'from-[#3D5A44] via-[#54755B] to-[#2C1810]',
    stops: [
      {
        id: 'stop-2-1',
        time: '09:15 AM - 11:00 AM',
        title: 'Breakfast @ Baker J Mimosa',
        description: 'Warm butter croissants and cafe au lait in a sunlit Parisian glasshouse.',
        icon: 'coffee',
        spotId: 'baker-j',
        spotLabel: 'View on Map',
        orderRecommendation: 'Butter Croissant, Pain au Chocolat & Pour-over.'
      },
      {
        id: 'stop-2-2',
        time: '11:15 AM - 12:45 PM',
        title: 'Clark Parade Grounds Walk',
        description: 'Gentle walk under century-old acacia trees. Stop by Cycles & Brew for cold brew lemonade.',
        icon: 'camera',
        spotId: 'cycles-brew',
        spotLabel: 'View on Map'
      },
      {
        id: 'stop-2-3',
        time: '01:00 PM - 02:45 PM',
        title: 'Feast @ Matam-ih Authentic Dining',
        description: 'Traditional Kapampangan lunch in indigenous thatched cottages.',
        icon: 'utensils',
        spotId: 'matam-ih',
        spotLabel: 'View on Map',
        orderRecommendation: 'Kare-Kareng Baka & Crispy Pata.'
      },
      {
        id: 'stop-2-4',
        time: '03:30 PM - 05:30 PM',
        title: 'Botanical Hangout @ Lala Garden',
        description: 'Lush green greenhouse cafe with indoor plants and cold cheesecakes.',
        icon: 'flower',
        spotId: 'lala-garden',
        spotLabel: 'View on Map',
        orderRecommendation: 'Pistachio Einspänner & Burnt Cheesecake.'
      },
      {
        id: 'stop-2-5',
        time: '06:45 PM - 08:30 PM',
        title: "Retro Dinner @ Didi's Pizza",
        description: '1970s local legend famous for sweet-savory crust pizza and baby back ribs.',
        icon: 'pizza',
        spotId: 'didis-pizza',
        spotLabel: 'View on Map',
        orderRecommendation: 'Combination Pizza & Baby Back Ribs.'
      },
      {
        id: 'stop-2-6',
        time: '08:45 PM - 10:30 PM',
        title: 'Late Night Chill @ Cafe Dia',
        description: 'Spacious glowing two-floor glasshouse with comfy armchairs and bingsu.',
        icon: 'coffee',
        spotId: 'cafe-dia',
        spotLabel: 'View on Map'
      }
    ]
  },
  {
    day: 3,
    date: 'Sunday, Oct 19',
    badge: 'Day 3 • Pasalubong & Sendoff',
    badgeColor: 'bg-white/20 text-white',
    title: 'Specialty Roasts & Sendoff',
    subtitle: 'Sage Day brews, Mila’s lunch, pasalubong shopping, and bus sendoff.',
    gradientClass: 'from-[#8F5E18] via-[#B57C26] to-[#A94E35]',
    stops: [
      {
        id: 'stop-3-1',
        time: '09:30 AM - 10:15 AM',
        title: 'Checkout & Pack Souvenirs',
        description: 'Pack luggage and prepare for the San Fernando side trip.',
        icon: 'check'
      },
      {
        id: 'stop-3-2',
        time: '10:45 AM - 12:15 PM',
        title: 'Specialty Coffee @ Sage Day',
        description: 'Minimalist green cafe serving Yardstick beans, matcha, and waffles.',
        icon: 'coffee',
        spotId: 'sage-day',
        spotLabel: 'View on Map',
        orderRecommendation: 'Honey Butter Waffles & Sea Salt Latte.'
      },
      {
        id: 'stop-3-3',
        time: '12:30 PM - 02:00 PM',
        title: "Lunch @ Mila's Tokwa't Baboy",
        description: 'Crispy tofu and pork cubes in sweet celery dressing, plus hot sizzling sisig.',
        icon: 'utensils',
        spotId: 'milas-tokwa',
        spotLabel: 'View on Map'
      },
      {
        id: 'stop-3-4',
        time: '02:15 PM - 03:45 PM',
        title: "Pasalubong Run: Susie's & Toll House",
        description: 'Stock up on fresh Tibok-tibok and Toll House pistachio cake to bring home.',
        icon: 'shopping-bag',
        spotId: 'susies-cuisine',
        spotLabel: 'View on Map'
      },
      {
        id: 'stop-3-5',
        time: '04:00 PM - 05:00 PM',
        title: 'Final Brew @ Cuptus & Dau Sendoff',
        description: 'Grab takeaway cold brews, head to Dau Terminal, and send off your partner safely back to Tarlac with sweet hugs!',
        icon: 'bus',
        spotId: 'cuptus-coffee',
        spotLabel: 'Cuptus',
        secondarySpotId: 'dau-terminal',
        secondarySpotLabel: 'Dau Terminal'
      }
    ]
  }
];
