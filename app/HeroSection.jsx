'use client';
import { useEffect, useState } from 'react';
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
        desktopSrc: '/images/hero/pc/6G Hero 18x9 Chase.png',
        mobileSrc: '/images/hero/mobile/6G Hero 1x1 Chase.png',
        alt: 'Hero Chase',
        zIndex: 20,
        style: 'w-[100%] sm:w-[75%] h-[100%] sm:h-[90%] bottom-[0%] left-1/2 transform -translate-x-1/2',
        delay: 400,
    },
    {
        id: 'logo',
        desktopSrc: '/images/hero/pc/6G Hero 18x9 Logo.png',
        mobileSrc: '/images/hero/mobile/6G Hero 1x1 Logo.png',
        alt: '6 Guitars Logo',
        zIndex: 30,
        style: 'w-[90%] sm:w-[90%] top-[-5%] left-1/2 transform -translate-x-1/2',
        delay: 800,
    },
];

const HeroSection = () => {
    const [isMobile, setIsMobile] = useState(false);
    {/**/}
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 640);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        AOS.init({ duration: 1800, once: true });
    }, []);

    return (
        <section
            className="relative w-full bg-cover bg-center bg-no-repeat overflow-hidden"
            style={{ backgroundImage: `url('/images/hero/pc/6G Hero 18x9 Plate.jpg')` }}
        >
            <div className="relative w-full">
                {/* Grid with just the Hero Image Row */}
                <div className="grid w-full" style={{ gridTemplateRows: 'auto' }}>
                    <div className="relative w-full" style={{ aspectRatio: isMobile ? '1 / 1' : '20 / 9' }}>
                        {characterImages.map((char) => (
                            <div
                                key={char.id}
                                className={`absolute z-[${char.zIndex}] ${char.style}`}
                            >
                                <img
                                    src={isMobile ? char.mobileSrc : char.desktopSrc}
                                    alt={char.alt}
                                    data-aos="fade-up"
                                    data-aos-delay={char.delay || 0}
                                    className="w-full h-full object-cover object-top"
                                />
                                {char.id === 'characters' && (
                                    <div className="absolute bottom-0 left-0 w-full h-42 bg-gradient-to-b from-transparent to-black pointer-events-none" />
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Absolutely positioned Icon Row overlapping bottom of character image */}
                <div className="absolute bottom-0 left-0 w-full z-30">
                    <div className="w-full px-4 pointer-events-auto">
                        <IconRow />
                    </div>
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black z-[-1] pointer-events-none" />

                </div>
            </div>
        </section>


    );
};

export default HeroSection;
