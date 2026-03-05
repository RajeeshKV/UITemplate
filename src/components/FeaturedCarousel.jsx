import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronLeft, FiChevronRight, FiExternalLink } from "react-icons/fi";
import { SITE_CONFIG } from "../config/site.config";

const FALLBACK_FEATURED = [
    { id: "f1", url: "/placeholder-1.png", name: "Editorial — Still Life", description: "Luxury product photography series for a lifestyle brand." },
    { id: "f2", url: "/placeholder-3.png", name: "Architecture — The Loft", description: "Interior photography campaign for a luxury property developer." },
    { id: "f3", url: "/placeholder-4.png", name: "Fashion — Avant Editorial", description: "High-fashion editorial shoot for a Berlin-based fashion house." },
];

export default function FeaturedCarousel({ items = [], loading = false }) {
    const data = items.length ? items : FALLBACK_FEATURED;
    const [idx, setIdx] = useState(0);
    const [dir, setDir] = useState(1);
    const { featured, brand } = SITE_CONFIG;

    // Auto-advance
    useEffect(() => {
        if (data.length < 2) return;
        const t = setInterval(() => { setDir(1); setIdx((i) => (i + 1) % data.length); }, 5000);
        return () => clearInterval(t);
    }, [data.length]);

    const navigate = (delta) => {
        setDir(delta);
        setIdx((i) => (i + delta + data.length) % data.length);
    };

    const item = data[idx];

    const openContact = () => {
        const msg = encodeURIComponent(`${brand.whatsappMessage} "${item.name}"`);
        window.open(`https://wa.me/${brand.whatsappNumber}?text=${msg}`, "_blank");
    };

    const slideVariants = {
        enter: (d) => ({ x: d > 0 ? 80 : -80, opacity: 0 }),
        center: { x: 0, opacity: 1 },
        exit: (d) => ({ x: d > 0 ? -80 : 80, opacity: 0 }),
    };

    if (loading) {
        return (
            <section className="py-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="h-10 w-40 skeleton mb-4 rounded-lg" />
                    <div className="h-[480px] skeleton rounded-2xl" />
                </div>
            </section>
        );
    }

    return (
        <section id="featured" className="py-24 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex items-end justify-between mb-10">
                    <div>
                        <p className="section-label">{featured.heading}</p>
                        <h2 className="section-title">{featured.subheading}</h2>
                    </div>
                    <div className="hidden md:flex gap-2">
                        <button
                            id="carousel-prev"
                            onClick={() => navigate(-1)}
                            className="p-3 rounded-full transition-all border"
                            style={{ borderColor: "var(--clr-border)", color: "var(--clr-text)" }}
                            aria-label="Previous"
                        >
                            <FiChevronLeft size={18} />
                        </button>
                        <button
                            id="carousel-next"
                            onClick={() => navigate(1)}
                            className="p-3 rounded-full transition-all"
                            style={{ background: "var(--clr-accent)", color: "#1a1a1a" }}
                            aria-label="Next"
                        >
                            <FiChevronRight size={18} />
                        </button>
                    </div>
                </div>

                {/* Slide */}
                <div className="relative overflow-hidden rounded-2xl" style={{ minHeight: 480 }}>
                    <AnimatePresence custom={dir} mode="wait">
                        <motion.div
                            key={item.id}
                            custom={dir}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
                            className="grid md:grid-cols-2 gap-0 h-full"
                        >
                            {/* Image */}
                            <div className="overflow-hidden rounded-l-2xl md:rounded-l-2xl md:rounded-r-none rounded-t-2xl md:rounded-t-2xl" style={{ minHeight: 360 }}>
                                <img
                                    src={item.url}
                                    alt={item.name}
                                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                                    style={{ minHeight: 360 }}
                                    onError={(e) => { e.currentTarget.src = "/placeholder-1.png"; }}
                                />
                            </div>

                            {/* Content */}
                            <div
                                className="card flex flex-col justify-center p-10 md:p-14 rounded-r-2xl rounded-l-none rounded-b-2xl md:rounded-b-none"
                                style={{ background: "var(--clr-bg-card)" }}
                            >
                                <span className="tag mb-4">
                                    {String(idx + 1).padStart(2, "0")} / {String(data.length).padStart(2, "0")}
                                </span>
                                <h3
                                    className="font-display text-2xl md:text-3xl font-bold mb-4 leading-snug"
                                    style={{ color: "var(--clr-text)" }}
                                >
                                    {item.name}
                                </h3>
                                <p className="mb-8 leading-relaxed" style={{ color: "var(--clr-muted)" }}>
                                    {item.description || "A meticulously crafted project delivered with precision and care."}
                                </p>
                                <button
                                    id={`featured-cta-${idx}`}
                                    onClick={openContact}
                                    className="btn-primary self-start"
                                >
                                    Inquire <FiExternalLink size={14} />
                                </button>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Dot indicators */}
                <div className="flex gap-2 mt-5 justify-center">
                    {data.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => { setDir(i > idx ? 1 : -1); setIdx(i); }}
                            aria-label={`Go to slide ${i + 1}`}
                            className="rounded-full transition-all duration-300"
                            style={{
                                width: i === idx ? 24 : 8,
                                height: 8,
                                background: i === idx ? "var(--clr-accent)" : "var(--clr-border)",
                            }}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
