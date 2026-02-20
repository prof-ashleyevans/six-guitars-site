import { fetchReviews } from '../../lib/airtable';
import fs from 'fs';
import path from 'path';

/** Fallback critic reviews when Airtable is down. Edit data/reviews-fallback.json */
function getFallbackReviews() {
    try {
        const filePath = path.join(process.cwd(), 'data', 'reviews-fallback.json');
        const raw = fs.readFileSync(filePath, 'utf8');
        const data = JSON.parse(raw);
        return Array.isArray(data) ? data : [];
    } catch (e) {
        console.error('Fallback reviews read failed:', e);
        return [];
    }
}

export default async function handler(req, res) {
    try {
        let reviews = await fetchReviews();
        if (!Array.isArray(reviews) || reviews.length === 0) {
            console.warn('Airtable returned no reviews; using fallback.');
            reviews = getFallbackReviews();
        }
        res.status(200).json(reviews);
    } catch (err) {
        console.error('API error (using fallback):', err);
        const fallback = getFallbackReviews();
        if (fallback.length > 0) {
            res.status(200).json(fallback);
        } else {
            res.status(500).json({ error: 'Failed to fetch reviews' });
        }
    }
}
