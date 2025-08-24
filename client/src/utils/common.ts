// Common utility functions used across the application

/**
 * Creates a delay using a Promise
 * @param ms - Milliseconds to delay
 * @returns Promise that resolves after the specified delay
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Type guard to check if a value is a string
 * @param value - Value to check
 * @returns True if value is a string
 */
export function isString(value: unknown): value is string {
  return typeof value === 'string';
}

/**
 * Type guard to check if a value is a number
 * @param value - Value to check
 * @returns True if value is a number
 */
export function isNumber(value: unknown): value is number {
  return typeof value === 'number';
}

/**
 * Safe JSON response creator for API routes
 * @param data - Data to return in the response
 * @param status - HTTP status code (default: 200)
 * @returns NextResponse with JSON data
 */
export function createJsonResponse(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

/**
 * Error response creator for API routes
 * @param message - Error message
 * @param status - HTTP status code (default: 500)
 * @returns NextResponse with error message
 */
export function createErrorResponse(message: string, status = 500) {
  return createJsonResponse({ error: message }, status);
}
