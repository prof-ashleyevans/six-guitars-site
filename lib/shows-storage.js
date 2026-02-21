/**
 * Read/write shows data for admin dashboard.
 * Uses file system: data/tour-dates-fallback.json
 */

import fs from 'fs';
import path from 'path';

const FILE_PATH = path.join(process.cwd(), 'data', 'tour-dates-fallback.json');

/** @returns {Promise<Array>} All shows (full array, no date filter) */
export async function getShowsForAdmin() {
    try {
        const raw = fs.readFileSync(FILE_PATH, 'utf8');
        const data = JSON.parse(raw);
        return Array.isArray(data) ? data : [];
    } catch (e) {
        console.error('File getShows error:', e);
        return [];
    }
}

/** Parse YYYY-MM-DD as local date (avoids UTC midnight rolling back a day in US timezones). */
function parseShowDate(dateStr) {
    if (!dateStr) return null;
    const str = String(dateStr).trim();
    const m = str.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (m) return new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
    return new Date(dateStr);
}

/** @returns {Promise<Array>} Shows from today onward (for public site) */
export async function getShowsForPublic() {
    const all = await getShowsForAdmin();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return all.filter((show) => {
        if (!show.date) return false;
        const d = parseShowDate(show.date);
        d.setHours(0, 0, 0, 0);
        return d >= today;
    });
}

/** @param {Array} shows - Full shows array to save */
export async function saveShowsForAdmin(shows) {
    const data = JSON.stringify(Array.isArray(shows) ? shows : [], null, 2);
    fs.writeFileSync(FILE_PATH, data, 'utf8');
}
