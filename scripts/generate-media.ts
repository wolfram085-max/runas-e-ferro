import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const races = [
  "ferrineos",
  "umbromar",
  "lunarios",
  "saliandros",
  "vitrinos",
  "carminos",
  "braseiros",
  "orvalhados",
  "pedralvos",
  "aureos",
  "nocefilos",
  "salmouros"
];

const bestiary = [
  "rato-sino",
  "aranha-de-selo",
  "cao-de-cinza",
  "cavaleiro-oco",
  "espectro-de-ruina"
];

function placeholderSvg(title: string) {
  return `
    <svg width="1024" height="1024" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#0f172a" />
      <rect x="64" y="64" width="896" height="896" fill="#111827" stroke="#f5c65c" stroke-width="6" />
      <text x="50%" y="50%" fill="#f5c65c" font-size="48" text-anchor="middle" font-family="Arial, sans-serif">
        ${title}
      </text>
    </svg>
  `;
}

async function generateSet(slugs: string[], dir: string) {
  const outputDir = path.join(process.cwd(), "public", "media", dir);
  await fs.mkdir(outputDir, { recursive: true });

  for (const slug of slugs) {
    const svg = placeholderSvg(slug.replace(/-/g, " "));
    const webpPath = path.join(outputDir, `${slug}.webp`);
    const thumbPath = path.join(outputDir, `${slug}-thumb.webp`);

    await sharp(Buffer.from(svg))
      .resize(1024, 1024)
      .webp({ quality: 90 })
      .toFile(webpPath);

    await sharp(Buffer.from(svg))
      .resize(400, 400)
      .webp({ quality: 80 })
      .toFile(thumbPath);
  }
}

async function main() {
  await generateSet(races, "races");
  await generateSet(bestiary, "bestiary");
  console.log("Placeholders de mídia gerados em /public/media.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
