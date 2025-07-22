import crypto from "crypto";

export function encryptSHA256(secret: string): string {
  return crypto.createHash("sha256").update(secret).digest("hex");
}
