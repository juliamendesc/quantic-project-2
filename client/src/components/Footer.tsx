"use client";
import React from "react";
import Link from "next/link";
import { useContact } from "@/hooks";

const Footer: React.FC = () => {
  const { contactInfo, loading } = useContact();

  if (loading) {
    return null; // Don't show footer while loading
  }

  return (
    <footer className="bg-gradient-to-r from-primary-900 via-neutral-900 to-primary-900 dark:from-primary-950 dark:via-neutral-950 dark:to-primary-950 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-poppins font-bold text-accent-200 mb-4">
              Café Fausse
            </h3>
            <p className="text-accent-100 font-roboto text-sm leading-relaxed mb-4">
              A unique gastronomic experience that combines tradition and
              innovation. Where culinary artistry meets sophisticated ambiance.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-poppins font-semibold text-accent-200 mb-4">
              Quick Links
            </h4>
            <nav className="space-y-2">
              <Link
                href="/menu"
                className="block text-accent-100 hover:text-accent-300 font-roboto text-sm transition-colors duration-300"
              >
                Menu
              </Link>
              <Link
                href="/reservations"
                className="block text-accent-100 hover:text-accent-300 font-roboto text-sm transition-colors duration-300"
              >
                Reservations
              </Link>
              <Link
                href="/about"
                className="block text-accent-100 hover:text-accent-300 font-roboto text-sm transition-colors duration-300"
              >
                About Us
              </Link>
              <Link
                href="/gallery"
                className="block text-accent-100 hover:text-accent-300 font-roboto text-sm transition-colors duration-300"
              >
                Gallery
              </Link>
              <Link
                href="/newsletter"
                className="block text-accent-100 hover:text-accent-300 font-roboto text-sm transition-colors duration-300"
              >
                Newsletter
              </Link>
            </nav>
          </div>

          {/* Contact Information */}
          {contactInfo && (
            <div>
              <h4 className="text-lg font-poppins font-semibold text-accent-200 mb-4">
                Contact Info
              </h4>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <svg
                    className="w-4 h-4 text-accent-400 mt-0.5 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="text-accent-100 font-roboto text-sm">
                    {contactInfo.address}
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <svg
                    className="w-4 h-4 text-accent-400 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <a
                    href={`tel:${contactInfo.phone}`}
                    className="text-accent-100 hover:text-accent-300 font-roboto text-sm transition-colors duration-300"
                  >
                    {contactInfo.phone}
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <svg
                    className="w-4 h-4 text-accent-400 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="text-accent-100 hover:text-accent-300 font-roboto text-sm transition-colors duration-300"
                  >
                    {contactInfo.email}
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Hours */}
          {contactInfo && (
            <div>
              <h4 className="text-lg font-poppins font-semibold text-accent-200 mb-4">
                Hours
              </h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <svg
                    className="w-4 h-4 text-accent-400 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div>
                    <p className="text-accent-100 font-roboto text-sm">
                      {contactInfo.hours.weekdays}
                    </p>
                    <p className="text-accent-100 font-roboto text-sm">
                      {contactInfo.hours.weekends}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-primary-800 dark:border-primary-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-accent-200 font-roboto text-sm">
              © {new Date().getFullYear()} Café Fausse. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link
                href="/privacy"
                className="text-accent-100 hover:text-accent-300 font-roboto text-sm transition-colors duration-300"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-accent-100 hover:text-accent-300 font-roboto text-sm transition-colors duration-300"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
