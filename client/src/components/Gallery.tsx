"use client";
import React from "react";
import ImageComponent from "@/components/ImageComponent";
import Loading from "@/components/Loading";
import { useGallery, useAwardsReviews } from "@/hooks";

const Gallery: React.FC = () => {
  const {
    galleryImages,
    loading,
    isLightboxOpen,
    currentImage,
    currentImageIndex,
    openLightbox,
    closeLightbox,
    goToPrevious,
    goToNext,
  } = useGallery();

  const { awards, reviews } = useAwardsReviews();

  if (loading) return <Loading message="Loading gallery..." />;

  return (
    <div className="bg-gradient-to-b from-primary-50 to-accent-50 dark:from-neutral-900 dark:to-neutral-800 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <main className="max-w-7xl mx-auto" aria-labelledby="gallery-title">
          <header className="text-center mb-16">
            <h1
              id="gallery-title"
              className="text-4xl md:text-6xl lg:text-7xl font-poppins font-bold text-primary-900 dark:text-accent-200 mb-6 tracking-tight leading-none"
            >
              Our Gallery
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-primary-700 dark:text-accent-300 font-roboto max-w-4xl mx-auto leading-snug mb-6">
              Discover the beauty and ambiance that makes Café Fausse
              extraordinary
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-accent-400 to-secondary-400 mx-auto rounded-full"></div>
          </header>
          <section aria-label="Gallery images" className="mb-16">
            <div className="bg-white dark:bg-neutral-800 rounded-3xl shadow-2xl overflow-hidden border border-accent-200 dark:border-neutral-700 p-6 md:p-8 lg:p-12">
              <ul className="gallery-grid grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
                {galleryImages.map((img, idx) => (
                  <li
                    key={img.id}
                    className="group relative aspect-square overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer list-none bg-neutral-100 dark:bg-neutral-700"
                    tabIndex={0}
                    aria-label={img.alt}
                    onClick={() => openLightbox(idx)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") openLightbox(idx);
                    }}
                  >
                    <ImageComponent
                      src={img.src}
                      alt={img.alt}
                      className="w-full h-full group-hover:scale-110 transition-transform duration-700"
                      width={400}
                      height={400}
                      fill={true}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      placeholderText="Gallery Image"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-900/60 via-primary-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="text-white font-poppins font-bold text-lg md:text-xl mb-2 drop-shadow-lg">
                        {img.alt}
                      </h3>
                      <p className="text-accent-100 text-sm md:text-base font-roboto drop-shadow-md">
                        Experience the elegance
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Awards Section */}
          <section aria-label="Awards and Recognition" className="mb-16">
            <div className="bg-white dark:bg-neutral-800 rounded-3xl shadow-2xl overflow-hidden border border-accent-200 dark:border-neutral-700 p-6 md:p-8 lg:p-12">
              <header className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-poppins font-bold text-primary-900 dark:text-accent-200 mb-4 tracking-tight">
                  Our Awards
                </h2>
                <p className="text-lg md:text-xl text-primary-700 dark:text-accent-300 font-roboto">
                  Recognition of our commitment to culinary excellence
                </p>
              </header>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {awards.map((award) => (
                  <div
                    key={award.id}
                    className="bg-gradient-to-br from-accent-50 to-secondary-50 dark:from-neutral-700 dark:to-neutral-600 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 text-center border border-accent-200 dark:border-neutral-600 transform hover:-translate-y-1"
                  >
                    <div className="mb-6">
                      <div className="w-20 h-20 bg-gradient-to-br from-accent-400 to-secondary-400 rounded-full mx-auto flex items-center justify-center shadow-lg">
                        <span className="text-3xl text-white">🏆</span>
                      </div>
                    </div>
                    <h3 className="text-xl md:text-2xl font-poppins font-semibold text-primary-900 dark:text-accent-200 mb-3">
                      {award.title}
                    </h3>
                    <p className="text-primary-700 dark:text-accent-300 font-roboto mb-4 leading-relaxed">
                      {award.description}
                    </p>
                    <span className="inline-block bg-gradient-to-r from-accent-400 to-secondary-400 text-white px-4 py-2 rounded-full text-sm font-medium shadow-md">
                      {award.year}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Reviews Section */}
          <section aria-label="Critical Reviews">
            <div className="bg-white dark:bg-neutral-800 rounded-3xl shadow-2xl overflow-hidden border border-accent-200 dark:border-neutral-700 p-6 md:p-8 lg:p-12">
              <header className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-poppins font-bold text-primary-900 dark:text-accent-200 mb-4 tracking-tight">
                  Reviews
                </h2>
                <p className="text-lg md:text-xl text-primary-700 dark:text-accent-300 font-roboto">
                  Recognition from culinary experts and renowned publications
                </p>
              </header>

              {/* Reviews Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {reviews.map((review) => (
                  <div
                    key={review.id}
                    className="bg-gradient-to-br from-accent-50 to-secondary-50 dark:from-neutral-700 dark:to-neutral-600 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-accent-200 dark:border-neutral-600 transform hover:-translate-y-1"
                  >
                    <blockquote className="text-primary-700 dark:text-accent-300 mb-4 italic font-roboto leading-relaxed text-lg">
                      &ldquo;{review.text}&rdquo;
                    </blockquote>
                    <cite className="text-sm font-poppins font-medium text-primary-900 dark:text-accent-200">
                      — {review.author}
                    </cite>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {isLightboxOpen && currentImage && (
            <div
              className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-2 md:p-4"
              onClick={closeLightbox}
              role="dialog"
              aria-modal="true"
              aria-label="Image lightbox view"
            >
              {/* Main lightbox container */}
              <div
                className="relative w-full h-full max-w-6xl max-h-[90vh] flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Previous arrow - desktop only */}
                {galleryImages.length > 1 && (
                  <button
                    className="hidden md:block absolute left-[-60px] top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-all duration-200 z-10"
                    onClick={goToPrevious}
                    aria-label="Previous image"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <polyline points="15,18 9,12 15,6"></polyline>
                    </svg>
                  </button>
                )}

                {/* Image container with dynamic sizing */}
                <div className="relative rounded-lg shadow-2xl overflow-hidden w-full h-full max-w-4xl max-h-[80vh]">
                  <ImageComponent
                    src={currentImage.src}
                    alt={currentImage.alt}
                    width={800}
                    height={600}
                    className="w-full h-full object-contain"
                    placeholderText="Loading Image..."
                  />

                  {/* Close button */}
                  <button
                    className="absolute top-2 right-2 md:top-4 md:right-4 bg-black/50 hover:bg-black/70 text-white p-2 md:p-3 rounded-full transition-all duration-200 z-20"
                    onClick={closeLightbox}
                    aria-label="Close lightbox"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="md:w-6 md:h-6"
                    >
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>

                  {/* Mobile navigation arrows */}
                  {galleryImages.length > 1 && (
                    <>
                      <button
                        className="md:hidden absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 z-20"
                        onClick={goToPrevious}
                        aria-label="Previous image"
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <polyline points="15,18 9,12 15,6"></polyline>
                        </svg>
                      </button>
                      <button
                        className="md:hidden absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 z-20"
                        onClick={goToNext}
                        aria-label="Next image"
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <polyline points="9,18 15,12 9,6"></polyline>
                        </svg>
                      </button>
                    </>
                  )}

                  {/* Image counter */}
                  {galleryImages.length > 1 && currentImageIndex !== null && (
                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-3 py-1 rounded-full text-xs md:text-sm font-medium">
                      {currentImageIndex + 1} / {galleryImages.length}
                    </div>
                  )}
                </div>

                {/* Next arrow - desktop only */}
                {galleryImages.length > 1 && (
                  <button
                    className="hidden md:block absolute right-[-60px] top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-all duration-200 z-10"
                    onClick={goToNext}
                    aria-label="Next image"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <polyline points="9,18 15,12 9,6"></polyline>
                    </svg>
                  </button>
                )}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Gallery;
