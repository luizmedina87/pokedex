export type CacheEntry<T> = {
  createdAt: number;
  val: T;
};

export class Cache {
  #cache = new Map<string, CacheEntry<any>>();
  #reapIntervalId: NodeJS.Timeout | undefined = undefined;
  #interval: number;

  constructor(interval: number) {
    this.#interval = interval;
    this.#startReapLoop();
  }

  add<T>(key: string, val: T) {
    const createdAt = Date.now();
    this.#cache.set(key, {createdAt, val});
  }

  get<T>(key: string) {
    return this.#cache.get(key);
  }

  #reap() {
    for (const [key, {createdAt, val}] of this.#cache.entries()) {
      const cutoffTime = Date.now() - this.#interval;
      if (createdAt < cutoffTime) this.#cache.delete(key);
    }
  }

  #startReapLoop() {
    this.#reapIntervalId = setInterval(() => this.#reap(), this.#interval);
  }

  stopReapLoop() {
    clearInterval(this.#reapIntervalId);
    this.#reapIntervalId = undefined;
  }
}
