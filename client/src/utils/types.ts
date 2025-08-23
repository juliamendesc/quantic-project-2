// Centralized type definitions for the application

// Menu related types
export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  category: "Starters" | "Main Courses" | "Desserts" | "Beverages";
}

// About page types
export interface Founder {
  id: string;
  name: string;
  role: string;
}

export interface AboutInfo {
  title: string;
  description: string;
  founders: Founder[];
}

// Gallery types
export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
}

export interface Award {
  id: string;
  year: number;
  title: string;
}

export interface Review {
  id: string;
  author: string;
  text: string;
  rating: number;
}

// Contact types
export interface ContactInfo {
  address: string;
  phone: string;
  email: string;
  hours: {
    weekdays: string;
    weekends: string;
  };
}

// Reservation types
export interface ReservationForm {
  time: string;
  guests: number;
  name: string;
  email: string;
  phone?: string;
}

// API Response types
export interface ApiResponse<T> {
  data?: T;
  message?: string;
  error?: string;
}

export interface MenuApiResponse {
  menuItems: MenuItem[];
}

export interface GalleryApiResponse {
  galleryImages: GalleryImage[];
  awards: Award[];
  reviews: Review[];
}

export interface AboutApiResponse {
  aboutInfo: AboutInfo;
}

export interface ContactApiResponse {
  contactInfo: ContactInfo;
}

export interface NewsletterApiResponse {
  message: string;
  email?: string;
}

export interface ReservationApiResponse {
  message: string;
  data?: ReservationForm;
}
