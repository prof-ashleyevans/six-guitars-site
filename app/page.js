'use client';

import 'keen-slider/keen-slider.min.css';
import 'aos/dist/aos.css';
import './globals.css';
import HeroSection from "@/app/HeroSection";
import QuoteSection from "@/app/QuoteSection";
import About from "@/app/About";
import Reviews from "@/app/Reviews";
import HeaderNav from "@/app/HeaderNav";
import Tickets from "@/app/Tickets";
import PhotoGallery from "@/app/PhotoGallery";
import Contact from "@/app/Contact";
import Footer from "@/app/Footer";
import CharacterGridSection from "@/app/CharacterGridSection";
import FAQ from "@/app/FAQ";
import AudienceReviews from "@/app/AudienceReviews";
import IconRow from "@/app/IconRow";
import HeroCTA from "@/app/HeroCTA";
// import Experimental from "@/app/Experimental"; // Hidden for now

export default function Home() {

   return (
        <>
            <HeaderNav />

            <HeroSection />
            <div className="sm:hidden bg-black pb-0" style={{ marginTop: '-140px' }}>
                <IconRow />
            </div>
            <HeroCTA />

            <Reviews />

            {/* <QuoteSection /> */}

            <About />

            <Tickets />

            <PhotoGallery />

            <AudienceReviews />

            <FAQ />

            {/* <Experimental /> */}

            <Contact />

            <Footer />
        </>
    );
}
