"use client";
import React from "react";

interface ErrorMessageProps {
  message: string;
  title?: string;
  type?: "error" | "warning" | "info";
  onRetry?: () => void;
  className?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  title = "Error",
  type = "error",
  onRetry,
  className = "",
}) => {
  const typeStyles = {
    error: {
      bg: "bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800",
      icon: "text-red-500 dark:text-red-400",
      title: "text-red-800 dark:text-red-300",
      text: "text-red-700 dark:text-red-400",
      button:
        "bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600",
    },
    warning: {
      bg: "bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-800",
      icon: "text-yellow-500 dark:text-yellow-400",
      title: "text-yellow-800 dark:text-yellow-300",
      text: "text-yellow-700 dark:text-yellow-400",
      button:
        "bg-yellow-600 hover:bg-yellow-700 dark:bg-yellow-500 dark:hover:bg-yellow-600",
    },
    info: {
      bg: "bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800",
      icon: "text-blue-500 dark:text-blue-400",
      title: "text-blue-800 dark:text-blue-300",
      text: "text-blue-700 dark:text-blue-400",
      button:
        "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600",
    },
  };

  const styles = typeStyles[type];

  const IconComponent = () => {
    switch (type) {
      case "error":
        return (
          <svg
            className={`h-6 w-6 ${styles.icon}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        );
      case "warning":
        return (
          <svg
            className={`h-6 w-6 ${styles.icon}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
            />
          </svg>
        );
      case "info":
        return (
          <svg
            className={`h-6 w-6 ${styles.icon}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
            />
          </svg>
        );
    }
  };

  return (
    <div className={`rounded-lg border p-4 ${styles.bg} ${className}`}>
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <IconComponent />
        </div>
        <div className="ml-3 flex-1">
          <h3 className={`text-sm font-poppins font-semibold ${styles.title}`}>
            {title}
          </h3>
          <p className={`mt-1 text-sm font-roboto ${styles.text}`}>{message}</p>
          {onRetry && (
            <div className="mt-4">
              <button
                onClick={onRetry}
                className={`inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-poppins font-medium rounded-md text-white ${styles.button} transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent`}
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;
