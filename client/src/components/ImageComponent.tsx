"use client";
import React, { useState } from "react";
import Image from "next/image";

interface ImageComponentProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  placeholderText?: string;
  fill?: boolean;
  sizes?: string;
}

const ImageComponent: React.FC<ImageComponentProps> = ({
  src,
  alt,
  width,
  height,
  className = "",
  priority = false,
  placeholderText = "Image",
  fill = false,
  sizes,
}) => {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Create SVG placeholder function
  const createPlaceholder = () => {
    const svgContent = `
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#e5e7eb"/>
        <text x="50%" y="50%" text-anchor="middle" dy=".3em" font-family="system-ui, sans-serif" font-size="16" fill="#6b7280">
          ${placeholderText}
        </text>
      </svg>
    `;
    return `data:image/svg+xml;base64,${btoa(svgContent)}`;
  };

  // If image failed to load, show SVG placeholder using Next.js Image
  if (imageError) {
    return (
      <div
        className={`relative ${className}`}
        style={fill ? { width: "100%", height: "100%" } : { width, height }}
      >
        <Image
          src={createPlaceholder()}
          alt={alt}
          width={fill ? undefined : width}
          height={fill ? undefined : height}
          fill={fill}
          className={fill ? "object-cover" : "w-full h-full object-cover"}
          style={{ objectFit: "cover" }}
          unoptimized
        />
      </div>
    );
  }

  // Main image component with loading state
  return (
    <div
      className={`relative ${className}`}
      style={fill ? { width: "100%", height: "100%" } : { width, height }}
    >
      {isLoading && (
        <div
          className="absolute inset-0 bg-gray-100 dark:bg-neutral-700 flex items-center justify-center animate-pulse z-10"
          style={fill ? { width: "100%", height: "100%" } : { width, height }}
        >
          <span className="text-gray-400 dark:text-neutral-500 text-sm">
            Loading...
          </span>
        </div>
      )}
      <Image
        src={src}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        fill={fill}
        sizes={sizes}
        className={`${
          isLoading ? "opacity-0" : "opacity-100"
        } transition-opacity duration-300 ${
          fill ? "object-cover" : "w-full h-full object-cover"
        }`}
        priority={priority}
        onLoad={() => setIsLoading(false)}
        onError={(e) => {
          console.error(`Failed to load image: ${src}`, e);
          setImageError(true);
          setIsLoading(false);
        }}
        style={{ objectFit: "cover" }}
        unoptimized
      />
    </div>
  );
};

export default ImageComponent;
