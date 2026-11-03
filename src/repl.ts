import type { State } from "./state.js";

export function cleanInput(str: string): string[] {
  return str.toLowerCase().match(/\S+/g) ?? [];
}

export function startREPL(state: State): void {
  const rl = state.readline;

  rl.prompt();

  rl.on("line", async (line) => {
    const input = cleanInput(line);
    const commandName = input[0];
    const args = input.slice(1);

    if (input.length === 0) {
      rl.prompt();
    } else if (commandName in state.commands) {
      const command = state.commands[commandName];
      try {
        await command.callback(state, ...args);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log(
        `Unknown command: "${commandName}". Type "help" for a list of commands.`,
      );
    }

    rl.prompt();
  });
}
