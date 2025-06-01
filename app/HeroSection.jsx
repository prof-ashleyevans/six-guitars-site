// components/HeroSection.jsx
'use client';
import { useEffect, useState } from "react";
import HomeTitle from "@/app/HomeTitle";

//character images for home
const characterImages = [
    {
        src: "/images/characters/folk.jpg",
        alt: "Folk",
        desktopAnimation: "animate-slideOut-0",
        mobileAnimation: "animate-slideOut-mobile-0",
    },
    {
        src: "/images/characters/classical.jpg",
        alt: "Classical",
        desktopAnimation: "animate-slideOut-1",
        mobileAnimation: "animate-slideOut-mobile-1",
    },
    {
        src: "/images/characters/jazz.jpg",
        alt: "Jazz",
        desktopAnimation: "animate-slideOut-2",
        mobileAnimation: "animate-slideOut-mobile-2",
    },
    {
        src: "/images/characters/rock.jpg",
        alt: "Rock",
        desktopAnimation: "animate-slideOut-3",
        mobileAnimation: "animate-slideOut-mobile-3",
    },
    {
        src: "/images/characters/blues.jpg",
        alt: "Blues",
        desktopAnimation: "animate-slideOut-4",
        mobileAnimation: "animate-slideOut-mobile-4",
    },
    {
        src: "/images/characters/country.jpg",
        alt: "Country",
        desktopAnimation: "animate-slideOut-5",
        mobileAnimation: "animate-slideOut-mobile-5",
    },
];
const HeroSection = () => {
    const [startAnimation, setStartAnimation] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 640);
        };

        handleResize(); // Run once on mount
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);


    useEffect(() => {
        const timer = setTimeout(() => {
            setStartAnimation(true);
        }, 0);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <section id="home" className="relative h-screen w-full overflow-hidden flex items-center justify-center" style={{ backgroundColor: "#1a1a1a" }}>


                <div className="absolute top-1 w-full flex justify-center z-20">
                {/* Central image */}
                <img
                    src="/images/characters/chase.jpg"
                    alt="Guitarist"
                    className="z-10 relative w-125 h-75 top-72 object-cover aspect-square animate-fade-center"
                />

                {/* Sliding character images */}
                {characterImages.map((char, i) => (
                    <img
                        key={i}
                        src={char.src}
                        alt={char.alt}
                        className={`top-100 absolute w-132 h-75 object-cover aspect-square transition-transform duration-50 ease-out z-0 ${startAnimation ? (isMobile ? char.mobileAnimation : char.desktopAnimation) : 'hidden'}
} z-0`}
                    />
                ))}
                 </div>

                <div className="absolute w-full flex justify-center z-20">
                    <HomeTitle />
                </div>




            </section>
        </>
    );
};
<style jsx>{`
@keyframes zoomIn {
    from {
        transform: scale(1);
    }
    to {
        transform: scale(1.1);
    }
}
`}</style>

export default HeroSection;
