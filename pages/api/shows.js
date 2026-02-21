import { fetchShows } from '../../lib/airtable';
import { getShowsForPublic } from '../../lib/shows-storage';
import fs from 'fs';
import path from 'path';

/** Parse YYYY-MM-DD as local date for correct filtering in all timezones. */
function parseShowDate(dateStr) {
    if (!dateStr) return null;
    const str = String(dateStr).trim();
    const m = str.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (m) return new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
    return new Date(dateStr);
}

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
            const d = parseShowDate(show.date);
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
        // Use Airtable when USE_LOCAL_SHOWS is not set; fallback to file only when Airtable fails or is empty
        if (process.env.USE_LOCAL_SHOWS === 'true') {
            const localShows = await getShowsForPublic().catch(() => getFallbackShows());
            return res.status(200).json(localShows);
        }
        let shows = await fetchShows();
        if (!Array.isArray(shows) || shows.length === 0) {
            console.warn('Airtable returned no shows; using fallback tour dates.');
            shows = getFallbackShows();
        }
        res.status(200).json(shows);
    } catch (err) {
        console.error('API error (using fallback):', err);
        const fallback = getFallbackShows();
        if (fallback.length > 0) {
            res.status(200).json(fallback);
        } else {
            res.status(500).json({ error: 'Failed to fetch shows' });
        }
    }
}
