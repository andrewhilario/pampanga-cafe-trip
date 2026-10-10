import { ItineraryDay } from '@/types';

export const ITINERARY_DAYS: ItineraryDay[] = [
  {
    day: 1,
    date: 'Friday, Oct 17',
    badge: 'Out @ 9:00 AM',
    badgeColor: 'text-terracotta-400 bg-white/20',
    title: 'Clark Welcome & Sunset Coffee',
    subtitle: "Dau Bus meetup with your partner arriving from Tarlac City, brunch at Porch Coffee, Airbnb check-in, and Aling Lucing's original Sisig.",
    gradientClass: 'from-latte-900 to-terracotta-600',
    stops: [
      {
        id: 'stop-1-1',
        time: '09:00 AM',
        badgeText: 'Kickoff',
        title: 'Work Shift Ends & Head to Dau Terminal',
        description: 'Wrap up work at 9:00 AM sharp. Take a quick trike or Grab to Dau Bus Terminal to meet your partner arriving via Tarlac bus.',
        icon: 'briefcase',
        tip: 'Tarlac buses usually pull into the inner passenger bay at Dau.'
      },
      {
        id: 'stop-1-2',
        time: '09:30 AM',
        title: 'Dau Bus Terminal Reunion & Welcome Coolers',
        description: 'Partner arrives from Tarlac City! Grab cold mineral water or quick buko juice at the terminal entrance before hailing a ride into Clark Freeport.',
        icon: 'users',
        spotId: 'dau-terminal',
        spotLabel: 'View Terminal'
      },
      {
        id: 'stop-1-3',
        time: '10:15 AM - 12:30 PM',
        title: 'Brunch & First Specialty Brew @ Porch Coffee Clark',
        description: "Hatch Baguio's iconic sister cafe inside Clark Parade Grounds. Warm wooden barn design, tall shady acacias, and outstanding specialty coffee.",
        icon: 'coffee',
        spotId: 'porch-coffee',
        spotLabel: 'View on Map',
        orderRecommendation: 'Dirty Horchata, Spanish Latte, Smoked Bacon Brioche Burger & Sourdough Toast.',
        driveNote: 'Drive from Dau: ~12 mins'
      },
      {
        id: 'stop-1-4',
        time: '01:00 PM - 02:45 PM',
        title: 'Check-in at Airbnb & Freshen Up',
        description: 'Unpack bags, turn on the AC, and take a quick rest after the morning commute and work shift.',
        icon: 'home',
        tip: 'Check out our "Tips" tab for best areas in Angeles/Clark.'
      },
      {
        id: 'stop-1-5',
        time: '03:15 PM - 05:15 PM',
        title: 'Afternoon Aesthetic Brews @ Moon Cafe',
        description: 'Chic Korean minimalist cafe in Riverside / Amsic with warm organic curves, huge mirrors for couple selfies, and artisan strawberry cloud lattes.',
        icon: 'coffee',
        spotId: 'moon-cafe',
        spotLabel: 'View on Map'
      },
      {
        id: 'stop-1-6',
        time: '06:00 PM - 07:30 PM',
        title: 'Dinner @ Aling Lucing Sisig (The Original)',
        description: 'The birthplace of modern sizzling sisig by Lucia Cunanan. Smoky, charred to perfection with liver and calamansi.',
        icon: 'utensils',
        spotId: 'aling-lucing',
        spotLabel: 'View on Map',
        orderRecommendation: 'Sizzling Sisig + Chicken Inasal or Bulalo + Garlic Rice.'
      },
      {
        id: 'stop-1-7',
        time: '08:00 PM - 10:00 PM',
        title: 'Nightcap & Belgian Pastries @ Amand Coffee Bar',
        description: 'Resort-like compound in Hensonville with an open terrace, water fountain, dim ambient evening lighting, and rich chocolate ganache cake.',
        icon: 'moon',
        spotId: 'amand-coffee',
        spotLabel: 'View on Map'
      }
    ]
  },
  {
    day: 2,
    date: 'Saturday, Oct 18',
    badge: 'Day 2: Full Explorer',
    badgeColor: 'text-emerald-200 bg-white/20',
    title: 'French Croissants, Clark Trees & Feast',
    subtitle: 'Artisanal croissants inside Mimosa Plus, picnic vibes under century-old Clark trees, botanical cafe, and heritage Balibago pizza.',
    gradientClass: 'from-sage-600 to-latte-800',
    stops: [
      {
        id: 'stop-2-1',
        time: '09:15 AM - 11:00 AM',
        title: 'French Breakfast @ Baker J (Mimosa Plus Clark)',
        description: 'Authentic flaky butter croissants, pain au chocolat, sourdough tartines, and smooth pour-over coffees in a sunlit Parisian glasshouse.',
        icon: 'coffee',
        spotId: 'baker-j',
        spotLabel: 'View on Map'
      },
      {
        id: 'stop-2-2',
        time: '11:15 AM - 12:45 PM',
        title: 'Clark Parade Grounds Stroll & Cycles & Brew',
        description: 'Walk under gigantic century-old acacia trees. Stop by Cycles & Brew for cold brew lemonade or rent bicycles around the open parade.',
        icon: 'camera',
        spotId: 'cycles-brew',
        spotLabel: 'View on Map'
      },
      {
        id: 'stop-2-3',
        time: '01:00 PM - 02:45 PM',
        title: 'Kapampangan Feast @ Matam-ih Authentic Dining',
        description: 'Named from the Aeta word for "Delicious". Dine in tribal thatched cottages with indigenous servers. Must get Kare-Kareng Baka and Crispy Pata.',
        icon: 'utensils',
        spotId: 'matam-ih',
        spotLabel: 'View on Map'
      },
      {
        id: 'stop-2-4',
        time: '03:30 PM - 05:30 PM',
        title: 'Lush Botanical Hangout @ Lala Garden Cafe',
        description: 'Surrounded by vibrant indoor plants and botanical skylights. Try their house-baked cheesecakes and pistachio Einspänner cold coffees.',
        icon: 'flower',
        spotId: 'lala-garden',
        spotLabel: 'View on Map'
      },
      {
        id: 'stop-2-5',
        time: '06:45 PM - 08:30 PM',
        title: "Heritage Dinner @ Didi's Pizza Balibago",
        description: "Pampanga's longest-standing retro pizzeria (since 1970). Famous sweet-savory crust, loaded ground beef pizza and legendary Baby Back Ribs.",
        icon: 'pizza',
        spotId: 'didis-pizza',
        spotLabel: 'View on Map'
      },
      {
        id: 'stop-2-6',
        time: '08:45 PM - 10:30 PM',
        title: 'Late Night Glasshouse @ Cafe Dia Clark',
        description: 'Spacious two-floor glasshouse cafe, huge Korean bingsu bowls, illuminated garden trees, and cozy armchairs.',
        icon: 'coffee',
        spotId: 'cafe-dia',
        spotLabel: 'View on Map'
      }
    ]
  },
  {
    day: 3,
    date: 'Sunday, Oct 19',
    badge: 'Day 3: Pasalubong & Sendoff',
    badgeColor: 'text-amber-200 bg-white/20',
    title: 'San Fernando Roasts & Dau Bus Sendoff',
    subtitle: "Checkout, Sage Day specialty roasters, Susie's Tibok-tibok pasalubong haul, Mila's Tokwa't Baboy, and partner's bus ride back to Tarlac.",
    gradientClass: 'from-mustard-600 to-terracotta-600',
    stops: [
      {
        id: 'stop-3-1',
        time: '09:30 AM - 10:15 AM',
        title: 'Airbnb Checkout & Luggage Stash',
        description: 'Pack souvenirs and bags. Ready for the San Fernando side trip.',
        icon: 'check'
      },
      {
        id: 'stop-3-2',
        time: '10:45 AM - 12:15 PM',
        title: 'Specialty Brews @ Sage Day Coffee (San Fernando)',
        description: 'Specialty multi-roaster bar in Saguin serving Yardstick beans, matcha waffles, and aeropress brews with calm green interiors.',
        icon: 'coffee',
        spotId: 'sage-day',
        spotLabel: 'View on Map'
      },
      {
        id: 'stop-3-3',
        time: '12:30 PM - 02:00 PM',
        title: "Legendary Lunch @ Mila's Tokwa't Baboy",
        description: 'Famous crunchy boiled pork ears with fried tofu cubes drenched in sweet-sour celery vinaigrette. Try their crunchy Chicharon Bulaklak!',
        icon: 'utensils',
        spotId: 'milas-tokwa',
        spotLabel: 'View on Map'
      },
      {
        id: 'stop-3-4',
        time: '02:15 PM - 03:45 PM',
        title: "Pasalubong Run: Susie's Cuisine & Toll House",
        description: "Stock up boxes of authentic Kapampangan Tibok-tibok (carabao's milk pudding with latik), Pancit Palabok, and Toll House's famed Pistachio Cake.",
        icon: 'shopping-bag',
        spotId: 'susies-cuisine',
        spotLabel: 'View on Map'
      },
      {
        id: 'stop-3-5',
        time: '04:00 PM - 05:00 PM',
        title: 'Final Chill @ Cuptus & Dau Bus Sendoff',
        description: 'Grab a takeaway dirty matcha or cold brew from Cuptus Coffee (Marisol), drive 10 mins to Dau Bus Terminal, and safely send off your partner back to Tarlac with pasalubong boxes in hand!',
        icon: 'bus',
        spotId: 'cuptus-coffee',
        spotLabel: 'Cuptus',
        secondarySpotId: 'dau-terminal',
        secondarySpotLabel: 'Dau Terminal'
      }
    ]
  }
];
