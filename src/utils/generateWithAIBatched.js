import generateWithAI from './generateWithAI'
import { globalQueue } from './requestQueue'

/**
 * Batched wrapper around generateWithAI
 * Automatically deduplicates requests and manages concurrency
 * Optimizes token usage by avoiding duplicate API calls
 */
export default async function generateWithAIBatched(description, logoDataUrl, refImageDataUrl) {
  return globalQueue.enqueue(description, logoDataUrl, refImageDataUrl, generateWithAI)
}

/**
 * Get queue statistics for debugging/monitoring
 */
export function getQueueStats() {
  return globalQueue.getStats()
}

/**
 * Clear the cache if needed (e.g., when settings change)
 */
export function clearAICache() {
  globalQueue.clearCache()
}
