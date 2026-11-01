export type CacheEntry<T> = {
  // I created a CacheEntry<T> type to hold the objects we're going to cache
  createdAt: number; // createdAt - A [number] for the Date.now() value that represents when the entry was created.
  val: T; // A T generic that represents the object we're caching.
};

export class Cache {
  #cache = new Map<string, CacheEntry<any>>();
  #reapIntervalId: NodeJS.Timeout | undefined = undefined; // Add a #reapIntervalId private field for a union type of NodeJS.Timeout and undefined, initialized to undefined. We'll use this as a timer to know when to clean up old entries.
  #interval: number; // Add a #interval private field for a number to hold the interval (in milliseconds) for the timer.

  constructor(interval: number) {
    this.#interval = interval;
    this.#startReapLoop();
  }

  add<T>(key: string, val: T) {
    // Create an add<T>() method that adds a new entry to the cache object. 
    // It should take a key (a string) and a val (a T generic).
    const createdAt = Date.now();
    this.#cache.set(key, {createdAt, val});
  }

  get<T>(key: string) {
    // Create a get<T>() method that gets an entry from the cache object. 
    // It should take a key (a string) and returns some object. 
    // Return undefined if the entry is missing.
    return this.#cache.get(key);
  }

  #reap() {
    // Create a #reap() method to delete any entries that are older than the interval. 
    // It should loop through the cache and delete any entries that are older than Date.now() - this.#interval.
    for (const [key, {createdAt, val}] of this.#cache.entries()) {
      const cutoffTime = Date.now() - this.#interval;
      if (createdAt < cutoffTime) this.#cache.delete(key);
    }
  }

  #startReapLoop() {
    // Create a #startReapLoop() method that uses setInterval() to call this.#reap() after a delay of 
    // this.#interval and store the interval ID in this.#reapIntervalId.
    this.#reapIntervalId = setInterval(() => this.#reap, this.#interval);
  }

  stopReapLoop() {
    // Create a public (non-#) stopReapLoop() method that uses clearInterval() to stop the reap loop 
    // and set this.#reapIntervalId back to undefined.
    clearInterval(this.#reapIntervalId);
    this.#reapIntervalId = undefined;
  }
}
