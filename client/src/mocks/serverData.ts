// src/mocks/serverData.ts
// This file mocks all data that would be fetched from the server for dumb components.

export const menuItems = [
  // Starters
  {
    id: "starter-1",
    name: "Bruschetta",
    description:
      "Fresh tomatoes, basil, olive oil, and toasted baguette slices",
    price: "$8.50",
    category: "Starters" as const,
  },
  {
    id: "starter-2",
    name: "Caesar Salad",
    description: "Crisp romaine with homemade Caesar dressing",
    price: "$9.00",
    category: "Starters" as const,
  },
  // Main Courses
  {
    id: "main-1",
    name: "Grilled Salmon",
    description: "Served with lemon butter sauce and seasonal vegetables",
    price: "$22.00",
    category: "Main Courses" as const,
  },
  {
    id: "main-2",
    name: "Ribeye Steak",
    description: "12 oz prime cut with garlic mashed potatoes",
    price: "$28.00",
    category: "Main Courses" as const,
  },
  {
    id: "main-3",
    name: "Vegetable Risotto",
    description: "Creamy Arborio rice with wild mushrooms",
    price: "$18.00",
    category: "Main Courses" as const,
  },
  // Desserts
  {
    id: "dessert-1",
    name: "Tiramisu",
    description: "Classic Italian dessert with mascarpone",
    price: "$7.50",
    category: "Desserts" as const,
  },
  {
    id: "dessert-2",
    name: "Cheesecake",
    description: "Creamy cheesecake with berry compote",
    price: "$7.00",
    category: "Desserts" as const,
  },
  // Beverages
  {
    id: "beverage-1",
    name: "Red Wine (Glass)",
    description: "A selection of Italian reds",
    price: "$10.00",
    category: "Beverages" as const,
  },
  {
    id: "beverage-2",
    name: "White Wine (Glass)",
    description: "Crisp and refreshing",
    price: "$9.00",
    category: "Beverages" as const,
  },
  {
    id: "beverage-3",
    name: "Craft Beer",
    description: "Local artisan brews",
    price: "$6.00",
    category: "Beverages" as const,
  },
  {
    id: "beverage-4",
    name: "Espresso",
    description: "Strong and aromatic",
    price: "$3.00",
    category: "Beverages" as const,
  },
];

export const galleryImages = [
  {
    id: "gallery-1",
    src: "/gallery-cafe-interior.webp",
    alt: "Cafe interior with cozy lighting",
  },
  {
    id: "gallery-2",
    src: "/gallery-ribeye-steak.webp",
    alt: "Juicy ribeye steak on a plate",
  },
  {
    id: "gallery-3",
    src: "/gallery-special-event.webp",
    alt: "Special event platter with various dishes",
  },
];

export const aboutInfo = {
  title: "About Café Fausse",
  description:
    "Founded in 2010 by Chef Antonio Rossi and restaurateur Maria Lopez, Café Fausse blends traditional Italian flavors with modern culinary innovation. Our mission is to provide an unforgettable dining experience that reflects both quality and creativity.",
  history: {
    founding:
      "Founded in 2010, Café Fausse emerged from a shared vision between Chef Antonio Rossi and restaurateur Maria Lopez to create a dining destination that honors traditional Italian culinary heritage while embracing modern innovation.",
    mission:
      "Our mission is to provide an unforgettable dining experience that reflects both quality and creativity, bringing together the finest locally-sourced ingredients with time-honored Italian techniques.",
    commitment:
      "We are committed to delivering excellent food through our dedication to locally-sourced ingredients, sustainable practices, and culinary innovation. Every dish tells a story of our heritage and passion for exceptional dining.",
  },
  founders: [
    {
      id: "founder-1",
      name: "Chef Antonio Rossi",
      role: "Executive Chef & Co-Founder",
      biography:
        "Born in Tuscany, Italy, Chef Antonio Rossi brings over 20 years of culinary expertise to Café Fausse. Trained in the traditional kitchens of Florence and Rome, Antonio's passion for authentic Italian cuisine is matched only by his innovative approach to modern gastronomy. His commitment to locally-sourced ingredients and seasonal menus has earned Café Fausse recognition as a premier dining destination. Antonio believes that every meal should be a celebration of both tradition and creativity.",
      specialties:
        "Traditional Italian cuisine, modern gastronomy, seasonal menu creation",
    },
    {
      id: "founder-2",
      name: "Maria Lopez",
      role: "Restaurant Owner & Co-Founder",
      biography:
        "Maria Lopez, a seasoned restaurateur with over 15 years in hospitality management, co-founded Café Fausse with a vision to create more than just a restaurant—a place where community, culture, and cuisine converge. Her background in business management and deep appreciation for Italian culture has shaped Café Fausse into a welcoming space that prioritizes both exceptional service and authentic experiences. Maria oversees operations while ensuring that every guest feels like family.",
      specialties:
        "Hospitality management, wine curation, guest experience design",
    },
  ],
};

export const reviews = [
  {
    id: "review-1",
    author: "Maria S.",
    text: "Amazing food and cozy atmosphere! The ribeye steak was perfectly cooked.",
    rating: 5,
  },
  {
    id: "review-2",
    author: "John D.",
    text: "Outstanding service and incredible flavors. A must-visit restaurant!",
    rating: 5,
  },
  {
    id: "review-3",
    author: "Sarah L.",
    text: "Beautiful ambiance and exceptional cuisine. Will definitely return!",
    rating: 4,
  },
  {
    id: "review-4",
    author: "Carlos M.",
    text: "Good food overall, but the service was a bit slow during peak hours.",
    rating: 4,
  },
  {
    id: "review-5",
    author: "Emma W.",
    text: "The atmosphere is nice but the food was just okay. Expected more for the price.",
    rating: 3,
  },
  {
    id: "review-6",
    author: "David R.",
    text: "Decent place but nothing special. The coffee was average.",
    rating: 3,
  },
  {
    id: "review-7",
    author: "Lisa K.",
    text: "Disappointed with the experience. Food was cold and service was poor.",
    rating: 2,
  },
  {
    id: "review-8",
    author: "Mike T.",
    text: "Very long wait times and the food didn't meet expectations.",
    rating: 2,
  },
  {
    id: "review-9",
    author: "Amanda J.",
    text: "Terrible experience. Food was undercooked and the staff was rude.",
    rating: 1,
  },
  {
    id: "review-10",
    author: "Robert H.",
    text: "Worst meal I've had in years. Would not recommend to anyone.",
    rating: 1,
  },
];

export const awards = [
  {
    id: "award-1",
    year: 2024,
    title: "Best New Restaurant - City Food Awards",
  },
  {
    id: "award-2",
    year: 2024,
    title: "Top 10 Cafes in the City - Local Magazine",
  },
  {
    id: "award-3",
    year: 2023,
    title: "Excellence in Culinary Innovation - Chef's Association",
  },
];

export const contactInfo = {
  address: "1234 Culinary Ave, Suite 100, Washington, DC 20002",
  phone: "(202) 555-4567",
  email: "reservations@cafefausse.com",
  hours: {
    weekdays: "Monday–Saturday: 5:00 PM – 11:00 PM",
    weekends: "Sunday: 5:00 PM – 9:00 PM",
  },
};

// Unavailable time slots for demonstration
export const unavailableSlots = [
  // Today (2025-08-23) - some evening slots booked
  {
    date: "2025-08-23",
    timeSlots: ["19:00", "19:30", "20:00", "20:30"],
  },
  // Tomorrow (2025-08-24) - busy Saturday night
  {
    date: "2025-08-24",
    timeSlots: ["18:00", "18:30", "19:00", "19:30", "20:00", "21:00", "21:30"],
  },
  // Sunday (2025-08-25) - popular brunch/dinner times
  {
    date: "2025-08-25",
    timeSlots: ["17:00", "17:30", "18:00", "19:00", "20:00"],
  },
  // Monday (2025-08-26) - private event
  {
    date: "2025-08-26",
    timeSlots: ["18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00"],
  },
  // Wednesday (2025-08-28) - partially booked
  {
    date: "2025-08-28",
    timeSlots: ["17:30", "18:00", "19:30", "20:00"],
  },
];
