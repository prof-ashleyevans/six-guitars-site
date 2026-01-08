'use client';
import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';

const galleryImages = [
    { src: '/images/characters/chase.jpg', alt: 'Chase Padgett' },
    { src: '/images/characters/rock.jpg', alt: 'Rock Character' },
    { src: '/images/characters/jazz.jpg', alt: 'Jazz Character' },
    { src: '/images/characters/blues.jpg', alt: 'Blues Character' },
    { src: '/images/characters/country.jpg', alt: 'Country Character' },
    { src: '/images/characters/folk.jpg', alt: 'Folk Character' },
    { src: '/images/characters/classical.jpg', alt: 'Classical Character' },
];

export default function PhotoGallery() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToNext = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
    }, []);

    const goToPrev = useCallback(() => {
        setCurrentIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
    }, []);

    // Auto-advance every 3 seconds
    useEffect(() => {
        const interval = setInterval(goToNext, 3000);
        return () => clearInterval(interval);
    }, [goToNext]);

    return (
        <section id="gallery" className="bg-black text-white px-6 py-16">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-4xl font-bold text-center mb-12">Photo Gallery</h2>
                
                <div className="relative">
                    {/* Image Container */}
                    <div className="relative aspect-[4/3] md:aspect-[16/9] overflow-hidden rounded-xl">
                        {galleryImages.map((image, index) => (
                            <div
                                key={index}
                                className={`absolute inset-0 transition-opacity duration-500 ${
                                    index === currentIndex ? 'opacity-100' : 'opacity-0'
                                }`}
                            >
                                <Image
                                    src={image.src}
                                    alt={image.alt}
                                    fill
                                    quality={85}
                                    className="object-cover"
                                    priority={index === 0}
                                />
                            </div>
                        ))}
                    </div>

                    {/* Left Arrow */}
                    <button
                        onClick={goToPrev}
                        className="absolute top-1/2 left-2 md:left-4 transform -translate-y-1/2 bg-yellow-400 text-black w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center hover:bg-yellow-300 transition z-10 text-xl md:text-2xl font-bold"
                        aria-label="Previous image"
                    >
                        ‹
                    </button>

                    {/* Right Arrow */}
                    <button
                        onClick={goToNext}
                        className="absolute top-1/2 right-2 md:right-4 transform -translate-y-1/2 bg-yellow-400 text-black w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center hover:bg-yellow-300 transition z-10 text-xl md:text-2xl font-bold"
                        aria-label="Next image"
                    >
                        ›
                    </button>

                    {/* Dot Indicators */}
                    <div className="flex justify-center gap-2 mt-4">
                        {galleryImages.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition ${
                                    index === currentIndex ? 'bg-yellow-400' : 'bg-gray-600 hover:bg-gray-500'
                                }`}
                                aria-label={`Go to image ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
