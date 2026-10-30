export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  private static readonly locationsPath = "/location-area";

  constructor() {}

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const response = await fetch(
      pageURL ?? PokeAPI.baseURL + PokeAPI.locationsPath,
    );
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    return response.json();
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
