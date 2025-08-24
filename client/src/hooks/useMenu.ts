import { useState, useEffect } from "react";
import { apiGet, MenuItem, MenuApiResponse } from "@/utils";

export const useMenu = () => {
  // State management
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  // API functions
  const fetchMenuData = async () => {
    try {
      setLoading(true);
      const data = await apiGet<MenuApiResponse>("/api/menu");
      setMenuItems(data.menuItems);
    } catch (error) {
      console.error("Failed to fetch menu data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Group menu items by category
  const groupedMenuItems = menuItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, MenuItem[]>);

  // Initial data fetch
  useEffect(() => {
    fetchMenuData();
  }, []);

  return {
    // State
    menuItems,
    groupedMenuItems,
    loading,

    // API actions
    fetchMenuData,
  };
};
