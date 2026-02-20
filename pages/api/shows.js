import { fetchShows } from '../../lib/airtable';
import { getShowsForPublic } from '../../lib/shows-storage';
import fs from 'fs';
import path from 'path';

/** Load fallback tour dates when Airtable is down. Edit data/tour-dates-fallback.json */
function getFallbackShows() {
    try {
        const filePath = path.join(process.cwd(), 'data', 'tour-dates-fallback.json');
        const raw = fs.readFileSync(filePath, 'utf8');
        const data = JSON.parse(raw);
        if (!Array.isArray(data)) return [];
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return data.filter((show) => {
            if (!show.date) return false;
            const d = new Date(show.date);
            d.setHours(0, 0, 0, 0);
            return d >= today;
        });
    } catch (e) {
        console.error('Fallback tour dates read failed:', e);
        return [];
    }
}

export default async function handler(req, res) {
    try {
        // Prefer admin-managed shows when the local file has content (or when USE_LOCAL_SHOWS is set)
        const localShows = await getShowsForPublic().catch(() => []);
        if (process.env.USE_LOCAL_SHOWS === 'true' || (Array.isArray(localShows) && localShows.length > 0)) {
            return res.status(200).json(localShows);
        }
        let shows = await fetchShows();
        if (!Array.isArray(shows) || shows.length === 0) {
            console.warn('Airtable returned no shows; using fallback tour dates.');
            shows = localShows.length > 0 ? localShows : getFallbackShows();
        }
        res.status(200).json(shows);
    } catch (err) {
        console.error('API error (using fallback):', err);
        const fallback = await getShowsForPublic().catch(() => getFallbackShows());
        if (fallback.length > 0) {
            res.status(200).json(fallback);
        } else {
            res.status(500).json({ error: 'Failed to fetch shows' });
        }
    }
}
