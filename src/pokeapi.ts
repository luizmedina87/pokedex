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

  async fetchLocation(locationName: string): Promise<Location> {
    if (!locationName) throw new Error("location cannot be empty");

    const pageURL = PokeAPI.baseURL + PokeAPI.locationsPath + `/${locationName}`;
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
}

type NamedApiResource = {
  name: string;
  url: string;
};

type EncounterDetails = {
  min_level: number;
  max_level: number;
  chance: number;
  method: NamedApiResource;
  condition_values: any;
  pokemon_details: any;
};

type MethodVersionDetails = {
  rate: number;
  version: NamedApiResource;
};

type PokemonVersionDetails = {
  version: NamedApiResource;
  max_chance: number;
  encounter_details: Array<EncounterDetails>;
};

type EncounterMethodRate = {
  encounter_method: NamedApiResource;
  version_details: Array<MethodVersionDetails>;
};

type AreaNames = {
  name: string;
  language: NamedApiResource;
};

type PokemonEncounter = {
  pokemon: NamedApiResource;
  version_details: Array<PokemonVersionDetails>;
};

export type ShallowLocations = {
  count: number;
  next?: string | null;
  previous?: string | null;
  results: Array<NamedApiResource>;
};

export type Location = {
  id: number;
  name: string;
  game_index: number;
  encounter_method_rates: Array<EncounterMethodRate>;
  location: NamedApiResource;
  names: Array<AreaNames>;
  pokemon_encounters: Array<PokemonEncounter>;
};
