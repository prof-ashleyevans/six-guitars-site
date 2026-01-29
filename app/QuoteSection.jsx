'use client';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function QuoteSection() {
    useEffect(() => {
        AOS.init({ once: true, duration: 800 });
    }, []);

    return (
        <section className="bg-black text-white py-12 md:py-16 px-6">
            <div className="max-w-4xl mx-auto text-center">
                <blockquote 
                    className="mb-4 md:mb-6"
                    data-aos="fade-up"
                    style={{ 
                        fontFamily: 'var(--font-barlow-light)',
                        fontWeight: 300,
                        fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                        letterSpacing: '0.02em',
                        lineHeight: '1.1',
                        fontStyle: 'normal',
                        textTransform: 'uppercase'
                    }}
                >
                    "6 Guitars is amazing"
                </blockquote>
                <p 
                    className="text-3xl md:text-4xl lg:text-5xl"
                    data-aos="fade-up"
                    data-aos-delay="200"
                    style={{ 
                        fontFamily: 'var(--font-bebas)',
                        fontWeight: 400, // Bebas Neue only has one weight
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        textShadow: '0.5px 0.5px 0px rgba(255,255,255,0.3), -0.5px -0.5px 0px rgba(255,255,255,0.3)' // Simulate bold appearance
                    }}
                >
                    Orlando Sentinel
                </p>
            </div>
        </section>
    );
}
