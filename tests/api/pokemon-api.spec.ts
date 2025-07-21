import { test as authTest, expect } from "../../fixtures/auth.fixture";
import { test as contextTest } from "../../fixtures/api-context.fixture";
import { mergeTests } from "@playwright/test";
import {
  expectPokemonIdMatch,
  expectPokemonNameMatch,
  expectPokemonAbilitiesMatch,
  measureRequestTime,
} from "../../utils/pokemonUtils";
import { getPokemonTestData } from "../../utils/getPokemonData";

const test = mergeTests(authTest, contextTest);

const pokemonTestData = getPokemonTestData();

test.describe("GET pokemon details", () => {
  for (const pokemon of pokemonTestData) {
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
