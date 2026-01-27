'use client';
import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';

const galleryImages = [
    { src: '/images/photo_gallery/6G Production 16x9-01.jpg', alt: '6 Guitars Production' },
    { src: '/images/photo_gallery/6G Production 16x9-05.jpg', alt: '6 Guitars Production' },
    { src: '/images/photo_gallery/6G Production 16x9-08.jpg', alt: '6 Guitars Production' },
    { src: '/images/photo_gallery/6G Production 16x9-11.jpg', alt: '6 Guitars Production' },
    { src: '/images/photo_gallery/6G Production 16x9-12.jpg', alt: '6 Guitars Production' },
    { src: '/images/photo_gallery/6G Production 16x9-13.jpg', alt: '6 Guitars Production' },
    { src: '/images/photo_gallery/6G Production 16x9-17.jpg', alt: '6 Guitars Production' },
    { src: '/images/photo_gallery/6G Production 16x9-18.jpg', alt: '6 Guitars Production' },
    { src: '/images/photo_gallery/6G Production 16x9-19.jpg', alt: '6 Guitars Production' },
    { src: '/images/photo_gallery/6G Production 16x9-20.jpg', alt: '6 Guitars Production' },
    { src: '/images/photo_gallery/6G Production 16x9-22.jpg', alt: '6 Guitars Production' },
    { src: '/images/photo_gallery/6G Production 16x9-02.jpg', alt: '6 Guitars Production' },
    { src: '/images/photo_gallery/6G Production 16x9-23.jpg', alt: '6 Guitars Production' },
    { src: '/images/photo_gallery/6G Production 16x9-07.jpg', alt: '6 Guitars Production' },
    { src: '/images/photo_gallery/6G Production 16x9-24.jpg', alt: '6 Guitars Production' },
    { src: '/images/photo_gallery/6G Production 16x9-25.jpg', alt: '6 Guitars Production' },
    { src: '/images/photo_gallery/6G Production 16x9-28.jpg', alt: '6 Guitars Production' },
    { src: '/images/photo_gallery/6G Production 16x9-31.jpg', alt: '6 Guitars Production' },
    { src: '/images/photo_gallery/6G Production 16x9-32.jpg', alt: '6 Guitars Production' },
    { src: '/images/photo_gallery/2T0A5063.jpg', alt: '6 Guitars Production' },
    { src: '/images/photo_gallery/2T0A5109.jpg', alt: '6 Guitars Production' },
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
                        {galleryImages.map((image, index) => {
                            // Only load current image + 1 adjacent on each side for smooth transitions
                            const shouldLoad = Math.abs(index - currentIndex) <= 1;
                            
                            return (
                                <div
                                    key={index}
                                    className={`absolute inset-0 transition-opacity duration-500 ${
                                        index === currentIndex ? 'opacity-100' : 'opacity-0'
                                    }`}
                                >
                                    {shouldLoad && (
                                        <Image
                                            src={image.src}
                                            alt={image.alt}
                                            fill
                                            quality={85}
                                            sizes="(max-width: 768px) 100vw, 1024px"
                                            className="object-cover"
                                            priority={index === 0}
                                            loading={index === 0 ? undefined : 'lazy'}
                                        />
                                    )}
                                </div>
                            );
                        })}
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
