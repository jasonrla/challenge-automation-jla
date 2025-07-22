import { test as base } from "@playwright/test";
import { encryptSHA256 } from "../utils/encrypt";

type Fixtures = {
  secretHash: string;
};

export const test = base.extend<Fixtures>({
  secretHash: async ({}, use) => {
    const secret = process.env.SECRET_KEY || "";
    const encrypted = encryptSHA256(secret);
    console.log(encrypted);
    await use(encrypted);
    const now = new Date().toISOString();
    console.log(`Test finished at: ${now}`);
  },
});

export { expect } from "@playwright/test";
