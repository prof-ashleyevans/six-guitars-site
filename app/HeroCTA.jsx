'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';

const HERO_CTA_STORAGE_KEY = 'hero-cta-variant';
const HERO_CTA_VARIANTS = { A: 'Get Tour Dates', B: 'See Tour Dates' };

function getHeroCtaVariant() {
    if (typeof window === 'undefined') return 'A';
    const stored = sessionStorage.getItem(HERO_CTA_STORAGE_KEY);
    if (stored === 'A' || stored === 'B') return stored;
    const v = Math.random() < 0.5 ? 'A' : 'B';
    sessionStorage.setItem(HERO_CTA_STORAGE_KEY, v);
    return v;
}

export default function HeroCTA() {
    const [nextShow, setNextShow] = useState(null);
    const [loading, setLoading] = useState(true);
    const [ctaVariant, setCtaVariant] = useState('A');

    useEffect(() => {
        setCtaVariant(getHeroCtaVariant());
    }, []);

    useEffect(() => {
        fetch('/api/shows')
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data) && data.length > 0) {
                    // Get the first upcoming show
                    const show = data[0];
                    const perf = show.performances?.[0];
                    if (perf) {
                        setNextShow({
                            date: show.date,
                            venue: show.venue,
                            location: show.location,
                            time: perf.time,
                            ticketAvail: perf.ticketAvail,
                        });
                    }
                }
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const formatDate = (dateStr) => {
        if (!dateStr) return '';
        const str = String(dateStr).trim();
        const isoMatch = str.match(/^(\d{4})-(\d{2})-(\d{2})/);
        const date = isoMatch
            ? new Date(Number(isoMatch[1]), Number(isoMatch[2]) - 1, Number(isoMatch[3]))
            : new Date(dateStr);
        return date.toLocaleDateString(undefined, {
            month: 'short',
            day: 'numeric',
        });
    };

    const formatLocation = (location) => {
        if (!location) return '';
        const parts = location.trim().split(' ');
        if (parts.length < 2) return location;
        const state = parts[parts.length - 1];
        const city = parts.slice(0, -1).join(' ');
        return `${city}, ${state}`;
    };

    const isAvailable = nextShow?.ticketAvail?.toLowerCase() === 'available' || 
                        nextShow?.ticketAvail?.toLowerCase() === 'limited avail' ||
                        nextShow?.ticketAvail?.toLowerCase() === 'going fast';

    return (
        <section className="bg-black text-white pt-0 pb-3 px-4 sm:hidden relative z-20" style={{ marginTop: 0 }}>
            <div className="max-w-md mx-auto">
                {/* Hero CTA Button (A/B: Get Tour Dates vs See Tour Dates) */}
                <a
                    id="hero-get-tour-dates"
                    href="#tickets"
                    data-cta-variant={ctaVariant}
                    className="hero-get-tour-dates track-get-tour-dates block bg-[#b01234] hover:bg-[#8a0e28] text-white px-6 py-4 rounded-lg shadow-xl flex items-center justify-center gap-2 font-bold text-2xl sm:text-3xl transition-all"
                    onClick={() => {
                        if (typeof window === 'undefined') return;
                        window.dispatchEvent(new CustomEvent('hero_cta_click', { detail: { variant: ctaVariant } }));
                        if (window.gtag) {
                            window.gtag('event', 'hero_cta_click', { cta_variant: ctaVariant });
                        }
                    }}
                >
                    <Image
                        src="/images/icons/Ticket Icon White.png"
                        alt="Ticket"
                        width={20}
                        height={20}
                        sizes="20px"
                        className="w-5 h-5"
                        unoptimized
                    />
                    <span>{HERO_CTA_VARIANTS[ctaVariant]}</span>
                </a>
            </div>
        </section>
    );
}
