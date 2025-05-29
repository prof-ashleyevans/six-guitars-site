'use client';
import { Michroma } from 'next/font/google';

const michroma = Michroma({
    subsets: ['latin'],
    weight: '400',
});

import { useEffect, useState } from 'react';

const HomeTitle = () => {
    const [showText, setShowText] = useState(false);

    useEffect(() => {
        // Trigger animation after mount
        const timer = setTimeout(() => {
            setShowText(true);
        }, 5); // Delay start if needed

        return () => clearTimeout(timer);
    }, []);

    const text = "6 GUITARS";

    return (
        <div className={`absolute top-30 sm:top-4 md:top-22 text-white text-5xl sm:text-7xl md:text-9xl font-bold flex gap-2 z-20 ${michroma.className}`}>
            {text.split("").map((char, idx) => (
                <span
                    key={idx}
                    className={`inline-block ${showText ? "flip-y" : "opacity-0"}`}
                    style={{ animationDelay: `${idx * 0.1}s` }}
                >
          {char}
        </span>
            ))}
        </div>
    );
};

export default HomeTitle;
