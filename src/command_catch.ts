import { State } from "./state.js";

export async function commandCatch(
  state: State,
  ...args: string[]
): Promise<void> {
  const baseMessage = "Throwing a Pokeball at";
  const successMessage = "was caught!";
  const failureMessage = "escaped!";
  if (args.length === 0) {
    console.log(`${baseMessage} nothing... Pokeball was wasted...`);
    return;
  }

  const pokemon = args[0];

  try {
    const pokemonData = await state.pokeapi.fetchPokemon(pokemon);
    const pokemonName = pokemonData.name;
    const pokemonExperience = pokemonData.base_experience;
    
    if (state.pokedex.has(pokemonName)) {
      console.log(
        `You already have a ${pokemonName}! Stop hoarding pokemons...`,
      );
      return;
    }

    console.log(`${baseMessage} ${pokemonName}...`);
    if (catchPokemon(pokemonExperience)) {
      console.log(`${baseMessage} ${successMessage}`);
      console.log("You may now inspect it with the inspect command.");
      state.pokedex.set(pokemonName, pokemonData);
    } else {
      console.log(`${baseMessage} ${failureMessage}`);
    }
  } catch (error) {
    console.log(error);
  }
}

function catchPokemon(pokemonExperience: number): boolean {
  const normalizedExp = Math.max(
    0,
    Math.min(1, (pokemonExperience - 30) / 620),
  );
  const difficultyCurve = Math.log(1 + 9 * normalizedExp) / Math.LN10;
  const catchChance = 0.9 - 0.8 * difficultyCurve;
  return Math.random() < catchChance;
}
