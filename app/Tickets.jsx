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

// ============================================
// UTILITY FUNCTIONS
// ============================================

function parseDate(dateStr) {
    if (!dateStr) return null;
    
    let date;
    
    if (dateStr.includes('T') || dateStr.includes('-')) {
        date = new Date(dateStr);
    } else if (dateStr.includes('/')) {
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

function formatDayOfWeek(dateStr, short = false) {
    const date = parseDate(dateStr);
    if (!date) return '';
    const day = date.toLocaleDateString(undefined, { weekday: 'long' });
    return short ? day.substring(0, 3).toUpperCase() : day;
}

// ============================================
// TICKET BUTTON COMPONENT
// ============================================

function TicketButton({ performance, compact = false }) {
    const config = getTicketConfig(performance.ticketAvail);
    const link = performance.ticketLink || performance.link;
    const fullLink = link?.startsWith('http') ? link : `https://${link}`;

    const buttonContent = (
        <>
            <span className="font-semibold">{config.text}</span>
            {config.clickable && <span className="ml-1">→</span>}
        </>
    );

    const baseClasses = compact
        ? `${config.bgColor} ${config.hoverColor} border ${config.borderColor} px-3 py-1.5 flex items-center justify-center gap-1 rounded-full transition text-sm text-white text-center`
        : `${config.bgColor} ${config.hoverColor} border ${config.borderColor} px-3 py-2 max-w-[180px] flex items-center justify-center gap-1 rounded-lg transition text-sm text-white text-center`;

    if (config.clickable && link) {
        return (
            <a href={fullLink} target="_blank" rel="noopener noreferrer" className={baseClasses}>
                {buttonContent}
            </a>
        );
    }

    return (
        <div className={`${baseClasses} cursor-not-allowed opacity-80`}>
            {buttonContent}
        </div>
    );
}

// ============================================
// DISCOUNT MESSAGE COMPONENT
// ============================================

function DiscountMessage({ performance, className = '' }) {
    if (!performance.discountCode || !performance.discountPercentage) return null;
    
    return (
        <span className={`text-yellow-400 font-semibold ${className}`}>
            Use code {performance.discountCode} for {performance.discountPercentage}% off!
        </span>
    );
}

// ============================================
// SINGLE SHOW CARD - All info on one line
// ============================================

function SingleShowCard({ show }) {
    const perf = show.performances[0];
    const dayShort = show.day || formatDayOfWeek(show.date, true);

    return (
        <div className="bg-white/10 rounded-xl py-4 px-6">
            {/* Mobile Layout - Stacked */}
            <div className="flex flex-col gap-3 md:hidden text-center">
                {/* Date & Day */}
                <div className="flex items-center justify-center gap-3">
                    <span className="text-xl font-bold">{formatMonthDay(show.date)}</span>
                    <span className="text-gray-400 uppercase">{dayShort}</span>
                </div>
                
                {/* Location */}
                <div>
                    <span className="text-yellow-400 font-bold uppercase">{show.location}</span>
                </div>
                
                {/* Venue */}
                <div>
                    <span>{show.venue}</span>
                </div>
                
                {/* Time */}
                <div className="text-lg">
                    {perf.time}
                    {perf.fullBand && <span className="text-yellow-400 ml-2">⭐</span>}
                </div>
                
                {/* Discount */}
                <DiscountMessage performance={perf} className="text-sm" />
                
                {/* Button */}
                <div className="flex justify-center">
                    <TicketButton performance={perf} />
                </div>
            </div>

            {/* Desktop Layout - Single Line */}
            <div className="hidden md:flex md:items-center md:gap-10">
                {/* Date */}
                <span className="text-xl font-bold w-[90px]">{formatMonthDay(show.date)}</span>
                
                {/* Day */}
                <span className="text-gray-400 text-xl mr-10 uppercase w-[40px]">{dayShort}</span>
                
                {/* Location */}
                <span className="text-yellow-400 text-xl font-bold uppercase w-[175px]">{show.location}</span>
                
                {/* Venue */}
                <span className="text-xl w-[150px]">
                    {show.venue}
                </span>
                
                {/* Time */}
                <span className="text-xl w-[100px]">
                    {perf.time}
                    {perf.fullBand && <span className="text-yellow-400 ml-2">⭐</span>}
                </span>
                
                {/* Discount */}
                <div className="flex-1 text-center text-md">
                    <DiscountMessage performance={perf} />
                </div>
                
                {/* Button */}
                <div className="flex justify-end text-xl">
                    <TicketButton performance={perf}  />
                </div>
            </div>
        </div>
    );
}

// ============================================
// GROUPED SHOW CARD - Header + Performance Rows
// ============================================

function GroupedShowCard({ show }) {
    const dayShort = show.day || formatDayOfWeek(show.date, true);

    return (
        <div className="bg-white/10 rounded-xl py-5 px-6">
            {/* Mobile Layout */}
            <div className="md:hidden">
                {/* Header - Stacked */}
                <div className="flex flex-col gap-1 text-center mb-4">
                    <div className="flex items-center justify-center gap-3">
                        <span className="text-2xl font-bold">{formatMonthDay(show.date)}</span>
                        <span className="text-lg text-gray-400 uppercase">{dayShort}</span>
                    </div>
                    <div>
                        <span className="text-lg text-yellow-400 font-bold uppercase">{show.location}</span>
                    </div>
                    <div>
                        <span className="text-lg">{show.venue}</span>
                    </div>
                </div>

                {/* Performance Rows */}
                <div className="space-y-4">
                    {show.performances.map((perf, idx) => (
                        <div key={idx} className="flex flex-col gap-2 text-center border-t border-white/10 pt-4">
                            <div className="text-lg">
                                {perf.fullBand && <span className="text-yellow-400 mr-2">⭐</span>}
                                {perf.time}
                            </div>
                            <DiscountMessage performance={perf} className="text-sm" />
                            <div className="flex justify-center">
                                <TicketButton performance={perf} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden md:block">
                {/* Header Row - same spacing as SingleShowCard */}
                <div className="flex items-center gap-10 mb-4">
                    <span className="text-xl font-bold w-[90px]">{formatMonthDay(show.date)}</span>
                    <span className="text-gray-400 text-xl mr-10 uppercase w-[40px]">{dayShort}</span>
                    <span className="text-yellow-400 text-xl font-bold uppercase w-[175px]">{show.location}</span>
                    <span className="text-xl w-[150px]">{show.venue}</span>
                </div>

                {/* Performance Rows - Time aligned below Location */}
                <div className="space-y-3">
                    {show.performances.map((perf, idx) => (
                        <div key={idx} className="flex items-center gap-10">
                            {/* Spacer for Date */}
                            <span className="w-[90px]"></span>
                            {/* Spacer for Day + mr-10 */}
                            <span className="w-[40px] mr-10"></span>
                            
                            {/* Time - aligned below Location */}
                            <span className="text-xl w-[175px]">
                                {perf.time}
                                {perf.fullBand && <span className="text-yellow-400 ml-2">⭐</span>}
                            </span>

                            {/* Discount */}
                            <div className="flex-1 text-center text-md">
                                <DiscountMessage performance={perf} />
                            </div>

                            {/* Button */}
                            <div className="flex justify-end text-xl">
                                <TicketButton performance={perf} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

// ============================================
// MAIN TICKETS COMPONENT
// ============================================

export default function Tickets() {
    const [shows, setShows] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/shows')
            .then((res) => res.json())
            .then((data) => {
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

    // Determine if a show is single or grouped
    const isSingleShow = (show) => show.performances.length === 1;

    return (
        <section id="tickets" className="bg-black text-white px-6 py-16">
            <div className="max-w-5xl mx-auto">
                <h2 className="text-4xl font-bold text-center mb-4">Tour</h2>
                <p className="text-center text-yellow-400 mb-8">
                    ⭐ = Performances with Full Band
                </p>

                {loading ? (
                    <p className="text-center text-gray-400">Loading shows...</p>
                ) : shows.length === 0 ? (
                    <p className="text-center text-gray-400">No upcoming shows available.</p>
                ) : (
                    <div className="space-y-4">
                        {shows.map((show, index) => (
                            isSingleShow(show) ? (
                                <SingleShowCard key={show.groupKey || index} show={show} />
                            ) : (
                                <GroupedShowCard key={show.groupKey || index} show={show} />
                            )
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
