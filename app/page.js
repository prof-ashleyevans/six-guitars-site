'use client'; // required because Keen Slider runs in the browser

import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { useRef } from 'react';


//hamburger menu
import { useState } from "react";

//reviews slider
const reviews = [
    {
        quote: "Nothing short of a storytelling masterpiece",
        source: "Edmonton Sun",
        logo: "/images/edmonton-sun-logo.jpg",
    },
    {
        quote: "So virtuosic it had me on my feet",
        source: "Georgia Straight",
        logo: "/images/Georgia-Straight-Logo.jpg",
    },
    {
        quote: "A captivating entertainer",
        source: "VUE Weekly",
        logo: "/images/Vue_Weekly_Logo.jpg",
    },
    {
        quote: "6 Guitars is note perfect",
        source: "Ottawa Citizen",
        logo: "/images/ottowa-citizen-logo.jpg",
    },
    {
        quote: "Superb, funny, & flat out stunning",
        source: "Winnipeg Free Press",
        logo: "/images/winnipeg-free-press-logo.jpg",
    },
    {
        quote: "A stunning performance",
        source: "Austin Post",
        logo: "/images/austin-post-logo.jpg",
    },
];



export default function Home() {

    //hamburger menu
    const [menuOpen, setMenuOpen] = useState(false);

    //reviews slider
    const [sliderInstanceRef, slider] = useKeenSlider({
        loop: true,
        slides: {
            perView: 1,
            spacing: 16,
        },
        breakpoints: {
            '(min-width: 768px)': {
                slides: {
                    perView: 3,
                    spacing: 16,
                },
            },
        },
    });





    return (
        <>
            {/*Header*/}
            <header className="bg-black text-white px-6 py-4 flex items-center justify-between">
                <div className="text-xl font-bold">6 Guitars</div>

                {/* Hamburger Icon - shows only on mobile */}
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
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>

                {/* Desktop Menu */}
                <nav className="hidden md:flex space-x-6">
                    <a href="#about" className="hover:text-yellow-400">About</a>
                    <a href="#contact" className="hover:text-yellow-400">Contact</a>
                    <a href="#reviews" className="hover:text-yellow-400">Reviews</a>
                </nav>
            </header>

            {menuOpen && (
                <nav className="bg-black text-white flex flex-col items-center space-y-4 py-4 md:hidden">
                    <a href="#about" className="hover:text-yellow-400" onClick={() => setMenuOpen(false)}>About</a>
                    <a href="#contact" className="hover:text-yellow-400" onClick={() => setMenuOpen(false)}>Contact</a>
                    <a href="#reviews" className="hover:text-yellow-400" onClick={() => setMenuOpen(false)}>Reviews</a>
                </nav>
            )}


            <main className="flex min-h-screen flex-col items-center justify-center bg-black text-white px-4">
                <div className="text-center max-w-2xl">
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
                        6 Guitars
                    </h1>
                    <p className="text-xl md:text-2xl mb-8">
                        One performer. Six characters. A celebration of music, storytelling, and laughter.
                    </p>
                    <a
                        href="#"
                        className="inline-block bg-yellow-400 text-black font-semibold px-6 py-3 rounded-full hover:bg-yellow-300 transition"
                    >
                        Buy Tickets
                    </a>
                </div>
            </main>


            {/*About*/}
            <section id="about" className="bg-gray-900 text-white px-6 py-16">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-4xl font-bold mb-6">About the Show</h2>
                    <p className="text-lg mb-4">
                        A two-act one-man show featuring <span className="font-semibold">Music, Comedy, and so Much More</span>.
                    </p>
                    <p className="text-lg mb-6">
                        Chase Padgett embodies 6 different guitar-playing characters, each representing their own genre of music: <br />
                        <span className="italic">Blues, Jazz, Rock, Classical, Folk, & Country</span>.
                    </p>

                    <div className="aspect-w-16 aspect-h-9 max-w-3xl mx-auto">
                        <iframe
                            src="https://www.youtube.com/embed/7f7KWksfxAc"
                            title="6 Guitars Trailer"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="w-full h-64 md:h-96 rounded-xl"
                        ></iframe>
                    </div>
                </div>
            </section>



            <section id="reviews" className="bg-black text-white px-6 py-16">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl font-bold mb-8">Crititc Reviews</h2>

                    <div className="relative max-w-[1500px] mx-auto">
                        <div ref={sliderInstanceRef} className="keen-slider">
                            {reviews.map((review, index) => (
                                <div key={index} className="keen-slider__slide flex justify-center px-4">
                                    <div className="p-6 bg-gray-800 border-l-4 border-yellow-400 rounded-md text-center flex flex-col items-center max-w-full w-full mx-auto">
                                        <img
                                            src={review.logo}
                                            alt={review.source}
                                            className="h-40 md:h-40 mb-4 object-contain"
                                        />
                                        <p className="italic text-xl md:text-2xl mb-2 max-w-2xl">"{review.quote}"</p>
                                        <img
                                            src="/images/5 Stars.png"
                                            alt="5 stars"
                                            className="h-8 md:h-10 mt-2 object-contain"
                                        />
                                        <p className="text-yellow-300 text-md mt-1">– {review.source}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Left Arrow */}
                        <button
                            onClick={() => slider.current?.prev()}
                            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-yellow-400 text-black px-3 py-2 rounded-r hover:bg-yellow-300 transition"
                        >
                            ‹
                        </button>

                        {/* Right Arrow */}
                        <button
                            onClick={() => slider.current?.next()}
                            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-yellow-400 text-black px-3 py-2 rounded-l hover:bg-yellow-300 transition"
                        >
                            ›
                        </button>
                    </div>
                </div>
            </section>

            <section id="Review video" className="bg-gray-900 text-white px-6 py-16">

            <div className="aspect-w-16 aspect-h-9 mt-12 max-w-3xl mx-auto">
                <h2 className="text-4xl font-bold mb-8">Audience Reviews</h2>

                <iframe
                        src="https://www.youtube.com/embed/TQh8Uz4_VBc"
                        title="6 Guitars Review Video"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-64 md:h-96 rounded-xl"
                    ></iframe>
                </div>
            </section>






            <section id="tickets" className="bg-black text-white px-6 py-16">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-4">Upcoming Shows</h2>
                    <p className="text-center text-yellow-400 mb-8">
                        ⭐ = Performances with Full Band
                    </p>

                    <div className="space-y-6">
                        {[
                            { date: "MAY 6th", venue: "CAA Theatre", location: "Toronto ON", link: "#", fullBand: true },
                            { date: "MAY 7", venue: "CAA Theatre", location: "Toronto ON", link: "#", fullBand: true },
                            { date: "MAY 10 - 2PM", venue: "CAA Theatre", location: "Toronto ON", link: "#", fullBand: true },
                            { date: "MAY 10 - 8PM", venue: "CAA Theatre", location: "Toronto ON", link: "#", fullBand: true },
                        ].map((show, index) => (
                            <div key={index} className="flex flex-col md:flex-row md:items-center justify-between border-t border-white py-4">
                                <div className="text-lg font-bold md:w-1/4 mb-2 md:mb-0">{show.date}</div>
                                <div className="text-center md:text-left md:w-1/2">
                                    <div className="uppercase font-semibold">{show.venue}</div>
                                    <div>{show.location}</div>
                                </div>
                                <div className="flex items-center gap-4 md:w-1/4 justify-end">
                                    <a
                                        href={show.link}
                                        className="border border-white px-4 py-2 rounded-full hover:bg-white hover:text-black transition text-sm font-semibold"
                                    >
                                        GET TICKETS →
                                    </a>
                                    {show.fullBand && <span className="text-yellow-400 text-xl">⭐</span>}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section id="contact" className="bg-gray-900 text-white px-6 py-16">
                <div className="max-w-2xl mx-auto">
                    <h2 className="text-4xl font-bold mb-8 text-center">Contact</h2>
                    <form className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block mb-1 text-sm font-medium">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block mb-1 text-sm font-medium">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            />
                        </div>

                        <div>
                            <label htmlFor="message" className="block mb-1 text-sm font-medium">
                                Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                rows="4"
                                className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            ></textarea>
                        </div>

                        <div className="flex items-start">
                            <input
                                type="checkbox"
                                id="mailingList"
                                name="mailingList"
                                defaultChecked
                                className="h-4 w-4 mt-1 text-yellow-400 bg-gray-800 border-gray-600 focus:ring-yellow-400"
                            />
                            <label htmlFor="mailingList" className="ml-2 text-sm">
                                Join the 6 Guitars mailing list
                            </label>
                        </div>

                        <button
                            type="submit"
                            className="bg-yellow-400 text-black px-6 py-2 rounded-full font-semibold hover:bg-yellow-300 transition"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </section>





            <footer className="bg-black text-white px-6 py-8">
                <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="text-sm text-center md:text-left">
                        © {new Date().getFullYear()} 6 Guitars. All rights reserved.
                    </div>

                    <div className="flex space-x-6 text-white">
                        {/* Facebook */}
                        <a
                            href="https://www.facebook.com/chasepadgettperformer"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-yellow-400 transition"
                            aria-label="Facebook"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="36"
                                height="36"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M22.675 0h-21.35C.597 0 0 .597 0 1.325v21.351C0 23.403.597 24 1.325 24h11.488v-9.294H9.692v-3.622h3.121V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.464.099 2.795.143v3.24h-1.918c-1.504 0-1.794.715-1.794 1.763v2.312h3.587l-.467 3.622h-3.12V24h6.116C23.403 24 24 23.403 24 22.676V1.325C24 .597 23.403 0 22.675 0z" />
                            </svg>
                        </a>

                        {/* Instagram */}
                        <a
                            href="https://www.instagram.com/chasethatpadgett/?hl=en/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-yellow-400 transition"
                            aria-label="Instagram"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="36"
                                height="36"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.33 3.608 1.306.975.976 1.244 2.243 1.306 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.33 2.633-1.306 3.608-.976.975-2.243 1.244-3.608 1.306-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.33-3.608-1.306-.975-.976-1.244-2.243-1.306-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.33-2.633 1.306-3.608.976-.975 2.243-1.244 3.608-1.306C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.736 0 8.332.014 7.052.072 5.775.13 4.603.384 3.643 1.344 2.684 2.304 2.43 3.476 2.372 4.753 2.314 6.033 2.3 6.437 2.3 12s.014 5.967.072 7.247c.058 1.277.312 2.449 1.272 3.409.96.96 2.132 1.214 3.409 1.272C8.332 23.986 8.736 24 12 24s3.668-.014 4.948-.072c1.277-.058 2.449-.312 3.409-1.272.96-.96 1.214-2.132 1.272-3.409.058-1.28.072-1.684.072-7.247s-.014-5.967-.072-7.247c-.058-1.277-.312-2.449-1.272-3.409C19.397.384 18.225.13 16.948.072 15.668.014 15.264 0 12 0zM12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a3.999 3.999 0 110-7.998 3.999 3.999 0 010 7.998zm6.406-11.845a1.44 1.44 0 11-2.882 0 1.44 1.44 0 012.882 0z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </footer>



            <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
                <div
                    className="inline-block bg-white/10 border border-white px-1 py-5 rounded-xl"
                    style={{
                        animation: 'pulseGlow 2s ease-in-out infinite',
                        boxShadow: '0 0 20px rgba(255, 255, 255, 0.5)',
                    }}
                >
                    <a
                        href="#tickets"
                        className="bg-[#8a828c] text-white px-5 py-5 rounded-lg font-semibold hover:bg-[#b01234] transition"
                    >
                        BUY TICKETS
                    </a>
                </div>
            </div>
            <div className="h-20 md:h-16"></div>









        </>
    );
}
