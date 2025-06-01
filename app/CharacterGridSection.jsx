// CharacterGridSection.jsx
'use client';
import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

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
        AOS.init({ duration: 800, once: true });
    }, []);

    return (
        <section className="bg-black py-12 px-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
                {characterImages.map((char, i) => (
                    <img
                        key={i}
                        src={char.src}
                        alt={char.alt}
                        data-aos={char.aos}
                        className="w-full h-auto object-cover rounded"
                    />
                ))}
            </div>
        </section>
    );
}
