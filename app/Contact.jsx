'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import AOS from 'aos';
import 'aos/dist/aos.css';

const FORMSPREE_CONTACT_ID = 'xovwwoay'; // name + email
const FORMSPREE_MESSAGE_ID = 'xnjbbpzj'; // message (includes hidden name + email when provided)

export default function Contact() {
    useEffect(() => {
        AOS.init({ once: true, duration: 800 });
    }, []);

    const [nameEmailSubmitted, setNameEmailSubmitted] = useState(false);
    const [messageSubmitted, setMessageSubmitted] = useState(false);
    const [loadingContact, setLoadingContact] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState(false);
    const [subscribe, setSubscribe] = useState(false);
    const [contactName, setContactName] = useState('');
    const [contactEmail, setContactEmail] = useState('');

    const handleNameEmailSubmit = async (e) => {
        e.preventDefault();
        setLoadingContact(true);
        const formData = new FormData(e.target);
        const name = formData.get('name');
        const email = formData.get('email');

        try {
            const res = await fetch(`https://formspree.io/f/${FORMSPREE_CONTACT_ID}`, {
                method: 'POST',
                headers: { Accept: 'application/json' },
                body: formData,
            });
            if (!res.ok) throw new Error('Formspree failed');
            if (subscribe) {
                await fetch('/api/subscribe', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, email }),
                });
            }
            setContactName(String(name || ''));
            setContactEmail(String(email || ''));
            setNameEmailSubmitted(true);
        } catch (err) {
            alert('Something went wrong. Please try again.');
        }
        setLoadingContact(false);
    };

    const handleMessageSubmit = async (e) => {
        e.preventDefault();
        setLoadingMessage(true);
        const formData = new FormData(e.target);

        try {
            const res = await fetch(`https://formspree.io/f/${FORMSPREE_MESSAGE_ID}`, {
                method: 'POST',
                headers: { Accept: 'application/json' },
                body: formData,
            });
            if (!res.ok) throw new Error('Formspree failed');
            setMessageSubmitted(true);
        } catch (err) {
            alert('Something went wrong. Please try again.');
        }
        setLoadingMessage(false);
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


                    {/* Form 1: Name + Email (optional to submit; message is separate) */}
                    <div className="space-y-3 mt-8 w-[90%] max-w-[280px] sm:max-w-md mx-auto text-center">
                        <form onSubmit={handleNameEmailSubmit} className="space-y-3">
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
                            <label className="flex items-center justify-center space-x-2 text-sm sm:text-base text-white">
                                <input
                                    type="checkbox"
                                    checked={subscribe}
                                    onChange={() => setSubscribe(!subscribe)}
                                    className="accent-yellow-400"
                                />
                                <span className="text-white">Subscribe to Chase Padgett's email list</span>
                            </label>
                            <button
                                type="submit"
                                disabled={loadingContact}
                                className={`${
                                    loadingContact ? 'opacity-50 cursor-not-allowed' : ''
                                } bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-md`}
                            >
                                {loadingContact ? 'Sending...' : 'Submit contact info'}
                            </button>
                        </form>
                        {nameEmailSubmitted && (
                            <p className="text-green-500 text-sm">Thanks — we got your info!</p>
                        )}

                        {/* Form 2: Message only */}
                        <div className="pt-4 border-t border-gray-600">
                            <p className="text-white/80 text-sm mb-2">Send a message (optional)</p>
                            {messageSubmitted ? (
                                <p className="text-green-500 text-sm">Message sent! Thanks.</p>
                            ) : (
                                <form onSubmit={handleMessageSubmit} className="space-y-3">
                                    <input type="hidden" name="name" value={contactName} />
                                    <input type="hidden" name="email" value={contactEmail} />
                                    <textarea
                                        name="message"
                                        rows={5}
                                        placeholder="Your Message"
                                        required
                                        className="w-full px-4 py-2 bg-black/60 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-gray-300"
                                    />
                                    <button
                                        type="submit"
                                        disabled={loadingMessage}
                                        className={`${
                                            loadingMessage ? 'opacity-50 cursor-not-allowed' : ''
                                        } bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-md`}
                                    >
                                        {loadingMessage ? 'Sending...' : 'Send message'}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>

        </section>
    );
}
