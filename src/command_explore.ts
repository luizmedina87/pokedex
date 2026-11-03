import { State } from "./state.js";

export async function commandExplore(
  state: State,
  ...args: string[]
): Promise<void> {
  if (args.length === 0) {
    console.log("Please enter a location when using 'explore'");
    return;
  }

  const location = args[0];
  try {
    const locationData = await state.pokeapi.fetchLocation(location);
    console.log(
      locationData?.pokemon_encounters.map((x) => x.pokemon.name).join("\n"),
    );
  } catch (error) {
    console.log(error);
  }
}
