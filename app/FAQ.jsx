import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/solid';

const faqs = [
    {
        question: "What is 6 Guitars?",
        answer: "A pitch-perfect blend of music and storytelling featuring six characters, all played by one actor.",
    },
    {
        question: "Is the show family-friendly?",
        answer: "Absolutely — it's clean, funny, and accessible to all ages.",
    },
    {
        question: "Are there really 6 different guitars in the show?",
        answer: "No, the show is played by a single actor, using one guitar, embodying 6 different characters throughout the show.",
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
    },
    {
        question: "How long is the show typically?",
        answer: "6 Guitars usually lasts two hours, with a 15-minute intermission.",
    },
    {
        question: "How can I purchase VIP seating?",
        answer: "Specialized seating is available through the ticketing vendor's website.",
    },
];

export default function FAQ() {
    return (
        <section id="faqs">
            {/* HEADER with background image */}
            <div
                className="relative w-full h-[130px] bg-center bg-no-repeat bg-contain"
                style={{
                    backgroundImage: "url('/images/guitar_only.jpg')",
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center center',
                    backgroundSize: 'cover', // or 'contain' if you want the whole image
                }}
            >
                {/* Dark overlay for readability (optional) */}
                <div className="absolute inset-0 bg-black/30 z-0" />

                {/* Title content over image */}
                <div className="absolute inset-0 flex items-center justify-center z-10">
                    <h2 className="text-3xl sm:text-5xl font-bold text-white text-center">
                        FAQ's
                    </h2>
                </div>
            </div>




            {/* FAQ list on solid black */}
            <div className="bg-black py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl mx-auto">
                    {faqs.map((faq, idx) => (
                        <div key={idx} className="mb-6">
                            <Disclosure>
                                {({ open }) => (
                                    <>
                                        <Disclosure.Button className="flex justify-between w-full px-4 py-3 text-left text-xl font-medium text-white bg-black/80 rounded-lg hover:bg-black/60 focus:outline-none">
                                            <span>{faq.question}</span>
                                            <ChevronUpIcon
                                                className={`w-5 h-5 transition-transform duration-300 ${
                                                    open ? 'rotate-180' : ''
                                                }`}
                                            />
                                        </Disclosure.Button>
                                        <Disclosure.Panel className="px-4 pt-2 pb-4 text-md text-left text-black bg-white">
                                            {faq.answer}
                                        </Disclosure.Panel>
                                    </>
                                )}
                            </Disclosure>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
