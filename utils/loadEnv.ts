import * as dotenv from "dotenv";
import * as fs from "fs";

const env = process.env.ENV || "qa";
const envFile = `.env.${env}`;

if (fs.existsSync(envFile)) {
  dotenv.config({ path: envFile, quiet: true });
}
