import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import FeaturedCarousel from "../components/FeaturedCarousel";
import AboutSection from "../components/AboutSection";
import PortfolioSection from "../components/PortfolioSection";
import ShowcaseSection from "../components/ShowcaseSection";
import ContactFooter from "../components/ContactFooter";
import useDriveFolderData from "../utils/useDriveFolderData";

export default function Home() {
    const {
        gallery, featured, showcase,
        loading,
        galleryNext, galleryPrev,
        hasGalleryNext, hasGalleryPrev,
        showcaseNext, showcasePrev,
        hasShowcaseNext, hasShowcasePrev,
    } = useDriveFolderData();

    return (
        <div className="min-h-screen" style={{ background: "var(--clr-bg)" }}>
            <Navbar />
            <HeroSection />
            <FeaturedCarousel items={featured} loading={loading} />
            <AboutSection />
            <PortfolioSection
                items={gallery}
                loading={loading}
                onNext={galleryNext}
                onPrev={galleryPrev}
                hasNext={hasGalleryNext}
                hasPrev={hasGalleryPrev}
            />
            <ShowcaseSection
                items={showcase}
                loading={loading}
                onNext={showcaseNext}
                onPrev={showcasePrev}
                hasNext={hasShowcaseNext}
                hasPrev={hasShowcasePrev}
            />
            <ContactFooter />
        </div>
    );
}
