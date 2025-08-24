"use client";
import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { ToastMessage } from "@/components/Toaster";

interface ToasterContextType {
  messages: ToastMessage[];
  addToast: (
    type: ToastMessage["type"],
    message: string,
    duration?: number
  ) => string;
  removeToast: (id: string) => void;
  clearAll: () => void;
  showSuccess: (message: string, duration?: number) => string;
  showError: (message: string, duration?: number) => string;
  showInfo: (message: string, duration?: number) => string;
  showWarning: (message: string, duration?: number) => string;
}

const ToasterContext = createContext<ToasterContextType | null>(null);

interface ToasterProviderProps {
  children: ReactNode;
}

export const ToasterProvider: React.FC<ToasterProviderProps> = ({
  children,
}) => {
  const [messages, setMessages] = useState<ToastMessage[]>([]);

  const addToast = useCallback(
    (type: ToastMessage["type"], message: string, duration = 3000) => {
      const id =
        Date.now().toString() + Math.random().toString(36).substr(2, 9);
      const newToast: ToastMessage = {
        id,
        type,
        message,
        duration,
      };

      setMessages((prev) => [...prev, newToast]);
      return id;
    },
    []
  );

  const removeToast = useCallback((id: string) => {
    setMessages((prev) => prev.filter((msg) => msg.id !== id));
  }, []);

  const clearAll = useCallback(() => {
    setMessages([]);
  }, []);

  // Convenience methods
  const showSuccess = useCallback(
    (message: string, duration = 3000) => {
      return addToast("success", message, duration);
    },
    [addToast]
  );

  const showError = useCallback(
    (message: string, duration = 3000) => {
      return addToast("error", message, duration);
    },
    [addToast]
  );

  const showInfo = useCallback(
    (message: string, duration = 3000) => {
      return addToast("info", message, duration);
    },
    [addToast]
  );

  const showWarning = useCallback(
    (message: string, duration = 3000) => {
      return addToast("warning", message, duration);
    },
    [addToast]
  );

  const contextValue: ToasterContextType = {
    messages,
    addToast,
    removeToast,
    clearAll,
    showSuccess,
    showError,
    showInfo,
    showWarning,
  };

  return (
    <ToasterContext.Provider value={contextValue}>
      {children}
    </ToasterContext.Provider>
  );
};

export const useToasterContext = (): ToasterContextType => {
  const context = useContext(ToasterContext);
  if (!context) {
    throw new Error("useToasterContext must be used within a ToasterProvider");
  }
  return context;
};
