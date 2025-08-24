# ToasterContext Documentation

## Overview

The ToasterContext provides a global notification system for the entire application. It replaces the previous individual useToaster hooks with a centralized context-based approach.

## Setup

The ToasterProvider is already configured in the app layout (`src/app/layout.tsx`), so no additional setup is required.

## Usage

### Basic Usage

```tsx
import React from "react";
import { useToasterContext } from "../contexts/ToasterContext";

const MyComponent: React.FC = () => {
  const { showSuccess, showError, showInfo, showWarning } = useToasterContext();

  const handleClick = () => {
    showSuccess("Operation completed successfully!");
  };

  return (
    <button onClick={handleClick}>
      Click me
    </button>
  );
};
```

### Available Methods

```tsx
const {
  // Direct toast methods (recommended)
  showSuccess,    // (message: string, duration?: number) => string
  showError,      // (message: string, duration?: number) => string  
  showInfo,       // (message: string, duration?: number) => string
  showWarning,    // (message: string, duration?: number) => string
  
  // Advanced methods
  addToast,       // (type, message, duration?) => string
  removeToast,    // (id: string) => void
  clearAll,       // () => void
  
  // State (usually not needed)
  messages        // ToastMessage[]
} = useToasterContext();
```

### Toast Types

- **Success**: Green background, checkmark icon
- **Error**: Red background, X icon  
- **Info**: Blue background, info icon
- **Warning**: Yellow background, warning icon

### Duration

- Default: 3000ms (3 seconds)
- Custom: Pass duration as second parameter
- Persistent: Pass `Infinity` to prevent auto-dismiss

### Examples

```tsx
// Basic usage
showSuccess("Data saved successfully!");
showError("Failed to save data.");

// Custom duration
showInfo("This message stays for 5 seconds", 5000);
showWarning("This message doesn't auto-dismiss", Infinity);

// Manual control
const toastId = showSuccess("Processing...");
// Later...
removeToast(toastId);

// Clear all toasts
clearAll();
```

### Keyboard Shortcuts

- **ESC**: Clear all toasts
- **Click × button**: Remove individual toast
- **Click "Clear all"**: Remove all toasts (when multiple exist)

## Migration Completed

All components have been successfully migrated to use the ToasterContext:

```tsx
// Current implementation (all components use this)
const { showSuccess, showError } = useToasterContext();
```

## Integration with Forms

The ToasterContext is already integrated with:

- **useReservations**: Automatically shows success/error messages
- Future hooks can be easily integrated

## Architecture Benefits

1. **Global State**: One source of truth for all notifications
2. **Performance**: No duplicate toast containers
3. **Consistency**: Same behavior across the entire app
4. **Flexibility**: Can be used in any component without props drilling
5. **Memory Efficient**: Proper timer cleanup and state management

## File Structure

```txt
src/
├── contexts/
│   └── ToasterContext.tsx     # Context and provider
├── components/
│   ├── Toaster.tsx           # Toast display component  
│   └── ToasterContainer.tsx   # Global container
└── app/
    └── layout.tsx            # Provider setup
```
