'use client';
import React, { useState } from 'react';

export default function Contact() {
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.target);

        try {
            const res = await fetch('https://formspree.io/f/xovwwoay', {
                method: 'POST',
                headers: { Accept: 'application/json' },
                body: formData,
            });

            if (res.ok) {
                setSubmitted(true);
            } else {
                alert('Oops! Something went wrong.');
            }
        } catch (error) {
            alert('Network error. Please try again later.');
        }

        setLoading(false);
    };

    return (
        <section id="contact" className="bg-black text-white px-1 py-6">
            <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-4xl font-bold mb-8">Stay In The Loop</h2>
                <p className="text-lg mb-0 text-yellow-400">
                    Sign up for email updates on tour dates, news, and more.
                </p>

                <div className="w-full flex justify-center px-4 py-8">
                    <div
                        className="origin-top scale-[0.95] sm:scale-100 md:scale-[1.15]"
                        style={{ width: '100%', maxWidth: '520px' }}
                    >
                        <iframe
                            src="https://f235afe6.sibforms.com/serve/MUIFAH3opnOlO_tL0vrN6_308qhceyLUxWLUV9IdGdme7Z6S7vJHUQpKW31bsTBkanDNUZJgpcaRzCYkFISgp0dcX2QFIu3jrZjHcEktV8fhpV1vPcTqisBfj4DKWVEcHIWSW3JyfMFnA1gCmIKFVEPeA31BuWQKS6ciwxmFhF6MYqXSfHgTOGONOD2QtIpAZwNp_SydrmGD5gtR"
                            width="100%"
                            height="600"
                            frameBorder="0"
                            scrolling="auto"
                            allowFullScreen
                            style={{
                                display: 'block',
                                margin: '0 auto',
                                maxWidth: '100%',
                                border: 'none',
                            }}
                        />
                    </div>
                </div>

                <div className="max-w-xl mx-auto">
                    <h2 className="text-3xl font-bold mb-6 text-center">Contact Chase</h2>
                    <p className="text-center text-yellow-500">
                        Chase would love to hear from you! Drop him a line here.
                    </p>

                    {submitted ? (
                        <p className="text-center text-green-500 mt-6">
                            Thanks for reaching out!
                        </p>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6 mt-8">
                            <input
                                type="text"
                                name="name"
                                required
                                placeholder="Your Name"
                                className="w-full px-4 py-2 mt-1 bg-gray-800 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                type="email"
                                name="email"
                                required
                                placeholder="Your Email"
                                className="w-full px-4 py-2 mt-1 bg-gray-800 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <textarea
                                name="message"
                                required
                                rows={5}
                                placeholder="Your Message"
                                className="w-full px-4 py-2 mt-1 bg-gray-800 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                type="submit"
                                disabled={loading}
                                className={`${
                                    loading ? 'opacity-50 cursor-not-allowed' : ''
                                } bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-md transition`}
                            >
                                {loading ? 'Sending...' : 'Send Message'}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </section>
    );
}
