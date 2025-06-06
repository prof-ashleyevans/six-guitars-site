'use client';
import { useState } from "react";
import FAQ from "@/app/FAQ";

const About = () => {
    const [showFAQs, setShowFAQs] = useState(false);
    const [showTrailer, setShowTrailer] = useState(false);
    const [showReactions, setShowReactions] = useState(false);

    return (
        <section id="about" className="flex flex-col sm:flex-row text-white" style={{ backgroundColor: "#141414" }}>
            {/* Image + Mobile Title */}
            <div
                className="w-full sm:w-1/2 md:w-1/3 relative sm:ml-40"
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-easing="ease-in-out"
            >
                {/* Image */}
                <img
                    src="/images/about/chase.jpg"
                    alt="Chase Padgett"
                    className="w-full h-[550px] sm:h-auto object-cover object-top"
                />


                {/* Mobile Overlay Title */}
                <div className="absolute top-0 left-0 w-full sm:hidden z-20 bg-gray-900/10 py-4 px-4">
                    <h1 className="text-3xl font-bold text-white text-center px-4">
                        About the Show
                    </h1>
                </div>
            </div>

            {/* Text Content */}
            <div className="mt-6 sm:mt-25 w-full sm:w-1/2 md:w-2/3 px-4 sm:px-25 py-5 sm:py-5 flex flex-col">
                {/* Heading - on top of image for mobile, inline for desktop */}

                <div className="hidden sm:block relative sm:ml-10 max-w-5xl mx-auto text-left md:text-left">
                    <h1 className="text-5xl mt-20 mb-4">About the Show</h1>
                </div>
                <div className="relative sm:ml-10 max-w-3xl mx-auto text-left md:text-left">
                    <p className="text-xl mt-10 mb-4">
                        6 Guitars is a two-act one-man show featuring <span className="font-semibold">Music, Comedy, and so Much More</span>.
                    </p>
                    <p className="text-xl mb-6">
                        Chase Padgett brings 6 guitar-playing characters to life — each with their own voice, personality, and musical style.
                    </p>
                </div>

                {/* Genre Labels */}
                <div className="relative sm:ml-10 max-w-4xl mx-auto text-center sm:text-left">
                    <h2 className="text-4xl sm:text-5xl md:text-8xl font-bold mb-6 leading-tight">
                        <div className="flex flex-wrap justify-center sm:justify-start gap-10">
                            <span className="[font-family:var(--font-blues)] text-[#0562D7]" data-aos="fade-right">Blues</span>
                            <span className="[font-family:var(--font-classical)] text-[#BD5217]" data-aos="fade-down">Classical</span>
                            <span className="[font-family:var(--font-jazz)] text-[#BB6DEB]" data-aos="fade-left">Jazz</span>
                        </div>
                        <div className="flex flex-wrap justify-center sm:justify-start gap-10 mt-5">
                            <span className="[font-family:var(--font-rock)] text-[#D2153D]" data-aos="fade-right">Rock</span>
                            <span className="[font-family:var(--font-folk)] text-[#E09608]" data-aos="fade-up">Folk</span>
                            <span className="[font-family:var(--font-country)] text-[#10AD43]" data-aos="fade-left">Country</span>
                        </div>
                    </h2>

                    {/* Buttons */}
                    <div className="flex justify-center flex-wrap gap-4 mt-6">
                        <button
                            onClick={() => setShowTrailer(true)}
                            className="flex items-center gap-2 bg-yellow-400 text-black px-13 py-3 rounded-full font-semibold text-base hover:bg-yellow-200 transition"
                        >
                            ▶ Watch the Trailer
                        </button>

                        <button
                            onClick={() => setShowReactions(true)}
                            className="flex items-center gap-2 bg-yellow-400 text-black px-5 py-3 rounded-full font-semibold text-base hover:bg-yellow-200 transition"
                        >
                            👁️ See Audience Reactions
                        </button>

                        <button
                            onClick={() => setShowFAQs(!showFAQs)}
                            className="flex items-center gap-2 border border-yellow-400 bg-yellow-400 text-black px-15 py-3 rounded-full font-semibold text-base hover:bg-yellow-200 hover:text-black transition"
                        >
                            {showFAQs ? '🚪 Hide FAQs' : ' ❔ View FAQs'}
                        </button>
                    </div>

                    {/* Trailer Modal */}
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

                    {/* Reactions Modal */}
                    {showReactions && (
                        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50" onClick={() => setShowReactions(false)}>
                            <div className="relative w-[90%] max-w-3xl aspect-video" onClick={(e) => e.stopPropagation()}>
                                <button className="absolute top-2 right-2 text-white text-3xl font-bold z-10" onClick={() => setShowReactions(false)}>×</button>
                                <iframe
                                    src="https://www.youtube.com/embed/TQh8Uz4_VBc?autoplay=1"
                                    title="Audience Reactions"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="w-full h-full rounded-lg"
                                />
                            </div>
                        </div>
                    )}


                </div>
            </div>
        </section>
    );
};

export default About;
