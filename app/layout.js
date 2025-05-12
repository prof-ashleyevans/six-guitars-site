import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {
    Bebas_Neue,
    Playfair_Display,
    Sacramento,
    Raleway,
    Quicksand,
    Roboto_Slab,
} from "next/font/google";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const rockFont = Bebas_Neue({ weight: "400", subsets: ["latin"], variable: "--font-rock" });
const classicalFont = Playfair_Display({ weight: "600", subsets: ["latin"], variable: "--font-classical" });
const jazzFont = Sacramento({ weight: "400", subsets: ["latin"], variable: "--font-jazz" });
const bluesFont = Raleway({ weight: "500", subsets: ["latin"], variable: "--font-blues" });
const folkFont = Quicksand({ weight: "600", subsets: ["latin"], variable: "--font-folk" });
const countryFont = Roboto_Slab({ weight: "500", subsets: ["latin"], variable: "--font-country" });

export const metadata = {
    title: "6 Guitars",
    description: "Official site of Chase Padgett's award-winning show",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
        <body
            className={`${geistSans.variable} ${geistMono.variable} ${rockFont.variable} ${classicalFont.variable} ${jazzFont.variable} ${bluesFont.variable} ${folkFont.variable} ${countryFont.variable} antialiased`}
        >
        {children}
        </body>
        </html>
    );
}
