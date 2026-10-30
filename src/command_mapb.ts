import { State } from "./state.js";

export async function commandMapB(state: State): Promise<void> {
  if (!state.prevLocationsURL) {
    console.log("You're on the first page");
    return;
  }

  try {
    const locations = await state.pokeapi.fetchLocations(
      state.prevLocationsURL,
    );
    console.log(locations.results.map((loc) => loc.name).join("\n"));
    state.prevLocationsURL = locations.previous;
    state.nextLocationsURL = locations.next;
  } catch (error) {
    console.log(error);
  }
}
