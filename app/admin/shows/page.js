'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const TICKET_OPTIONS = ['available', 'coming soon', 'limited avail', 'going fast', 'sold out', 'notify me'];

export default function AdminShowsPage() {
    const [shows, setShows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState(getBlankShow());
    const router = useRouter();

    function getBlankShow() {
        return {
            date: '',
            day: '',
            venue: '',
            location: '',
            time: '7:00 PM',
            fullBand: true,
            ticketAvail: 'available',
            ticketLink: '',
        };
    }

    useEffect(() => {
        loadShows();
    }, []);

    async function loadShows() {
        setLoading(true);
        setError('');
        try {
            const res = await fetch('/api/admin/shows');
            if (res.status === 401) {
                router.push('/admin/login');
                return;
            }
            if (!res.ok) throw new Error('Failed to load');
            const data = await res.json();
            setShows(Array.isArray(data) ? data : []);
        } catch (e) {
            setError(e.message || 'Failed to load shows');
        } finally {
            setLoading(false);
        }
    }

    function openAdd() {
        setEditing('new');
        setForm(getBlankShow());
    }

    function openEdit(show) {
        setEditing(show.groupKey);
        const perf = show.performances && show.performances[0];
        setForm({
            groupKey: show.groupKey,
            date: show.date || '',
            day: show.day || '',
            venue: show.venue || '',
            location: show.location || '',
            time: (perf && perf.time) || '7:00 PM',
            fullBand: perf ? perf.fullBand !== false : true,
            ticketAvail: (perf && perf.ticketAvail) || 'available',
            ticketLink: (perf && perf.ticketLink) || '',
        });
    }

    function closeForm() {
        setEditing(null);
        setForm(getBlankShow());
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setSaving(true);
        setError('');
        const payload = {
            date: form.date,
            day: form.day,
            venue: form.venue,
            location: form.location,
            performances: [{
                time: form.time,
                fullBand: form.fullBand,
                ticketAvail: form.ticketAvail,
                ticketLink: form.ticketLink,
            }],
        };
        try {
            if (editing && editing !== 'new') {
                payload.groupKey = editing;
                const res = await fetch('/api/admin/shows', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                });
                if (res.status === 401) { router.push('/admin/login'); return; }
                if (!res.ok) {
                    const d = await res.json(); throw new Error(d.error || 'Update failed');
                }
            } else {
                const res = await fetch('/api/admin/shows', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                });
                if (res.status === 401) { router.push('/admin/login'); return; }
                if (!res.ok) {
                    const d = await res.json(); throw new Error(d.error || 'Add failed');
                }
            }
            closeForm();
            await loadShows();
        } catch (e) {
            setError(e.message || 'Save failed');
        } finally {
            setSaving(false);
        }
    }

    async function handleDelete(groupKey) {
        if (!confirm('Delete this show?')) return;
        setSaving(true);
        setError('');
        try {
            const res = await fetch(`/api/admin/shows?groupKey=${encodeURIComponent(groupKey)}`, {
                method: 'DELETE',
            });
            if (res.status === 401) { router.push('/admin/login'); return; }
            if (!res.ok) {
                const d = await res.json(); throw new Error(d.error || 'Delete failed');
            }
            closeForm();
            await loadShows();
        } catch (e) {
            setError(e.message || 'Delete failed');
        } finally {
            setSaving(false);
        }
    }

    async function handleLogout() {
        await fetch('/api/admin/logout', { method: 'POST' });
        router.push('/admin/login');
        router.refresh();
    }

    if (loading) {
        return (
            <div className="p-8 flex items-center justify-center">
                <p className="text-gray-600">Loading…</p>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Tour dates</h1>
                <div className="flex gap-2">
                    <button
                        type="button"
                        onClick={openAdd}
                        className="bg-red-700 hover:bg-red-800 text-white font-semibold py-2 px-4 rounded-md"
                    >
                        Add show
                    </button>
                    <button
                        type="button"
                        onClick={handleLogout}
                        className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-md"
                    >
                        Log out
                    </button>
                </div>
            </div>

            {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-800 rounded-md text-sm">
                    {error}
                </div>
            )}

            {editing !== null && (
                <form onSubmit={handleSubmit} className="mb-8 p-6 bg-white rounded-lg shadow">
                    <h2 className="text-lg font-semibold mb-4">{editing === 'new' ? 'New show' : 'Edit show'}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Date (YYYY-MM-DD) *</label>
                            <input
                                type="text"
                                value={form.date}
                                onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
                                placeholder="2026-03-15"
                                className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Venue *</label>
                            <input
                                type="text"
                                value={form.venue}
                                onChange={(e) => setForm((f) => ({ ...f, venue: e.target.value }))}
                                className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Location (e.g. City ST)</label>
                            <input
                                type="text"
                                value={form.location}
                                onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
                                placeholder="Mesa AZ"
                                className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                            <input
                                type="text"
                                value={form.time}
                                onChange={(e) => setForm((f) => ({ ...f, time: e.target.value }))}
                                placeholder="7:00 PM"
                                className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Ticket status</label>
                            <select
                                value={form.ticketAvail}
                                onChange={(e) => setForm((f) => ({ ...f, ticketAvail: e.target.value }))}
                                className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900"
                            >
                                {TICKET_OPTIONS.map((opt) => (
                                    <option key={opt} value={opt}>{opt}</option>
                                ))}
                            </select>
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Ticket URL</label>
                            <input
                                type="url"
                                value={form.ticketLink}
                                onChange={(e) => setForm((f) => ({ ...f, ticketLink: e.target.value }))}
                                placeholder="https://..."
                                className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900"
                            />
                        </div>
                        <div>
                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={form.fullBand}
                                    onChange={(e) => setForm((f) => ({ ...f, fullBand: e.target.checked }))}
                                    className="rounded"
                                />
                                <span className="text-sm text-gray-700">Full band</span>
                            </label>
                        </div>
                    </div>
                    <div className="mt-4 flex gap-2">
                        <button
                            type="submit"
                            disabled={saving}
                            className="bg-red-700 hover:bg-red-800 text-white font-semibold py-2 px-4 rounded-md disabled:opacity-50"
                        >
                            {saving ? 'Saving…' : (editing === 'new' ? 'Add' : 'Update')}
                        </button>
                        <button
                            type="button"
                            onClick={closeForm}
                            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-md"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            )}

            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-3 font-semibold text-gray-900">Date</th>
                            <th className="px-4 py-3 font-semibold text-gray-900">Venue</th>
                            <th className="px-4 py-3 font-semibold text-gray-900">Location</th>
                            <th className="px-4 py-3 font-semibold text-gray-900">Time</th>
                            <th className="px-4 py-3 font-semibold text-gray-900">Tickets</th>
                            <th className="px-4 py-3 font-semibold text-gray-900 w-28">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {shows.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                                    No shows. Click “Add show” to add one.
                                </td>
                            </tr>
                        ) : (
                            shows.map((show) => {
                                const p = show.performances && show.performances[0];
                                return (
                                    <tr key={show.groupKey} className="border-t border-gray-200">
                                        <td className="px-4 py-3 text-gray-900">{show.date}</td>
                                        <td className="px-4 py-3 text-gray-900">{show.venue}</td>
                                        <td className="px-4 py-3 text-gray-600">{show.location}</td>
                                        <td className="px-4 py-3 text-gray-600">{p ? p.time : '—'}</td>
                                        <td className="px-4 py-3 text-gray-600">{p ? p.ticketAvail : '—'}</td>
                                        <td className="px-4 py-3">
                                            <button
                                                type="button"
                                                onClick={() => openEdit(show)}
                                                className="text-red-700 hover:underline mr-2"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => handleDelete(show.groupKey)}
                                                disabled={saving}
                                                className="text-gray-600 hover:underline disabled:opacity-50"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>

            <p className="mt-6 text-sm text-gray-500">
                These shows are saved to the same data the site uses when Airtable is unavailable. Set <code className="bg-gray-200 px-1 rounded">USE_LOCAL_SHOWS=true</code> in your environment to always use this list instead of Airtable.
            </p>
        </div>
    );
}
