"use client";
import React, { useState, useCallback } from "react";
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
  quality?: number;
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
  quality = 80, // Optimize quality for better performance
}) => {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Optimized placeholder with base64 blurred placeholder
  const shimmer = (w: number, h: number) => `
    <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <defs>
        <linearGradient id="g">
          <stop stop-color="#f3f4f6" offset="20%" />
          <stop stop-color="#e5e7eb" offset="50%" />
          <stop stop-color="#f3f4f6" offset="70%" />
        </linearGradient>
      </defs>
      <rect width="${w}" height="${h}" fill="#f3f4f6" />
      <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
      <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
    </svg>`;

  const toBase64 = (str: string) =>
    typeof window === "undefined"
      ? Buffer.from(str).toString("base64")
      : window.btoa(str);

  // Memoized placeholder creation for performance
  const createPlaceholder = useCallback(() => {
    const svgContent = `
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#e5e7eb"/>
        <text x="50%" y="50%" text-anchor="middle" dy=".3em" font-family="system-ui, sans-serif" font-size="16" fill="#6b7280">
          ${placeholderText}
        </text>
      </svg>
    `;
    return `data:image/svg+xml;base64,${toBase64(svgContent)}`;
  }, [width, height, placeholderText]);

  // Optimized error handler
  const handleError = useCallback(() => {
    setImageError(true);
    setIsLoading(false);
  }, []);

  // Optimized load handler
  const handleLoad = useCallback(() => {
    setIsLoading(false);
  }, []);

  // If image failed to load, show optimized placeholder
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

  // Main optimized image component
  return (
    <div
      className={`relative ${className}`}
      style={fill ? { width: "100%", height: "100%" } : { width, height }}
    >
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
        quality={quality}
        placeholder="blur"
        blurDataURL={`data:image/svg+xml;base64,${toBase64(
          shimmer(width, height)
        )}`}
        onLoad={handleLoad}
        onError={handleError}
        style={{ objectFit: "cover" }}
        loading={priority ? "eager" : "lazy"}
      />
    </div>
  );
};

export default ImageComponent;
