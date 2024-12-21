/**
 * Creates a promise that resolves with the given value after specified delay
 * @param {*} value - The value to resolve with
 * @param {number} delay - Time to wait before resolving (ms)
 * @returns {Promise<*>} Promise that resolves after delay
 */
export function delayedResolve<T>(value: T, delay: number) {
  return new Promise((resolve) => setTimeout(() => resolve(value), delay));
}

/**
 * Creates a promise that rejects with the given error after specified delay
 * @param {Error|string} error - Error to reject with
 * @param {number} delay - Time to wait before rejecting (ms)
 * @returns {Promise<never>} Promise that rejects after delay
 */
export function delayedReject(error: Error, delay: number) {
  return new Promise((_, reject) => setTimeout(() => reject(error), delay));
}
