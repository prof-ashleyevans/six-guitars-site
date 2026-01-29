'use client';
import { useState } from "react";
import Image from 'next/image';

const About = () => {
    const [showTrailer, setShowTrailer] = useState(false);

    return (
        <section id="about" className="relative text-white overflow-hidden min-h-[1025px] lg:min-h-[700px]">
            {/* ✅ Black Space at Top - Mobile Only */}
            <div className="absolute top-0 left-0 w-full h-[225px] bg-black z-[1] lg:hidden" />
            
            {/* ✅ Background Image - Mobile */}
            <div className="absolute w-full h-[800px] lg:hidden" style={{ top: '225px' }}>
                <Image
                    src="/images/about/6G About Page Mobile V2. BGjpg.jpg"
                    alt="Chase performing live"
                    fill
                    sizes="100vw"
                    className="object-cover object-bottom"
                    unoptimized
                />
            </div>

            {/* ✅ Background Image - Desktop */}
            <div className="absolute inset-0 w-full h-full hidden lg:block">
                <Image
                    src="/images/about/6G About Page V2 BG.jpg"
                    alt="Chase performing live"
                    fill
                    sizes="100vw"
                    className="object-cover object-bottom"
                    unoptimized
                />
            </div>

            {/* ✅ Mobile Overlay for Text Readability (only on image area) */}
            <div className="absolute w-full h-[800px] bg-black/30 z-[5] lg:hidden" style={{ top: '225px' }} />

            {/* ✅ Main Content */}
            <div className="relative pt-4 lg:pt-20 z-10 w-full max-w-screen-xl mx-auto px-4 sm:px-10 min-h-[700px] grid grid-cols-1 lg:grid-cols-2 items-center">
                {/* Left Column - Content */}
                <div className="flex flex-col justify-center items-center lg:items-start text-center lg:text-left">
                    <h1 className="text-4xl sm:text-5xl font-bold mt-5 mb-6 text-center w-full whitespace-nowrap">
                        <span className="[font-family:var(--font-bebas)] text-[#FFFFFF] block" data-aos="fade-right">
                            <span className="sm:hidden" style={{ letterSpacing: '0.05em' }}>1 MAN - 6 CHARACTERS</span>
                            <span className="hidden sm:inline" style={{ letterSpacing: '0.25em' }}>1 MAN - 6 CHARACTERS</span>
                        </span>
                    </h1>

                    <p className="[font-family:var(--font-montserrat)] text-lg lg:text-[23px] leading-relaxed mb-4 w-full lg:max-w-3xl text-justify" data-aos="fade-up">
                        6 Guitars is a joyful, laugh-out-loud, and unexpectedly moving theatrical concert. Created by virtuoso guitarist and storyteller Chase Padgett, the show moves seamlessly between 6 original characters that each represent their own style of music:
                    </p>

                    {/* Genre Slider Row 1 */}
                    <div className="w-full lg:max-w-3xl mb-0 bg-transparent py-2 px-4 lg:px-0 overflow-x-auto whitespace-nowrap scrollbar-hide">
                        <div className="inline-flex gap-8 justify-center min-w-full font-extrabold text-4xl sm:text-5xl lg:text-5xl leading-tight tracking-wide">
                            <span className="[font-family:var(--font-bebas)] text-white" data-aos="fade-right">Blues</span>
                            <span className="[font-family:var(--font-bebas)] text-white" data-aos="fade-down">Classical</span>
                            <span className="[font-family:var(--font-bebas)] text-white" data-aos="fade-left">Jazz</span>
                        </div>
                    </div>

                    {/* Genre Slider Row 2 */}
                    <div className="w-full lg:max-w-3xl mb-0 bg-transparent py-2 px-4 lg:px-0 overflow-x-auto whitespace-nowrap scrollbar-hide">
                        <div className="inline-flex gap-8 justify-center min-w-full font-extrabold text-4xl sm:text-5xl lg:text-5xl leading-tight tracking-wide">
                            <span className="[font-family:var(--font-bebas)] text-white" data-aos="fade-right">Rock</span>
                            <span className="[font-family:var(--font-bebas)] text-white" data-aos="fade-up">Folk</span>
                            <span className="[font-family:var(--font-bebas)] text-white" data-aos="fade-left">Country</span>
                        </div>
                    </div>

                    <p className="[font-family:var(--font-montserrat)] text-lg lg:text-[23px] leading-relaxed mb-6 w-full lg:max-w-3xl text-justify mt-8" data-aos="fade-up">
                        As the show unfolds we learn the true meaning of music and how it brings all humanity together in song. It's part concert, part theatre, part stand-up, and entirely unforgettable.
                    </p>

                    {/* ✅ Trailer Button - Mobile Only */}
                    <div className="w-full lg:max-w-3xl flex justify-center lg:hidden">
                        <div
                            onClick={() => setShowTrailer(true)}
                            className="cursor-pointer mt-2 transition-transform hover:scale-105"
                        >
                            <div className="relative w-full max-w-[320px] aspect-video">
                                <Image
                                    src="/images/about/6g_trailer_thumb.jpg"
                                    alt="Watch the 6 Guitars Trailer"
                                    width={320}
                                    height={180}
                                    sizes="(max-width: 768px) 320px, 400px"
                                    className="rounded-lg shadow-lg mb-5"
                                    unoptimized
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column - Trailer on Desktop */}
                <div className="hidden lg:flex lg:justify-end lg:items-start lg:-mt-80">
                    <div
                        onClick={() => setShowTrailer(true)}
                        className="cursor-pointer transition-transform hover:scale-105"
                    >
                        <div className="relative w-full max-w-[480px] aspect-video">
                            <Image
                                src="/images/about/6g_trailer_thumb.jpg"
                                alt="Watch the 6 Guitars Trailer"
                                width={480}
                                height={270}
                                sizes="480px"
                                className="rounded-lg shadow-lg"
                                unoptimized
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* ✅ Trailer Modal */}
            {showTrailer && (
                <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50" onClick={() => setShowTrailer(false)}>
                    <div className="relative w-[90%] max-w-3xl aspect-video" onClick={(e) => e.stopPropagation()}>
                        <button className="absolute top-2 right-2 text-white text-3xl font-bold z-10" onClick={() => setShowTrailer(false)}>×</button>
                        <iframe
                            src="https://player.vimeo.com/video/1047706165?autoplay=1"
                            title="6 Guitars Trailer"
                            allow="autoplay; fullscreen; picture-in-picture"
                            allowFullScreen
                            className="w-full h-full rounded-lg"
                        />
                    </div>
                </div>
            )}
        </section>
    );
};

export default About;
