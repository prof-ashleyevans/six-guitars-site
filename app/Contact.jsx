'use client';
import React from 'react';

export default function Contact() {
    return (
        <section id="contact" className="bg-black text-white px-6 py-16">
            <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-4xl font-bold mb-8">Stay In The Loop</h2>
                <p className="text-lg mb-6 text-yellow-400">
                    Sign up for email updates on tour dates, news, and more.
                </p>

                <div className="w-full flex justify-center px-4 py-8">
                    <div
                        className="origin-top scale-[0.95] sm:scale-100 md:scale-[1.15]"
                        style={{
                            width: '100%',
                            maxWidth: '520px',
                        }}
                    >
                        <iframe
                            src="https://f235afe6.sibforms.com/serve/MUIFAH3opnOlO_tL0vrN6_308qhceyLUxWLUV9IdGdme7Z6S7vJHUQpKW31bsTBkanDNUZJgpcaRzCYkFISgp0dcX2QFIu3jrZjHcEktV8fhpV1vPcTqisBfj4DKWVEcHIWSW3JyfMFnA1gCmIKFVEPeA31BuWQKS6ciwxmFhF6MYqXSfHgTOGONOD2QtIpAZwNp_SydrmGD5gtR"
                            width="100%"
                            height="1000"
                            frameBorder="0"
                            scrolling="auto"
                            allowFullScreen
                            style={{
                                display: 'block',
                                margin: '0 auto',
                                maxWidth: '100%',
                                border: 'none',
                            }}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
