import { createInterface } from "node:readline";

export function cleanInput(str: string): string[] {
  return str.toLowerCase().match(/\S+/g) ?? [];
}

export function startREPL(): void {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex > ",
  });
  rl.prompt();
  rl.on("line", (line) => {
    const cleanedInput = cleanInput(line);
    if (cleanedInput.length !== 0) {
      console.log(`Your command was: ${cleanedInput[0]}`);
    }
    rl.prompt();
  });
}
