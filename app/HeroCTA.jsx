'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import IconRow from '@/app/IconRow';

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
    const [showTrailer, setShowTrailer] = useState(false);
    const [trailerNeedsTap, setTrailerNeedsTap] = useState(false);
    const trailerIframeRef = useRef(null);
    const trailerPlayerRef = useRef(null);

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

    const ensureVimeoApi = () => {
        if (typeof window === 'undefined') return Promise.reject(new Error('No window'));
        if (window.Vimeo && window.Vimeo.Player) return Promise.resolve();
        return new Promise((resolve, reject) => {
            const existing = document.getElementById('vimeo-player-api');
            if (existing) {
                existing.addEventListener('load', () => resolve(), { once: true });
                existing.addEventListener('error', () => reject(new Error('Failed to load Vimeo API')), { once: true });
                return;
            }
            const script = document.createElement('script');
            script.id = 'vimeo-player-api';
            script.src = 'https://player.vimeo.com/api/player.js';
            script.async = true;
            script.onload = () => resolve();
            script.onerror = () => reject(new Error('Failed to load Vimeo API'));
            document.body.appendChild(script);
        });
    };

    const forcePlayWithSound = async () => {
        if (!trailerIframeRef.current) return;
        await ensureVimeoApi();
        if (!trailerPlayerRef.current) {
            trailerPlayerRef.current = new window.Vimeo.Player(trailerIframeRef.current);
        }
        const player = trailerPlayerRef.current;
        await player.setMuted(false).catch(() => {});
        await player.setVolume(1).catch(() => {});
        await player.play();
    };

    useEffect(() => {
        let cancelled = false;
        if (!showTrailer) {
            setTrailerNeedsTap(false);
            return;
        }
        (async () => {
            try {
                await forcePlayWithSound();
                if (!cancelled) setTrailerNeedsTap(false);
            } catch {
                if (!cancelled) setTrailerNeedsTap(true);
            }
        })();
        return () => {
            cancelled = true;
        };
    }, [showTrailer]);

    return (
        <>
            <section className="bg-black text-white pt-0 pb-3 px-4 sm:hidden relative z-20 -mt-6">
                <div className="max-w-md mx-auto space-y-3">
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
                        if (window.dataLayer) {
                            window.dataLayer.push({ event: 'hero_cta_click', cta_variant: ctaVariant });
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

                {/* Mobile Watch Trailer button (PC uses a button in HeroSection) */}
                <button
                    type="button"
                    onClick={() => setShowTrailer(true)}
                    className="hero-mobile-watch-trailer block w-full bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-4 rounded-lg shadow-xl flex items-center justify-center gap-3 font-bold text-2xl sm:text-3xl transition-all mt-0"
                >
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-black/80 text-yellow-400">
                        <svg
                            className="w-4 h-4"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            aria-hidden="true"
                        >
                            <path d="M8 5v14l11-7z" />
                        </svg>
                    </span>
                    <span>Watch Trailer</span>
                </button>

                {/* Mobile icon row lives with the CTAs */}
                <div className="mt-4">
                    <IconRow />
                </div>

                </div>
            </section>

            {/* Keep modal outside sm:hidden container so orientation changes don't hide it */}
            {showTrailer && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-[999]"
                    onClick={() => setShowTrailer(false)}
                >
                    <div
                        className="flex flex-col items-center gap-4 w-[90%] max-w-3xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="relative w-full aspect-video">
                            <button
                                type="button"
                                className="absolute top-2 right-2 text-white text-3xl font-bold z-10"
                                onClick={() => setShowTrailer(false)}
                                aria-label="Close trailer"
                            >
                                ×
                            </button>
                            <iframe
                                ref={trailerIframeRef}
                                src="https://player.vimeo.com/video/1047706165?autoplay=1&muted=0&playsinline=1&controls=1"
                                title="6 Guitars Trailer"
                                allow="autoplay; fullscreen; picture-in-picture"
                                allowFullScreen
                                className="w-full h-full rounded-lg"
                            />
                            {trailerNeedsTap && (
                                <button
                                    type="button"
                                    onClick={async () => {
                                        try {
                                            await forcePlayWithSound();
                                            setTrailerNeedsTap(false);
                                        } catch {
                                            // Keep button visible if browser still blocks playback with sound.
                                        }
                                    }}
                                    className="absolute inset-0 m-auto h-12 w-56 bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded-md shadow-xl"
                                >
                                    Tap for Sound
                                </button>
                            )}
                        </div>

                        <button
                            type="button"
                            onClick={() => setShowTrailer(false)}
                            className="w-full max-w-xs bg-white text-black font-bold py-2 rounded-md border border-white hover:bg-yellow-300 transition"
                        >
                            Back
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
