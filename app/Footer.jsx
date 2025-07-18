import { useEffect, useState } from 'react';
export default function Footer() {
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowButton(window.scrollY > 100); // Show after 100px scroll
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    return (
        <>
            <footer className="bg-black text-white px-6 py-8">
                <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="text-sm text-center md:text-center">
                        © {new Date().getFullYear()} 6 Guitars. All rights reserved.
                    </div>

                    <div className="flex space-x-6 text-white">
                        {/* Facebook */}
                        <a
                            href="https://www.facebook.com/chasepadgettperformer"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-yellow-400 transition"
                            aria-label="Facebook"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="36"
                                height="36"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M22.675 0h-21.35C.597 0 0 .597 0 1.325v21.351C0 23.403.597 24 1.325 24h11.488v-9.294H9.692v-3.622h3.121V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.464.099 2.795.143v3.24h-1.918c-1.504 0-1.794.715-1.794 1.763v2.312h3.587l-.467 3.622h-3.12V24h6.116C23.403 24 24 23.403 24 22.676V1.325C24 .597 23.403 0 22.675 0z" />
                            </svg>
                        </a>

                        {/* Instagram */}
                        <a
                            href="https://www.instagram.com/chasethatpadgett/?hl=en/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-yellow-400 transition"
                            aria-label="Instagram"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="36"
                                height="36"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.33 3.608 1.306.975.976 1.244 2.243 1.306 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.33 2.633-1.306 3.608-.976.975-2.243 1.244-3.608 1.306-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.33-3.608-1.306-.975-.976-1.244-2.243-1.306-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.33-2.633 1.306-3.608.976-.975 2.243-1.244 3.608-1.306C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.736 0 8.332.014 7.052.072 5.775.13 4.603.384 3.643 1.344 2.684 2.304 2.43 3.476 2.372 4.753 2.314 6.033 2.3 6.437 2.3 12s.014 5.967.072 7.247c.058 1.277.312 2.449 1.272 3.409.96.96 2.132 1.214 3.409 1.272C8.332 23.986 8.736 24 12 24s3.668-.014 4.948-.072c1.277-.058 2.449-.312 3.409-1.272.96-.96 1.214-2.132 1.272-3.409.058-1.28.072-1.684.072-7.247s-.014-5.967-.072-7.247c-.058-1.277-.312-2.449-1.272-3.409C19.397.384 18.225.13 16.948.072 15.668.014 15.264 0 12 0zM12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a3.999 3.999 0 110-7.998 3.999 3.999 0 010 7.998zm6.406-11.845a1.44 1.44 0 11-2.882 0 1.44 1.44 0 012.882 0z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </footer>

            {/* Floating Ticket Button */}
            {/* Scroll-triggered Button */}
            {/* ✅ Mobile version: full-width black bar at bottom */}
            <div className="sm:hidden fixed bottom-0 left-0 w-full bg-black py-3 z-40">
                <div className="mx-auto w-fit">
                    <div
                        className="inline-block bg-white/10 border border-white px-1 py-2 rounded-sm z-10"
                        style={{
                            animation: 'pulseGlow 5s ease-in-out infinite',
                            boxShadow: '0 0 5px rgba(255, 255, 255, 0.5)',
                        }}
                    >
                        <a
                            href="#tickets"
                            className="bg-[#8a828c] text-white px-3 py-2 rounded-sm font-semibold hover:bg-[#b01234] transition"
                        >
                            BUY TICKETS
                        </a>
                    </div>
                </div>
            </div>

            {/* ✅ Desktop version: floating centered button */}
            <div
                className={`hidden sm:block fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 transition-opacity duration-500 ${
                    showButton ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
            >
                <div
                    className="inline-block bg-white/10 border border-white px-1 py-2 rounded-sm z-10"
                    style={{
                        animation: 'pulseGlow 5s ease-in-out infinite',
                        boxShadow: '0 0 5px rgba(255, 255, 255, 0.5)',
                    }}
                >
                    <a
                        href="#tickets"
                        className="bg-[#8a828c] text-white px-3 py-2 rounded-sm font-semibold hover:bg-[#b01234] transition"
                    >
                        BUY TICKETS
                    </a>
                </div>
            </div>



            {/* Spacer */}
            <div className="h-20 md:h-16" />
        </>
    );
}
