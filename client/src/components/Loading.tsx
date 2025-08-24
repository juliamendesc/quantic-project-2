"use client";
import React from "react";

interface LoadingProps {
  message?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const Loading: React.FC<LoadingProps> = ({
  message,
  size = "md",
  className = "",
}) => {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-12 w-12",
    lg: "h-16 w-16",
  };

  const containerClasses = {
    sm: "py-4",
    md: "py-10",
    lg: "py-16",
  };

  return (
    <div
      className={`flex flex-col items-center justify-center ${containerClasses[size]} ${className}`}
    >
      <div
        className={`animate-spin rounded-full ${sizeClasses[size]} border-4 border-transparent border-t-accent-500 border-r-accent-300 dark:border-t-accent-400 dark:border-r-accent-600 mb-4`}
        style={{
          background:
            "conic-gradient(from 0deg, transparent, currentColor, transparent)",
        }}
      />
      {message && (
        <span className="text-primary-700 dark:text-accent-300 text-lg font-poppins font-semibold text-center max-w-xs">
          {message}
        </span>
      )}
    </div>
  );
};

export default Loading;
