import { useState, useEffect, useCallback } from "react";
import {
  apiGet,
  GalleryApiResponse,
  GalleryImage,
  Award,
  Review,
} from "@/utils";

export const useGallery = () => {
  // State management
  const [currentImageIndex, setCurrentImageIndex] = useState<number | null>(
    null
  );
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [awards, setAwards] = useState<Award[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  // Derived state
  const isLightboxOpen = currentImageIndex !== null;
  const currentImage = isLightboxOpen ? galleryImages[currentImageIndex] : null;

  // Lightbox navigation functions
  const openLightbox = useCallback((index: number) => {
    setCurrentImageIndex(index);
  }, []);

  const closeLightbox = useCallback(() => {
    setCurrentImageIndex(null);
  }, []);

  const goToPrevious = useCallback(() => {
    if (currentImageIndex !== null && galleryImages.length > 0) {
      setCurrentImageIndex(
        currentImageIndex === 0
          ? galleryImages.length - 1
          : currentImageIndex - 1
      );
    }
  }, [currentImageIndex, galleryImages.length]);

  const goToNext = useCallback(() => {
    if (currentImageIndex !== null && galleryImages.length > 0) {
      setCurrentImageIndex(
        currentImageIndex === galleryImages.length - 1
          ? 0
          : currentImageIndex + 1
      );
    }
  }, [currentImageIndex, galleryImages.length]);

  // API functions
  const fetchGalleryData = async () => {
    try {
      setLoading(true);
      const data = await apiGet<GalleryApiResponse>("/api/gallery");
      setGalleryImages(data.galleryImages);
      setAwards(data.awards);
      setReviews(data.reviews);
    } catch (error) {
      console.error("Failed to fetch gallery data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Keyboard navigation effect
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isLightboxOpen) return;

      switch (e.key) {
        case "Escape":
          closeLightbox();
          break;
        case "ArrowLeft":
          goToPrevious();
          break;
        case "ArrowRight":
          goToNext();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLightboxOpen, closeLightbox, goToPrevious, goToNext]);

  // Initial data fetch
  useEffect(() => {
    fetchGalleryData();
  }, []);

  return {
    // State
    galleryImages,
    awards,
    reviews,
    loading,

    // Lightbox state
    isLightboxOpen,
    currentImage,
    currentImageIndex,

    // Lightbox actions
    openLightbox,
    closeLightbox,
    goToPrevious,
    goToNext,

    // API actions
    fetchGalleryData,
  };
};
