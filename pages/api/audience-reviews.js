import { fetchAudienceReviews } from '../../lib/airtable';
import fs from 'fs';
import path from 'path';

/** Fallback audience reviews when Airtable is down. Populate via: node scripts/download-audience-review-assets.mjs */
function getFallbackAudienceReviews() {
    try {
        const filePath = path.join(process.cwd(), 'data', 'audience-reviews-fallback.json');
        const raw = fs.readFileSync(filePath, 'utf8');
        const data = JSON.parse(raw);
        return Array.isArray(data) ? data : [];
    } catch (e) {
        console.error('Fallback audience reviews read failed:', e);
        return [];
    }
}

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        let reviews = await fetchAudienceReviews();
        if (!Array.isArray(reviews) || reviews.length === 0) {
            console.warn('Airtable returned no audience reviews; using fallback.');
            reviews = getFallbackAudienceReviews();
        }
        res.status(200).json(reviews);
    } catch (error) {
        console.error('Error fetching audience reviews:', error);
        const fallback = getFallbackAudienceReviews();
        if (fallback.length > 0) {
            res.status(200).json(fallback);
        } else {
            res.status(500).json({ error: 'Failed to fetch audience reviews' });
        }
    }
}
