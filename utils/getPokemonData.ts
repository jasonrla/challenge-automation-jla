import * as path from "path";
import { readExcelFile } from "./excelReader";
import { PokemonExcelRow } from "../models/pokemon-excel-row-model";

let cachedPokemonData: PokemonExcelRow[] | undefined;

export function getPokemonTestData(): PokemonExcelRow[] {
  if (cachedPokemonData) {
    return cachedPokemonData;
  }
  const excelPathEnv = process.env.POKEMON_EXCEL_PATH;
  if (!excelPathEnv) {
    throw new Error("POKEMON_EXCEL_PATH environment variable is required.");
  }
  const excelPath = path.resolve(__dirname, "../", excelPathEnv);
  cachedPokemonData = readExcelFile(
    excelPath,
    "GET pokemon"
  ) as PokemonExcelRow[];
  return cachedPokemonData;
}
