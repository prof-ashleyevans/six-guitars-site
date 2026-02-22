'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Contact() {
    useEffect(() => {
        AOS.init({ once: true, duration: 800 });
    }, []);

    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [subscribeMessage, setSubscribeMessage] = useState('');
    const [showMessageField, setShowMessageField] = useState(false);

    const handleMessageSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.target);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');

        // Validate required fields
        if (!name || !email || !message) {
            alert('Please fill out all fields.');
            setLoading(false);
            return;
        }

        try {
            // Send to Formspree
            const res = await fetch('https://formspree.io/f/xovwwoay', {
                method: 'POST',
                headers: { Accept: 'application/json' },
                body: formData,
            });

            if (!res.ok) throw new Error('Formspree failed');

            setSubmitted(true);
        } catch (error) {
            alert('Oops! Something went wrong. Please try again later.');
        }

        setLoading(false);
    };

    const handleSubscribe = async (e) => {
        e.preventDefault();
        setLoading(true);

        const form = e.target.closest('form');
        const formData = new FormData(form);
        const name = formData.get('name');
        const email = formData.get('email');

        // Validate required fields
        if (!name || !email) {
            alert('Please enter your name and email.');
            setLoading(false);
            return;
        }

        try {
            const res = await fetch('/api/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email }),
            });

            const data = await res.json();

            if (!res.ok) {
                console.error('Subscribe error:', data);
                alert(`Error: ${data.error || 'Failed to subscribe'}`);
                setLoading(false);
                return;
            }

            // Check if already subscribed
            if (data.alreadySubscribed) {
                setSubscribeMessage('You are already subscribed!');
            } else {
                setSubscribeMessage('Successfully subscribed!');
            }
            setTimeout(() => setSubscribeMessage(''), 3000);
        } catch (error) {
            console.error('Subscribe exception:', error);
            alert('Oops! Something went wrong. Please try again later.');
        }

        setLoading(false);
    };

    return (
        <section id="contact" className="relative py-16">
            {/* ✅ Mobile Background (rotated or resized if needed) */}
            <div className="block sm:hidden absolute inset-0 overflow-hidden">
                <div className="relative w-[140px] h-full">
                    <Image
                        src="/images/guitar_only_small_mobile.png"
                        alt="Guitar background mobile"
                        fill
                        sizes="140px"
                        className="object-contain object-center"
                        loading="lazy"
                        unoptimized
                    />
                </div>
            </div>

            {/* ✅ Desktop Background */}
            <div className="hidden sm:block absolute inset-0">
                <Image
                    src="/images/guitar_only_shifted.png"
                    alt="Guitar background"
                    fill
                    sizes="100vw"
                    className="object-cover"
                    style={{ objectPosition: '25% center' }}
                    loading="lazy"
                    unoptimized
                />
            </div>

            {/* Overlay */}
            <div className="relative z-10 bg-black/30 py-12 px-4">
                <div
                    className="w-[90%] sm:w-full sm:max-w-none ml-auto sm:mx-auto"
                    data-aos="fade-up"
                >
                    {/* 1. Centered heading */}
                    <h2 className="text-4xl font-bold mb-5 text-white text-center">
                        Give Us a Shout
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
                            onSubmit={handleMessageSubmit}
                            className="space-y-3 mt-8 w-[90%] max-w-[280px] sm:max-w-md mx-auto text-center"
                        >
                            <input
                                type="text"
                                name="name"
                                placeholder="Your Name"
                                required
                                className="w-full px-4 py-2 bg-black/60 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-gray-300"
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Your Email"
                                required
                                className="w-full px-4 py-2 bg-black/60 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-gray-300"
                            />
                            
                            {/* Conditionally show message field */}
                            {showMessageField && (
                                <textarea
                                    name="message"
                                    rows={5}
                                    placeholder="Your Message"
                                    required
                                    className="w-full px-4 py-2 bg-black/60 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-gray-300"
                                />
                            )}
                            
                            {/* Buttons */}
                            {!showMessageField ? (
                                // Initial state: show both action buttons
                                <div className="flex gap-3 justify-center flex-col sm:flex-row">
                                    <button
                                        type="button"
                                        onClick={() => setShowMessageField(true)}
                                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md flex-1 sm:flex-initial"
                                    >
                                        Send Chase a Message
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleSubscribe}
                                        disabled={loading}
                                        className={`${
                                            loading ? 'opacity-50 cursor-not-allowed' : ''
                                        } bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded-md flex-1 sm:flex-initial`}
                                    >
                                        Subscribe to Email List
                                    </button>
                                </div>
                            ) : (
                                // Message field is showing: show submit button
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`${
                                        loading ? 'opacity-50 cursor-not-allowed' : ''
                                    } bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-md w-full`}
                                >
                                    {loading ? 'Sending...' : 'Submit Message'}
                                </button>
                            )}
                            
                            {subscribeMessage && (
                                <p className="text-green-500 text-sm">{subscribeMessage}</p>
                            )}
                        </form>

                    )}
                </div>
            </div>

        </section>
    );
}
