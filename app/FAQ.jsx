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
];

export default function FAQ() {
    return (
        <div className="w-full max-w-2xl mx-auto mt-12">
            {faqs.map((faq, idx) => (
                <Disclosure key={idx}>
                    {({ open }) => (
                        <>
                            <Disclosure.Button className="flex justify-between w-full px-4 py-3 text-left text-xl font-medium text-white bg-black/80 rounded-lg hover:bg-black/60 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                                <span>{faq.question}</span>
                                <ChevronUpIcon
                                    className={`w-5 h-5 transition-transform duration-300 ${
                                        open ? 'rotate-180' : ''
                                    }`}
                                />
                            </Disclosure.Button>
                            <Disclosure.Panel className="px-4 pt-2 pb-4 text-med text-gray-300">
                                {faq.answer}
                            </Disclosure.Panel>
                        </>
                    )}
                </Disclosure>
            ))}
        </div>
    );
}
