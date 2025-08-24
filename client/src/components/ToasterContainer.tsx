"use client";
import React from "react";
import Toaster from "@/components/Toaster";
import { useToasterContext } from "@/contexts/ToasterContext";

/**
 * ToasterContainer component that should be placed at the app level
 * to display global toast notifications
 */
const ToasterContainer: React.FC = () => {
  const { messages, removeToast, clearAll } = useToasterContext();

  return (
    <Toaster messages={messages} onRemove={removeToast} onClearAll={clearAll} />
  );
};

export default ToasterContainer;
