'use client';
import { useState } from "react";

const About = () => {
    const [showTrailer, setShowTrailer] = useState(false);

    return (
        <section id="about" className="relative text-white overflow-hidden min-h-[700px]">
            {/* ✅ Background Image with Opacity */}
            {/* ✅ Background Image with Opacity */}
            <img
                src="/images/about/Chase_Live_Show_Stage.jpg"
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
            <div className="relative z-10 w-full max-w-screen-xl mx-auto px-4 sm:px-10 min-h-[700px] flex flex-col justify-center items-center text-center">
                <h1 className="text-4xl sm:text-5xl font-bold mb-6">About the Show</h1>

                <p className="text-xl mb-4 max-w-md mx-auto">
                    <span className="font-semibold">Music, Comedy, and so Much More</span> — 6 Guitars is a two-act one-man show that delivers all three.
                </p>

                <p className="text-xl mb-6 max-w-md mx-auto">
                    Chase Padgett brings six guitar-playing characters to life — each with their own voice, personality, and musical style.
                </p>

                {/* ✅ Genre Slider (moved up + font enlarged) */}
                {/* Genre Slider Row 1 */}
                <div className="w-full mb-0 bg-transparent py-6 px-4 overflow-x-auto whitespace-nowrap scrollbar-hide">
                    <div className="inline-flex gap-8 justify-center min-w-full font-bold text-3xl sm:text-5xl leading-tight">
                        <span className="[font-family:var(--font-blues)] text-[#0562D7]" data-aos="fade-right">Blues</span>
                        <span className="[font-family:var(--font-classical)] text-[#BD5217]" data-aos="fade-down">Classical</span>
                        <span className="[font-family:var(--font-jazz)] text-[#BB6DEB]" data-aos="fade-left">Jazz</span>
                    </div>
                </div>

                {/* Genre Slider Row 2 */}
                <div className="w-full mb-10 bg-transparent py-6 px-4 overflow-x-auto whitespace-nowrap scrollbar-hide">
                    <div className="inline-flex gap-8 justify-center min-w-full font-bold text-3xl sm:text-5xl leading-tight">
                        <span className="[font-family:var(--font-rock)] text-[#D2153D]" data-aos="fade-right">Rock</span>
                        <span className="[font-family:var(--font-folk)] text-[#E09608]" data-aos="fade-up">Folk</span>
                        <span className="[font-family:var(--font-country)] text-[#10AD43]" data-aos="fade-left">Country</span>
                    </div>
                </div>



                {/* ✅ Button remains below */}
                <div
                    onClick={() => setShowTrailer(true)}
                    className="cursor-pointer mt-2 transition-transform hover:scale-105"
                >
                    <img
                        src="/images/about/6g_trailer_thumb.jpg"
                        alt="Watch the 6 Guitars Trailer"
                        className="rounded-lg shadow-lg mx-auto max-w-[220px]"
                    />
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
