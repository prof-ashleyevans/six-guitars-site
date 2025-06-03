// components/HeroSection.jsx
'use client';
import { useEffect, useState } from "react";
import HomeTitle from "@/app/HomeTitle";
import CharacterGridSection from "@/app/CharacterGridSection";

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
            <section
                id="home"
                className="relative py-60 w-full overflow-hidden flex items-center justify-center"
                style={{ backgroundColor: "#1a1a1a" }}
            >
                <div className="absolute inset-0 z-0">
                    <CharacterGridSection />
                </div>

                {/* Desktop view */}
                <div className="hidden lg:flex absolute w-full justify-center z-20 mt-10 lg:mb-72">
                    <HomeTitle />
                </div>

                {/* Mobile view */}
                <div className="flex lg:hidden absolute w-full justify-center z-20 mb-160">
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
