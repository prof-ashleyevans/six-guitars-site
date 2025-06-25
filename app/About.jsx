'use client';
import { useState } from "react";

const About = () => {
    const [showTrailer, setShowTrailer] = useState(false);

    return (
        <section id="about" className="relative text-white overflow-hidden min-h-[700px]">
            {/* ✅ Background Image with Opacity */}
            <img
                src="/images/about/bg_image2.jpg"
                alt="Chase performing live"
                className="absolute inset-0 w-full h-full object-cover opacity-40"
            />

            {/* ✅ Top Fade Overlay */}
            <div className="absolute inset-0 z-10 pointer-events-none" style={{
                background: 'linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, transparent 40%)'
            }} />

            <div
                className="absolute bottom-0 left-0 w-full h-1/3 rounded-b-lg pointer-events-none"
                style={{
                    background: 'linear-gradient(to bottom, rgba(26,26,26,0) 0%, #000000 100%)'
                }}
            />

            {/* ✅ Main Content */}
            <div className="relative pt-20 z-10 w-full max-w-screen-xl mx-auto px-4 sm:px-10 min-h-[700px] grid grid-cols-1 lg:grid-cols-2 items-center">
                {/* Left Column (empty) */}
                <div className="hidden lg:block" />

                {/* Right Column */}
                <div className="flex flex-col justify-center items-center text-center">
                    <h1 className="text-4xl sm:text-5xl font-bold mt-5 mb-6 tracking-wider">
                        <span className="[font-family:var(--font-text_font)] text-[#FFFFFF]" data-aos="fade-right">
                            1 MAN - 6 CHARACTERS
                        </span>
                    </h1>

                    <p className="[font-family:var(--font-text_font)] text-2xl mb-4 max-w-xl text-justify text-right" data-aos="fade-up">
                        Actor, Singer, & Guitarist Chase Padgett delivers a stunning performance as he becomes six original guitar-playing characters —
                        each with their own voice, personality, and genre of music:
                    </p>

                    {/* Genre Slider Row 1 */}
                    <div className="w-full mb-0 bg-transparent py-6 px-4 overflow-x-auto whitespace-nowrap scrollbar-hide">
                        <div className="inline-flex gap-8 justify-center min-w-full font-extrabold text-3xl sm:text-6xl lg:text-6xl leading-tight tracking-tight">
                            <span className="[font-family:var(--font-blues)] text-[#0562D7]" data-aos="fade-right">Blues</span>
                            <span className="[font-family:var(--font-classical)] text-[#BD5217]" data-aos="fade-down">Classical</span>
                            <span className="[font-family:var(--font-jazz)] text-[#BB6DEB]" data-aos="fade-left">Jazz</span>
                        </div>
                    </div>

                    {/* Genre Slider Row 2 */}
                    <div className="w-full mb-1 bg-transparent py-6 px-4 overflow-x-auto whitespace-nowrap scrollbar-hide">
                        <div className="inline-flex gap-8 justify-center min-w-full font-extrabold text-4xl sm:text-6xl lg:text-6xl leading-tight tracking-tight">
                            <span className="[font-family:var(--font-rock)] text-[#D2153D]" data-aos="fade-right">Rock</span>
                            <span className="[font-family:var(--font-folk)] text-[#E09608]" data-aos="fade-up">Folk</span>
                            <span className="[font-family:var(--font-country)] text-[#10AD43]" data-aos="fade-left">Country</span>
                        </div>
                    </div>

                    {/* ✅ Trailer Button */}
                    <div
                        onClick={() => setShowTrailer(true)}
                        className="cursor-pointer mt-2 transition-transform hover:scale-105"
                    >
                        <img
                            src="/images/about/6g_trailer_thumb.jpg"
                            alt="Watch the 6 Guitars Trailer"
                            className="rounded-lg shadow-lg mb-5 mx-auto max-w-[320px]"
                        />
                    </div>
                </div>
            </div>

            {/* ✅ Trailer Modal */}
            {showTrailer && (
                <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50" onClick={() => setShowTrailer(false)}>
                    <div className="relative w-[90%] max-w-3xl aspect-video" onClick={(e) => e.stopPropagation()}>
                        <button className="absolute top-2 right-2 text-white text-3xl font-bold z-10" onClick={() => setShowTrailer(false)}>×</button>
                        <iframe
                            src="https://www.youtube.com/embed/7f7KWksfxAc?autoplay=1"
                            title="6 Guitars Trailer"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
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
