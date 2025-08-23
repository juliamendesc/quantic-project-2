import { useState, useEffect } from "react";
import { apiGet, ContactInfo, ContactApiResponse } from "@/utils";

export const useContact = () => {
  // State management
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const [loading, setLoading] = useState(true);

  // API functions
  const fetchContactData = async () => {
    try {
      setLoading(true);
      const data = await apiGet<ContactApiResponse>("/api/contact");
      setContactInfo(data.contactInfo);
    } catch (error) {
      console.error("Failed to fetch contact data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchContactData();
  }, []);

  return {
    // State
    contactInfo,
    loading,

    // API actions
    fetchContactData,
  };
};
