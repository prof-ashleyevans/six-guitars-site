'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';

// Character images for background rotation
const characterImages = [
    "/images/characters/rock.jpg",
    "/images/characters/jazz.jpg",
    "/images/characters/country.jpg",
    "/images/characters/folk.jpg",
    "/images/characters/classical.jpg",
    "/images/characters/blues.jpg",
];

export default function Reviews() {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentSlide, setCurrentSlide] = useState(0);
    
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
        slideChanged(slider) {
            setCurrentSlide(slider.track.details.abs);
        },
        created(slider) {
            // Initialize current slide on creation
            setCurrentSlide(slider.track.details.abs);
        },
    });

    // Fetch reviews from API
    useEffect(() => {
        async function loadReviews() {
            try {
                const response = await fetch('/api/reviews');
                if (!response.ok) {
                    throw new Error('Failed to fetch reviews');
                }
                const data = await response.json();
                
                // Separate reviews with stars and without stars
                const withStars = data.filter(review => review.status === 5);
                const withoutStars = data.filter(review => review.status !== 5);
                
                // Alternate between reviews with stars and without stars
                const alternatedReviews = [];
                const maxLength = Math.max(withStars.length, withoutStars.length);
                
                for (let i = 0; i < maxLength; i++) {
                    if (i < withStars.length) {
                        alternatedReviews.push(withStars[i]);
                    }
                    if (i < withoutStars.length) {
                        alternatedReviews.push(withoutStars[i]);
                    }
                }
                
                // Add character images to reviews for background rotation
                const reviewsWithImages = alternatedReviews.map((review, index) => ({
                    ...review,
                    characterImage: characterImages[index % characterImages.length],
                }));
                
                setReviews(reviewsWithImages);
            } catch (error) {
                console.error('Error loading reviews:', error);
            } finally {
                setLoading(false);
            }
        }
        loadReviews();
    }, []);

    // Auto-rotate every 4 seconds - but pause when page is not visible
    useEffect(() => {
        if (reviews.length === 0) return;
        
        let interval;
        const handleVisibilityChange = () => {
            if (document.hidden) {
                clearInterval(interval);
            } else {
                interval = setInterval(() => {
                    slider.current?.next();
                }, 4000);
            }
        };
        
        // Only auto-rotate if page is visible
        if (!document.hidden) {
            interval = setInterval(() => {
                slider.current?.next();
            }, 4000);
        }
        
        document.addEventListener('visibilitychange', handleVisibilityChange);
        return () => {
            clearInterval(interval);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [slider, reviews]);

    return (
        <section id="reviews" className="text-white px-6 py-16 bg-[#1a1a1a]">
            <div className="max-w-6xl mx-auto text-center">
                <h2 className="text-4xl font-bold mb-8">Reviews</h2>

                {loading ? (
                    <div className="h-[400px] flex items-center justify-center">
                        <p className="text-xl">Loading reviews...</p>
                    </div>
                ) : reviews.length === 0 ? (
                    <div className="h-[400px] flex items-center justify-center">
                        <p className="text-xl">No reviews available</p>
                    </div>
                ) : (
                    <div className="relative w-full h-[400px] overflow-hidden">
                        <div ref={sliderRef} className="keen-slider h-full">
                            {reviews.map((review, index) => {
                                // Only load images for visible slides + 1 adjacent on each side
                                // Keen Slider shows 1 on mobile, 3 on desktop
                                // Load current slide + 2 adjacent (covers mobile=1, desktop=3)
                                const shouldLoad = Math.abs(index - currentSlide) <= 2;
                                
                                return (
                                    <div key={review.id || index} className="keen-slider__slide relative w-full h-full">
                                        {/* Background */}
                                        <div className="absolute inset-0 overflow-hidden z-0 opacity-20">
                                            {shouldLoad && (
                                                <Image
                                                    src={review.characterImage}
                                                    alt="Character"
                                                    fill
                                                    sizes="(max-width: 768px) 100vw, 33vw"
                                                    className="object-cover scale-105"
                                                    loading="lazy"
                                                    unoptimized
                                                />
                                            )}
                                        </div>

                                        {/* Content */}
                                        <div className="relative z-10 h-full flex flex-col items-center px-6 text-center py-12">
                                            {/* Quote first - takes up available space */}
                                            <div className="flex-1 flex items-center justify-center">
                                                <p className="italic text-2xl md:text-2xl max-w-[250px] font-[family-name:var(--font-text_font)] tracking-wide">"{review.quote}"</p>
                                            </div>
                                            
                                            {/* Stars second (if any) - fixed spacing */}
                                            <div className="h-16 flex items-center justify-center mb-6">
                                                {review.status === 5 && shouldLoad && (
                                                <Image 
                                                    src="/images/5 Stars.png" 
                                                    alt="5 stars" 
                                                    width={150}
                                                    height={40}
                                                    sizes="150px"
                                                    className="h-10 w-auto object-contain" 
                                                    loading="lazy"
                                                    unoptimized
                                                />
                                                )}
                                            </div>
                                            
                                            {/* Publication logo - always at same vertical position */}
                                            <div className="h-24 w-full flex items-center justify-center">
                                                {review.logo && shouldLoad && (
                                                    <div className="relative h-full w-full max-w-[300px]">
                                                        <Image 
                                                            src={review.logo} 
                                                            alt={review.name} 
                                                            fill
                                                            sizes="(max-width: 768px) 100vw, 300px"
                                                            className="object-contain" 
                                                            loading="lazy"
                                                            unoptimized
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
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
                )}
            </div>
        </section>
    );
}