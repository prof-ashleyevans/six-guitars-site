import { fetchAudienceReviews } from '../../lib/airtable';

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const reviews = await fetchAudienceReviews();
        res.status(200).json(reviews);
    } catch (error) {
        console.error('Error fetching audience reviews:', error);
        res.status(500).json({ error: 'Failed to fetch audience reviews' });
    }
}
