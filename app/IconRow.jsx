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
            className={`flex flex-wrap justify-center gap-8 mt-10 w-full max-w-screen-md px-4 mx-auto text-center transition-opacity duration-1000 ${
                isIconVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
        >
            {/* Icon 1 */}
            <div className="flex flex-col items-center gap-2 w-24">
                <img
                    src="/images/icons/guiar_icon.png"
                    alt="Guitar Icon"
                    className="w-10 h-10 sm:w-16 sm:h-16 object-contain"

                />
                <p className="text-white text-md">Live Music</p>
            </div>

            {/* Icon 2 */}
            <div className="flex flex-col items-center gap-2 w-24">
                <img
                    src="/images/icons/ticket_icon.png"
                    alt="Ticket Icon"
                    className="w-10 h-10 sm:w-16 sm:h-16 object-contain"

                />
                <p className="text-white text-md">Comedy</p>
            </div>

            {/* Icon 3 */}
            <div className="flex flex-col items-center gap-2 w-24">
                <img
                    src="/images/icons/comedy_mask_icon.png"
                    alt="Comedy Mask Icon"
                    className="w-10 h-10 sm:w-16 sm:h-16 object-contain"

                />
                <p className="text-white text-md leading-tight">
                    50,000+<br />
                    Tickets Sold
                </p>
            </div>
        </div>
    );
};

export default IconRow;
