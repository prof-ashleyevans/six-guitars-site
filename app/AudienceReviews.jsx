import Image from "next/image";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

const audienceReviews = Array.from({ length: 12 }, (_, i) => `/images/audience_reviews/review${i + 1}.png`);

export default function AudienceReviews() {
    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
        });

        // Trigger refresh on scroll stop
        let timeout;
        const handleScroll = () => {
            clearTimeout(timeout);
            timeout = setTimeout(() => AOS.refresh(), 100);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);


    return (
        <section id="audience-reviews" className="relative bg-black text-white overflow-hidden">
            {/* Background image wrapper with parallax only on desktop */}
            <div
                className="relative w-full bg-no-repeat bg-center bg-cover sm:bg-fixed audience-bg-mask"
                style={{
                    backgroundImage: "url('/images/audience_photo.jpg')",
                    backgroundPosition: 'top center',
                    backgroundAttachment: 'scroll', // overridden by sm:bg-fixed on desktop
                }}
            >
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/60 z-0" />

                {/* Title + reviews content */}
                <div className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl sm:text-5xl font-bold text-white mb-12">Audience Reviews</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {audienceReviews.map((src, index) => (
                            <div key={index} data-aos="fade-up" data-aos-delay={index * 50}>
                                <Image
                                    src={src}
                                    alt={`Review ${index + 1}`}
                                    width={440}
                                    height={330}
                                    className="rounded-lg shadow-lg w-full h-auto"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Optional fade mask */}
            <style jsx>{`
                .audience-bg-mask {
                    mask-image: linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%);
                    -webkit-mask-image: linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%);
                }

                @media (max-width: 768px) {
                    .audience-bg-mask {
                        mask-image: linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%);
                        -webkit-mask-image: linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%);
                    }
                }
            `}</style>
        </section>


    );
}
