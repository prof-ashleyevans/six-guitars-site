'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function FloatingCTA() {
    const [isVisible, setIsVisible] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);

        // Show floating button after scrolling past hero section
        const handleScroll = () => {
            const heroHeight = window.innerHeight;
            if (window.scrollY > heroHeight * 0.5) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('resize', checkMobile);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    if (!isMobile) return null;

    return (
        <a
            href="#tickets"
            className={`fixed bottom-6 right-6 z-50 bg-[#b01234] hover:bg-[#8a828c] text-white px-6 py-4 rounded-full shadow-2xl flex items-center gap-2 font-bold text-lg transition-all duration-300 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
            }`}
            style={{
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.5)',
            }}
        >
            <Image
                src="/images/icons/Ticket Icon White.png"
                alt="Ticket"
                width={24}
                height={24}
                className="w-6 h-6"
                unoptimized
            />
            <span>Get Tickets</span>
        </a>
    );
}
