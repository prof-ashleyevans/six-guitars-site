'use client';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';

const useInView = (options = {}) => {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.disconnect();
            }
        }, options);

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [ref, options]);

    return [ref, isVisible];
};

const IconRow = () => {
    const [iconRef, isIconVisible] = useInView({ threshold: 0.2 });

    return (
        <div
            ref={iconRef}
            className={`relative z-10 flex flex-wrap justify-center gap-2 w-full max-w-screen-md px-4 mb-10 mt-8 md:mt-0 bg-transparent mx-auto text-center transition-all duration-700 ease-out
        ${isIconVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
    `}
        >
            {/* Icon 1 */}
            <div className="flex flex-col items-center w-22 sm:w-50 text-white">
                <div className="relative w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24">
                    <Image
                        src="/images/icons/guiar_icon.png"
                        alt="Guitar Icon"
                        fill
                        quality={90}
                        className="object-contain"
                    />
                </div>
                <p className="text-md lg:text-xl leading-tight text-center">Live Music</p>
            </div>

            {/* Icon 2 */}
            <div className="flex flex-col items-center w-22 sm:w-50 text-white">
                <div className="relative w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24">
                    <Image
                        src="/images/icons/ticket_icon.png"
                        alt="Ticket Icon"
                        fill
                        quality={90}
                        className="object-contain"
                    />
                </div>
                <p className="text-md lg:text-xl leading-tight text-center">Comedy</p>
            </div>

            {/* Icon 3 */}
            <div className="flex flex-col items-center w-22 sm:w-50 text-white">
                <div className="relative w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 ml-5">
                    <Image
                        src="/images/icons/Stories Icon.png"
                        alt="Stories Icon"
                        fill
                        quality={90}
                        className="object-contain"
                    />
                </div>
                <p className="text-md lg:text-xl leading-tight text-center w-full">Storytelling</p>
            </div>
        </div>
    );
};

export default IconRow;
