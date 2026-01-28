'use client';
import { useEffect, useState, useCallback, useRef } from 'react';
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
    const [isVisible, setIsVisible] = useState(true); // Start as true, IntersectionObserver will update
    const galleryRef = useRef(null);

    const goToNext = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
    }, []);

    const goToPrev = useCallback(() => {
        setCurrentIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
    }, []);

    // Pause auto-advance when gallery is not visible in viewport
    useEffect(() => {
        if (!galleryRef.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    setIsVisible(entry.isIntersecting);
                });
            },
            { threshold: 0.3 } // Consider visible when 30% is in viewport
        );

        observer.observe(galleryRef.current);
        return () => observer.disconnect();
    }, []);

    // Auto-advance every 3 seconds - but pause when page is hidden OR gallery is not visible
    useEffect(() => {
        let interval = null;
        
        const startInterval = () => {
            if (!document.hidden && isVisible && !interval) {
                interval = setInterval(goToNext, 3000);
            }
        };

        const stopInterval = () => {
            if (interval) {
                clearInterval(interval);
                interval = null;
            }
        };

        const handleVisibilityChange = () => {
            stopInterval();
            if (!document.hidden && isVisible) {
                startInterval();
            }
        };
        
        // Stop any existing interval first
        stopInterval();
        
        // Start interval if both conditions are met
        if (!document.hidden && isVisible) {
            startInterval();
        }
        
        document.addEventListener('visibilitychange', handleVisibilityChange);
        return () => {
            stopInterval();
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [goToNext, isVisible]);

    return (
        <section id="gallery" ref={galleryRef} className="bg-black text-white px-6 py-16">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-4xl font-bold text-center mb-12">Photo Gallery</h2>
                
                <div className="relative">
                    {/* Image Container */}
                    <div className="relative aspect-[4/3] md:aspect-[16/9] overflow-hidden rounded-xl">
                        {/* Only load the current image - matches Christmas site approach */}
                        <Image
                            src={galleryImages[currentIndex].src}
                            alt={galleryImages[currentIndex].alt}
                            fill
                            sizes="(max-width: 768px) 100vw, 1024px"
                            className="object-cover transition-opacity duration-500"
                            priority={currentIndex === 0}
                            loading={currentIndex === 0 ? undefined : 'lazy'}
                            unoptimized
                        />
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
