'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function HeroCTA() {
    const [nextShow, setNextShow] = useState(null);
    const [loading, setLoading] = useState(true);

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
        const date = new Date(dateStr);
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
        <section className="bg-black text-white pt-0 pb-3 px-4 sm:hidden" style={{ marginTop: 0 }}>
            <div className="max-w-md mx-auto">
                {/* Get Tickets Button */}
                <a
                    href="#tickets"
                    className="block bg-yellow-400 hover:bg-yellow-300 text-black px-6 py-4 rounded-lg shadow-xl flex items-center justify-center gap-2 font-bold text-lg transition-all"
                >
                    <Image
                        src="/images/icons/Ticket Icon White.png"
                        alt="Ticket"
                        width={20}
                        height={20}
                        sizes="20px"
                        className="w-5 h-5"
                        style={{ filter: 'brightness(0) saturate(100%) invert(9%) sepia(100%) saturate(7479%) hue-rotate(0deg) brightness(95%) contrast(118%)' }}
                        unoptimized
                    />
                    <span>Get Tickets</span>
                </a>
            </div>
        </section>
    );
}
