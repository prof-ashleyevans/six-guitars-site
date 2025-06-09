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
        <section id="audience-reviews" className="relative py-16 px-4 bg-black text-white overflow-hidden">
            {/* Responsive background gradient mask */}
            <div
                className="relative bg-no-repeat bg-center sm:bg-fixed audience-bg-mask w-full"
                style={{
                    backgroundImage: "url('/images/audience_photo.jpg')",
                    backgroundSize: '101% auto', // or '100% auto' if you prefer
                    backgroundPosition: 'top center',
                }}
            >

            {/* Dark overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/60 z-0" />

                {/* Content */}
                <div className="relative z-10 bg-black/30 py-24 px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center text-white mb-12">Audience Reviews</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {audienceReviews.map((src, index) => (
                            <div key={index} data-aos="fade-up" data-aos-delay={index * 50}>
                                <Image
                                    src={src}
                                    alt={`Review ${index + 1}`}
                                    width={440} // slightly larger
                                    height={330}
                                    className="rounded-lg shadow-lg w-full h-auto"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Styles for background gradient mask */}
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
