import { State } from "./state.js";

export async function commandInspect(
  state: State,
  ...args: string[]
): Promise<void> {
  if (args.length === 0) {
    console.log("Please provide a Pokemon name");
    return;
  }
  const pokemonName = args[0].toLowerCase();

  if (!state.pokedex.has(pokemonName)) {
    console.log("you have not caught that pokemon");
    return;
  }
  const pokemon = state.pokedex.get(pokemonName);

  const name = `Name: ${pokemon?.name}\n`;
  const height = `Height: ${pokemon?.height}\n`;
  const weight = `Weight: ${pokemon?.weight}\n`;
  const stats =
    "Stats:\n" +
    pokemon?.stats.map((s) => `  -${s.stat.name}: ${s.base_stat}`).join("\n") +
    "\n";
  const types =
    "Types:\n" +
    pokemon?.types.map((t) => `  - ${t.type.name}`).join("\n") +
    "\n";

  console.log(name + height + weight + stats + types);
}
