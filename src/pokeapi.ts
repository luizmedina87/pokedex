import { Cache } from "./pokecache.js";

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  private static readonly locationsPath = "/location-area";
  private static readonly cache = new Cache(300_000);

  constructor() {}

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    pageURL = pageURL ?? PokeAPI.baseURL + PokeAPI.locationsPath;

    const cachedData = PokeAPI.cache.get(pageURL);
    if (cachedData) return cachedData;

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
