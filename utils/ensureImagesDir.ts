import * as fs from "fs";
import * as path from "path";

export function ensureImagesDir(): string {
  const imagesDir = path.resolve(process.cwd(), "images");
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
  }
  return imagesDir;
}
