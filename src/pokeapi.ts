import { Cache } from "./pokecache.js";

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  private static readonly locationsPath = "/location-area";
  private static readonly pokemonPath = "/pokemon";
  private static readonly cache = new Cache(300_000);

  constructor() {}

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    pageURL = pageURL ?? PokeAPI.baseURL + PokeAPI.locationsPath;
    return this.#fetchStuff(pageURL);

    // const cachedData = PokeAPI.cache.get(pageURL);
    // if (cachedData) return cachedData;
    
    // const response = await fetch(pageURL);
    // if (!response.ok) {
    //   throw new Error(`HTTP error: ${response.status}`);
    // }
    // const data = await response.json();
    // PokeAPI.cache.add(pageURL, data);
    // return data;
  }

  async fetchLocation(locationName: string): Promise<Location> {
    if (!locationName) throw new Error("location cannot be empty");

    const pageURL = PokeAPI.baseURL + PokeAPI.locationsPath + `/${locationName}`;
    return this.#fetchStuff(pageURL);
    // const cachedData = PokeAPI.cache.get(pageURL);
    // if (cachedData) return cachedData;

    // const response = await fetch(pageURL);
    // if (!response.ok) {
    //   throw new Error(`HTTP error: ${response.status}`);
    // }
    // const data = await response.json();
    // PokeAPI.cache.add(pageURL, data);
    // return data;
  }

  async fetchPokemon(pokemonName: string): Promise<Pokemon> {
    if (!pokemonName) throw new Error("pokemon cannot be empty");

    const pageURL = PokeAPI.baseURL + PokeAPI.pokemonPath + `/${pokemonName}`;
    return this.#fetchStuff(pageURL);
    // const cachedData = PokeAPI.cache.get(pageURL);
    // if (cachedData) return cachedData;

    // const response = await fetch(pageURL);
    // if (!response.ok) {
    //   throw new Error(`HTTP error: ${response.status}`);
    // }
    // const data = await response.json();
    // PokeAPI.cache.add(pageURL, data);
    // return data;
  }

  async #fetchStuff(pageURL: string): Promise<any> {
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

type PokemonAbility = {
  is_hidden: boolean;
  slot: number;
  ability: NamedApiResource;
};

type PastAbility = {
  generation: NamedApiResource;
  abilities: Array<{
    is_hidden: boolean;
    slot: number;
    ability: NamedApiResource | null;
  }>;
};

type GameIndex = {
  game_index: number;
  version: NamedApiResource;
};

type VersionDetail = {
  rarity: number;
  version: NamedApiResource;
};

type HeldItem = {
  item: NamedApiResource;
  version_details: Array<VersionDetail>;
};

type VersionGroupDetail = {
  level_learned_at: number;
  version_group: NamedApiResource;
  move_learn_method: NamedApiResource;
  order: number | null;
};

type PokemonMove = {
  move: NamedApiResource;
  version_group_details: Array<VersionGroupDetail>;
};

type PokemonSprites = {
  front_default: string | null;
  front_shiny: string | null;
  front_female: string | null;
  front_shiny_female: string | null;
  back_default: string | null;
  back_shiny: string | null;
  back_female: string | null;
  back_shiny_female: string | null;
  other?: any;
  versions?: any;
};

type PokemonStat = {
  base_stat: number;
  effort: number;
  stat: NamedApiResource;
};

type PokemonType = {
  slot: number;
  type: NamedApiResource;
};

export type Pokemon = {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  is_default: boolean;
  order: number;
  weight: number;
  abilities: Array<PokemonAbility>;
  past_abilities: Array<PastAbility>;
  forms: Array<NamedApiResource>;
  game_indices: Array<GameIndex>;
  held_items: Array<HeldItem>;
  location_area_encounters: string;
  moves: Array<PokemonMove>;
  sprites: PokemonSprites;
  cries?: {
    latest: string;
    legacy: string;
  };
  species: NamedApiResource;
  stats: Array<PokemonStat>;
  types: Array<PokemonType>;
};