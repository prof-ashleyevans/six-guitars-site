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
        <section
            id="faqs"
            className="relative bg-cover bg-center bg-no-repeat text-white py-16 px-4 sm:px-6 lg:px-8"
            style={{
                backgroundImage: "url('/images/about/chase_live_show_stage.jpg')",
                WebkitMaskImage:
                    'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
                maskImage:
                    'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
                maskRepeat: 'no-repeat',
                WebkitMaskRepeat: 'no-repeat',
            }}
        >
            <div className="max-w-3xl mx-auto text-center mb-10">
                <h2 className="text-4xl sm:text-5xl font-bold text-white">FAQ's</h2>
            </div>

            {/* Card container with transparent background */}
            <div className="max-w-3xl mx-auto bg-black/60 rounded-xl p-8 backdrop-blur-sm shadow-lg">
                {faqs.map((faq, idx) => (
                    <div key={idx} className="mb-4">
                        <Disclosure>
                            {({ open }) => (
                                <>
                                    <Disclosure.Button className="flex justify-between w-full px-4 py-3 text-left text-lg font-medium text-white bg-black/70 rounded-lg hover:bg-black/50 focus:outline-none">
                                        <span>{faq.question}</span>
                                        <ChevronUpIcon
                                            className={`w-5 h-5 transition-transform duration-300 ${
                                                open ? 'rotate-180' : ''
                                            }`}
                                        />
                                    </Disclosure.Button>
                                    <Disclosure.Panel className="px-4 pt-3 pb-4 text-md text-white bg-white/10 rounded-b-lg mt-1">
                                        {faq.answer}
                                    </Disclosure.Panel>
                                </>
                            )}
                        </Disclosure>
                    </div>
                ))}
            </div>
        </section>
    );
}
