import { test, expect, Page } from "@playwright/test";
import { ensureImagesDir } from "../utils/ensureImagesDir";
import path from "path";
import fs from "fs";
import { capitalizeFirstLetter } from "../utils/capitalizeFirstLetter";

const baseUrl = process.env.POKEMON_WIKI_URL;
if (!baseUrl) {
  throw new Error("POKEMON_WIKI_URL environment variable is required.");
}

export class PokemonPage {
  private page: Page;
  private pokemonName: string;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateToPokemonPage(name: string) {
    this.pokemonName = name;
    await this.page.goto(`${baseUrl}/${name}`);
  }

  async getTableTitle() {
    return this.page
      .getByRole("table")
      .filter({ hasText: this.pokemonName })
      .getByRole("cell", { name: this.pokemonName, exact: true });
  }

  async getPokemonAuthorName(): Promise<string> {
    const regex = new RegExp(`^${this.pokemonName} artwork by `, "i");

    const authorLink = this.page
      .locator("div", { hasText: regex })
      .getByRole("link");

    const authorName = await authorLink.textContent();
    return authorName?.trim() || "Unknown";
  }

  async getImageUrl(): Promise<string> {
    const cellLocator = this.page
      .getByRole("cell", {
        name: `${capitalizeFirstLetter(this.pokemonName)} artwork by `,
      })
      .locator("span")
      .getByRole("link");
    const imgLocator = cellLocator.locator("img");
    let imageUrl = await imgLocator.getAttribute("src");
    if (!imageUrl) throw new Error("Image src not found");
    if (imageUrl.startsWith("//")) {
      imageUrl = "https:" + imageUrl;
    }
    return imageUrl;
  }

  async downloadImage(): Promise<string> {
    const imageUrl = await this.getImageUrl();
    const imagesDir = ensureImagesDir();
    const fileName = path.basename(imageUrl);
    const filePath = path.join(imagesDir, fileName);
    const response = await this.page.request.get(imageUrl);
    const buffer = await response.body();
    fs.writeFileSync(filePath, buffer);
    return filePath;
  }

  getImageExtension(filePath: string): string {
    return path.extname(filePath).toLowerCase();
  }

  getImageSize(filePath: string): number {
    const stats = fs.statSync(filePath);
    return stats.size;
  }
}
