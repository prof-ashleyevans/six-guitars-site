'use client';
import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';

const characterImages = [
    { src: '/images/characters/blues.jpg', alt: 'Blues', font: 'var(--font-blues)', color: '#0562D7' },
    { src: '/images/characters/rock.jpg', alt: 'Rock', font: 'var(--font-rock)', color: '#D2153D' },
    { src: '/images/characters/jazz.jpg', alt: 'Jazz', font: 'var(--font-jazz)', color: '#BB6DEB' },
    { src: '/images/characters/folk.jpg', alt: 'Folk', font: 'var(--font-folk)', color: '#E09608' },
    { src: '/images/characters/country.jpg', alt: 'Country', font: 'var(--font-country)', color: '#10AD43' },
    { src: '/images/characters/classical.jpg', alt: 'Classical', font: 'var(--font-classical)', color: '#BD5217' },
];

export default function Experimental() {
    const [rotation, setRotation] = useState(0);
    const [frontIndex, setFrontIndex] = useState(0);
    const [backIndex, setBackIndex] = useState(1);
    const lastQuadrantRef = useRef(0);
    const imageCounterRef = useRef(0);

    useEffect(() => {
        let animationId;
        
        const animate = () => {
            setRotation((prev) => {
                const newRotation = prev + 1.5; // Smooth rotation speed
                
                // Determine current quadrant (0-3)
                const currentQuadrant = Math.floor((newRotation % 360) / 90);
                
                // When we enter a new quadrant, update the hidden face
                if (currentQuadrant !== lastQuadrantRef.current) {
                    lastQuadrantRef.current = currentQuadrant;
                    imageCounterRef.current += 1;
                    
                    const newImageIndex = imageCounterRef.current % characterImages.length;
                    const nextImageIndex = (imageCounterRef.current + 1) % characterImages.length;
                    
                    // Update the face that's currently hidden (facing away)
                    if (currentQuadrant === 0 || currentQuadrant === 1) {
                        // Front face is visible or becoming visible, update back
                        setFrontIndex(newImageIndex);
                        setBackIndex(nextImageIndex);
                    } else {
                        // Back face is visible or becoming visible, update front
                        setBackIndex(newImageIndex);
                        setFrontIndex(nextImageIndex);
                    }
                }
                
                return newRotation;
            });
            
            animationId = requestAnimationFrame(animate);
        };

        animationId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationId);
    }, []);

    // Calculate which character name to display
    const normalizedRotation = rotation % 360;
    const visibleIndex = (normalizedRotation >= 90 && normalizedRotation < 270) ? backIndex : frontIndex;

    return (
        <section id="experimental" className="bg-black text-white px-6 py-16">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-4xl font-bold text-center mb-8">Experimental</h2>
                
                <div className="flex justify-center items-center" style={{ perspective: '1200px' }}>
                    <div
                        className="relative w-64 h-80 md:w-72 md:h-96 shadow-2xl rounded-lg"
                        style={{
                            transform: `rotateY(${rotation}deg)`,
                            transformStyle: 'preserve-3d',
                        }}
                    >
                        {/* Front face */}
                        <div
                            className="absolute inset-0 rounded-lg overflow-hidden"
                            style={{
                                backfaceVisibility: 'hidden',
                                WebkitBackfaceVisibility: 'hidden',
                            }}
                        >
                            <Image
                                src={characterImages[frontIndex].src}
                                alt={characterImages[frontIndex].alt}
                                fill
                                quality={85}
                                className="object-cover"
                                priority
                            />
                        </div>
                        
                        {/* Back face */}
                        <div
                            className="absolute inset-0 rounded-lg overflow-hidden"
                            style={{
                                backfaceVisibility: 'hidden',
                                WebkitBackfaceVisibility: 'hidden',
                                transform: 'rotateY(180deg)',
                            }}
                        >
                            <Image
                                src={characterImages[backIndex].src}
                                alt={characterImages[backIndex].alt}
                                fill
                                quality={85}
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>
                </div>
                
                <p className="text-center text-yellow-400 mt-6 text-xl font-semibold">
                    {characterImages[visibleIndex].alt}
                </p>

            </div>

            {/* Row of 6 images with sequential flip effect - FULL WIDTH */}
            <div className="mt-16 w-full px-4">
                <div className="grid grid-cols-6 gap-2 md:gap-4 w-full">
                    {characterImages.map((image, index) => (
                        <FlipCard key={index} image={image} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}

// Individual flip card component with staggered animation - appears with 90 degree flip
function FlipCard({ image, index }) {
    const [isVisible, setIsVisible] = useState(false);
    
    useEffect(() => {
        // Stagger the appearance timing for each card
        const delayBetweenCards = 500;
        const myDelay = index * delayBetweenCards;
        
        const timeout = setTimeout(() => {
            setIsVisible(true);
        }, myDelay);
        
        return () => clearTimeout(timeout);
    }, [index]);

    return (
        <div style={{ perspective: '800px' }}>
            <div
                className="relative w-full aspect-[3/4] rounded-md overflow-hidden shadow-lg"
                style={{
                    transform: isVisible ? 'rotateY(0deg)' : 'rotateY(90deg)',
                    opacity: isVisible ? 1 : 0,
                    transition: 'transform 0.6s ease-out, opacity 0.3s ease-out',
                    transformStyle: 'preserve-3d',
                }}
            >
                <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    quality={85}
                    className="object-cover"
                />
            </div>
            <p 
                className="text-center text-lg md:text-2xl font-bold mt-2"
                style={{ 
                    fontFamily: image.font, 
                    color: image.color,
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'rotateY(0deg)' : 'rotateY(90deg)',
                    transition: 'transform 0.6s ease-out, opacity 0.3s ease-out',
                }}
            >
                {image.alt}
            </p>
        </div>
    );
}
