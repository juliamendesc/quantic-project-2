/**
 * @fileoverview Static constants for the Café Fausse application
 * @description Centralized storage for static data that doesn't require API calls
 */

// Restaurant static information
export const RESTAURANT_INFO = {
  name: "Café Fausse",
  tagline: "Premium Dining Experience",
  description:
    "A unique gastronomic experience that combines tradition and innovation. Where culinary artistry meets sophisticated ambiance.",
  shortDescription:
    "Experience unique gastronomy at Café Fausse. Sophisticated dishes, cozy atmosphere, and exceptional service.",

  // Contact information (static data that rarely changes)
  contact: {
    phone: "+1 (555) 123-4567",
    email: "info@cafefausse.com",
    address: "123 Gourmet Street, Culinary District, City 12345",
    hours: {
      weekdays: "Monday - Saturday: 17:00 – 23:00",
      weekends: "Sunday: 17:00 – 21:00",
    },
  },

  // Social media links
  social: {
    facebook: "https://facebook.com/cafefausse",
    instagram: "https://instagram.com/cafefausse",
    twitter: "https://twitter.com/cafefausse",
  },
} as const;

// Navigation menu items
export const NAVIGATION_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/reservations", label: "Reservations" },
  { href: "/about", label: "About Us" },
  { href: "/gallery", label: "Gallery" },
  { href: "/newsletter", label: "Newsletter" },
] as const;

// Footer legal links
export const FOOTER_LEGAL_LINKS = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
] as const;

// Static text content
export const STATIC_CONTENT = {
  hero: {
    title: "Welcome to Café Fausse",
    subtitle: "Where Culinary Art Meets Sophistication",
    description:
      "Experience a symphony of flavors in our intimate setting, where each dish tells a story of passion, tradition, and innovation.",
  },

  newsletter: {
    title: "Join Our Culinary Journey",
    subtitle:
      "Stay connected with Café Fausse and be the first to discover our seasonal specialties, exclusive events, and culinary insights from Chef Antonio",
    benefits: [
      {
        title: "Seasonal Updates",
        description:
          "Be the first to know about our seasonal menu changes and special ingredient highlights",
        icon: "clock",
      },
      {
        title: "Exclusive Events",
        description:
          "Receive invitations to exclusive wine tastings, chef's table experiences, and special events",
        icon: "lock",
      },
      {
        title: "Culinary Insights",
        description:
          "Get behind-the-scenes stories, cooking tips, and insights from our talented culinary team",
        icon: "lightbulb",
      },
    ],
  },

  about: {
    title: "About Café Fausse",
    subtitle: "A Culinary Legacy Born from Passion",
    story:
      "Founded with a vision to create an intimate dining experience that celebrates both tradition and innovation, Café Fausse has become a cornerstone of culinary excellence.",
  },

  reservations: {
    title: "Make a Reservation",
    subtitle: "Reserve your table for an unforgettable dining experience",
    confirmationMessage: "Reservation confirmed! You have been assigned table",
  },
} as const;

// Time slots for reservations (static business logic)
export const RESERVATION_TIME_SLOTS = [
  { value: "17:00", label: "5:00 PM" },
  { value: "17:30", label: "5:30 PM" },
  { value: "18:00", label: "6:00 PM" },
  { value: "18:30", label: "6:30 PM" },
  { value: "19:00", label: "7:00 PM" },
  { value: "19:30", label: "7:30 PM" },
  { value: "20:00", label: "8:00 PM" },
  { value: "20:30", label: "8:30 PM" },
  { value: "21:00", label: "9:00 PM" },
  { value: "21:30", label: "9:30 PM" },
  { value: "22:00", label: "10:00 PM" },
] as const;

// Error messages
export const ERROR_MESSAGES = {
  FETCH_FAILED: "Failed to fetch data. Please try again.",
  NETWORK_ERROR: "Network error occurred. Please check your connection.",
  INVALID_RESPONSE: "Invalid response from server. Please try again.",
  SUBMISSION_FAILED:
    "Failed to submit data. Please verify your information and try again.",
  INVALID_EMAIL: "Please enter a valid email address.",
  FIELD_REQUIRED: "This field is required.",
  EMAIL_REQUIRED: "Email address is required",
  INVALID_EMAIL_FORMAT: "Please enter a valid email address",
  EMAIL_ALREADY_SUBSCRIBED:
    "This email is already subscribed to our newsletter",
  NEWSLETTER_ERROR: "Error subscribing to newsletter. Please try again.",
} as const;

// Success messages
export const SUCCESS_MESSAGES = {
  NEWSLETTER_SUBSCRIBED:
    "Successfully subscribed to our newsletter! Thank you for joining our culinary community.",
  RESERVATION_CONFIRMED: "Reservation confirmed! You have been assigned table",
  FORM_SUBMITTED: "Form submitted successfully!",
} as const;

// Loading messages
export const LOADING_MESSAGES = {
  LOADING: "Loading...",
  SUBMITTING: "Submitting...",
  PROCESSING: "Processing...",
  FETCHING_DATA: "Fetching data...",
  LOADING_MENU: "Loading menu items...",
  LOADING_GALLERY: "Loading gallery...",
  LOADING_AVAILABILITY: "Loading available times...",
  CHECKING_AVAILABILITY: "Checking availability...",
} as const;
