// CharacterGridSection.jsx
'use client';
import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import HomeTitle from "@/app/HomeTitle"

const characterImages = [
    {
        src: '/images/characters/blues.jpg',
        alt: 'Blues Guitarist',
        aos: 'fade-right',
    },
    {
        src: '/images/characters/jazz.jpg',
        alt: 'Jazz Guitarist',
        aos: 'fade-down',
    },
    {
        src: '/images/characters/classical.jpg',
        alt: 'Classical Guitarist',
        aos: 'fade-left',
    },
    {
        src: '/images/characters/rock.jpg',
        alt: 'Rock Guitarist',
        aos: 'fade-right',
    },
    {
        src: '/images/characters/folk.jpg',
        alt: 'Folk Guitarist',
        aos: 'fade-up',
    },
    {
        src: '/images/characters/country.jpg',
        alt: 'Country Guitarist',
        aos: 'fade-left',
    },
];

export default function CharacterGridSection() {
    useEffect(() => {
        AOS.init({ duration: 500, once: true });
    }, []);

    return (
        <section className="relative bg-[#1a1a1a] w-full flex flex-col items-center pt-2 sm:pt-1 pb-1 sm:pb-1">
            {/* Grid (same as current) */}
            <div className="grid grid-cols-3 gap-1 w-full px-4 sm:px-1 max-w-screen-xl mx-auto">
                {characterImages.map((char, i) => (
                    <div
                        key={i}
                        data-aos={char.aos}
                        className="h-[90px] sm:h-[120px] md:h-[160px] lg:h-[200px] xl:h-[340px] flex justify-center items-center"
                    >
                        <img
                            src={char.src}
                            alt={char.alt}
                            className="h-full w-full object-cover"
                        />
                    </div>
                ))}
            </div>

            {/* Title overlay (desktop only) */}
            <div className="absolute top-1/2 w-full px-8 -translate-y-[40%] z-20 hidden lg:block text-center">
                <HomeTitle />
            </div>


            {/* Title for mobile only */}
            <div className="absolute top-1/2 w-full px-4 -translate-y-[25%] z-20 block lg:hidden text-center">
                <HomeTitle />
            </div>

        </section>

);
}
