import { State } from "./state.js";

export async function commandPokedex(state: State): Promise<void> {
  if (state.pokedex.size === 0) {
    console.log("You have no pokemons buddy... Catch some!");
    return;
  }
  console.log("Your Pokedex:")
  console.log(
    `  ${[...state.pokedex.keys()]
      .reduce((acc, cur) => `${acc}  - ${cur}\n`, "")
      .trim()}`,
  );
}
