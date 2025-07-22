import { test as authTest, expect } from "../../fixtures/auth.fixture";
import { test as uiContext } from "../../fixtures/ui-context.fixture";
import { mergeTests } from "@playwright/test";
import { getPokemonTestData } from "../../utils/getPokemonData";
import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter";
import * as fs from "fs";

const test = mergeTests(authTest, uiContext);

const pokemonTestData = getPokemonTestData();

test.describe("Pokemon Wiki validations", () => {
  for (const pokemon of pokemonTestData) {
    let filePath: string;

    test.beforeEach(async ({ pokemonPage }) => {
      await pokemonPage.navigateToPokemonPage(
        capitalizeFirstLetter(pokemon.name)
      );
      filePath = await pokemonPage.downloadImage();
    });

    test(`should display title for ${pokemon.name}`, async ({
      pokemonPage,
    }) => {
      test.info().annotations.push({ type: "owner", description: "jla" });
      const titleCell = await pokemonPage.getTableTitle();
      expect(await titleCell.isVisible()).toBe(true);
      console.log(`Author: ${await pokemonPage.getPokemonAuthorName()}`);
    });

    test(`should download image for ${pokemon.name}`, async () => {
      test.info().annotations.push({ type: "owner", description: "jla" });
      expect(fs.existsSync(filePath)).toBe(true);
    });

    test(`should validate image extension for ${pokemon.name}`, async ({
      pokemonPage,
    }) => {
      test.info().annotations.push({ type: "owner", description: "jla" });
      const validExtensions = [".jpg", ".jpeg", ".png", ".svg"];
      const extension = pokemonPage.getImageExtension(filePath);
      expect(validExtensions).toContain(extension);
    });

    test(`should validate image file size < 500000 bytes for ${pokemon.name}`, async ({
      pokemonPage,
    }) => {
      test.info().annotations.push({ type: "owner", description: "jla" });
      const size = pokemonPage.getImageSize(filePath);
      expect(size).toBeLessThan(500000);
    });
  }
});
