import { CLICommand } from "./command.js";

export function commandHelp(commands: Record<string, CLICommand>): void {
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
