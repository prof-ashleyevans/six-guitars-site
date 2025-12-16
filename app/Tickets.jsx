'use client';
import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Ticket status colors and styles
// Matches Airtable "Ticket Avail" field values
const ticketStatusConfig = {
    'available': {
        bgColor: 'bg-green-600',
        hoverColor: 'hover:bg-green-700',
        borderColor: 'border-green-500',
        text: 'Get Tickets',
        clickable: true,
    },
    'coming soon': {
        bgColor: 'bg-gray-500',
        hoverColor: '',
        borderColor: 'border-gray-400',
        text: 'Coming Soon',
        clickable: false,
    },
    'limited avail': {
        bgColor: 'bg-yellow-500',
        hoverColor: 'hover:bg-yellow-600',
        borderColor: 'border-yellow-400',
        text: 'Get Tickets - Limited Availability',
        clickable: true,
    },
    'going fast': {
        bgColor: 'bg-orange-500',
        hoverColor: 'hover:bg-orange-600',
        borderColor: 'border-orange-400',
        text: 'Buy Now - Going Fast!',
        clickable: true,
    },
    'sold out': {
        bgColor: 'bg-red-600',
        hoverColor: '',
        borderColor: 'border-red-500',
        text: 'Sold Out!',
        clickable: false,
    },
    'sold out!': {
        bgColor: 'bg-red-600',
        hoverColor: '',
        borderColor: 'border-red-500',
        text: 'Sold Out!',
        clickable: false,
    },
};

function getTicketConfig(status) {
    const normalizedStatus = (status || 'available').toLowerCase().trim();
    return ticketStatusConfig[normalizedStatus] || ticketStatusConfig['available'];
}

export default function Tickets() {
    const [shows, setShows] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/shows')
            .then((res) => res.json())
            .then((data) => {
                // Ensure data is an array, otherwise default to empty array
                if (Array.isArray(data)) {
                    setShows(data);
                } else {
                    console.error('API returned non-array:', data);
                    setShows([]);
                }
                setLoading(false);
            })
            .catch((err) => {
                console.error('Failed to load shows:', err);
                setShows([]);
                setLoading(false);
            });

        AOS.init({ once: true });
    }, []);

    function parseDate(dateStr) {
        if (!dateStr) return null;
        
        let date;
        
        if (dateStr.includes('T') || dateStr.includes('-')) {
            // ISO format: 2025-01-12 or 2025-01-12T00:00:00.000Z
            date = new Date(dateStr);
        } else if (dateStr.includes('/')) {
            // US format: 1/12/2026 or 12/7/2025
            const parts = dateStr.split('/');
            const month = parseInt(parts[0], 10) - 1;
            const day = parseInt(parts[1], 10);
            const year = parseInt(parts[2], 10);
            date = new Date(year, month, day);
        } else {
            date = new Date(dateStr);
        }
        
        if (isNaN(date.getTime())) return null;
        return date;
    }

    function formatMonthDay(dateStr) {
        const date = parseDate(dateStr);
        if (!date) return 'TBD';
        return date.toLocaleDateString(undefined, {
            month: 'short',
            day: 'numeric',
        });
    }

    function formatDayOfWeek(dateStr) {
        const date = parseDate(dateStr);
        if (!date) return '';
        return date.toLocaleDateString(undefined, {
            weekday: 'long',
        });
    }

    function TicketButton({ performance }) {
        const config = getTicketConfig(performance.ticketAvail);
        const link = performance.ticketLink || performance.link;
        const fullLink = link?.startsWith('http') 
            ? link 
            : `https://${link}`;

        const buttonContent = (
            <>
                <span className="font-semibold">{config.text}</span>
                {config.clickable && <span className="ml-1">→</span>}
            </>
        );

        if (config.clickable && link) {
            return (
                <a
                    href={fullLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${config.bgColor} ${config.hoverColor} border ${config.borderColor} px-4 py-2 min-h-[50px] flex items-center justify-center gap-1 rounded-full transition text-sm text-white text-center`}
                >
                    {buttonContent}
                </a>
            );
        }

        return (
            <div
                className={`${config.bgColor} border ${config.borderColor} px-4 py-2 min-h-[50px] flex items-center justify-center gap-1 rounded-full text-sm text-white text-center cursor-not-allowed opacity-80`}
            >
                {buttonContent}
            </div>
        );
    }

    return (
        <section id="tickets" className="bg-black text-white px-6 py-16">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-4xl font-bold text-center mb-4">Upcoming Shows</h2>
                <p className="text-center text-yellow-400 mb-8">
                    ⭐ = Performances with Full Band
                </p>

                {loading ? (
                    <p className="text-center text-gray-400">Loading shows...</p>
                ) : shows.length === 0 ? (
                    <p className="text-center text-gray-400">No upcoming shows available.</p>
                ) : (
                    <div className="space-y-6">
                        {shows.map((show, index) => (
                            <div
                                key={show.groupKey || index}
                                className="bg-white/5 rounded-xl py-6 px-6"
                            >
                                {/* Header Row: Date, Day, Location, Venue */}
                                <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6 text-center md:text-left">
                                    {/* Month & Day */}
                                    <span className="text-2xl font-bold">
                                        {formatMonthDay(show.date)}
                                    </span>

                                    {/* Day of Week */}
                                    <span className="text-lg text-gray-400 uppercase">
                                        {show.day || formatDayOfWeek(show.date)?.substring(0, 3).toUpperCase()}
                                    </span>

                                    {/* Location */}
                                    <span className="text-lg font-bold uppercase text-yellow-400">
                                        {show.location}
                                    </span>

                                    {/* Venue */}
                                    <span className="text-lg">
                                        {show.venue}
                                    </span>
                                </div>

                                {/* Performance Rows: Time, Discount, Button - below city name */}
                                <div className="space-y-3 mt-4">
                                    {show.performances.map((perf, perfIndex) => (
                                        <div 
                                            key={perfIndex}
                                            className="flex flex-col md:flex-row md:items-center gap-3 md:gap-0 md:pl-8"
                                        >
                                            {/* Time */}
                                            <div className="text-lg w-full md:w-[15%] text-center md:text-left">
                                                {perf.time}
                                                {perf.fullBand && <span className="text-yellow-400 ml-2">⭐</span>}
                                            </div>

                                            {/* Discount Message */}
                                            <div className="w-full md:w-[50%] text-center">
                                                {perf.discountCode && perf.discountPercentage && (
                                                    <span className="text-yellow-400 font-semibold">
                                                        Use code {perf.discountCode} for {perf.discountPercentage}% off!
                                                    </span>
                                                )}
                                            </div>

                                            {/* Ticket Button */}
                                            <div className="w-full md:w-[35%] flex justify-center md:justify-end">
                                                <TicketButton performance={perf} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
