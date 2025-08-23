"use client";
import React from "react";
import Awards from "@/components/Awards";
import Reviews from "@/components/Reviews";
import Loading from "@/components/Loading";
import { useAwardsReviews } from "@/hooks";

const AwardsReviewsPage: React.FC = () => {
  const { awards, reviews, loading } = useAwardsReviews();

  if (loading) return <Loading message="Loading awards and reviews..." />;

  return (
    <div className="bg-gradient-to-b from-primary-50 to-accent-50 dark:from-neutral-900 dark:to-neutral-800 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <main className="max-w-7xl mx-auto">
          <header className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-poppins font-bold text-primary-900 dark:text-accent-200 mb-6 tracking-tight leading-none">
              Awards & Reviews
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-primary-700 dark:text-accent-300 font-roboto max-w-4xl mx-auto leading-snug mb-6">
              Discover the recognition and testimonials that celebrate our
              commitment to culinary excellence
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-accent-400 to-secondary-400 mx-auto rounded-full"></div>
          </header>

          <div className="space-y-16">
            <Awards awards={awards} />
            <Reviews reviews={reviews} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AwardsReviewsPage;
