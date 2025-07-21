import { APIResponse } from "@playwright/test";

export function expectPokemonIdMatch(
  expectedId: string | number,
  actualId: number,
  expect: any
) {
  expect(actualId).toBe(Number(expectedId));
}

export function expectPokemonNameMatch(
  expectedName: string,
  actualName: string,
  expect: any
) {
  expect(actualName.toLowerCase()).toBe(expectedName.toLowerCase());
}
export function expectPokemonAbilitiesMatch(
  expected: string,
  apiAbilities: any[],
  expect: any
) {
  const expectedAbilities = expected
    .split(",")
    .map((a) => a.trim().toLowerCase())
    .sort();
  const abilitiesFromApi = apiAbilities
    .map((a: any) => a.ability.name.toLowerCase())
    .sort();

  for (let ability of expectedAbilities) {
    expect(abilitiesFromApi).toContain(ability);
  }
}

export async function measureRequestTime(
  requestFn: () => Promise<APIResponse>,
  maxDurationMs = 10000,
  expect: any
): Promise<APIResponse> {
  const start = Date.now();
  const response = await requestFn();
  const duration = Date.now() - start;

  expect(response.ok).toBeTruthy();
  expect(duration).toBeLessThanOrEqual(maxDurationMs);
  return response;
}
