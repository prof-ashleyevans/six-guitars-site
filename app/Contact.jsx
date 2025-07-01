'use client';
import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Contact() {
    useEffect(() => {
        AOS.init({ once: true, duration: 800 });
    }, []);

    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [subscribe, setSubscribe] = useState(true); // checked by default

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.target);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');

        try {
            // Send to Formspree
            const res = await fetch('https://formspree.io/f/xovwwoay', {
                method: 'POST',
                headers: { Accept: 'application/json' },
                body: formData,
            });

            if (!res.ok) throw new Error('Formspree failed');

            // Also send to Brevo if subscribed
            if (subscribe) {
                await fetch('/api/subscribe', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, email }),
                });
            }

            setSubmitted(true);
        } catch (error) {
            alert('Oops! Something went wrong. Please try again later.');
        }

        setLoading(false);
    };

    return (
        <section className="relative py-16">
            {/* ✅ Mobile Background (rotated or resized if needed) */}
            <div className="block sm:hidden absolute inset-0 overflow-hidden">
                <div
                    className="w-[140px] h-full origin-center bg-contain bg-no-repeat bg-center"
                    style={{
                        backgroundImage: "url('/images/guitar_only_small_mobile.png')",
                    }}
                ></div>
            </div>

            {/* ✅ Desktop Background */}
            <div
                className="hidden sm:block absolute inset-0 bg-cover bg-[25%_center]"
                style={{
                    backgroundImage: "url('/images/guitar_only_shifted.png')",
                }}
            ></div>

            {/* Overlay */}
            <div className="relative z-10 bg-black/30 py-12 px-4">
                <div
                    className="w-[90%] sm:w-full sm:max-w-none ml-auto sm:mx-auto"
                    data-aos="fade-up"
                >
                    {/* 1. Centered heading */}
                    <h2 className="text-4xl font-bold mb-5 text-white text-center">
                        Stay In The Loop
                    </h2>

                    {/* 2. Right-aligned on mobile, centered on desktop */}
                    <p className="text-lg mb-0 text-yellow-400 text-center">
                        Sign up for updates, and
                    </p>
                    <p className="text-lg mb-10 text-yellow-400 text-center">
                         send Chase a message!
                    </p>


                    {/* 3 & 4. Form fields aligned right on mobile, fixed width on desktop */}
                    {submitted ? (
                        <p className="text-green-500 mt-6 text-right sm:text-center">
                            Thanks for reaching out!
                        </p>
                    ) : (
                        <form
                            onSubmit={handleSubmit}
                            className="space-y-3 mt-8 w-[90%] max-w-[280px] sm:max-w-md mx-auto text-center"
                        >
                            <input
                                type="text"
                                name="name"
                                placeholder="Your Name"
                                className="w-full px-4 py-2 bg-black/60 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-gray-300"
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Your Email"
                                className="w-full px-4 py-2 bg-black/60 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-gray-300"
                            />
                            <textarea
                                name="message"
                                rows={5}
                                placeholder="Your Message"
                                className="w-full px-4 py-2 bg-black/60 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-gray-300"
                            />
                            <label className="flex items-center justify-center space-x-2 text-sm sm:text-base">
                                <input
                                    type="checkbox"
                                    checked={subscribe}
                                    onChange={() => setSubscribe(!subscribe)}
                                    className="accent-yellow-400"
                                />
                                <span>Subscribe to Chase Padgett's email list</span>
                            </label>
                            <button
                                type="submit"
                                disabled={loading}
                                className={`${
                                    loading ? 'opacity-50 cursor-not-allowed' : ''
                                } bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-md`}
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
