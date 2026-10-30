import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { commandMap } from "./command_map.js";
import { commandMapB } from "./command_mapb.js";
import type { CLICommand } from "./state.js";

export function getCommands(): Record<string, CLICommand> {
  return {
    exit: {
      name: "exit",
      description: "Exit with Pokedex",
      callback: commandExit,
    },
    help: {
      name: "help",
      description: "Displays a help message",
      callback: commandHelp,
    },
    map: {
      name: "map",
      description:
        "Displays 20 location areas at a time, moving to the next 20 on each call",
      callback: commandMap,
    },
    mapb: {
      name: "mapb",
      description:
        "Displays 20 locations at a time, moving to the previous 20 on each call",
      callback: commandMapB,
    },
  };
}
