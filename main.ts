/**
 * Copy the bundled newspaper image to the requested output directory and report
 * the written file's byte length. The image sums up the world news of
 * Wednesday 18 November 2026.
 * Runs on Node 22 using only the standard library, without network access.
 */
import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const sourceDirectory = dirname(fileURLToPath(import.meta.url));
const sourceImage = join(sourceDirectory, 'entry.png');
const outputDirectory = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const outputImage = join(outputDirectory, 'entry.png');

const sourceBytes = readFileSync(sourceImage);
const pngSignature = Uint8Array.from([137, 80, 78, 71, 13, 10, 26, 10]);
if (!sourceBytes.subarray(0, pngSignature.length).equals(pngSignature)) {
  throw new Error(`Invalid PNG signature: ${sourceImage} must start with the 8-byte PNG signature.`);
}

mkdirSync(outputDirectory, { recursive: true });
copyFileSync(sourceImage, outputImage);
const writtenImage = readFileSync(outputImage);
console.log(`Wrote entry.png: ${writtenImage.length} bytes`);
