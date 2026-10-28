import { createInterface } from "node:readline";
import { getCommands } from "./registry.js";

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
    const input = cleanInput(line);
    const commands = getCommands();

    if (input.length === 1 && input[0] in commands) {
      const command = commands[input[0]];
      try {
        command.callback(commands);
      } catch (error) {
        console.log(error);
      }
    } else if (input.length === 0) {
      rl.prompt();
    } else {
      console.log("Unkown command");
    }

    rl.prompt();
  });
}
