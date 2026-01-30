// CharacterGridSection.jsx
'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import AOS from 'aos';
import 'aos/dist/aos.css';
import IconRow from "@/app/IconRow";




const characterImages = [
    {
        desktopSrc: '/images/hero/pc/Hero 16x9 Characters.jpg',
        mobileSrc: '/images/hero/mobile/6G Hero 1x1 Characters.png',
        alt: 'Hero Characters',
        aos: 'fade',
        zIndex: 10,
    },
    {
        desktopSrc: '/images/hero/pc/Hero 16x9 Chase.jpg',
        mobileSrc: '/images/hero/mobile/6G Hero 1x1 Chase.png',
        alt: 'Hero Chase',
        aos: 'fade-up',
        zIndex: 20,
        delay: 400,
    },
    {
        desktopSrc: '/images/hero/pc/Hero 16x9 Logo.jpg',
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
            <section className="relative w-full h-auto sm:min-h-screen flex items-center justify-center mt-5 pt-180 pb-4 sm:pt-0 sm:pb-0">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/hero/pc/background.jpg"
                        alt="Background"
                        fill
                        sizes="100vw"
                        className="object-cover object-center"
                        unoptimized
                    />
                </div>

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
                        <div className="relative w-full h-full" data-aos={char.aos} data-aos-delay={char.delay}>
                            <Image
                                src={isMobile ? char.mobileSrc : char.desktopSrc}
                                alt={char.alt}
                                fill
                                priority={i === 0}
                                sizes="100vw"
                                className={i === 0
                                    ? 'object-cover sm:object-top'
                                    : 'object-contain'}
                                unoptimized
                            />
                        </div>
                    </div>
                ))}



            </section>

            {/* Content below hero */}

        </div>
    );
}
