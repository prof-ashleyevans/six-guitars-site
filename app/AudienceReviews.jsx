'use client';
import Image from "next/image";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState } from 'react';

export default function AudienceReviews() {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
        });

        // Fetch reviews from API
        async function loadReviews() {
            try {
                const response = await fetch('/api/audience-reviews');
                if (response.ok) {
                    const data = await response.json();
                    
                    // Estimate lines for each review (assuming ~60 chars per line)
                    const reviewsWithLines = data.map(review => ({
                        ...review,
                        estimatedLines: Math.ceil((review.quote?.length || 0) / 60)
                    }));
                    
                    // Group by estimated line count
                    const groupedByLines = {};
                    reviewsWithLines.forEach(review => {
                        const lines = review.estimatedLines;
                        if (!groupedByLines[lines]) {
                            groupedByLines[lines] = [];
                        }
                        groupedByLines[lines].push(review);
                    });
                    
                    // Create alternating pattern: 1-line, 2-line, 1-line, 3-line, etc.
                    const sortedKeys = Object.keys(groupedByLines).map(Number).sort((a, b) => a - b);
                    const reorderedReviews = [];
                    const pattern = []; // Track which line-length to pull from next
                    
                    // Build pattern: alternate between shortest and progressively longer
                    let shortIndex = 0;
                    let longIndex = sortedKeys.length - 1;
                    while (shortIndex <= longIndex) {
                        if (shortIndex === longIndex) {
                            pattern.push(sortedKeys[shortIndex]);
                            break;
                        }
                        pattern.push(sortedKeys[shortIndex]);
                        if (shortIndex + 1 <= longIndex) {
                            pattern.push(sortedKeys[shortIndex + 1]);
                        }
                        shortIndex += 2;
                    }
                    
                    // Distribute reviews following the pattern
                    const groupIndexes = {};
                    sortedKeys.forEach(key => groupIndexes[key] = 0);
                    
                    let patternIndex = 0;
                    while (reorderedReviews.length < data.length) {
                        const lineCount = pattern[patternIndex % pattern.length];
                        const group = groupedByLines[lineCount];
                        const index = groupIndexes[lineCount];
                        
                        if (group && index < group.length) {
                            reorderedReviews.push(group[index]);
                            groupIndexes[lineCount]++;
                        }
                        
                        patternIndex++;
                    }
                    
                    // Move John Cali's review to the end
                    const johnCaliIndex = reorderedReviews.findIndex(r => 
                        r.name?.toLowerCase().includes('john cali')
                    );
                    if (johnCaliIndex !== -1) {
                        const [johnCaliReview] = reorderedReviews.splice(johnCaliIndex, 1);
                        reorderedReviews.push(johnCaliReview);
                    }
                    
                    setReviews(reorderedReviews);
                } else {
                    console.error('Failed to fetch reviews');
                }
            } catch (error) {
                console.error('Error loading reviews:', error);
            } finally {
                setLoading(false);
            }
        }

        loadReviews();

        // Trigger refresh on scroll stop
        let timeout;
        const handleScroll = () => {
            clearTimeout(timeout);
            timeout = setTimeout(() => AOS.refresh(), 100);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section id="audience-reviews" className="relative py-16 px-4 bg-black text-white overflow-hidden">
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/60 z-0" />
            <div className="relative w-full">
                {/* Background Images - Stacked with blend */}
                <div className="absolute inset-0 z-0 flex flex-col">
                    {/* First photo - zoomed out */}
                    <div 
                        className="flex-1 relative bg-first-photo"
                    >
                        {/* Gradient blend overlay */}
                        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-black" />
                    </div>
                    {/* Second photo */}
                    <div 
                        className="flex-1 relative bg-second-photo"
                    >
                        {/* Gradient blend overlay */}
                        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black to-transparent" />
                    </div>
                </div>

                {/* Content */}
                <div className="relative z-10 bg-black/30 py-24 px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center text-white mb-12">Audience Feedback</h2>
                    
                    {loading ? (
                        <div className="text-center text-white/70">Loading reviews...</div>
                    ) : reviews.length === 0 ? (
                        <div className="text-center text-white/70">No reviews available at this time.</div>
                    ) : (
                        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 max-w-7xl mx-auto space-y-6">
                            {reviews.map((review, index) => (
                                <div 
                                    key={review.id} 
                                    data-aos="fade-up" 
                                    data-aos-delay={index * 50}
                                    className="bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow duration-300 break-inside-avoid mb-6"
                                >
                                    {/* Header with photo and name (Facebook style) */}
                                    <div className="flex items-center gap-3 mb-3">
                                        {/* Circular profile photo */}
                                        <div className="flex-shrink-0">
                                            {review.photo ? (
                                <Image
                                                    src={review.photo}
                                                    alt={review.name}
                                                    width={48}
                                                    height={48}
                                                    sizes="48px"
                                                    quality={75}
                                                    className="rounded-full object-cover w-12 h-12"
                                                    loading="lazy"
                                                />
                                            ) : (
                                                // Fallback avatar if no photo
                                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-lg">
                                                    {review.name.charAt(0).toUpperCase()}
                                                </div>
                                            )}
                                        </div>
                                        
                                        {/* Name */}
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-semibold text-gray-900 text-base">
                                                {review.name}
                                            </h3>
                                        </div>
                                    </div>
                                    
                                    {/* Quote/Comment */}
                                    <div className="text-gray-700 text-base leading-relaxed">
                                        {review.quote}
                                    </div>
                            </div>
                        ))}
                    </div>
                    )}
                </div>
            </div>

            {/* Responsive background styles */}
            <style jsx>{`
                .bg-first-photo {
                    background-image: url(/images/audience_photo.jpg);
                    background-size: contain;
                    background-position: center;
                    background-repeat: no-repeat;
                }

                .bg-second-photo {
                    background-image: url(/images/Audience%20Reviews%203.jpg);
                    background-size: cover;
                    background-position: center;
                    background-repeat: no-repeat;
                }

                /* Mobile optimizations */
                @media (max-width: 768px) {
                    .bg-first-photo {
                        background-size: auto 80%;
                        background-position: center;
                        background-repeat: repeat;
                        filter: blur(8px);
                        -webkit-filter: blur(8px);
                    }

                    .bg-second-photo {
                        background-size: auto 80%;
                        background-position: center;
                        background-repeat: repeat;
                        filter: blur(8px);
                        -webkit-filter: blur(8px);
                    }
                }
            `}</style>
        </section>
    );
}
