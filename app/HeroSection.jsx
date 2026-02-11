'use client';
import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import AOS from 'aos';
import 'aos/dist/aos.css';
import IconRow from "@/app/IconRow";

const characterImages = [
    {
        id: 'characters',
        desktopSrc: '/images/hero/pc/6G Hero 18x9 Characters.png',
        mobileSrc: '/images/hero/mobile/6G Hero 1x1 Characters.png',
        alt: 'Hero Characters',
        zIndex: 10,
        style: 'w-full h-full object-cover object-top top-0 left-0',
    },
    {
        id: 'chase',
        desktopSrc: '/images/hero/pc/6G Hero Chase 18x9_V4.png',
        mobileSrc: '/images/hero/mobile/6G Hero 1x1 Chase.png',
        alt: 'Hero Chase',
        zIndex: 20,
        style: 'w-[100%] sm:w-[75%] h-[100%] sm:h-[95%] bottom-[0%] left-1/2 transform -translate-x-1/2',
        delay: 400,
    },
    {
        id: 'logo',
        desktopSrc: '/images/hero/pc/6G Hero 18x9 Logo.png',
        mobileSrc: '/images/hero/mobile/6G Hero 1x1 Logo.png',
        alt: '6 Guitars Logo',
        zIndex: 30,
        style: 'w-[90%] sm:w-[90%] top-[1%] sm:top-[-5%] md:top-[-8%] lg:top-[-6%] xl:top-[-6%] 2xl:top-[-8%] left-1/2 -translate-x-1/2',
        delay: 800,
    },
];

const HeroSection = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [videoError, setVideoError] = useState(false);
    const [videoLoaded, setVideoLoaded] = useState(false);
    const videoRef = useRef(null);
    
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 640);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        if (isMobile && videoRef.current) {
            const video = videoRef.current;
            
            // Try to play when video can play
            const handleCanPlay = () => {
                setVideoLoaded(true);
                video.play().catch((error) => {
                    console.log('Video autoplay prevented (normal on some browsers):', error);
                    // Don't set error - video loaded successfully, just can't autoplay
                });
            };
            
            video.addEventListener('canplay', handleCanPlay);
            
            return () => {
                video.removeEventListener('canplay', handleCanPlay);
            };
        }
    }, [isMobile]);

    useEffect(() => {
        AOS.init({ duration: 1800, once: true });
    }, []);

    return (
        <section className="relative w-full overflow-hidden">
            {/* Background Image - Desktop only */}
            <div className="absolute inset-0 z-0 hidden sm:block">
                <Image
                    src="/images/hero/pc/6G Hero 18x9 Plate.jpg"
                    alt="Background plate"
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover object-center"
                    unoptimized
                />
            </div>

            <div className="relative w-full">
                {/* Grid with just the Hero Image Row */}
                <div className="grid w-full" style={{ gridTemplateRows: 'auto' }}>
                    <div className="relative w-full h-[120vw] sm:h-auto sm:aspect-[16/13.5] md:aspect-[18/13.5] lg:aspect-[20/13.5] overflow-hidden">
                        {/* Mobile Video Background */}
                        {isMobile && (
                            <div className={`absolute inset-0 z-0 sm:hidden bg-black ${videoError ? 'hidden' : ''}`} style={{ width: '100%', height: '100%' }}>
                                <video
                                    ref={videoRef}
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    preload="auto"
                                    className="w-full h-full object-cover"
                                    style={{ 
                                        objectPosition: 'top center',
                                        width: '100%',
                                        height: '125%',
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        zIndex: videoError ? -1 : 1
                                    }}
                                    onError={(e) => {
                                        console.error('Video error:', e);
                                        setVideoError(true);
                                    }}
                                    onLoadedData={() => {
                                        setVideoLoaded(true);
                                    }}
                                    onCanPlay={() => {
                                        setVideoLoaded(true);
                                        if (videoRef.current) {
                                            videoRef.current.play().catch((err) => {
                                                console.log('Autoplay prevented, but video loaded:', err);
                                                // Don't set error - video is loaded, just can't autoplay
                                            });
                                        }
                                    }}
                                >
                                    <source src="/videos/hero/Hero Loop 9x16_2.mp4" type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                                <div className="absolute bottom-0 left-0 w-full h-42 bg-gradient-to-b from-transparent to-black pointer-events-none z-10" />
                            </div>
                        )}

                        {/* Mobile Fallback Images - Show if video fails or on desktop */}
                        {characterImages.map((char) => {
                            // Show logic:
                            // - Desktop: always show
                            // - Mobile with video working: hide all (video shows instead)
                            // - Mobile with video error: show characters and chase, but not logo
                            const shouldShow = !isMobile || (isMobile && videoError && char.id !== 'logo');
                            const shouldHide = isMobile && !videoError;
                            
                            return (
                            <div
                                key={char.id}
                                className={`absolute ${char.style} ${shouldHide ? 'hidden' : ''}`}
                                style={{ zIndex: char.zIndex }}
                                data-aos={shouldShow ? "fade-up" : ""}
                                data-aos-delay={char.delay || 0}
                            >
                                <Image
                                    src={isMobile ? char.mobileSrc : char.desktopSrc}
                                    alt={char.alt}
                                    width={2000}
                                    height={1000}
                                    priority={char.id === 'characters'}
                                    sizes="100vw"
                                    className="w-full h-full object-cover object-top"
                                    style={isMobile ? { 
                                        objectPosition: 'top center',
                                        height: '125%',
                                        top: 0
                                    } : {}}
                                    unoptimized
                                />
                                {char.id === 'characters' && (
                                    <div className="absolute bottom-0 left-0 w-full h-42 bg-gradient-to-b from-transparent to-black pointer-events-none" />
                                )}
                            </div>
                            );
                        })}
                    </div>
                </div>

                {/* Absolutely positioned Icon Row overlapping bottom of character image */}
                <div className="absolute bottom-[-10px] left-0 w-full z-30 sm:min-h-[clamp(120px,15vh,200px)]" style={{ minHeight: 'clamp(80px, 10vh, 140px)' }}>
                    <div className="w-full px-4 pointer-events-auto sm:pt-[clamp(40px,8vh,80px)]" style={{ paddingTop: 'clamp(20px, 5vh, 50px)' }}>
                        <IconRow />
                    </div>
                </div>
            </div>
        </section>


    );
};

export default HeroSection;
