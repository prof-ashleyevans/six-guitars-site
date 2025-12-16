'use client';
import { useState } from 'react';
import { Disclosure } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

const faqs = [
    {
        question: "What is 6 Guitars?",
        answer: "A pitch-perfect blend of music and storytelling featuring six characters, all played by one actor.",
        color: 'bg-blue-950/60',

    },
    {
        question: "Is the show family-friendly?",
        answer: "Absolutely — it's clean, funny, and accessible to all ages.",
        color: 'bg-yellow-900/50',

    },
    {
        question: "Are there really 6 different guitars in the show?",
        answer: "No, the show is played by a single actor, using one guitar, embodying 6 different characters throughout the show.",
        color: 'bg-emerald-900/50',

    },

    {
        question: "Where can I learn more about Chase Padgett?",
        answer: (
            <>
                You can learn more about Chase and his repertoire of music, acting, and comedy&nbsp;
                <a
                    href="https://www.chasepadgett.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-400 underline hover:text-purple-300"
                >
                    here
                </a>.
            </>
        ),
        color: 'bg-red-900/50',

    },
    {
        question: "How long is the show typically?",
        answer: "6 Guitars usually lasts two hours, with a 15-minute intermission.",
        color: 'bg-indigo-900/50',

    },
    {
        question: "How can I purchase VIP seating?",
        answer: "Specialized seating is available through the ticketing vendor's website.",
        color: 'bg-purple-900/50',

    },
];

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState(null);

    return (
        <section
            id="faq"
            className="relative bg-black text-white py-16 px-4 sm:px-6 lg:px-20"
        >
            {/* FAQ Header Banner */}
            {/* FAQ Header Banner - Full Width */}
            <div className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] h-48 sm:h-64 md:h-80 mb-12">
                {/* Image Row */}
                {/* Image Row */}
                <div className="flex w-full h-full">
                    {[
                        'blues',
                        'classical',
                        'country',
                        'folk',
                        'jazz',
                        'rock',
                    ].map((name, idx) => (
                        <div key={idx} className="relative w-full h-full flex-1 overflow-hidden">
                            <img
                                src={`/images/characters/${name}.jpg`}
                                alt={name}
                                className="w-full h-full object-cover"
                            />
                            {/* Left + Right Fade Overlay */}
                            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_right,rgba(0,0,0,0.4),transparent_25%,transparent_75%,rgba(0,0,0,0.4))]" />
                        </div>
                    ))}
                </div>


                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40 z-10 pointer-events-none" />


            </div>


            {/* Marquee Header */}
            <div className="text-center mb-12">
                <h2 className="text-4xl sm:text-5xl font-bold text-yellow-400 tracking-widest drop-shadow-md">
                    FAQ
                </h2>
                <div className="mt-2 h-1 w-20 mx-auto bg-yellow-500 rounded-full"></div>
            </div>

            <div className="max-w-3xl mx-auto space-y-0">
                {faqs.map((faq, index) => (
                    <Disclosure key={index} as="div">
                        {({ open }) => (
                            <div>
                                <Disclosure.Button
                                    onClick={() => setOpenIndex(open ? index : null)}
                                    className="w-full flex justify-between items-center bg-[#1a1a1a] px-5 py-4 rounded-lg text-left transition-all duration-300 hover:bg-[#2a2a2a] focus:outline-none"
                                >
                  <span className="text-lg sm:text-xl font-semibold text-white">
                    {faq.question}
                  </span>
                                    <ChevronDownIcon
                                        className={`h-6 w-6 transform transition-transform duration-300 text-yellow-400 ${
                                            open ? 'rotate-180' : ''
                                        }`}
                                    />
                                </Disclosure.Button>

                                <Disclosure.Panel
                                    static
                                    className={`relative rounded-lg mt-2 px-5 py-6 transition-all duration-500 overflow-hidden text-white ${faq.color}
    ${
                                        open
                                            ? 'opacity-100 translate-y-0'
                                            : 'opacity-0 -translate-y-3 pointer-events-none h-0'
                                    }
  `}
                                >
                                    {/* Optional: subtle spotlight effect */}
                                    <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,150,0.15)_0%,transparent_85%)] pointer-events-none" />

                                    {/* Answer Text */}
                                    <div className="relative z-10 text-base sm:text-lg leading-relaxed">
                                        {faq.answer}
                                    </div>
                                </Disclosure.Panel>

                            </div>
                        )}
                    </Disclosure>
                ))}
            </div>
        </section>
    );
}
