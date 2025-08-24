import { useState, useEffect } from "react";
import { apiGet, GalleryApiResponse, Award, Review } from "@/utils";

export const useAwardsReviews = () => {
  // State management
  const [awards, setAwards] = useState<Award[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  // API functions
  const fetchAwardsReviewsData = async () => {
    try {
      setLoading(true);
      const data = await apiGet<GalleryApiResponse>("/api/gallery");
      setAwards(data.awards);
      setReviews(data.reviews);
    } catch (error) {
      console.error("Failed to fetch awards and reviews data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchAwardsReviewsData();
  }, []);

  return {
    // State
    awards,
    reviews,
    loading,

    // API actions
    fetchAwardsReviewsData,
  };
};
