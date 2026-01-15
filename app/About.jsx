'use client';
import { useState } from "react";
import Image from 'next/image';

const About = () => {
    const [showTrailer, setShowTrailer] = useState(false);

    return (
        <section id="about" className="relative text-white overflow-hidden min-h-[700px]">
            {/* ✅ Background Image - Mobile */}
            <div className="absolute inset-0 w-full h-full lg:hidden">
                <Image
                    src="/images/about/About Section BG - Mobile.png"
                    alt="Chase performing live"
                    fill
                    quality={100}
                    className="object-cover"
                />
            </div>

            {/* ✅ Background Image - Desktop */}
            <div className="absolute inset-0 w-full h-full hidden lg:block">
                <Image
                    src="/images/about/6G About Page BG.jpg"
                    alt="Chase performing live"
                    fill
                    quality={100}
                    className="object-cover"
                />
            </div>

            {/* ✅ Mobile Overlay for Text Readability */}
            <div className="absolute inset-0 bg-black/30 z-[5] lg:hidden" />

            {/* ✅ Main Content */}
            <div className="relative pt-20 z-10 w-full max-w-screen-xl mx-auto px-4 sm:px-10 min-h-[700px] grid grid-cols-1 lg:grid-cols-2 items-center">
                {/* Left Column - Content */}
                <div className="flex flex-col justify-center items-center lg:items-start text-center lg:text-left">
                    <h1 className="text-4xl sm:text-5xl font-bold mt-5 mb-6 tracking-wider text-center lg:text-left w-full">
                        <span className="[font-family:var(--font-text_font)] text-[#FFFFFF]" data-aos="fade-right">
                            1 MAN - 6 CHARACTERS
                        </span>
                    </h1>

                    <p className="[font-family:var(--font-text_font)] text-2xl mb-4 max-w-xl text-center lg:text-left" data-aos="fade-up">
                        6 Guitars is a joyful, laugh-out-loud, and unexpectedly moving theatrical concert. Created by virtuoso guitarist and storyteller Chase Padgett, the show moves seamlessly between 6 original characters that each represent their own style of music:
                    </p>

                    {/* Genre Slider Row 1 */}
                    <div className="w-full max-w-xl mb-0 bg-transparent py-6 px-4 lg:px-0 overflow-x-auto whitespace-nowrap scrollbar-hide">
                        <div className="inline-flex gap-8 justify-center min-w-full font-extrabold text-5xl sm:text-6xl lg:text-6xl leading-tight tracking-tight">
                            <span className="[font-family:var(--font-folk)] text-[#E09608]" data-aos="fade-right">Blues</span>
                            <span className="[font-family:var(--font-folk)] text-[#E09608]" data-aos="fade-down">Classical</span>
                            <span className="[font-family:var(--font-folk)] text-[#E09608]" data-aos="fade-left">Jazz</span>
                        </div>
                    </div>

                    {/* Genre Slider Row 2 */}
                    <div className="w-full max-w-xl mb-1 bg-transparent py-6 px-4 lg:px-0 overflow-x-auto whitespace-nowrap scrollbar-hide">
                        <div className="inline-flex gap-8 justify-center min-w-full font-extrabold text-5xl sm:text-6xl lg:text-6xl leading-tight tracking-tight">
                            <span className="[font-family:var(--font-folk)] text-[#E09608]" data-aos="fade-right">Rock</span>
                            <span className="[font-family:var(--font-folk)] text-[#E09608]" data-aos="fade-up">Folk</span>
                            <span className="[font-family:var(--font-folk)] text-[#E09608]" data-aos="fade-left">Country</span>
                        </div>
                    </div>

                    <p className="[font-family:var(--font-text_font)] text-2xl mb-6 max-w-xl text-center lg:text-left mt-8" data-aos="fade-up">
                        As the show unfolds we learn the true meaning of music and how it brings all humanity together in song. It's part concert, part theatre, part stand-up, and entirely unforgettable.
                    </p>

                    {/* ✅ Trailer Button */}
                    <div className="w-full max-w-xl flex justify-center">
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
                                    quality={80}
                                    className="rounded-lg shadow-lg mb-5"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column (empty) */}
                <div className="hidden lg:block" />
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
