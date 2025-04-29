"use client"; // needed if you later animate or handle interactivity

export default function Home() {
    return (
        <>
            <header className="sticky top-0 z-50 bg-black text-white shadow-md px-6 py-4 flex items-center justify-between">
                <div className="text-xl font-bold">6 Guitars</div>

                <div className="absolute left-1/2 transform -translate-x-1/2">
                    <button className="bg-yellow-400 text-black font-semibold px-4 py-2 rounded-full hover:bg-yellow-300 transition">
                        BUY TICKETS
                    </button>
                </div>

                <nav className="space-x-4 hidden md:flex">
                    <a href="#about" className="hover:text-yellow-400">About</a>
                    <a href="#contact" className="hover:text-yellow-400">Contact</a>
                    <a href="#reviews" className="hover:text-yellow-400">Reviews</a>
                </nav>
            </header>

            <main className="flex min-h-screen flex-col items-center justify-center bg-black text-white px-4">
                <div className="text-center max-w-2xl">
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
                        6 Guitars
                    </h1>
                    <p className="text-xl md:text-2xl mb-8">
                        One performer. Six characters. A celebration of music, storytelling, and laughter.
                    </p>
                    <a
                        href="#"
                        className="inline-block bg-yellow-400 text-black font-semibold px-6 py-3 rounded-full hover:bg-yellow-300 transition"
                    >
                        Buy Tickets
                    </a>
                </div>
            </main>
            <section id="about" className="bg-gray-900 text-white px-6 py-16">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-4xl font-bold mb-6">About the Show</h2>
                    <p className="text-lg mb-4">
                        A two-act one-man show featuring <span className="font-semibold">Music, Comedy, and so Much More</span>.
                    </p>
                    <p className="text-lg mb-6">
                        Chase Padgett embodies 6 different guitar-playing characters, each representing their own genre of music: <br />
                        <span className="italic">Blues, Jazz, Rock, Classical, Folk, & Country</span>.
                    </p>

                    <div className="aspect-w-16 aspect-h-9 max-w-3xl mx-auto">
                        <iframe
                            src="https://www.youtube.com/embed/7f7KWksfxAc"
                            title="6 Guitars Trailer"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="w-full h-64 md:h-96 rounded-xl"
                        ></iframe>
                    </div>
                </div>
            </section>

            <section id="reviews" className="bg-black text-white px-6 py-16">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl font-bold mb-8">What People Are Saying</h2>

                    <div className="grid gap-6 md:grid-cols-2 text-left">
                        <blockquote className="bg-gray-800 p-6 rounded-lg border-l-4 border-yellow-400">
                            <p className="italic">"Nothing short of a storytelling masterpiece"</p>
                            <footer className="mt-2 text-sm text-yellow-300">– Edmonton Sun</footer>
                        </blockquote>

                        <blockquote className="bg-gray-800 p-6 rounded-lg border-l-4 border-yellow-400">
                            <p className="italic">"So virtuosic it had me on my feet"</p>
                            <footer className="mt-2 text-sm text-yellow-300">– Georgia Straight</footer>
                        </blockquote>

                        <blockquote className="bg-gray-800 p-6 rounded-lg border-l-4 border-yellow-400">
                            <p className="italic">"A captivating entertainer"</p>
                            <footer className="mt-2 text-sm text-yellow-300">– VUE Weekly</footer>
                        </blockquote>

                        <blockquote className="bg-gray-800 p-6 rounded-lg border-l-4 border-yellow-400">
                            <p className="italic">"6 Guitars is note perfect"</p>
                            <footer className="mt-2 text-sm text-yellow-300">– Ottawa Citizen</footer>
                        </blockquote>

                        <blockquote className="bg-gray-800 p-6 rounded-lg border-l-4 border-yellow-400">
                            <p className="italic">"Superb, funny, & flat out stunning"</p>
                            <footer className="mt-2 text-sm text-yellow-300">– Winnipeg Free Press</footer>
                        </blockquote>

                        <blockquote className="bg-gray-800 p-6 rounded-lg border-l-4 border-yellow-400">
                            <p className="italic">"A stunning performance"</p>
                            <footer className="mt-2 text-sm text-yellow-300">– Austin Post</footer>
                        </blockquote>
                    </div>

                    <div className="aspect-w-16 aspect-h-9 mt-12 max-w-3xl mx-auto">
                        <iframe
                            src="https://www.youtube.com/embed/TQh8Uz4_VBc"
                            title="6 Guitars Review Video"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="w-full h-64 md:h-96 rounded-xl"
                        ></iframe>
                    </div>
                </div>
            </section>

            <section id="tickets" className="bg-black text-white px-6 py-16">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-4">Upcoming Shows</h2>
                    <p className="text-center text-yellow-400 mb-8">
                        ⭐ = Performances with Full Band
                    </p>

                    <div className="space-y-6">
                        {[
                            { date: "MAY 6th", venue: "CAA Theatre", location: "Toronto ON", link: "#", fullBand: true },
                            { date: "MAY 7", venue: "CAA Theatre", location: "Toronto ON", link: "#", fullBand: true },
                            { date: "MAY 10 - 2PM", venue: "CAA Theatre", location: "Toronto ON", link: "#", fullBand: true },
                            { date: "MAY 10 - 8PM", venue: "CAA Theatre", location: "Toronto ON", link: "#", fullBand: true },
                        ].map((show, index) => (
                            <div key={index} className="flex flex-col md:flex-row md:items-center justify-between border-t border-white py-4">
                                <div className="text-lg font-bold md:w-1/4 mb-2 md:mb-0">{show.date}</div>
                                <div className="text-center md:text-left md:w-1/2">
                                    <div className="uppercase font-semibold">{show.venue}</div>
                                    <div>{show.location}</div>
                                </div>
                                <div className="flex items-center gap-4 md:w-1/4 justify-end">
                                    <a
                                        href={show.link}
                                        className="border border-white px-4 py-2 rounded-full hover:bg-white hover:text-black transition text-sm font-semibold"
                                    >
                                        GET TICKETS →
                                    </a>
                                    {show.fullBand && <span className="text-yellow-400 text-xl">⭐</span>}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>




        </>
    );
}
