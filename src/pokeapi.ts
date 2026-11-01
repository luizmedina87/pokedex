import { Cache } from "./pokecache.js";

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  private static readonly locationsPath = "/location-area";
  private static readonly cache = new Cache(300_000);

  constructor() {}

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    pageURL = pageURL ?? PokeAPI.baseURL + PokeAPI.locationsPath;

    const cachedData = PokeAPI.cache.get(pageURL);
    if (cachedData) return cachedData.val;

    const response = await fetch(pageURL);
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const data = await response.json();
    PokeAPI.cache.add(pageURL, data);
    return data;
  }

  // async fetchLocation(locationName: string): Promise<Location> {
  //   // implement this
  // }
}

type NamedApiResource = {
  name: string;
  url: string;
};

export type ShallowLocations = {
  count: number;
  next?: string | null;
  previous?: string | null;
  results: Array<NamedApiResource>;
};

// export type Location = {
//   // add properties here
// };

// Update your code PokeAPI class to use the cache.
// If you already have the data for a given URL (we'll use the URLs as our cache keys) in the cache,
// use that cached data instead of making a new request. Whenever you do make a request,
// add the response to the cache.

// Write at least 1 test for your cache package! The tip below should help you get started.
// Vitest's test.concurrent.each() method may come in handy here.
