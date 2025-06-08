'use client';
import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Toggle this flag to switch between dummy data and live API call
const USE_DUMMY_DATA = true;

// Dummy show data
const dummyShows = [
    {
        date: '2025-07-15',
        time: '8:00 PM',
        venue: 'Apollo Theater',
        location: 'New York, NY',
        link: 'https://example.com/tickets/1',
        fullBand: true,
    },
    {
        date: '2025-07-22',
        time: '7:30 PM',
        venue: 'House of Blues',
        location: 'Chicago, IL',
        link: 'https://example.com/tickets/2',
        fullBand: false,
    },
];

export default function Tickets() {
    const [shows, setShows] = useState([]);
    const [startAnimation, setStartAnimation] = useState(false);

    useEffect(() => {
        if (USE_DUMMY_DATA) {
            setShows(dummyShows);
        } else {
            fetch('/api/shows')
                .then((res) => res.json())
                .then((data) => setShows(data))
                .catch((err) => console.error('Failed to load shows:', err));
        }

        AOS.init({ once: true });

        const timer = setTimeout(() => {
            setStartAnimation(true);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    function formatDate(show) {
        const [year, month, day] = show.date.split('-');
        const localDate = new Date(Number(year), Number(month) - 1, Number(day));
        const datePart = localDate.toLocaleDateString(undefined, {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });

        return show.time ? `${datePart} - ${show.time}` : datePart;
    }

    return (
        <section id="tickets" className="bg-black text-white px-6 py-16">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-4xl font-bold text-center mb-4">Upcoming Shows</h2>
                <p className="text-center text-yellow-400 mb-8">
                    ⭐ = Performances with Full Band
                </p>

                {shows.length === 0 ? (
                    <p className="text-center text-gray-400">No upcoming shows available.</p>
                ) : (
                    <div className="space-y-3">
                        {shows.map((show, index) => (
                            <div
                                key={index}
                                className="flex flex-col items-center md:flex-row md:items-center md:justify-between border-t border-white py-6 text-center md:text-left space-y-2 md:space-y-0"
                            >
                                <div className="text-lg font-bold text-center md:text-left w-full md:w-1/4">
                                    {formatDate(show)}
                                </div>

                                <div className="w-full md:w-1/2 flex flex-col items-center text-center">
                                    <div className="uppercase font-semibold">{show.venue}</div>
                                    <div>{show.location}</div>
                                </div>

                                <div className="w-full md:w-1/4 flex flex-col md:flex-row justify-center md:justify-end items-center gap-2 md:gap-4">
                                    <a
                                        href={show.link?.startsWith('http') ? show.link : `https://${show.link}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="border border-white px-4 py-2 h-[42px] flex items-center justify-center rounded-full hover:bg-white hover:text-black transition text-sm font-semibold text-center"
                                    >
                                        <span className="text-yellow-400 text-xl w-6 h-[42px] flex items-center justify-center">
                                            {show.fullBand ? '⭐' : ''}
                                        </span>
                                        GET TICKETS →
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
