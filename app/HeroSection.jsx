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
        style: 'w-[90%] sm:w-[90%] top-[1%] sm:top-[6%] md:top-[12%] lg:top-[18%] xl:top-[18%] 2xl:top-[24%] left-1/2 -translate-x-1/2',
        delay: 800,
    },
];

const HeroSection = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [isSmallViewportHeight, setIsSmallViewportHeight] = useState(false);
    const [isMobilePortrait, setIsMobilePortrait] = useState(false);
    const [videoError, setVideoError] = useState(false);
    const [videoLoaded, setVideoLoaded] = useState(false);
    const [desktopVideoError, setDesktopVideoError] = useState(false);
    const [desktopVideoLoaded, setDesktopVideoLoaded] = useState(false);
    const videoRef = useRef(null);
    const desktopVideoRef = useRef(null);
    
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 640);
        const checkViewport = () => {
            checkMobile();
            // Detect small viewport height (like phone landscape) - less than 600px height
            setIsSmallViewportHeight(window.innerHeight < 600 && window.innerWidth >= 640);
            // Detect mobile portrait (narrow + tall) - use less zoomed video
            setIsMobilePortrait(window.innerWidth < 640 && window.innerHeight > window.innerWidth);
        };
        checkViewport();
        window.addEventListener('resize', checkViewport);
        return () => window.removeEventListener('resize', checkViewport);
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
        if (!isMobile && desktopVideoRef.current) {
            const video = desktopVideoRef.current;
            
            // Try to play when video can play
            const handleCanPlay = () => {
                setDesktopVideoLoaded(true);
                video.play().catch((error) => {
                    console.log('Desktop video autoplay prevented (normal on some browsers):', error);
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
        <section className="relative w-full overflow-hidden" style={{ marginTop: 0, marginBottom: 0, paddingTop: 0, paddingBottom: 0, height: 'auto' }}>
            {/* Desktop Video Background */}
            {!isMobile && (
                <div className={`absolute z-0 hidden sm:block bg-black ${isSmallViewportHeight ? 'sm:h-[85vh] md:h-[90vh] lg:h-[92vh] xl:h-[95vh] 2xl:h-[77vh]' : 'sm:h-[39vh] md:h-[51vh] lg:h-[62vh] xl:h-[70vh] 2xl:h-[77vh]'} ${desktopVideoError ? 'hidden' : ''}`} style={{ width: '100%', top: 0, left: 0, margin: 0, marginBottom: 0, padding: 0, paddingBottom: 0 }}>
                    <video
                        ref={desktopVideoRef}
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="auto"
                        className="w-full h-full object-cover"
                        style={{ 
                            objectPosition: 'top center',
                            width: '100%',
                            height: '100%',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            margin: 0,
                            padding: 0,
                            zIndex: desktopVideoError ? -1 : 1
                        }}
                        onError={(e) => {
                            console.error('Desktop video error:', e);
                            setDesktopVideoError(true);
                        }}
                        onLoadedData={() => {
                            setDesktopVideoLoaded(true);
                        }}
                        onCanPlay={() => {
                            setDesktopVideoLoaded(true);
                            if (desktopVideoRef.current) {
                                desktopVideoRef.current.play().catch((err) => {
                                    console.log('Desktop video autoplay prevented, but video loaded:', err);
                                });
                            }
                        }}
                        onEnded={() => {
                            // Seamless loop - immediately restart without lag
                            if (desktopVideoRef.current) {
                                desktopVideoRef.current.currentTime = 0;
                                desktopVideoRef.current.play().catch(() => {
                                    // Ignore play errors on loop
                                });
                            }
                        }}
                    >
                        <source src="/videos/Hero Loop 1920x720.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            )}

            {/* Background Image - Desktop fallback only */}
            {!isMobile && desktopVideoError && (
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
            )}

            <div className="relative w-full" style={{ marginTop: 0, marginBottom: 0, paddingTop: 0, paddingBottom: 0 }}>
                {/* Grid with just the Hero Image Row */}
                <div className="grid w-full" style={{ gridTemplateRows: 'auto', marginTop: 0, marginBottom: 0, paddingTop: 0, paddingBottom: 0 }}>
                    <div className={`relative w-full h-[137vw] ${isSmallViewportHeight ? 'sm:h-[85vh] md:h-[90vh] lg:h-[92vh] xl:h-[95vh] 2xl:h-[77vh]' : 'sm:h-[39vh] md:h-[51vh] lg:h-[62vh] xl:h-[70vh] 2xl:h-[77vh]'} sm:aspect-auto overflow-hidden`} style={{ marginTop: 0, marginBottom: 0, paddingTop: 0, paddingBottom: 0 }}>
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
                                    className={`w-full h-full ${isMobilePortrait ? 'object-contain' : 'object-cover'}`}
                                    style={{ 
                                        objectPosition: 'top center',
                                        width: '100%',
                                        height: isMobilePortrait ? '100%' : '105%',
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
                                    <source src="/videos/Hero Loop 9x13_1.mp4" type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                                <div className="absolute bottom-0 left-0 w-full h-42 bg-gradient-to-b from-transparent to-black pointer-events-none z-10" />
                            </div>
                        )}

                        {/* Fallback Images - Show if video fails */}
                        {characterImages.map((char) => {
                            // Show logic:
                            // - Desktop: show only if desktop video fails
                            // - Mobile with video working: hide all (video shows instead)
                            // - Mobile with video error: show characters and chase, but not logo
                            const shouldShow = (!isMobile && desktopVideoError) || (isMobile && videoError && char.id !== 'logo');
                            const shouldHide = (isMobile && !videoError) || (!isMobile && !desktopVideoError);
                            
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

                {/* Icon Row - Desktop only */}
                <div className="hidden sm:block absolute bottom-[3%] left-0 w-full z-30 min-h-[clamp(120px,15vh,200px)]" style={{ marginBottom: 0, paddingBottom: 0 }}>
                    <div className="w-full px-4 pointer-events-auto pt-[clamp(40px,8vh,80px)]" style={{ marginBottom: 0, paddingBottom: 0 }}>
                        <IconRow isSmallViewportHeight={isSmallViewportHeight} />
                    </div>
                </div>

            </div>
        </section>


    );
};

export default HeroSection;
