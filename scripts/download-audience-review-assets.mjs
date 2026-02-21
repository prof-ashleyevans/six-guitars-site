#!/usr/bin/env node
/**
 * Fetches audience reviews from Airtable, downloads each photo to
 * public/images/audience_reviews/, and writes data/audience-reviews-fallback.json
 * so the site can show Audience Feedback when Airtable is down.
 *
 * Run from project root (with .env.local containing Airtable vars):
 *   node scripts/download-audience-review-assets.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

// Load .env.local into process.env
function loadEnv() {
    const envPath = path.join(root, '.env.local');
    if (!fs.existsSync(envPath)) {
        console.warn('No .env.local found; Airtable env vars must be set another way.');
        return;
    }
    const content = fs.readFileSync(envPath, 'utf8');
    content.split('\n').forEach((line) => {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) return;
        const idx = trimmed.indexOf('=');
        if (idx === -1) return;
        const key = trimmed.slice(0, idx).trim();
        let val = trimmed.slice(idx + 1).trim();
        if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'")))
            val = val.slice(1, -1);
        process.env[key] = val;
    });
}

async function download(url, filePath) {
    const res = await fetch(url, { redirect: 'follow' });
    if (!res.ok) throw new Error(`HTTP ${res.status}: ${url}`);
    const buf = Buffer.from(await res.arrayBuffer());
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, buf);
}

async function main() {
    loadEnv();

    const { fetchAudienceReviews } = await import('../lib/airtable.js');
    const reviews = await fetchAudienceReviews();

    if (!Array.isArray(reviews) || reviews.length === 0) {
        console.error('No audience reviews returned from Airtable. Check env (AIRTABLE_PERSONAL_ACCESS_TOKEN, AIRTABLE_AUDIENCE_REVIEWS_BASE_ID, AIRTABLE_AUDIENCE_REVIEWS_TABLE_NAME).');
        process.exit(1);
    }

    const outDir = path.join(root, 'public', 'images', 'audience_reviews');
    fs.mkdirSync(outDir, { recursive: true });

    const fallback = [];
    for (let i = 0; i < reviews.length; i++) {
        const r = reviews[i];
        const index = i + 1;
        const filename = `review${index}.png`;
        const filePath = path.join(outDir, filename);
        const photoPath = `/images/audience_reviews/${filename}`;

        if (r.photo) {
            try {
                await download(r.photo, filePath);
                console.log(`Downloaded ${filename} (${r.name})`);
            } catch (e) {
                console.warn(`Failed to download photo for "${r.name}":`, e.message);
            }
        }

        fallback.push({
            id: r.id,
            name: r.name || '',
            quote: r.quote || '',
            photo: r.photo ? photoPath : null,
        });
    }

    const fallbackPath = path.join(root, 'data', 'audience-reviews-fallback.json');
    fs.writeFileSync(fallbackPath, JSON.stringify(fallback, null, 2), 'utf8');
    console.log(`Wrote ${fallback.length} reviews to data/audience-reviews-fallback.json`);
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
