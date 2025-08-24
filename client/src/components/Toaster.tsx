import React, { useEffect, useCallback, useRef } from "react";

export interface ToastMessage {
  id: string;
  type: "success" | "error" | "info" | "warning";
  message: string;
  duration?: number;
}

interface ToasterProps {
  messages: ToastMessage[];
  onRemove: (id: string) => void;
  onClearAll?: () => void;
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
}

const Toaster: React.FC<ToasterProps> = ({
  messages,
  onRemove,
  onClearAll,
  position = "top-right",
}) => {
  const timersRef = useRef<Map<string, NodeJS.Timeout>>(new Map());

  const positionClasses = {
    "top-right": "top-4 right-4",
    "top-left": "top-4 left-4",
    "bottom-right": "bottom-4 right-4",
    "bottom-left": "bottom-4 left-4",
  };

  const typeStyles = {
    success: "bg-secondary-500 text-neutral-50 border-secondary-600",
    error: "bg-red-500 text-neutral-50 border-red-600",
    info: "bg-primary-500 text-neutral-50 border-primary-600",
    warning: "bg-accent-500 text-neutral-900 border-accent-600",
  };

  const typeIcons = {
    success: "✓",
    error: "✕",
    info: "ℹ",
    warning: "⚠",
  };

  // Handle ESC key to clear all toasts
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape" && messages.length > 0) {
        event.preventDefault();
        onClearAll?.();
      }
    },
    [messages.length, onClearAll]
  );

  // Set up ESC key listener
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  // Manage auto-dismiss timers
  useEffect(() => {
    const timers = timersRef.current;

    // Clear existing timers for messages that no longer exist
    const currentMessageIds = new Set(messages.map((msg) => msg.id));
    Array.from(timers.entries()).forEach(([id, timer]) => {
      if (!currentMessageIds.has(id)) {
        clearTimeout(timer);
        timers.delete(id);
      }
    });

    // Set up timers for new messages
    messages.forEach((message) => {
      if (!timers.has(message.id)) {
        const duration = message.duration || 3000; // Default 3 seconds
        const timer = setTimeout(() => {
          onRemove(message.id);
          timers.delete(message.id);
        }, duration);
        timers.set(message.id, timer);
      }
    });

    // Cleanup on unmount
    return () => {
      Array.from(timers.values()).forEach((timer) => {
        clearTimeout(timer);
      });
      timers.clear();
    };
  }, [messages, onRemove]);

  if (messages.length === 0) return null;

  return (
    <div
      className={`fixed ${positionClasses[position]} z-50 space-y-2`}
      role="alert"
      aria-live="polite"
    >
      {messages.length > 1 && (
        <div className="text-right mb-2">
          <button
            onClick={onClearAll}
            className="text-xs text-neutral-600 hover:text-neutral-800 bg-neutral-50/90 px-3 py-1 rounded-lg shadow-md border border-neutral-200 font-roboto"
            title="Clear all (ESC)"
          >
            Clear all (ESC)
          </button>
        </div>
      )}
      {messages.map((message) => (
        <div
          key={message.id}
          className={`
            flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg border-l-4 
            min-w-[300px] max-w-[400px] animate-slide-in
            ${typeStyles[message.type]}
          `}
        >
          <span className="text-lg font-bold flex-shrink-0">
            {typeIcons[message.type]}
          </span>
          <span className="text-sm font-medium flex-1">{message.message}</span>
          <button
            onClick={() => onRemove(message.id)}
            className="text-current hover:opacity-75 text-lg font-bold flex-shrink-0 transition-opacity"
            aria-label="Fechar mensagem"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
};

export default Toaster;
