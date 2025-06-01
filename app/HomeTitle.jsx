'use client';
import { Michroma } from 'next/font/google';
import { useEffect, useRef, useState } from 'react';





const michroma = Michroma({
    subsets: ['latin'],
    weight: '400',
});

const HomeTitle = () => {
    const [showText, setShowText] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowText(true);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);


    const useInView = (options = {}) => {
        const ref = useRef(null);
        const [isVisible, setIsVisible] = useState(false);

        useEffect(() => {
            const observer = new IntersectionObserver(([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect(); // trigger only once
                }
            }, options);

            if (ref.current) observer.observe(ref.current);

            return () => observer.disconnect();
        }, [ref, options]);

        return [ref, isVisible];
    };

    const [iconRef, isIconVisible] = useInView({ threshold: 0.2 });


    const text = "6 GUITARS";

    return (
        <div className="flex flex-col items-center justify-center mt-20 sm:mt-40 md:mt-[50px] px-4">
            {/* Title box */}
            <div
                className={`text-3xl sm:text-5xl md:text-7xl lg:text-9xl font-bold inline-block tracking-widest text-center break-words

                 ${michroma.className}`}
            >
                {text.split("").map((char, idx) => (
                    <span
                        key={idx}
                        className={`inline-block ${showText ? "flip-y" : "opacity-0"}`}
                        style={{ animationDelay: `${idx * 0.1}s`,
                                marginRight: char === "6" ? "0.5em" : undefined // Extra space after 6
                    }}
                    >
            {char}
            </span>
                ))}
            </div>

            {/* Icons row */}
            <div
                ref={iconRef}
                className={`flex justify-center items-center gap-12 w-full max-w-3xl mt-6 z-10 transition-opacity duration-1000 ${
                    isIconVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
            >
                {/* Guitar Icon + Label */}
                <div className="flex items-center gap-2">
                    <img
                        src="/images/icons/guiar_icon.png"
                        alt="Guitar Icon"
                        className="w-22 h-22 object-contain"
                    />
                    <p className="text-white text-xl"> Live Music</p>
                </div>

                {/* Ticket Icon + Label */}
                <div className="flex items-center gap-2">
                    <img
                        src="/images/icons/ticket_icon.png"
                        alt="Ticket Icon"
                        className="w-22 h-22 object-contain"
                    />
                    <p className="text-white text-xl">Comedy</p>
                </div>

                {/* Comedy Mask Icon + Label */}
                <div className="flex items-center gap-2">
                    <img
                        src="/images/icons/comedy_mask_icon.png"
                        alt="Comedy Mask Icon"
                        className="w-22 h-22 object-contain"
                    />
                    <p className="text-white text-xl leading-tight">
                        50,000+<br />Tickets Sold
                    </p>

                </div>


            </div>

        </div>
    );
};

export default HomeTitle;
