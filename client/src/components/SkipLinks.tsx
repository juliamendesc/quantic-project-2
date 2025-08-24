"use client";
import React from "react";

const SkipLinks: React.FC = () => {
  return (
    <div className="skip-links">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-accent-600 text-white px-4 py-2 rounded-md font-poppins font-semibold transition-all duration-200 focus:ring-2 focus:ring-accent-400 focus:ring-offset-2"
      >
        Skip to main content
      </a>
      <a
        href="#primary-navigation"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-48 z-50 bg-accent-600 text-white px-4 py-2 rounded-md font-poppins font-semibold transition-all duration-200 focus:ring-2 focus:ring-accent-400 focus:ring-offset-2"
      >
        Skip to navigation
      </a>
    </div>
  );
};

export default SkipLinks;
