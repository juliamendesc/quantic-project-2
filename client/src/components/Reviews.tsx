"use client";
import React, { useState } from "react";
import type { Review } from "@/utils";

interface ReviewsProps {
  reviews: Review[];
}

const Reviews: React.FC<ReviewsProps> = ({ reviews }) => {
  const [filterRating, setFilterRating] = useState<number>(0);
  const [sortedReviews, setSortedReviews] = useState<Review[]>(reviews);

  const displayReviews =
    filterRating > 0
      ? reviews.filter((review) => review.rating >= filterRating)
      : sortedReviews.length > 0
      ? sortedReviews
      : reviews;

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, review) => sum + review.rating, 0) /
          reviews.length
        ).toFixed(1)
      : "0";

  const sortReviewsByRating = () => {
    const sorted = [...reviews].sort((a, b) => b.rating - a.rating);
    setSortedReviews(sorted);
  };

  const renderStars = (rating: number = 5) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`w-4 h-4 ${
          i < rating ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"
        }`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <section aria-labelledby="reviews-title" className="mb-16">
      <div className="bg-white dark:bg-neutral-800 rounded-3xl shadow-2xl overflow-hidden border border-accent-200 dark:border-neutral-700 p-6 md:p-8 lg:p-12">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-12 gap-4">
          <div>
            <h3
              id="reviews-title"
              className="text-3xl md:text-4xl lg:text-5xl font-poppins font-bold text-primary-900 dark:text-accent-200 mb-2"
            >
              Customer Reviews
            </h3>
            {reviews.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-lg text-primary-700 dark:text-accent-300 font-roboto">
                  Average Rating: {averageRating}
                </span>
                <div className="flex">
                  {renderStars(Math.round(parseFloat(averageRating)))}
                </div>
              </div>
            )}
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {reviews.length > 1 && (
              <button
                onClick={sortReviewsByRating}
                className="bg-gradient-to-r from-accent-500 to-secondary-500 hover:from-accent-600 hover:to-secondary-600 text-white font-poppins font-semibold px-6 py-3 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                title="Sort by rating"
              >
                Sort by Rating
              </button>
            )}
            {reviews.length > 0 && (
              <select
                value={filterRating}
                onChange={(e) => setFilterRating(Number(e.target.value))}
                className="bg-white dark:bg-neutral-700 border-2 border-primary-200 dark:border-primary-600 rounded-2xl px-4 py-3 font-roboto text-primary-900 dark:text-accent-100 focus:outline-none focus:ring-4 focus:ring-accent-400/40 focus:border-accent-500 transition-all duration-300"
              >
                <option value={0}>All Reviews</option>
                <option value={5}>5 Stars</option>
                <option value={4}>4+ Stars</option>
                <option value={3}>3+ Stars</option>
              </select>
            )}
          </div>
        </div>
        {displayReviews.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            {displayReviews.map((review: Review, idx: number) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-primary-50/80 to-accent-50/80 dark:from-primary-900/20 dark:to-neutral-800/20 rounded-2xl p-6 md:p-8 border border-accent-200/30 dark:border-primary-700/30 hover:shadow-xl transition-all duration-500 group"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="font-poppins font-bold text-lg md:text-xl text-primary-900 dark:text-accent-200 group-hover:text-accent-600 dark:group-hover:text-accent-300 transition-colors duration-300">
                        {review.author}
                      </span>
                      <div className="flex items-center">
                        {renderStars(review.rating)}
                      </div>
                    </div>
                  </div>
                  <blockquote className="text-primary-700 dark:text-accent-300 italic font-roboto text-base md:text-lg leading-relaxed border-l-4 border-accent-400 pl-6">
                    &ldquo;{review.text}&rdquo;
                  </blockquote>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gradient-to-br from-primary-50/80 to-accent-50/80 dark:from-primary-900/20 dark:to-neutral-800/20 rounded-2xl p-12 text-center border border-accent-200/30 dark:border-primary-700/30">
            <p className="text-primary-700 dark:text-accent-300 italic font-roboto text-lg">
              {filterRating > 0
                ? `No reviews with ${filterRating}+ stars found.`
                : "No reviews available yet."}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Reviews;
