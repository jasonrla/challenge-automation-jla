import * as dotenv from "dotenv";
import * as path from "path";
import * as fs from "fs";

const isCI = process.env.CI === "true";
const env = process.env.ENV || "qa";
const envFile = `.env.${env}`;
const envPath = path.resolve(process.cwd(), envFile);

if (!isCI && fs.existsSync(envPath)) {
  dotenv.config({
    path: envPath,
    quiet: true,
  });
}
