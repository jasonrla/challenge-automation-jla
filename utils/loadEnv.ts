import * as dotenv from "dotenv";
import * as path from "path";
import * as fs from "fs";

const env = process.env.ENV || "qa";
const envFile = `.env.${env}`;
const envPath = path.resolve(process.cwd(), envFile);

if (fs.existsSync(envPath)) {
  dotenv.config({
    path: envPath,
    quiet: true,
  });
}
