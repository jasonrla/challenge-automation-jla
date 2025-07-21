import * as dotenv from "dotenv";
import * as path from "path";

const env = process.env.ENV || "qa";
const envFile = `.env.${env}`;

dotenv.config({
  path: path.resolve(process.cwd(), envFile),
  quiet: true,
});
