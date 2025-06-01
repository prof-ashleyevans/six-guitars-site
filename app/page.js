'use client';

import 'keen-slider/keen-slider.min.css';
import 'aos/dist/aos.css';
import './globals.css';
import HeroSection from "@/app/HeroSection";
import About from "@/app/About";
import Reviews from "@/app/Reviews";
import HeaderNav from "@/app/HeaderNav";
import Tickets from "@/app/Tickets";
import Contact from "@/app/Contact";
import Footer from "@/app/Footer";

export default function Home() {

   return (
        <>
            <HeaderNav />

            <HeroSection />

            <About />

            <Reviews />

            <Tickets />

            <Contact />

            <Footer />
        </>
    );
}
