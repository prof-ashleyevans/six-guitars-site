'use client'; // required because Keen Slider runs in the browser

import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { useEffect, useState } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import './globals.css';
import { Michroma } from 'next/font/google';
import HeroSection from "@/app/HeroSection";
import About from "@/app/About";
import Reviews from "@/app/Reviews";



//character images for home
const characterImages = [
    { src: "/images/characters/blues.jpg", alt: "Blues", animation: "animate-slideOut-0" },
    { src: "/images/characters/jazz.jpg", alt: "Jazz", animation: "animate-slideOut-1" },
    { src: "/images/characters/rock.jpg", alt: "Rock", animation: "animate-slideOut-2" },
    { src: "/images/characters/classical.jpg", alt: "Classical", animation: "animate-slideOut-3" },
    { src: "/images/characters/folk.jpg", alt: "Folk", animation: "animate-slideOut-4" },
    { src: "/images/characters/country.jpg", alt: "Country", animation: "animate-slideOut-5" },
];


//reviews slider


function formatDate(show) {
    const [year, month, day] = show.date.split("-");
    const localDate = new Date(Number(year), Number(month) - 1, Number(day));
    const datePart = localDate.toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
    });

    return show.time ? `${datePart} - ${show.time}` : datePart;
}

export default function Home() {

    //api for dynamically linking show info from AirTable
    const [shows, setShows] = useState([]);
    const [startAnimation, setStartAnimation] = useState(false);


    useEffect(() => {
        fetch("/api/shows")
            .then((res) => res.json())
            .then((data) => setShows(data))
            .catch((err) => console.error("Failed to load shows:", err));

        AOS.init({ once: true });

        const timer = setTimeout(() => {
            setStartAnimation(true);
        }, 1000); // wait for center fade (0.8s) before triggering characters

        return () => clearTimeout(timer);
    }, []);



    //hamburger menu
    const [menuOpen, setMenuOpen] = useState(false);







    return (
        <>
            {/*Header*/}
            <header className= "text-white px-6 py-4 flex items-center justify-between" style={{ backgroundColor: "#1a1a1a" }}>
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



            <HeroSection />

            <About />

            <Reviews />

            {/*
            TICKETS
            */}
            <section id="tickets" className="bg-black text-white px-6 py-16">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-4">Upcoming Shows</h2>
                    <p className="text-center text-yellow-400 mb-8">
                        ⭐ = Performances with Full Band
                    </p>

                    <div className="space-y-3">
                        {shows.map((show, index) => (
                            <div
                                key={index}
                                className="flex flex-col items-center md:flex-row md:items-center md:justify-between border-t border-white py-6 text-center md:text-left space-y-2 md:space-y-0"
                            >
                                <div className="text-lg font-bold text-center md:text-left w-full md:w-1/4 mb-2 md:mb-0">
                                    {formatDate(show)}
                                    {/*show.time ? ` - ${show.time}` : ""*/}
                                </div>

                                <div className="w-full md:w-1/2 flex flex-col items-center text-center">
                                    <div className="uppercase font-semibold">{show.venue}</div>
                                    <div>{show.location}</div>
                                </div>

                                <div className="w-full md:w-1/4 flex flex-col md:flex-row justify-center md:justify-end items-center gap-2 md:gap-4">
                                    <a
                                        href={show.link?.startsWith("http") ? show.link : `https://${show.link}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="border border-white px-4 py-2 h-[42px] flex items-center justify-center rounded-full hover:bg-white hover:text-black transition text-sm font-semibold text-center"
                                    >
                                        GET TICKETS →
                                    </a>
                                    <span className="text-yellow-400 text-xl w-6 h-[42px] flex items-center justify-center">
                                         {show.fullBand ? "⭐" : ""}
                                     </span>
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
