/**
 * Request queue manager for OpenRouter API calls
 * Batches requests, deduplicates identical requests, and manages concurrency
 */

class RequestQueue {
  constructor(maxConcurrent = 2, batchDelayMs = 100) {
    this.queue = []
    this.running = 0
    this.maxConcurrent = maxConcurrent
    this.batchDelayMs = batchDelayMs
    this.cache = new Map() // Cache for deduplication
    this.pendingBatch = []
    this.batchTimer = null
  }

  /**
   * Generate cache key from request parameters
   */
  getCacheKey(description, logoDataUrl, refImageDataUrl) {
    // Simple hash of the parameters
    return `${description}|${logoDataUrl ? logoDataUrl.substring(0, 50) : ''}|${refImageDataUrl ? refImageDataUrl.substring(0, 50) : ''}`
  }

  /**
   * Add a request to the queue
   * Returns a promise that resolves when the request completes
   */
  enqueue(description, logoDataUrl, refImageDataUrl, generateFn) {
    const cacheKey = this.getCacheKey(description, logoDataUrl, refImageDataUrl)

    // Return cached result if available
    if (this.cache.has(cacheKey)) {
      return Promise.resolve(this.cache.get(cacheKey))
    }

    return new Promise((resolve, reject) => {
      const task = { description, logoDataUrl, refImageDataUrl, generateFn, cacheKey, resolve, reject }
      this.queue.push(task)
      this.processQueue()
    })
  }

  /**
   * Process queue items respecting concurrency limit
   */
  processQueue() {
    if (this.queue.length === 0 || this.running >= this.maxConcurrent) {
      return
    }

    this.running++
    const task = this.queue.shift()

    this.executeTask(task)
      .then((result) => {
        // Cache the result
        this.cache.set(task.cacheKey, result)
        task.resolve(result)
      })
      .catch((err) => {
        task.reject(err)
      })
      .finally(() => {
        this.running--
        // Process next item in queue
        if (this.queue.length > 0) {
          setTimeout(() => this.processQueue(), this.batchDelayMs)
        }
      })
  }

  /**
   * Execute a single task
   */
  async executeTask(task) {
    try {
      const result = await task.generateFn(task.description, task.logoDataUrl, task.refImageDataUrl)
      return result
    } catch (err) {
      throw err
    }
  }

  /**
   * Clear cache (useful after updating settings)
   */
  clearCache() {
    this.cache.clear()
  }

  /**
   * Get queue stats for debugging
   */
  getStats() {
    return {
      queued: this.queue.length,
      running: this.running,
      cached: this.cache.size,
      maxConcurrent: this.maxConcurrent
    }
  }
}

// Global instance
const globalQueue = new RequestQueue(2, 100)

export { RequestQueue, globalQueue }
