import { Geist, Geist_Mono } from "next/font/google";
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
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
        <body
            className={`${geistSans.variable} ${geistMono.variable} ${rockFont.variable} ${classicalFont.variable} ${jazzFont.variable} ${bluesFont.variable} ${folkFont.variable} ${countryFont.variable} ${text_font.variable}   antialiased`}
        >
        {children}
        </body>
        </html>
    );
}
