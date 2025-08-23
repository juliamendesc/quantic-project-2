// src/mocks/serverData.ts
// This file mocks all data that would be fetched from the server for dumb components.

export const menuItems = [
  {
    name: "Ribeye Steak",
    description: "Juicy ribeye steak grilled to perfection.",
    price: "$32",
  },
  {
    name: "Special Event Platter",
    description: "A selection of our finest dishes for special occasions.",
    price: "$55",
  },
  {
    name: "Cafe Latte",
    description: "Rich espresso with steamed milk.",
    price: "$5",
  },
];

export const galleryImages = [
  {
    src: "/gallery-cafe-interior.webp",
    alt: "Cafe interior with cozy lighting",
  },
  { src: "/gallery-ribeye-steak.webp", alt: "Juicy ribeye steak on a plate" },
  {
    src: "/gallery-special-event.webp",
    alt: "Special event platter with various dishes",
  },
];

export const aboutInfo = {
  title: "About Us",
  description:
    "Founded in 2021, our restaurant brings together the best of local cuisine and international flavors. Our passionate team of chefs and staff are dedicated to providing an exceptional dining experience with fresh, locally-sourced ingredients and innovative culinary techniques.",
  founders: [
    { name: "Julia Mendes", role: "Head Chef & Co-Founder" },
    { name: "Alex Costa", role: "General Manager & Co-Founder" },
  ],
};

export const reviews = [
  {
    author: "Maria S.",
    text: "Amazing food and cozy atmosphere! The ribeye steak was perfectly cooked.",
  },
  {
    author: "John D.",
    text: "Outstanding service and incredible flavors. A must-visit restaurant!",
  },
  {
    author: "Sarah L.",
    text: "Beautiful ambiance and exceptional cuisine. Will definitely return!",
  },
];

export const awards = [
  { year: 2024, title: "Best New Restaurant - City Food Awards" },
  { year: 2024, title: "Top 10 Cafes in the City - Local Magazine" },
  {
    year: 2023,
    title: "Excellence in Culinary Innovation - Chef's Association",
  },
];

export const contactInfo = {
  address: "123 Heritage Street, Downtown District",
  phone: "+1 (555) 123-4567",
  email: "reservations@cafefausse.com",
  hours: {
    weekdays: "Monday - Friday: 7:00 AM - 10:00 PM",
    weekends: "Saturday - Sunday: 8:00 AM - 11:00 PM",
  },
};
