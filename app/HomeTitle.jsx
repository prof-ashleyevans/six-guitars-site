'use client';
import { Michroma } from 'next/font/google';
import { useEffect, useRef, useState } from 'react';





const michroma = Michroma({
    subsets: ['latin'],
    weight: '400',
});
const TitleComponent = ({ showText, text }) => (
    <div
        className={`w-full max-w-none text-3xl bg-black/80 sm:text-5xl md:text-7xl lg:text-9xl font-bold tracking-widest text-center whitespace-nowrap overflow-x-auto ${michroma.className}`}
    >
        <span className="whitespace-nowrap">
  {text.split("").map((char, idx) => (
      <span
          key={idx}
          className={`${showText ? "flip-y inline-block" : "opacity-0 inline-block"}`}
          style={{
              animationDelay: `${idx * 0.001}s`,
              marginRight: char === "6" ? "0.5em" : undefined,
          }}
      >
      {char}
    </span>
  ))}
</span>

    </div>

);
const HomeTitle = () => {
    const [showText, setShowText] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowText(true);
        }, 50);
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
        <div className="flex flex-col items-center justify-center mt-20 sm:mt-4 md:mt-[50px] px-4">
            {/* Title box */}
            <div
                className={`text-4xl bg-black/80 sm:text-4xl md:text-8xl lg:text-9xl font-bold inline-block tracking-widest text-center break-words

                 ${michroma.className}`}
            >
                {text.split("").map((char, idx) => (
                    <span
                        key={idx}
                        className={`inline-block ${showText ? "flip-y" : "opacity-0"}`}
                        style={{ animationDelay: `${idx * 0.0001}s`,
                                marginRight: char === "6" ? "0.5em" : undefined // Extra space after 6
                    }}
                    >
            {char}
            </span>
                ))}
            </div>



        </div>
    );
};

export default HomeTitle;
