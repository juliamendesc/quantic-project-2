/**
 * @fileoverview API utilities for frontend components
 * @description Centralized API request handling with error management and type safety
 * @author Café Fausse Development Team
 * @version 1.0.0
 */

import { useState } from "react";

/**
 * Generic fetch wrapper with comprehensive error handling and logging
 *
 * @template T - Expected response type
 * @param {string} url - API endpoint URL (absolute or relative)
 * @param {RequestInit} [options] - Optional fetch configuration
 * @returns {Promise<T>} Promise that resolves to parsed JSON response
 *
 * @throws {Error} When HTTP request fails or response is not ok
 *
 * @example
 * ```typescript
 * const data = await apiRequest<MenuData>('/api/menu');
 * ```
 */
export async function apiRequest<T = unknown>(
  url: string,
  options?: RequestInit
): Promise<T> {
  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(
        `HTTP ${response.status}: ${errorData || response.statusText}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error(`API request failed for ${url}:`, error);
    throw error instanceof Error ? error : new Error("Unknown API error");
  }
}

/**
 * GET request helper with automatic error handling
 *
 * @template T - Expected response type
 * @param {string} url - API endpoint URL
 * @returns {Promise<T>} Promise that resolves to parsed JSON response
 *
 * @example
 * ```typescript
 * const menuItems = await apiGet<{menuItems: MenuItem[]}>('/api/menu');
 * ```
 */
export function apiGet<T = unknown>(url: string): Promise<T> {
  return apiRequest<T>(url, { method: "GET" });
}

/**
 * POST request helper with JSON payload handling
 *
 * @template T - Expected response type
 * @param {string} url - API endpoint URL
 * @param {unknown} data - Data to send in request body (will be JSON.stringify'd)
 * @returns {Promise<T>} Promise that resolves to parsed JSON response
 *
 * @example
 * ```typescript
 * const result = await apiPost<ReservationResponse>('/api/reservations', {
 *   name: 'John Doe',
 *   email: 'john@example.com',
 *   date: '2024-12-25',
 *   guests: 2
 * });
 * ```
 */
export function apiPost<T = unknown>(url: string, data: unknown): Promise<T> {
  return apiRequest<T>(url, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

/**
 * Loading state manager hook for component state management
 *
 * @param {boolean} [initialState=true] - Initial loading state
 * @returns {{loading: boolean, setLoading: (value: boolean) => void}} Loading state and setter
 *
 * @example
 * ```typescript
 * const { loading, setLoading } = useLoadingState(false);
 *
 * // In async function
 * setLoading(true);
 * try {
 *   const data = await apiGet('/api/data');
 *   // Handle success
 * } finally {
 *   setLoading(false);
 * }
 * ```
 */
export function useLoadingState(initialState = true) {
  const [loading, setLoading] = useState(initialState);
  return { loading, setLoading };
}

/**
 * Standardized error messages for consistent UX
 *
 * @readonly
 * @enum {string}
 */
export const ERROR_MESSAGES = {
  /** Generic fetch operation failure */
  FETCH_FAILED: "Failed to fetch data. Please try again.",
  /** Network connectivity issues */
  NETWORK_ERROR: "Network error occurred. Please check your connection.",
  /** Server returned invalid or malformed response */
  INVALID_RESPONSE: "Invalid response from server. Please try again.",
  /** Form submission or data posting failure */
  SUBMISSION_FAILED:
    "Failed to submit data. Please verify your information and try again.",
  /** Email validation failure */
  INVALID_EMAIL: "Please enter a valid email address.",
  /** Required field validation */
  FIELD_REQUIRED: "This field is required.",
} as const;
