import sharp from "sharp";
import { readdirSync, existsSync, mkdirSync, statSync } from "fs";
import { join, parse } from "path";

const MAX_WIDTH = 1200;
const QUALITY = 85;

const dirs = [
  "public/assets/images/projects",
  "public/assets/images/profile",
  "public/assets/example",
];

const extensions = [".jpg", ".jpeg", ".png"];

async function convertDir(dirPath) {
  if (!existsSync(dirPath)) {
    console.log(`Skipping (not found): ${dirPath}`);
    return 0;
  }

  let count = 0;
  const files = readdirSync(dirPath);

  for (const file of files) {
    const ext = parse(file).ext.toLowerCase();
    if (!extensions.includes(ext)) continue;

    const inputPath = join(dirPath, file);
    const webpName = parse(file).name + ".webp";
    const outputPath = join(dirPath, webpName);

    if (existsSync(outputPath)) {
      console.log(`  Already exists: ${webpName}`);
      continue;
    }

    try {
      const image = sharp(inputPath);
      const metadata = await image.metadata();

      let pipeline = image;
      if (metadata.width && metadata.width > MAX_WIDTH) {
        pipeline = image.resize({ width: MAX_WIDTH, withoutEnlargement: true });
      }

      await pipeline
        .webp({ quality: QUALITY })
        .toFile(outputPath);
      console.log(`  ✓ ${file} → ${webpName} (${metadata.width || "?"}x${metadata.height || "?"})`);
      count++;
    } catch (err) {
      console.error(`  ✗ ${file}: ${err.message}`);
    }
  }

  return count;
}

async function main() {
  console.log(`Converting images to WebP (quality: ${QUALITY})...\n`);

  let total = 0;
  for (const dir of dirs) {
    console.log(`📁 ${dir}`);
    const n = await convertDir(dir);
    total += n;
    console.log();
  }

  console.log(`Done! Converted ${total} images.`);
}

main().catch(console.error);
