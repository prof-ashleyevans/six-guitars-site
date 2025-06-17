'use client';
import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import IconRow from "@/app/IconRow";

const characterImages = [
    {
        id: 'characters',
        desktopSrc: '/images/hero/pc/Hero 16x9 Characters.png',
        mobileSrc: '/images/hero/mobile/6G Hero 1x1 Characters.png',
        alt: 'Hero Characters',
        zIndex: 10,
        style: 'w-full h-[80%] object-cover object-top top-0 left-0',
    },
    {
        id: 'chase',
        desktopSrc: '/images/hero/pc/Hero 16x9 Chase.png',
        mobileSrc: '/images/hero/mobile/6G Hero 1x1 Chase.png',
        alt: 'Hero Chase',
        zIndex: 20,
        style: 'w-[75%] sm:w-[75%] top-[5%] left-1/2 transform -translate-x-1/2',
        delay: 400,
    },
    {
        id: 'logo',
        desktopSrc: '/images/hero/pc/Hero 16x9 Logo.png',
        mobileSrc: '/images/hero/mobile/6G Hero 1x1 Logo.png',
        alt: '6 Guitars Logo',
        zIndex: 30,
        style: 'w-[75%] sm:w-[55%] top-[20%] left-1/2 transform -translate-x-1/2',
        delay: 800,
    },
];

const HeroSection = () => {
    const [isMobile, setIsMobile] = useState(false);

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
        <>
            <section
                className="relative w-full bg-cover bg-center bg-no-repeat mt-5 pt-0  pb-1 sm:pt-0 sm:pb-0"
                style={{ backgroundImage: `url('/images/hero/pc/background.jpg')` }}
            >
                <div className="relative grid place-items-center w-full aspect-square sm:aspect-[16/9] overflow-hidden">
                    {characterImages.map((char) => (
                        <img
                            key={char.id}
                            src={isMobile ? char.mobileSrc : char.desktopSrc}
                            alt={char.alt}
                            data-aos="fade-up"
                            data-aos-delay={char.delay || 0}
                            className={`absolute ${char.style} z-[${char.zIndex}] object-contain`}
                        />
                    ))}

                </div>

                <IconRow />



            </section>
        </>
    );
};

export default HeroSection;
