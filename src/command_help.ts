import { State } from "./state.js";

export async function commandHelp(state: State): Promise<void> {
  const commands = state.commands;
  const usageOptions = Object.values(commands).reduce((acc, curr) => {
    return `${acc}\n${curr.name}: ${curr.description}`;
  }, "");

  console.log(
    `Welcome to the Pokedex!
    Usage:
    ${usageOptions}
    `.replace(/^[ \t]+/gm, ""),
  );
}
