/**
 * Read/write shows data for admin dashboard.
 * Uses file system: data/tour-dates-fallback.json
 * (On Vercel, the filesystem is read-only in production—admin edits won't persist there unless you deploy from a repo where the file was updated and committed.)
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

/** @returns {Promise<Array>} Shows from today onward (for public site when USE_LOCAL_SHOWS) */
export async function getShowsForPublic() {
    const all = await getShowsForAdmin();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return all.filter((show) => {
        if (!show.date) return false;
        const d = new Date(show.date);
        d.setHours(0, 0, 0, 0);
        return d >= today;
    });
}

/** @param {Array} shows - Full shows array to save */
export async function saveShowsForAdmin(shows) {
    const data = JSON.stringify(Array.isArray(shows) ? shows : [], null, 2);
    fs.writeFileSync(FILE_PATH, data, 'utf8');
}
