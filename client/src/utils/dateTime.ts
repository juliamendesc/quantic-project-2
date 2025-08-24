/**
 * @fileoverview Date and time formatting utilities for European format
 * @description Provides consistent date/time formatting across the application using European standards
 */

/**
 * Formats a date to European format (dd/MM/yyyy)
 * @param date - Date object, string, or timestamp
 * @returns Formatted date string in dd/MM/yyyy format
 *
 * @example
 * ```typescript
 * formatDateEU(new Date('2024-12-25')) // "25/12/2024"
 * formatDateEU('2024-12-25') // "25/12/2024"
 * ```
 */
export function formatDateEU(date: Date | string | number): string {
  const dateObj =
    typeof date === "string" || typeof date === "number"
      ? new Date(date)
      : date;

  if (isNaN(dateObj.getTime())) {
    throw new Error("Invalid date provided");
  }

  return dateObj.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

/**
 * Formats a time to 24-hour format (HH:mm)
 * @param time - Time string in any format or Date object
 * @returns Formatted time string in HH:mm format
 *
 * @example
 * ```typescript
 * formatTime24h('5:30 PM') // "17:30"
 * formatTime24h('17:30') // "17:30"
 * formatTime24h(new Date()) // "14:30" (current time)
 * ```
 */
export function formatTime24h(time: string | Date): string {
  if (typeof time === "string") {
    // If already in 24h format, return as is
    if (/^\d{1,2}:\d{2}$/.test(time)) {
      const [hours, minutes] = time.split(":");
      return `${hours.padStart(2, "0")}:${minutes}`;
    }

    // Convert from 12h format to 24h
    const time12hRegex = /^(\d{1,2}):(\d{2})\s*(AM|PM)$/i;
    const match = time.match(time12hRegex);

    if (match) {
      const [, hours, minutes, period] = match;
      let hour24 = parseInt(hours, 10);

      if (period.toUpperCase() === "PM" && hour24 !== 12) {
        hour24 += 12;
      } else if (period.toUpperCase() === "AM" && hour24 === 12) {
        hour24 = 0;
      }

      return `${hour24.toString().padStart(2, "0")}:${minutes}`;
    }
  }

  if (time instanceof Date) {
    return time.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  }

  throw new Error("Invalid time format provided");
}

/**
 * Formats a full date and time to European format
 * @param datetime - Date object or ISO string
 * @returns Formatted datetime string in "dd/MM/yyyy HH:mm" format
 *
 * @example
 * ```typescript
 * formatDateTimeEU(new Date('2024-12-25T14:30:00')) // "25/12/2024 14:30"
 * formatDateTimeEU('2024-12-25T14:30:00Z') // "25/12/2024 14:30"
 * ```
 */
export function formatDateTimeEU(datetime: Date | string): string {
  const dateObj = typeof datetime === "string" ? new Date(datetime) : datetime;

  if (isNaN(dateObj.getTime())) {
    throw new Error("Invalid datetime provided");
  }

  const datePart = formatDateEU(dateObj);
  const timePart = formatTime24h(dateObj);

  return `${datePart} ${timePart}`;
}

/**
 * Converts date from yyyy-MM-dd to dd/MM/yyyy format
 * @param dateString - Date string in yyyy-MM-dd format
 * @returns Date string in dd/MM/yyyy format
 *
 * @example
 * ```typescript
 * convertDateFormat('2024-12-25') // "25/12/2024"
 * ```
 */
export function convertDateFormat(dateString: string): string {
  const isoDateRegex = /^\d{4}-\d{2}-\d{2}$/;

  if (!isoDateRegex.test(dateString)) {
    throw new Error("Date must be in yyyy-MM-dd format");
  }

  const [year, month, day] = dateString.split("-");
  return `${day}/${month}/${year}`;
}

/**
 * Converts date from dd/MM/yyyy to yyyy-MM-dd format (for input fields)
 * @param dateString - Date string in dd/MM/yyyy format
 * @returns Date string in yyyy-MM-dd format
 *
 * @example
 * ```typescript
 * convertDateFormatToISO('25/12/2024') // "2024-12-25"
 * ```
 */
export function convertDateFormatToISO(dateString: string): string {
  const brDateRegex = /^\d{2}\/\d{2}\/\d{4}$/;

  if (!brDateRegex.test(dateString)) {
    throw new Error("Date must be in dd/MM/yyyy format");
  }

  const [day, month, year] = dateString.split("/");
  return `${year}-${month}-${day}`;
}

/**
 * Gets today's date in European format
 * @returns Today's date in dd/MM/yyyy format
 */
export function getTodayEU(): string {
  return formatDateEU(new Date());
}

/**
 * Gets today's date in ISO format (for input min/max attributes)
 * @returns Today's date in yyyy-MM-dd format
 */
export function getTodayISO(): string {
  return new Date().toISOString().split("T")[0];
}
