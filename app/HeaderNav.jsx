'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function HeaderNav() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <>
            {/* Header - Sticky */}
            <header className="text-white px-6 py-4 bg-[#000000] relative sticky top-0 z-50">
                <div className="max-w-7xl mx-auto w-full flex items-center justify-between relative">
                    {/* Left: Logo */}
                    <div className="flex items-center">
                        <a href="/">
                            {/* Mobile: Favicon */}
                            <Image
                                src="/images/header_nav/favicon.jpg"
                                alt="6 Guitars"
                                width={40}
                                height={40}
                                priority
                                quality={90}
                                className="md:hidden"
                            />
                            {/* Desktop: Full Logo */}
                            <Image
                                src="/images/header_nav/logo.png"
                                alt="6 Guitars Logo"
                                width={200}
                                height={60}
                                priority
                                quality={90}
                                className="hidden md:block"
                            />
                        </a>
                    </div>



                    {/* Center: BUY TICKETS button */}
                    <div
                        className="absolute left-1/2 transform -translate-x-1/2 z-10"
                        style={{
                            animation: 'pulseGlow 5s ease-in-out infinite',
                        }}
                    >
                        <a
                            href="#tickets"
                            className="inline-block bg-[#8a828c] text-white px-3 py-2 sm:px-6 sm:py-3 rounded-md text-sm sm:text-lg font-bold hover:bg-[#b01234] transition border-2 border-white"
                            style={{
                                boxShadow: '0 0 5px rgba(255, 255, 255, 0.5)',
                            }}
                        >
                            BUY TICKETS
                        </a>
                    </div>

                    {/* Right-aligned Menu (Desktop) */}
                    <nav className="hidden md:flex ml-auto items-center space-x-6">
                        <a href="#about" className="hover:text-yellow-400">About</a>
                        <a href="#contact" className="hover:text-yellow-400">Contact</a>
                        <a href="#reviews" className="hover:text-yellow-400">Reviews</a>
                    </nav>

                    {/* Hamburger Icon - Mobile Only */}
                    <button
                        className="md:hidden"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Toggle menu"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>
                </div>
            </header>

            {/* Mobile Dropdown Menu */}
            {menuOpen && (
                <nav className="bg-black text-white flex flex-col items-center space-y-4 py-4 md:hidden">
                    <a href="#about" className="hover:text-yellow-400" onClick={() => setMenuOpen(false)}>About</a>
                    <a href="#contact" className="hover:text-yellow-400" onClick={() => setMenuOpen(false)}>Contact</a>
                    <a href="#reviews" className="hover:text-yellow-400" onClick={() => setMenuOpen(false)}>Reviews</a>
                    <a href="#tickets" className="hover:text-yellow-400" onClick={() => setMenuOpen(false)}>Tour</a>

                </nav>
            )}
        </>
    );
}
