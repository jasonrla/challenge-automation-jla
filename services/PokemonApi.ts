import { APIRequestContext, APIResponse } from "@playwright/test";

const baseUrl = process.env.POKEMON_API_BASE_URL;
if (!baseUrl) {
  throw new Error("POKEMON_API_BASE_URL environment variable is required.");
}

export class PokemonApi {
  constructor(private request: APIRequestContext) {}

  async getByName(name: string): Promise<APIResponse> {
    return this.request.get(`${baseUrl}/pokemon/${name}`);
  }

  async getById(id: string | number): Promise<APIResponse> {
    return this.request.get(`${baseUrl}/pokemon/${id}`);
  }
}
