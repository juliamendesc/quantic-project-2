"use client";
import React, { useState } from "react";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const linkClasses =
    "text-primary-800 hover:text-accent-600 dark:text-accent-200 dark:hover:text-accent-300 font-poppins font-semibold transition-all duration-300 hover:scale-105 relative after:absolute after:w-0 after:h-0.5 after:bg-accent-500 after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full";

  return (
    <nav className="bg-gradient-to-r from-primary-100 via-accent-50 to-primary-100 dark:from-primary-800 dark:via-neutral-800 dark:to-primary-800 shadow-xl border-b border-accent-200 dark:border-primary-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Navigation Container */}
          <div className="flex items-baseline space-x-6">
            {/* Logo/Brand */}
            <div className="flex-shrink-0">
              <Link
                href="/"
                className="text-2xl font-poppins font-bold text-primary-900 dark:text-accent-200 hover:text-accent-600 dark:hover:text-accent-300 transition-colors duration-300"
                onClick={closeMenu}
              >
                Café Fausse
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-baseline">
              <div className="flex items-baseline space-x-8">
                <Link href="/" className={linkClasses}>
                  Home
                </Link>
                <Link href="/menu" className={linkClasses}>
                  Menu
                </Link>
                <Link href="/reservations" className={linkClasses}>
                  Reservations
                </Link>
                <Link href="/about" className={linkClasses}>
                  About Us
                </Link>
                <Link href="/gallery" className={linkClasses}>
                  Gallery
                </Link>
                <Link href="/newsletter" className={linkClasses}>
                  Newsletter
                </Link>
              </div>
            </div>
          </div>

          {/* Icons Container */}
          <div className="flex items-center space-x-4">
            {/* Mobile Theme Toggle */}
            <div className="md:hidden">
              <ThemeToggle />
            </div>

            {/* Desktop Theme Toggle */}
            <div className="hidden md:flex">
              <ThemeToggle />
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-primary-800 dark:text-accent-200 hover:text-accent-600 dark:hover:text-accent-300 hover:bg-primary-200/50 dark:hover:bg-primary-700/50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-accent-500 transition-all duration-300"
                aria-expanded="false"
                aria-label="Toggle navigation menu"
              >
                <span className="sr-only">Open main menu</span>
                {/* Hamburger icon */}
                <svg
                  className={`${
                    isMenuOpen ? "hidden" : "block"
                  } h-6 w-6 transition-transform duration-300`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                {/* Close icon */}
                <svg
                  className={`${
                    isMenuOpen ? "block" : "hidden"
                  } h-6 w-6 transition-transform duration-300`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen
            ? "max-h-96 opacity-100 visible"
            : "max-h-0 opacity-0 invisible overflow-hidden"
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 bg-gradient-to-b from-primary-50 to-accent-50 dark:from-primary-900 dark:to-neutral-900 border-t border-accent-200/50 dark:border-primary-700/50">
          <Link
            href="/"
            className="block px-3 py-3 text-primary-800 dark:text-accent-200 hover:text-accent-600 dark:hover:text-accent-300 hover:bg-primary-200/30 dark:hover:bg-primary-800/30 rounded-lg transition-all duration-300 font-poppins font-semibold"
            onClick={closeMenu}
          >
            Home
          </Link>
          <Link
            href="/menu"
            className="block px-3 py-3 text-primary-800 dark:text-accent-200 hover:text-accent-600 dark:hover:text-accent-300 hover:bg-primary-200/30 dark:hover:bg-primary-800/30 rounded-lg transition-all duration-300 font-poppins font-semibold"
            onClick={closeMenu}
          >
            Menu
          </Link>
          <Link
            href="/reservations"
            className="block px-3 py-3 text-primary-800 dark:text-accent-200 hover:text-accent-600 dark:hover:text-accent-300 hover:bg-primary-200/30 dark:hover:bg-primary-800/30 rounded-lg transition-all duration-300 font-poppins font-semibold"
            onClick={closeMenu}
          >
            Reservations
          </Link>
          <Link
            href="/about"
            className="block px-3 py-3 text-primary-800 dark:text-accent-200 hover:text-accent-600 dark:hover:text-accent-300 hover:bg-primary-200/30 dark:hover:bg-primary-800/30 rounded-lg transition-all duration-300 font-poppins font-semibold"
            onClick={closeMenu}
          >
            About Us
          </Link>
          <Link
            href="/gallery"
            className="block px-3 py-3 text-primary-800 dark:text-accent-200 hover:text-accent-600 dark:hover:text-accent-300 hover:bg-primary-200/30 dark:hover:bg-primary-800/30 rounded-lg transition-all duration-300 font-poppins font-semibold"
            onClick={closeMenu}
          >
            Gallery
          </Link>
          <Link
            href="/newsletter"
            className="block px-3 py-3 text-primary-800 dark:text-accent-200 hover:text-accent-600 dark:hover:text-accent-300 hover:bg-primary-200/30 dark:hover:bg-primary-800/30 rounded-lg transition-all duration-300 font-poppins font-semibold"
            onClick={closeMenu}
          >
            Newsletter
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
