// High-performance in-memory TTL cache for public read endpoints
const cache = new Map();

const getCache = (key) => {
  const item = cache.get(key);
  if (!item) return null;
  if (Date.now() > item.expiry) {
    cache.delete(key);
    return null;
  }
  return item.data;
};

const setCache = (key, data, ttlSeconds = 300) => {
  cache.set(key, {
    data,
    expiry: Date.now() + (ttlSeconds * 1000),
  });
};

const clearCachePrefix = (prefix) => {
  for (const key of cache.keys()) {
    if (key.startsWith(prefix)) {
      cache.delete(key);
    }
  }
};

const clearAllCache = () => {
  cache.clear();
};

module.exports = { getCache, setCache, clearCachePrefix, clearAllCache };
