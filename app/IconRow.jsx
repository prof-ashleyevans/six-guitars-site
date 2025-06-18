'use client';
import { useRef, useState, useEffect } from 'react';

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
            className={`relative z-10 flex flex-wrap justify-center gap-5 w-full max-w-screen-md px-4  mb-10  bg-transparent mx-auto text-center transition-all duration-700 ease-out
        ${isIconVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
    `}
        >
            {/* Icon 1 */}
            <div className="flex flex-col items-center w-22 sm:w-50 text-white">
                <img
                    src="/images/icons/guiar_icon.png"
                    alt="Guitar Icon"
                    className="w-10 h-10 sm:w-16 sm:h-16 object-contain"
                />
                <p className="text-md lg:text-xl leading-tight text-center">Live Music</p>
            </div>

            {/* Icon 2 */}
            <div className="flex flex-col items-center w-22 sm:w-50 text-white">
                <img
                    src="/images/icons/ticket_icon.png"
                    alt="Ticket Icon"
                    className="w-10 h-10 sm:w-16 sm:h-16 object-contain"
                />
                <p className="text-md lg:text-xl leading-tight text-center">Comedy</p>
            </div>

            {/* Icon 3 */}
            <div className="flex flex-col items-center w-22 sm:w-50 text-white">
                <img
                    src="/images/icons/comedy_mask_icon.png"
                    alt="Comedy Mask Icon"
                    className="w-10 h-10 sm:w-16 sm:h-16 object-contain"
                />
                <p className="text-md xl:text-xl lg:text-lg sm:text-md leading-tight text-center whitespace-normal">
                    <span className="block">100,000+</span>
                    <span className="block">Tickets Sold</span>
                </p>
            </div>
        </div>
    );
};

export default IconRow;
