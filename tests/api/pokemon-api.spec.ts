import { test as authTest, expect } from "../../fixtures/auth.fixture";
import { test as contextTest } from "../../fixtures/context.fixture";
import { mergeTests } from "@playwright/test";
import {
  expectPokemonIdMatch,
  expectPokemonNameMatch,
  expectPokemonAbilitiesMatch,
  measureRequestTime,
} from "../../utils/pokemonUtils";
import { readExcelFile } from "../../utils/excelReader";
import path from "path";

const test = mergeTests(authTest, contextTest);

const excelPathEnv = process.env.POKEMON_EXCEL_PATH;
if (!excelPathEnv) {
  throw new Error("POKEMON_EXCEL_PATH environment variable is required.");
}
const excelPath = path.resolve(__dirname, "../../", excelPathEnv);
const excelData = readExcelFile(excelPath, "GET pokemon");

test.describe("GET pokemon details", () => {
  for (const pokemon of excelData) {
    test(`using pokemon name: ${pokemon.name}`, async ({
      secretHash,
      pokemonApi,
    }) => {
      const response = await measureRequestTime(
        () => pokemonApi.getByName(pokemon.name),
        10000,
        expect
      );

      const data = await response.json();
      expectPokemonIdMatch(pokemon.id, data.id, expect);
      expectPokemonNameMatch(pokemon.name, data.name, expect);
      expectPokemonAbilitiesMatch(pokemon.abilities, data.abilities, expect);
    });

    test(`using pokemon id: ${pokemon.id}`, async ({
      secretHash,
      pokemonApi,
    }) => {
      const response = await measureRequestTime(
        () => pokemonApi.getById(pokemon.id),
        10000,
        expect
      );

      const data = await response.json();
      expectPokemonIdMatch(pokemon.id, data.id, expect);
      expectPokemonNameMatch(pokemon.name, data.name, expect);
      expectPokemonAbilitiesMatch(pokemon.abilities, data.abilities, expect);
    });
  }
});
