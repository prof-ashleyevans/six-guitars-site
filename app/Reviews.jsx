'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';

const reviews = [
    {
        quote: "Nothing short of a masterpiece",
        source: "Edmonton Sun",
        logo: "/images/edmonton-sun-logo.jpg",
        characterImage: "/images/characters/rock.jpg",
    },
    {
        quote: "So virtuosic it had me on my feet",
        source: "Georgia Straight",
        logo: "/images/Georgia-Straight-Logo.jpg",
        characterImage: "/images/characters/jazz.jpg",
    },
    {
        quote: "A captivating entertainer",
        source: "VUE Weekly",
        logo: "/images/Vue_Weekly_Logo.jpg",
        characterImage: "/images/characters/country.jpg",
    },
    {
        quote: "6 Guitars is note perfect",
        source: "Ottawa Citizen",
        logo: "/images/ottowa-citizen-logo.jpg",
        characterImage: "/images/characters/folk.jpg",
    },
    {
        quote: "Superb, funny, & flat out stunning",
        source: "Winnipeg Free Press",
        logo: "/images/winnipeg-free-press-logo.jpg",
        characterImage: "/images/characters/classical.jpg",
    },
    {
        quote: "A stunning performance",
        source: "Austin Post",
        logo: "/images/austin-post-logo.jpg",
        characterImage: "/images/characters/blues.jpg",
    },
];

export default function Reviews() {
    const [sliderRef, slider] = useKeenSlider({
        loop: true,
        slides: {
            perView: 1,
            spacing: 20,
        },
        breakpoints: {
            '(min-width: 768px)': {
                slides: {
                    perView: 3,
                    spacing: 40,
                },
            },
        },
    });

    return (
        <section id="reviews" className="text-white px-6 py-16 bg-[#1a1a1a]">
            <div className="max-w-6xl mx-auto text-center">
                <h2 className="text-4xl font-bold mb-8">Critic Reviews</h2>

                <div className="relative w-full h-[600px] overflow-hidden">
                    <div ref={sliderRef} className="keen-slider h-full">
                        {reviews.map((review, index) => (
                            <div key={index} className="keen-slider__slide relative w-full h-full">
                                {/* Background */}
                                <div className="absolute inset-0 overflow-hidden z-0 opacity-20">
                                    <Image
                                        src={review.characterImage}
                                        alt="Character"
                                        fill
                                        quality={70}
                                        className="object-cover scale-105"
                                    />
                                </div>

                                {/* Content */}
                                <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
                                    <div className="relative h-10 w-auto">
                                        <Image 
                                            src="/images/5 Stars.png" 
                                            alt="5 stars" 
                                            width={150}
                                            height={40}
                                            quality={85}
                                            className="h-10 w-auto mt-2 object-contain" 
                                        />
                                    </div>
                                    <p className="italic text-2xl md:text-2xl mb-12 pt-40 max-w-[200px]">"{review.quote}"</p>
                                    {/*} <p className="text-yellow-300 text-md mt-1">&ndash; {review.source}</p>*/}
                                    <div className="relative h-24 w-full mt-12">
                                        <Image 
                                            src={review.logo} 
                                            alt={review.source} 
                                            fill
                                            quality={85}
                                            className="object-contain" 
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Arrows */}
                    <button
                        onClick={() => slider.current?.prev()}
                        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-yellow-400 text-black px-3 py-2 rounded-full hover:bg-yellow-300 transition z-20"
                        aria-label="Previous Slide"
                    >
                        ‹
                    </button>
                    <button
                        onClick={() => slider.current?.next()}
                        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-yellow-400 text-black px-3 py-2 rounded-full hover:bg-yellow-300 transition z-20"
                        aria-label="Next Slide"
                    >
                        ›
                    </button>
                </div>
            </div>
        </section>
    );
}