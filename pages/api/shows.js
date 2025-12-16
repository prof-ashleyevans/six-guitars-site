import { fetchShows } from '../../lib/airtable';

export default async function handler(req, res) {
    try {
        const shows = await fetchShows();
        res.status(200).json(shows);
    } catch (err) {
        console.error('API error:', err);
        res.status(500).json({ error: 'Failed to fetch shows' });
    }
}
