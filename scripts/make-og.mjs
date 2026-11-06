import sharp from "sharp";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const source = path.join(root, "public", "og-banner.svg");
const destination = path.join(root, "public", "og-banner.png");

await sharp(source).resize(1200, 630).png().toFile(destination);
console.log(`Generated ${destination}`);
