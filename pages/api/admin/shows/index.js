import { requireAdmin } from '../../../../lib/admin-auth';
import { getShowsForAdmin, saveShowsForAdmin } from '../../../../lib/shows-storage';

/** GET: list all shows (for admin) */
export default async function handler(req, res) {
    if (!requireAdmin(req, res)) return;

    if (req.method === 'GET') {
        try {
            const shows = await getShowsForAdmin();
            return res.status(200).json(shows);
        } catch (e) {
            console.error(e);
            return res.status(500).json({ error: 'Failed to load shows' });
        }
    }

    if (req.method === 'POST') {
        try {
            const shows = await getShowsForAdmin();
            const body = req.body || {};
            const newShow = normalizeShow(body);
            if (!newShow.date || !newShow.venue) {
                return res.status(400).json({ error: 'Date and venue are required' });
            }
            newShow.groupKey = `${newShow.date}|${newShow.venue}`;
            if (!newShow.day && newShow.date) {
                newShow.day = new Date(newShow.date).toLocaleDateString('en-US', { weekday: 'long' });
            }
            shows.push(newShow);
            shows.sort((a, b) => (a.date || '').localeCompare(b.date || ''));
            await saveShowsForAdmin(shows);
            return res.status(200).json(newShow);
        } catch (e) {
            console.error(e);
            return res.status(500).json({ error: 'Failed to add show' });
        }
    }

    if (req.method === 'PUT') {
        try {
            const shows = await getShowsForAdmin();
            const body = req.body || {};
            const groupKey = body.groupKey;
            const idx = shows.findIndex((s) => s.groupKey === groupKey);
            if (idx === -1) return res.status(404).json({ error: 'Show not found' });
            const updated = normalizeShow({ ...shows[idx], ...body });
            updated.groupKey = `${updated.date}|${updated.venue}`;
            if (!updated.day && updated.date) {
                updated.day = new Date(updated.date).toLocaleDateString('en-US', { weekday: 'long' });
            }
            shows[idx] = updated;
            shows.sort((a, b) => (a.date || '').localeCompare(b.date || ''));
            await saveShowsForAdmin(shows);
            return res.status(200).json(updated);
        } catch (e) {
            console.error(e);
            return res.status(500).json({ error: 'Failed to update show' });
        }
    }

    if (req.method === 'DELETE') {
        try {
            const groupKey = req.query.groupKey;
            if (!groupKey) return res.status(400).json({ error: 'groupKey required' });
            const shows = await getShowsForAdmin();
            const filtered = shows.filter((s) => s.groupKey !== groupKey);
            if (filtered.length === shows.length) return res.status(404).json({ error: 'Show not found' });
            await saveShowsForAdmin(filtered);
            return res.status(200).json({ ok: true });
        } catch (e) {
            console.error(e);
            return res.status(500).json({ error: 'Failed to delete show' });
        }
    }

    return res.status(405).json({ error: 'Method not allowed' });
}

function normalizeShow(raw) {
    const performances = (raw.performances || []).map((p) => ({
        id: p.id || `perf-${Date.now()}-${Math.random().toString(36).slice(2)}`,
        time: p.time || '7:00 PM',
        fullBand: p.fullBand === true || p.fullBand === 'true',
        ticketAvail: p.ticketAvail || 'available',
        ticketLink: p.ticketLink || '',
        onSaleDate: p.onSaleDate || '',
        discountCode: p.discountCode || '',
        discountPercentage: p.discountPercentage || '',
    }));
    if (performances.length === 0) {
        performances.push({
            id: `perf-${Date.now()}`,
            time: raw.time || '7:00 PM',
            fullBand: raw.fullBand !== false,
            ticketAvail: raw.ticketAvail || 'available',
            ticketLink: raw.ticketLink || '',
            onSaleDate: '',
            discountCode: '',
            discountPercentage: '',
        });
    }
    return {
        groupKey: raw.groupKey,
        date: raw.date || '',
        day: raw.day || '',
        venue: raw.venue || '',
        location: raw.location || '',
        performances,
    };
}
