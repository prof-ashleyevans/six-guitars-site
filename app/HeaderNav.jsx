'use client';
import { useState } from 'react';

export default function HeaderNav() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <>
            {/* Header */}
            <header className="text-white px-6 py-4 flex items-center justify-between bg-[#1a1a1a]">
                <div className="text-xl font-bold">6 Guitars</div>

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

                {/* Desktop Menu */}
                <nav className="hidden md:flex space-x-6">
                    <a href="#about" className="hover:text-yellow-400">
                        About
                    </a>
                    <a href="#contact" className="hover:text-yellow-400">
                        Contact
                    </a>
                    <a href="#reviews" className="hover:text-yellow-400">
                        Reviews
                    </a>
                </nav>
            </header>

            {/* Mobile Dropdown Menu */}
            {menuOpen && (
                <nav className="bg-black text-white flex flex-col items-center space-y-4 py-4 md:hidden">
                    <a
                        href="#about"
                        className="hover:text-yellow-400"
                        onClick={() => setMenuOpen(false)}
                    >
                        About
                    </a>
                    <a
                        href="#contact"
                        className="hover:text-yellow-400"
                        onClick={() => setMenuOpen(false)}
                    >
                        Contact
                    </a>
                    <a
                        href="#reviews"
                        className="hover:text-yellow-400"
                        onClick={() => setMenuOpen(false)}
                    >
                        Reviews
                    </a>
                </nav>
            )}
        </>
    );
}
