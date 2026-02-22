'use client';
import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import NotifyMeModal from './NotifyMeModal';

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
        text: 'Limited Avail',
        clickable: true,
    },
    'going fast': {
        bgColor: 'bg-orange-500',
        hoverColor: 'hover:bg-orange-600',
        borderColor: 'border-orange-400',
        text: 'Going Fast!',
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
    'notify me': {
        bgColor: 'bg-blue-600',
        hoverColor: 'hover:bg-blue-700',
        borderColor: 'border-blue-500',
        text: 'Notify Me',
        clickable: true,
        isNotify: true,
    },
};

function getTicketConfig(status) {
    const normalizedStatus = (status || 'available').toLowerCase().trim();
    return ticketStatusConfig[normalizedStatus] || ticketStatusConfig['available'];
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

function formatLocation(location) {
    if (!location) return '';
    // Split location by last space to separate city from state
    const parts = location.trim().split(' ');
    if (parts.length < 2) return location;
    
    // Assume last part is state, everything before is city
    const state = parts[parts.length - 1];
    const city = parts.slice(0, -1).join(' ');
    
    return `${city}, ${state}`;
}

function parseDate(dateStr) {
    if (!dateStr) return null;

    let date;
    const str = String(dateStr).trim();

    // YYYY-MM-DD (with optional time part): parse date part as local so it doesn't roll back a day in US timezones
    const isoMatch = str.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (isoMatch) {
        const [, y, m, d] = isoMatch.map(Number);
        date = new Date(y, m - 1, d);
    } else if (str.includes('/')) {
        const parts = str.split('/');
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

function TicketButton({ performance, show, onNotifyClick, compact = false }) {
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
        ? `${config.bgColor} ${config.hoverColor} px-5 py-2 flex items-center justify-center gap-1 rounded-md transition text-base text-white text-center font-bold`
        : `${config.bgColor} ${config.hoverColor} px-6 py-3 sm:px-10 sm:py-4 min-w-[160px] max-w-[180px] flex items-center justify-center gap-1 rounded-md transition text-base sm:text-xl text-white text-center whitespace-nowrap font-bold`;

    // Handle "Notify Me" button
    if (config.isNotify) {
        return (
            <button
                onClick={() => onNotifyClick(performance, show)}
                className={`${baseClasses} cursor-pointer`}
            >
                {buttonContent}
            </button>
        );
    }

    // Handle regular ticket links
    if (config.clickable && link) {
        const trackingClass = config.text === 'Get Tickets' ? 'track-get-tickets' : '';
        return (
            <a href={fullLink} target="_blank" rel="noopener noreferrer" className={`${baseClasses} ${trackingClass}`.trim()}>
                {buttonContent}
            </a>
        );
    }

    // Non-clickable states
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

function SingleShowCard({ show, onNotifyClick }) {
    const perf = show.performances[0];
    const dayShort = show.day || formatDayOfWeek(show.date, true);

    return (
        <div className="bg-white/10 rounded-xl py-3 px-5">
            {/* Mobile Layout - Stacked */}
            <div className="flex flex-col gap-2 md:hidden text-center">
                {/* Date & Day */}
                <div className="flex items-center justify-center gap-2">
                    <span className="text-xl font-bold">{formatMonthDay(show.date)}</span>
                    <span className="text-gray-400 uppercase">{dayShort}</span>
                </div>
                
                {/* Location (city, state) */}
                <div>
                    <span className="text-yellow-400 text-2xl font-bold uppercase">{formatLocation(show.location)}</span>
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
                    <TicketButton performance={perf} show={show} onNotifyClick={onNotifyClick} />
                </div>
            </div>

            {/* Desktop Layout - Single Line */}
            <div className="hidden md:flex md:items-center md:gap-3 lg:gap-5 xl:gap-6">
                {/* Date & Day Stacked */}
                <div className="flex flex-col w-[70px] lg:w-[80px]">
                    <span className="text-lg lg:text-xl font-bold">{formatMonthDay(show.date)}</span>
                    <span className="text-gray-400 text-sm uppercase">{dayShort}</span>
                </div>
                
                {/* Location (city, state) - enlarged */}
                <span className="text-yellow-400 text-lg lg:text-xl font-bold uppercase w-[180px] lg:w-[200px] xl:w-[220px] whitespace-nowrap">{formatLocation(show.location)}</span>
                
                {/* Venue */}
                <span className="text-lg lg:text-xl flex-1 min-w-[150px]">
                    {show.venue}
                </span>
                
                {/* Time */}
                <span className="text-lg lg:text-xl w-[90px] lg:w-[100px]">
                    {perf.time}
                    {perf.fullBand && <span className="text-yellow-400 ml-1">⭐</span>}
                </span>
                
                {/* Discount - only show if exists */}
                {(perf.discountCode || perf.discountPercentage) && (
                    <div className="text-center text-sm w-[120px] lg:w-[140px]">
                        <DiscountMessage performance={perf} />
                    </div>
                )}
                
                {/* Button */}
                <div className="flex justify-end">
                    <TicketButton performance={perf} show={show} onNotifyClick={onNotifyClick} />
                </div>
            </div>
        </div>
    );
}

// ============================================
// GROUPED SHOW CARD - Header + Performance Rows
// ============================================

function GroupedShowCard({ show, onNotifyClick }) {
    const dayShort = show.day || formatDayOfWeek(show.date, true);

    return (
        <div className="bg-white/10 rounded-xl py-4 px-5">
            {/* Mobile Layout */}
            <div className="md:hidden">
                {/* Header - Stacked */}
                <div className="flex flex-col gap-1 text-center mb-3">
                    <div className="flex items-center justify-center gap-2">
                        <span className="text-2xl font-bold">{formatMonthDay(show.date)}</span>
                        <span className="text-lg text-gray-400 uppercase">{dayShort}</span>
                    </div>
                    <div>
                        <span className="text-2xl text-yellow-400 font-bold uppercase">{formatLocation(show.location)}</span>
                    </div>
                    <div>
                        <span className="text-lg">{show.venue}</span>
                    </div>
                </div>

                {/* Performance Rows */}
                <div className="space-y-3">
                    {show.performances.map((perf, idx) => (
                        <div key={idx} className="flex flex-col gap-2 text-center border-t border-white/10 pt-3">
                            <div className="text-lg">
                                {perf.fullBand && <span className="text-yellow-400 mr-2">⭐</span>}
                                {perf.time}
                            </div>
                            <DiscountMessage performance={perf} className="text-sm" />
                            <div className="flex justify-center">
                                <TicketButton performance={perf} show={show} onNotifyClick={onNotifyClick} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden md:block">
                {/* Header Row - same spacing as SingleShowCard */}
                <div className="flex items-center gap-3 lg:gap-5 xl:gap-6 mb-3">
                    {/* Date & Day Stacked */}
                    <div className="flex flex-col w-[70px] lg:w-[80px]">
                        <span className="text-lg lg:text-xl font-bold">{formatMonthDay(show.date)}</span>
                        <span className="text-gray-400 text-sm uppercase">{dayShort}</span>
                    </div>
                    
                    <span className="text-yellow-400 text-lg lg:text-xl font-bold uppercase w-[180px] lg:w-[200px] xl:w-[220px] whitespace-nowrap">{formatLocation(show.location)}</span>
                    <span className="text-lg lg:text-xl flex-1 min-w-[150px]">{show.venue}</span>
                </div>

                {/* Performance Rows */}
                <div className="space-y-2">
                    {show.performances.map((perf, idx) => (
                        <div key={idx} className="flex items-center gap-3 lg:gap-5 xl:gap-6">
                            {/* Spacer for Date/Day */}
                            <span className="w-[70px] lg:w-[80px]"></span>
                            
                            {/* Time - aligned below Location */}
                            <span className="text-lg lg:text-xl w-[180px] lg:w-[200px] xl:w-[220px]">
                                {perf.time}
                                {perf.fullBand && <span className="text-yellow-400 ml-1">⭐</span>}
                            </span>

                            {/* Spacer to align with venue */}
                            <span className="flex-1 min-w-[150px]"></span>

                            {/* Discount - only show if exists */}
                            {(perf.discountCode || perf.discountPercentage) ? (
                                <div className="text-center text-sm w-[120px] lg:w-[140px]">
                                    <DiscountMessage performance={perf} />
                                </div>
                            ) : (
                                <span className="w-[120px] lg:w-[140px]"></span>
                            )}

                            {/* Button */}
                            <div className="flex justify-end">
                                <TicketButton performance={perf} show={show} onNotifyClick={onNotifyClick} />
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
    const [modalShow, setModalShow] = useState(null);

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

    const handleNotifyClick = (performance, show) => {
        setModalShow({
            ...show,
            time: performance.time,
            showName: '6 Guitars',
        });
    };

    const handleCloseModal = () => {
        setModalShow(null);
    };

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
                                <SingleShowCard key={show.groupKey || index} show={show} onNotifyClick={handleNotifyClick} />
                            ) : (
                                <GroupedShowCard key={show.groupKey || index} show={show} onNotifyClick={handleNotifyClick} />
                            )
                        ))}
                    </div>
                )}
            </div>

            {/* Notify Me Modal */}
            <NotifyMeModal show={modalShow} onClose={handleCloseModal} />
        </section>
    );
}
