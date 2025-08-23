"use client";
import React from "react";

const Loading: React.FC<{ message?: string }> = ({ message }) => (
  <div className="flex flex-col items-center justify-center py-10">
    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-primary-600 border-solid mb-4" />
    <span className="text-primary-700 text-lg font-semibold">
      {message || "Loading..."}
    </span>
  </div>
);

export default Loading;
