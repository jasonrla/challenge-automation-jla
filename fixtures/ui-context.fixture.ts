import { test as base } from "@playwright/test";
import { PokemonPage } from "../pages/PokemonPage";

type Fixtures = {
  pokemonPage: PokemonPage;
};

export const test = base.extend<Fixtures>({
  pokemonPage: async ({ page }, use) => {
    await use(new PokemonPage(page));
  },
});

export { expect } from "@playwright/test";
