# Pokedex CLI

A small, interactive Pokédex in your terminal. Browse Pokémon location areas,
see which Pokémon appear there, try to catch them, and inspect the Pokémon
you've added to your collection. Data is fetched from the
[PokéAPI](https://pokeapi.co/).

## Requirements

- Node.js 18 or later
- npm
- An internet connection to access the PokéAPI

## Getting started

Clone the repository, install dependencies, and start the CLI:

```sh
git clone https://github.com/luizmedina87/pokedex.git
cd pokedex
npm install
npm run dev
```

The `dev` script compiles the TypeScript source and launches the application.
To build and run the compiled version separately:

```sh
npm run build
npm start
```

## Commands

Enter a command at the `Pokedex >` prompt. Commands and arguments are
case-insensitive.

| Command | Description |
| --- | --- |
| `help` | Show the available commands. |
| `map` | Show the next page of 20 location areas. |
| `mapb` | Go back to the previous page of location areas. |
| `explore <location-area>` | List Pokémon found in a location area. |
| `catch <pokemon>` | Try to catch a Pokémon. Catching is chance-based; Pokémon with higher base experience are harder to catch. |
| `inspect <pokemon>` | Show details for a Pokémon you've caught, including its height, weight, stats, and types. |
| `pokedex` | List the Pokémon you've caught during this session. |
| `exit` | Close the application. |

For example:

```text
Pokedex > map
Pokedex > explore <location-area>
Pokedex > catch pikachu
Pokedex > inspect pikachu
Pokedex > pokedex
```

Replace `<location-area>` with a location area name from the `map` results.
Your collection is kept in memory and is cleared when you exit the application.
PokéAPI responses are cached temporarily while the application is running.

## Development

Run the test suite with:

```sh
npm test
```
