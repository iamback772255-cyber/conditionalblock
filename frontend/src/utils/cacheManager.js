/**
 * Cache Manager
 * Implements advanced caching strategy for performance optimization
 */

class CacheManager {
  constructor(ttl = 5 * 60 * 1000) { // 5 minutes default
    this.cache = new Map();
    this.ttl = ttl;
  }

  set(key, value, ttl = this.ttl) {
    this.cache.set(key, {
      value,
      expiry: Date.now() + ttl,
    });
  }

  get(key) {
    const item = this.cache.get(key);
    if (!item) return null;

    if (Date.now() > item.expiry) {
      this.cache.delete(key);
      return null;
    }

    return item.value;
  }

  has(key) {
    const item = this.cache.get(key);
    if (!item) return false;

    if (Date.now() > item.expiry) {
      this.cache.delete(key);
      return false;
    }

    return true;
  }

  delete(key) {
    this.cache.delete(key);
  }

  clear() {
    this.cache.clear();
  }

  async getOrFetch(key, fetchFn, ttl) {
    if (this.has(key)) {
      return this.get(key);
    }

    const value = await fetchFn();
    this.set(key, value, ttl);
    return value;
  }

  getSize() {
    return this.cache.size;
  }
}

export default new CacheManager();