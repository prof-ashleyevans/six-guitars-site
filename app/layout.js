import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import {
    Freckle_Face,
    //Bebas_Neue,
    //Playfair_Display,
    //Sacramento,
    Pinyon_Script,
    Italianno,
    //Raleway,
    Limelight,
    //Quicksand,
    Rancho,
    Fredericka_the_Great,
    Roboto_Condensed,
    Michroma,
    Oswald,

} from "next/font/google";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const rockFont = Freckle_Face({ weight: "400", subsets: ["latin"], variable: "--font-rock" });
const classicalFont = Pinyon_Script({ weight: "400", subsets: ["latin"], variable: "--font-classical" });
const jazzFont = Italianno({ weight: "400", subsets: ["latin"], variable: "--font-jazz" });
const bluesFont = Limelight({ weight: "400", subsets: ["latin"], variable: "--font-blues" });
const folkFont = Rancho({ weight: "400", subsets: ["latin"], variable: "--font-folk" });
const countryFont = Fredericka_the_Great({ weight: "400", subsets: ["latin"], variable: "--font-country" });
const text_font = Oswald({subsets: ['latin'], weight: '400',variable: '--font-text_font'});

export const metadata = {
    title: "6 Guitars",
    description: "Official site of Chase Padgett's award-winning show",
    icons: {
        icon: '/images/header_nav/favicon.ico',
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
        <head>
            {/* Google Tag Manager */}
            <script dangerouslySetInnerHTML={{
                __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-P6N74BM3');`
            }} />
            {/* End Google Tag Manager */}
        </head>
        <body
            className={`${geistSans.variable} ${geistMono.variable} ${rockFont.variable} ${classicalFont.variable} ${jazzFont.variable} ${bluesFont.variable} ${folkFont.variable} ${countryFont.variable} ${text_font.variable}   antialiased`}
        >
        {/* Google Tag Manager (noscript) */}
        <noscript>
            <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-P6N74BM3"
                    height="0" width="0" style={{display: 'none', visibility: 'hidden'}}></iframe>
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        {children}
        <Analytics />
        </body>
        </html>
    );
}

