import { State } from "./state.js";

export async function commandMap(state: State): Promise<void> {
  if (state.nextLocationsURL === null) {
    console.log("You're on the last page");
    return;
  }

  try {
    const locations = await state.pokeapi.fetchLocations(
      state.nextLocationsURL,
    );
    console.log(locations.results.map((loc) => loc.name).join("\n"));
    state.prevLocationsURL = locations.previous;
    state.nextLocationsURL = locations.next;
  } catch (error) {
    console.log(error);
  }
}
