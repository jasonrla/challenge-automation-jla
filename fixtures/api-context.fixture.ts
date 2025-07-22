import { test as base } from "@playwright/test";
import { PokemonApi } from "../services/PokemonApi";
import { JsonPlaceholderApi } from "../services/JsonPlaceholderApi";

type Fixtures = {
  pokemonApi: PokemonApi;
  jsonPlaceholderApi: JsonPlaceholderApi;
};
export const test = base.extend<Fixtures>({
  pokemonApi: async ({ request }, use) => {
    await use(new PokemonApi(request));
  },
  jsonPlaceholderApi: async ({ request }, use) => {
    await use(new JsonPlaceholderApi(request));
  },
});
