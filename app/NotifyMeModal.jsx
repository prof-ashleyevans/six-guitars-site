'use client';
import { useState } from 'react';

export default function NotifyMeModal({ show, onClose }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setMessage('');

        try {
            const response = await fetch('/api/notify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    email,
                    showName: show.showName || '6 Guitars',
                    showDate: show.date || '',
                    showTime: show.time || '',
                    venue: show.venue || '',
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage(data.message);
                setName('');
                setEmail('');
                setTimeout(() => {
                    onClose();
                    setMessage('');
                }, 2000);
            } else {
                setError(data.error || 'Something went wrong');
            }
        } catch (err) {
            setError('Failed to submit. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 px-4">
            <div className="bg-[#1a1a1a] border-2 border-yellow-400 rounded-lg p-8 max-w-md w-full relative">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-white hover:text-yellow-400 text-2xl"
                    aria-label="Close"
                >
                    ×
                </button>

                <h2 className="text-2xl font-bold text-yellow-400 mb-4">Notify Me</h2>
                <p className="text-white mb-6">
                    Enter your information and we'll notify you when tickets become available!
                </p>

                {message ? (
                    <div className="bg-green-600 text-white p-4 rounded mb-4">
                        {message}
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-white mb-2">
                                Name *
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:border-yellow-400 focus:outline-none"
                                placeholder="Your name"
                            />
                        </div>

                        <div className="mb-6">
                            <label htmlFor="email" className="block text-white mb-2">
                                Email *
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:border-yellow-400 focus:outline-none"
                                placeholder="your.email@example.com"
                            />
                        </div>

                        {error && (
                            <div className="bg-red-600 text-white p-3 rounded mb-4">
                                {error}
                            </div>
                        )}

                        <div className="flex gap-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="flex-1 px-6 py-3 bg-gray-600 text-white rounded hover:bg-gray-700 transition"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex-1 px-6 py-3 bg-yellow-400 text-black font-bold rounded hover:bg-yellow-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Submitting...' : 'Notify Me'}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}
