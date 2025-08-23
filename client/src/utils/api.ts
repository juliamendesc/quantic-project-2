// API utilities for frontend components
import { useState } from 'react';

/**
 * Generic fetch wrapper with error handling
 * @param url - API endpoint URL
 * @param options - Fetch options
 * @returns Promise with parsed JSON response
 */
export async function apiRequest<T = unknown>(
  url: string,
  options?: RequestInit
): Promise<T> {
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`API request failed for ${url}:`, error);
    throw error;
  }
}

/**
 * GET request helper
 * @param url - API endpoint URL
 * @returns Promise with parsed JSON response
 */
export function apiGet<T = unknown>(url: string): Promise<T> {
  return apiRequest<T>(url, { method: 'GET' });
}

/**
 * POST request helper
 * @param url - API endpoint URL
 * @param data - Data to send in request body
 * @returns Promise with parsed JSON response
 */
export function apiPost<T = unknown>(url: string, data: unknown): Promise<T> {
  return apiRequest<T>(url, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

/**
 * Loading state manager hook helper
 * @param initialState - Initial loading state
 * @returns Loading state and setter function
 */
export function useLoadingState(initialState = true) {
  const [loading, setLoading] = useState(initialState);
  return { loading, setLoading };
}

// Common error messages
export const ERROR_MESSAGES = {
  FETCH_FAILED: 'Failed to fetch data',
  NETWORK_ERROR: 'Network error occurred',
  INVALID_RESPONSE: 'Invalid response from server',
  SUBMISSION_FAILED: 'Failed to submit data',
} as const;
