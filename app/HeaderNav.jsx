'use client';
import { useState, useEffect } from 'react';

export default function HeaderNav() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [showHeaderButton, setShowHeaderButton] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            setShowHeaderButton(window.scrollY < 100); // Hide after scrolling 100px
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            {/* Header */}
            <header className="text-white px-6 py-4 bg-[#1a1a1a] relative">
                <div className="max-w-7xl mx-auto w-full flex items-center justify-between relative">
                    {/* Left: Logo */}
                    <div className="text-xl font-bold whitespace-nowrap">6 Guitars</div>

                    {/* Center: BUY TICKETS button */}
                    {showHeaderButton && (
                        <div
                            className="absolute left-1/2 transform -translate-x-1/2 border border-white px-1 py-3 rounded-xl z-10"
                            style={{
                                animation: 'pulseGlow 2s ease-in-out infinite',
                                boxShadow: '0 0 20px rgba(255, 255, 255, 0.5)',
                            }}
                        >
                            <a
                                href="#tickets"
                                className="bg-[#8a828c] text-white px-5 py-3 rounded-lg font-semibold hover:bg-[#b01234] transition"
                            >
                                BUY TICKETS
                            </a>
                        </div>
                    )}

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
                </nav>
            )}
        </>
    );
}
