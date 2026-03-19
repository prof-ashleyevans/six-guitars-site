'use client';

import IconRow from '@/app/IconRow';

export default function HeroIconRowBelow() {
    return (
        <section id="hero-icon-row-below" className="bg-black text-white pt-0 pb-6 px-4">
            <div className="max-w-screen-md mx-auto">
                <IconRow isSmallViewportHeight={true} />
            </div>
        </section>
    );
}

