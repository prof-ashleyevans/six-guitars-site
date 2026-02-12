'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';

const IconRow = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Animate icon row at the same time as logo (800ms delay)
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 800);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div
            className={`relative z-10 flex flex-nowrap justify-center gap-2 w-full max-w-screen-md px-4 mb-4 md:mt-12 lg:mt-20 xl:mt-24 2xl:mt-28 bg-transparent mx-auto text-center transition-opacity duration-1800 ease-out
        ${isVisible ? 'opacity-100' : 'opacity-0'}
    `}
        >
            {/* Icon 1 */}
            <div className="flex flex-col items-center w-22 sm:w-50 text-white flex-shrink-0">
                <div className="relative w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-16 lg:h-16 xl:w-20 xl:h-20 2xl:w-18 2xl:h-18 max-w-[80px] max-h-[80px]">
                    <Image
                        src="/images/icons/guiar_icon.png"
                        alt="Guitar Icon"
                        fill
                        quality={90}
                        className="object-contain"
                        unoptimized
                    />
                </div>
                <p className="text-md lg:text-xl leading-tight text-center">Music</p>
            </div>

            {/* Icon 2 */}
            <div className="flex flex-col items-center w-22 sm:w-50 text-white flex-shrink-0">
                <div className="relative w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-16 lg:h-16 xl:w-20 xl:h-20 2xl:w-18 2xl:h-18 max-w-[80px] max-h-[80px]">
                    <Image
                        src="/images/icons/ticket_icon.png"
                        alt="Ticket Icon"
                        fill
                        quality={90}
                        className="object-contain"
                        unoptimized
                    />
                </div>
                <p className="text-md lg:text-xl leading-tight text-center">Comedy</p>
            </div>

            {/* Icon 3 */}
            <div className="flex flex-col items-center w-22 sm:w-50 text-white flex-shrink-0">
                <div className="relative w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-16 lg:h-16 xl:w-20 xl:h-20 2xl:w-18 2xl:h-18 max-w-[80px] max-h-[80px] ml-5">
                    <Image
                        src="/images/icons/Stories Icon.png"
                        alt="Stories Icon"
                        fill
                        quality={90}
                        className="object-contain"
                        unoptimized
                    />
                </div>
                <p className="text-md lg:text-xl leading-tight text-center w-full">Storytelling</p>
            </div>
        </div>
    );
};

export default IconRow;
