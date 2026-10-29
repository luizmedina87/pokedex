import type { State } from "./state.js";

export function cleanInput(str: string): string[] {
  return str.toLowerCase().match(/\S+/g) ?? [];
}

export function startREPL(state: State): void {
  const rl = state.readline;

  rl.prompt();

  rl.on("line", (line) => {
    const input = cleanInput(line);
    const commandName = input[0];

    if (input.length === 1 && commandName in state.commands) {
      const command = state.commands[commandName];
      try {
        command.callback(state);
      } catch (error) {
        console.log(error);
      }
    } else if (input.length === 0) {
      rl.prompt();
    } else {
      console.log(
        `Unknown command: "${input.join(" ")}". Type "help" for a list of commands.`
      );
    }

    rl.prompt();
  });
}
