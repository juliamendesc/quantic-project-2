"use client";
import React, { useEffect, useState } from "react";
import { apiGet, MenuItem, MenuApiResponse } from "@/utils";

const Menu: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiGet<MenuApiResponse>("/api/menu")
      .then((data) => {
        setMenuItems(data.menuItems);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="bg-gradient-to-b from-primary-50 to-accent-50 dark:from-neutral-900 dark:to-neutral-800 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <main className="max-w-6xl mx-auto" aria-labelledby="menu-title">
          <header className="text-center mb-16">
            <h1
              id="menu-title"
              className="text-4xl md:text-6xl lg:text-7xl font-poppins font-bold text-primary-900 dark:text-accent-200 mb-6 tracking-tight leading-none"
            >
              Our Menu
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-primary-700 dark:text-accent-300 font-roboto max-w-4xl mx-auto leading-snug mb-6">
              Discover culinary masterpieces crafted with passion and expertise
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-accent-400 to-secondary-400 mx-auto rounded-full"></div>
          </header>
          <section aria-label="Menu items">
            {loading ? (
              <div className="bg-white dark:bg-neutral-800 rounded-3xl shadow-2xl border border-accent-200 dark:border-neutral-700 p-12 text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-accent-500 mb-6"></div>
                <p className="text-xl text-primary-700 dark:text-accent-300 font-roboto">
                  Loading our exquisite menu...
                </p>
              </div>
            ) : (
              <div className="bg-white dark:bg-neutral-800 rounded-3xl shadow-2xl overflow-hidden border border-accent-200 dark:border-neutral-700 p-6 md:p-8 lg:p-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
                  {menuItems.map((item) => (
                    <div
                      key={item.id}
                      className="bg-gradient-to-br from-primary-50/80 to-accent-50/80 dark:from-primary-900/20 dark:to-neutral-800/20 rounded-2xl p-6 md:p-8 border border-primary-200/40 dark:border-primary-700/40 hover:shadow-xl transition-all duration-500 group"
                    >
                      <div className="flex flex-col gap-4">
                        <div className="flex-1">
                          <h3 className="font-poppins font-bold text-xl md:text-2xl lg:text-3xl text-primary-900 dark:text-accent-200 mb-4 group-hover:text-accent-600 dark:group-hover:text-accent-300 transition-colors duration-300">
                            {item.name}
                          </h3>
                          <p className="text-primary-700 dark:text-accent-300 font-roboto text-base md:text-lg leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                        <div className="flex justify-end">
                          <span className="inline-block bg-gradient-to-r from-accent-500 to-secondary-500 text-white font-poppins font-bold px-6 py-3 rounded-2xl text-xl md:text-2xl shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                            {item.price}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
};

export default Menu;
