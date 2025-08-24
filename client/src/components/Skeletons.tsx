/**
 * @fileoverview Skeleton loading components for better UX
 * @description Provides visual feedback while content is loading
 */

"use client";
import React from "react";

// Base skeleton component
const SkeletonBase: React.FC<{ className?: string }> = ({ className = "" }) => (
  <div
    className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded ${className}`}
    aria-label="Loading content"
  />
);

// Menu skeleton
export const MenuSkeleton: React.FC = () => (
  <div className="space-y-8">
    {/* Header skeleton */}
    <div className="text-center space-y-4">
      <SkeletonBase className="h-12 w-64 mx-auto" />
      <SkeletonBase className="h-6 w-96 mx-auto" />
      <SkeletonBase className="h-1 w-24 mx-auto" />
    </div>

    {/* Menu categories skeleton */}
    {[1, 2, 3].map((category) => (
      <div key={category} className="space-y-6">
        <SkeletonBase className="h-8 w-48" />
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="flex justify-between items-start space-x-4"
          >
            <div className="flex-1 space-y-2">
              <SkeletonBase className="h-6 w-3/4" />
              <SkeletonBase className="h-4 w-full" />
              <SkeletonBase className="h-4 w-2/3" />
            </div>
            <SkeletonBase className="h-6 w-16" />
          </div>
        ))}
      </div>
    ))}
  </div>
);

// Gallery skeleton
export const GallerySkeleton: React.FC = () => (
  <div className="space-y-8">
    {/* Header skeleton */}
    <div className="text-center space-y-4">
      <SkeletonBase className="h-12 w-64 mx-auto" />
      <SkeletonBase className="h-6 w-96 mx-auto" />
      <SkeletonBase className="h-1 w-24 mx-auto" />
    </div>

    {/* Gallery grid skeleton */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <SkeletonBase key={item} className="aspect-square w-full" />
      ))}
    </div>

    {/* Awards section skeleton */}
    <div className="space-y-6">
      <SkeletonBase className="h-8 w-48" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((award) => (
          <div key={award} className="text-center space-y-3">
            <SkeletonBase className="h-16 w-16 rounded-full mx-auto" />
            <SkeletonBase className="h-6 w-32 mx-auto" />
            <SkeletonBase className="h-4 w-24 mx-auto" />
          </div>
        ))}
      </div>
    </div>

    {/* Reviews section skeleton */}
    <div className="space-y-6">
      <SkeletonBase className="h-8 w-48" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2].map((review) => (
          <div key={review} className="space-y-4 p-6 border rounded-lg">
            <div className="flex items-center space-x-3">
              <SkeletonBase className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <SkeletonBase className="h-5 w-24" />
                <SkeletonBase className="h-4 w-32" />
              </div>
            </div>
            <SkeletonBase className="h-4 w-full" />
            <SkeletonBase className="h-4 w-5/6" />
            <SkeletonBase className="h-4 w-4/5" />
          </div>
        ))}
      </div>
    </div>
  </div>
);

// About page skeleton
export const AboutSkeleton: React.FC = () => (
  <div className="space-y-12">
    {/* Header skeleton */}
    <div className="text-center space-y-4">
      <SkeletonBase className="h-12 w-64 mx-auto" />
      <SkeletonBase className="h-6 w-96 mx-auto" />
      <SkeletonBase className="h-1 w-24 mx-auto" />
    </div>

    {/* Content sections skeleton */}
    <div className="max-w-4xl mx-auto space-y-8">
      {[1, 2, 3].map((section) => (
        <div key={section} className="space-y-4">
          <SkeletonBase className="h-8 w-48" />
          <SkeletonBase className="h-4 w-full" />
          <SkeletonBase className="h-4 w-full" />
          <SkeletonBase className="h-4 w-3/4" />
        </div>
      ))}
    </div>

    {/* Team section skeleton */}
    <div className="space-y-6">
      <SkeletonBase className="h-8 w-48 mx-auto" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3].map((member) => (
          <div key={member} className="text-center space-y-4">
            <SkeletonBase className="h-32 w-32 rounded-full mx-auto" />
            <SkeletonBase className="h-6 w-32 mx-auto" />
            <SkeletonBase className="h-4 w-24 mx-auto" />
            <SkeletonBase className="h-4 w-full" />
            <SkeletonBase className="h-4 w-5/6 mx-auto" />
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Home page hero skeleton
export const HeroSkeleton: React.FC = () => (
  <div className="text-center space-y-6 py-24">
    <SkeletonBase className="h-16 w-96 mx-auto" />
    <SkeletonBase className="h-8 w-64 mx-auto" />
    <SkeletonBase className="h-6 w-full max-w-2xl mx-auto" />
    <SkeletonBase className="h-6 w-5/6 max-w-2xl mx-auto" />
    <SkeletonBase className="h-1 w-24 mx-auto" />
    <div className="flex justify-center space-x-4 pt-6">
      <SkeletonBase className="h-12 w-32" />
      <SkeletonBase className="h-12 w-32" />
    </div>
  </div>
);

// Card skeleton for lists
export const CardSkeleton: React.FC = () => (
  <div className="space-y-4 p-6 border rounded-lg">
    <SkeletonBase className="h-6 w-3/4" />
    <SkeletonBase className="h-4 w-full" />
    <SkeletonBase className="h-4 w-5/6" />
    <SkeletonBase className="h-4 w-4/5" />
  </div>
);

// Text block skeleton
export const TextSkeleton: React.FC<{ lines?: number }> = ({ lines = 3 }) => (
  <div className="space-y-2">
    {Array.from({ length: lines }, (_, i) => (
      <SkeletonBase
        key={i}
        className={`h-4 ${i === lines - 1 ? "w-3/4" : "w-full"}`}
      />
    ))}
  </div>
);

// Image skeleton
export const ImageSkeleton: React.FC<{ className?: string }> = ({
  className = "aspect-video w-full",
}) => <SkeletonBase className={className} />;

export default {
  MenuSkeleton,
  GallerySkeleton,
  AboutSkeleton,
  HeroSkeleton,
  CardSkeleton,
  TextSkeleton,
  ImageSkeleton,
};
