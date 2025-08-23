"use client";
import React from "react";
import { useMenu } from "@/hooks";
import Loading from "@/components/Loading";

const Menu: React.FC = () => {
  const { groupedMenuItems, loading } = useMenu();

  if (loading) {
    return <Loading message="Loading our exquisite menu..." />;
  }

  // Define the order of categories
  const categoryOrder = ["Starters", "Main Courses", "Desserts", "Beverages"];

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

          <div className="space-y-16">
            {categoryOrder.map((category) => {
              const items = groupedMenuItems[category];
              if (!items || items.length === 0) return null;

              return (
                <section
                  key={category}
                  aria-labelledby={`${category
                    .toLowerCase()
                    .replace(" ", "-")}-title`}
                >
                  <div className="bg-white dark:bg-neutral-800 rounded-3xl shadow-2xl overflow-hidden border border-accent-200 dark:border-neutral-700 p-6 md:p-8 lg:p-12">
                    <h2
                      id={`${category.toLowerCase().replace(" ", "-")}-title`}
                      className="text-3xl md:text-4xl lg:text-5xl font-poppins font-bold text-primary-900 dark:text-accent-200 mb-8 text-center"
                    >
                      {category}
                    </h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                      {items.map((item) => (
                        <div
                          key={item.id}
                          className="bg-gradient-to-br from-primary-50/80 to-accent-50/80 dark:from-primary-900/20 dark:to-neutral-800/20 rounded-2xl p-6 md:p-8 border border-primary-200/40 dark:border-primary-700/40 hover:shadow-xl transition-all duration-500 group"
                        >
                          <div className="flex justify-between items-start gap-4">
                            <div className="flex-1">
                              <h3 className="font-poppins font-bold text-xl md:text-2xl text-primary-900 dark:text-accent-200 mb-3 group-hover:text-accent-600 dark:group-hover:text-accent-300 transition-colors duration-300">
                                {item.name}
                              </h3>
                              <p className="text-primary-700 dark:text-accent-300 font-roboto text-base md:text-lg leading-relaxed">
                                {item.description}
                              </p>
                            </div>
                            <div className="flex-shrink-0">
                              <span className="inline-block bg-gradient-to-r from-accent-500 to-secondary-500 text-white font-poppins font-bold px-4 py-2 rounded-xl text-lg md:text-xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                                {item.price}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Menu;
