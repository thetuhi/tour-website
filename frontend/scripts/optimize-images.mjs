/**
 * One-shot image optimizer for MARS TRAVEL.
 *
 * For every mapped source under public/images it writes a WebP derivative
 * (visually lossless: quality 85, max 2000px, 2560px for the hero) under the
 * new clean name, then moves the heavy original into ../originals/ (gitignored)
 * so print-quality masters are never lost. Folder names are normalized to
 * lowercase kebab-case at the same time.
 *
 * Run from frontend/:  node scripts/optimize-images.mjs
 * Idempotent: already-moved sources are skipped with a warning.
 */
import { existsSync } from 'node:fs';
import { mkdir, rename, stat, rmdir, readdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(import.meta.dirname, '..');
const IMAGES = path.join(ROOT, 'public', 'images');
const ORIGINALS = path.resolve(ROOT, 'originals', 'images');

const HERO_WIDTH = 2560;
const MAX_WIDTH = 2000;
const QUALITY = 85;

/** [source relative to public/images, destination relative to public/images] */
const MAPPING = [
  ['Antalya-kapak.jpg', 'antalya-kapak.webp'],

  ['tours/lusca-vip-yacht-tour/Yatch_Lusca.jpg', 'tours/lusca-vip-yacht-tour/lusca-1.webp'],
  ['tours/lusca-vip-yacht-tour/Yatch_Lusca_2.jpg', 'tours/lusca-vip-yacht-tour/lusca-2.webp'],

  ['tours/Brabus-vip-yacht-tour/IMG_3871.jpg', 'tours/brabus-vip-yacht-tour/brabus-1.webp'],
  ['tours/Brabus-vip-yacht-tour/IMG_3872.jpg', 'tours/brabus-vip-yacht-tour/brabus-2.webp'],
  ['tours/Brabus-vip-yacht-tour/IMG_3873.jpg', 'tours/brabus-vip-yacht-tour/brabus-3.webp'],
  ['tours/Brabus-vip-yacht-tour/IMG_3875.jpg', 'tours/brabus-vip-yacht-tour/brabus-4.webp'],
  ['tours/Brabus-vip-yacht-tour/ChatGPT Image 12 Tem 2026 19_33_31.png', 'tours/brabus-vip-yacht-tour/brabus-5.webp'],
  ['tours/Brabus-vip-yacht-tour/ChatGPT Image 12 Tem 2026 19_45_53.png', 'tours/brabus-vip-yacht-tour/brabus-6.webp'],

  ['tours/Kemer-Group-Yatch-Tour/ChatGPT Image 12 Tem 2026 20_11_36.png', 'tours/kemer-group-yacht-tour/kemer-1.webp'],

  ['tours/green-canyon/Green-Canyon-1.png', 'tours/green-canyon/green-canyon-1.webp'],
  ['tours/green-canyon/ChatGPT Image 12 Tem 2026 20_02_51.png', 'tours/green-canyon/green-canyon-2.webp'],

  ['tours/triple-thrill-adventure-canyon-safari-rafting/Tazi-kanyon-kapak.png', 'tours/triple-thrill-adventure-canyon-safari-rafting/tazi-kanyon.webp'],
  ['tours/triple-thrill-adventure-canyon-safari-rafting/rafting.jpg', 'tours/triple-thrill-adventure-canyon-safari-rafting/rafting.webp'],
  ['tours/triple-thrill-adventure-canyon-safari-rafting/jepp-safari.png', 'tours/triple-thrill-adventure-canyon-safari-rafting/jeep-safari.webp'],
  ['tours/triple-thrill-adventure-canyon-safari-rafting/monster-jet.png', 'tours/triple-thrill-adventure-canyon-safari-rafting/monster-jet.webp'],

  ['tours/land-of-legends-theme-park/Tematikpark-2.png', 'tours/land-of-legends-theme-park/tematik-park-2.webp'],
  ['tours/land-of-legends-theme-park/tematikpark-3.png', 'tours/land-of-legends-theme-park/tematik-park-3.webp'],
  ['tours/land-of-legends-theme-park/tematikpark-7png.png', 'tours/land-of-legends-theme-park/tematik-park-7.webp'],
  ['tours/land-of-legends-theme-park/tematikpark10.png', 'tours/land-of-legends-theme-park/tematik-park-10.webp'],
  ['tours/land-of-legends-theme-park/temtatikpark-map.png', 'tours/land-of-legends-theme-park/tematik-park-map.webp'],

  ['tours/antalya-aquarium-complex-experience/Akvaryum-tunel.png', 'tours/antalya-aquarium-complex-experience/akvaryum-tunel.webp'],
  ['tours/antalya-aquarium-complex-experience/Antalya-Akvaryum.jpg', 'tours/antalya-aquarium-complex-experience/antalya-akvaryum.webp'],
  ['tours/antalya-aquarium-complex-experience/davinci-balmumu.jpg', 'tours/antalya-aquarium-complex-experience/davinci-balmumu.webp'],
  ['tours/antalya-aquarium-complex-experience/michael-balmumu.jpg', 'tours/antalya-aquarium-complex-experience/michael-balmumu.webp'],
  ['tours/antalya-aquarium-complex-experience/kobe-balmumu.jpg', 'tours/antalya-aquarium-complex-experience/kobe-balmumu.webp'],
  ['tours/antalya-aquarium-complex-experience/Akvaryum-Karodası.png', 'tours/antalya-aquarium-complex-experience/akvaryum-karodasi.webp'],
  ['tours/antalya-aquarium-complex-experience/Akvaryum-3.jpeg', 'tours/antalya-aquarium-complex-experience/akvaryum-3.webp'],

  ['tours/istanbul-history-tour/Istanbul-HagiaSophia.jpg', 'tours/istanbul-history-tour/istanbul-hagia-sophia.webp'],
  ['tours/istanbul-history-tour/Istanbul-kızkulesi.jpg', 'tours/istanbul-history-tour/istanbul-kiz-kulesi.webp'],
  ['tours/istanbul-history-tour/Istanbul-5.jpg', 'tours/istanbul-history-tour/istanbul-5.webp'],
  ['tours/istanbul-history-tour/Istanbul-3.jpg', 'tours/istanbul-history-tour/istanbul-3.webp'],
  ['tours/istanbul-history-tour/Istanbul-2.jpg', 'tours/istanbul-history-tour/istanbul-2.webp'],

  ['tours/pamukkale-hierapolis-day-trip/Pamukkale-1.png', 'tours/pamukkale-hierapolis-day-trip/pamukkale-1.webp'],
  ['tours/pamukkale-hierapolis-day-trip/Pamukkale-2.jpg', 'tours/pamukkale-hierapolis-day-trip/pamukkale-2.webp'],
  ['tours/pamukkale-hierapolis-day-trip/Pamukkale-3.jpg', 'tours/pamukkale-hierapolis-day-trip/pamukkale-3.webp'],
  ['tours/pamukkale-hierapolis-day-trip/Pamukkale-4.jpg', 'tours/pamukkale-hierapolis-day-trip/pamukkale-4.webp'],
  ['tours/pamukkale-hierapolis-day-trip/ChatGPT Image 12 Tem 2026 19_58_17.png', 'tours/pamukkale-hierapolis-day-trip/pamukkale-5.webp'],

  ['tours/cappadocia-adventure-balloons/Kapadokya.jpg', 'tours/cappadocia-adventure-balloons/kapadokya-1.webp'],
  ['tours/cappadocia-adventure-balloons/Kapadokya-2.jpg', 'tours/cappadocia-adventure-balloons/kapadokya-2.webp'],
  ['tours/cappadocia-adventure-balloons/kapadokya-3.jpg', 'tours/cappadocia-adventure-balloons/kapadokya-3.webp'],
  ['tours/cappadocia-adventure-balloons/kapadokya-4.jpg', 'tours/cappadocia-adventure-balloons/kapadokya-4.webp'],
  ['tours/cappadocia-adventure-balloons/kapadokya-5.jpg', 'tours/cappadocia-adventure-balloons/kapadokya-5.webp'],
  ['tours/cappadocia-adventure-balloons/kapadokya-6.jpg', 'tours/cappadocia-adventure-balloons/kapadokya-6.webp'],
  ['tours/cappadocia-adventure-balloons/kapadokya-7.jpg', 'tours/cappadocia-adventure-balloons/kapadokya-7.webp'],
  ['tours/cappadocia-adventure-balloons/kapadokya-8.jpg', 'tours/cappadocia-adventure-balloons/kapadokya-8.webp'],
];

const fmt = (bytes) => `${(bytes / 1024).toFixed(0)} KB`;

let totalBefore = 0;
let totalAfter = 0;

for (const [srcRel, destRel] of MAPPING) {
  const src = path.join(IMAGES, srcRel);
  const dest = path.join(IMAGES, destRel);
  const backup = path.join(ORIGINALS, srcRel);

  if (!existsSync(src)) {
    console.warn(`SKIP (source missing, already processed?): ${srcRel}`);
    continue;
  }

  const before = (await stat(src)).size;
  const width = srcRel === 'Antalya-kapak.jpg' ? HERO_WIDTH : MAX_WIDTH;

  await mkdir(path.dirname(dest), { recursive: true });
  // .rotate() bakes in EXIF orientation so phone photos don't turn sideways.
  await sharp(src)
    .rotate()
    .resize({ width, height: width, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: QUALITY, effort: 5 })
    .toFile(dest);

  const after = (await stat(dest)).size;
  totalBefore += before;
  totalAfter += after;

  await mkdir(path.dirname(backup), { recursive: true });
  await rename(src, backup);

  console.log(`${srcRel}  ${fmt(before)} -> ${fmt(after)}  (${destRel})`);
}

// Remove now-empty source folders left behind by renames.
for (const dir of ['tours/Brabus-vip-yacht-tour', 'tours/Kemer-Group-Yatch-Tour']) {
  const full = path.join(IMAGES, dir);
  if (existsSync(full) && (await readdir(full)).length === 0) {
    await rmdir(full);
  }
}

console.log(`\nTOTAL: ${fmt(totalBefore)} -> ${fmt(totalAfter)}`);
