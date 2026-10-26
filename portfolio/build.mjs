// Renders deck.html to portfolio.pdf (one 1920×1080 page per slide)
// and saves a PNG preview of each slide in previews/.
// Usage: node portfolio/build.mjs
import { createRequire } from "node:module";
const { chromium } = createRequire(import.meta.url)("playwright");
import { mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
await page.goto(pathToFileURL(join(here, "deck.html")).href, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);

mkdirSync(join(here, "previews"), { recursive: true });
const slides = await page.$$(".slide");
for (const [i, slide] of slides.entries()) {
  await slide.screenshot({ path: join(here, "previews", `slide-${String(i + 1).padStart(2, "0")}.png`) });
}

await page.emulateMedia({ media: "print" });
await page.pdf({ path: join(here, "portfolio.pdf"), width: "1920px", height: "1080px", printBackground: true });
await browser.close();
console.log(`${slides.length} slides → portfolio/portfolio.pdf`);
