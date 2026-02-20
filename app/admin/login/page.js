'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    async function handleSubmit(e) {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const res = await fetch('/api/admin/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password }),
            });
            const data = await res.json();
            if (!res.ok) {
                setError(data.error || 'Login failed');
                return;
            }
            router.push('/admin/shows');
            router.refresh();
        } catch (err) {
            setError('Network error');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white rounded-lg shadow-md p-8">
                <h1 className="text-2xl font-bold mb-2 text-gray-900">Admin</h1>
                <p className="text-gray-600 text-sm mb-6">6 Guitars – Tour dates</p>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:ring-2 focus:ring-red-600 focus:border-transparent"
                    required
                    autoFocus
                />
                {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
                <button
                    type="submit"
                    disabled={loading}
                    className="mt-6 w-full bg-red-700 hover:bg-red-800 text-white font-semibold py-2 px-4 rounded-md disabled:opacity-50"
                >
                    {loading ? 'Signing in…' : 'Sign in'}
                </button>
            </form>
        </div>
    );
}
