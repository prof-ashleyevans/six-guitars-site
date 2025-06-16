// CharacterGridSection.jsx
'use client';
import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import IconRow from "@/app/IconRow";




const characterImages = [
    {
        desktopSrc: '/images/hero/pc/Hero 16x9 Characters.png',
        mobileSrc: '/images/hero/mobile/6G Hero 1x1 Characters.png',
        alt: 'Hero Characters',
        aos: 'fade',
        zIndex: 10,
    },
    {
        desktopSrc: '/images/hero/pc/Hero 16x9 Chase.png',
        mobileSrc: '/images/hero/mobile/6G Hero 1x1 Chase.png',
        alt: 'Hero Chase',
        aos: 'fade-up',
        zIndex: 20,
        delay: 400,
    },
    {
        desktopSrc: '/images/hero/pc/Hero 16x9 Logo.png',
        mobileSrc: '/images/hero/mobile/6G Hero 1x1 Logo.png',
        alt: '6 Guitars Logo',
        aos: 'fade-up',
        zIndex: 30,
        delay: 800,
    },
];

export default function CharacterGridSection() {
    useEffect(() => {
        AOS.init({ duration: 1800, once: true });
    }, []);

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 640); // Tailwind's `sm` breakpoint
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <div className="flex flex-col w-full">
            <section
                className="relative w-full h-auto sm:min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat mt-5 pt-180 pb-4 sm:pt-0 sm:pb-0"
                style={{
                    backgroundImage: `url('/images/hero/pc/background.jpg')`,
                }}
            >

                {characterImages.map((char, i) => (

                    <div
                        key={i}
                        className={`
      absolute left-1/2 transform -translate-x-1/2 
      ${i === 2 ? 'top-[30%] sm:top-[45%]' : 'top-1/2 -translate-y-1/2'}
      ${i === 1 ? 'top-[24%] sm:top-[52%]' : 'top-1/2 -translate-y-1/2'} 
      ${i === 0 ? 'w-screen max-w-none h-[95vh] overflow-hidden' : ''} 
      ${i !== 0 ? 'w-full max-w-screen-xl' : ''}
    `}
                        style={{ zIndex: char.zIndex }}
                    >
                        <img
                            data-aos={char.aos}
                            data-aos-delay={char.delay}
                            src={isMobile ? char.mobileSrc : char.desktopSrc}
                            alt={char.alt}
                            className={i === 0
                                ? 'w-full h-auto sm:h-full sm:object-cover sm:object-top'
                                : 'w-full h-auto object-contain'}
                        />
                    </div>
                ))}



            </section>

            {/* Content below hero */}
            <IconRow />
        </div>
    );
}
