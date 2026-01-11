import { fetchReviews } from '../../lib/airtable';

export default async function handler(req, res) {
    try {
        const reviews = await fetchReviews();
        res.status(200).json(reviews);
    } catch (err) {
        console.error('API error:', err);
        res.status(500).json({ error: 'Failed to fetch reviews' });
    }
}
