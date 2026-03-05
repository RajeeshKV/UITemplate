import React from "react";
import { motion } from "framer-motion";
import { FiArrowRight, FiExternalLink } from "react-icons/fi";
import { SITE_CONFIG } from "../config/site.config";

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
};

export default function HeroSection() {
    const { hero, brand } = SITE_CONFIG;

    const go = (href) => {
        if (href.startsWith("#")) {
            const el = document.querySelector(href);
            if (el) el.scrollIntoView({ behavior: "smooth" });
        } else {
            window.open(href, "_blank");
        }
    };

    return (
        <section
            id="home"
            className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-16"
        >
            {/* Hero background image with gradient overlay */}
            <div className="absolute inset-0 -z-10">
                <img
                    src="/hero-bg.png"
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ opacity: 0.18 }}
                />
                <div
                    className="absolute inset-0"
                    style={{
                        background:
                            "linear-gradient(to bottom, var(--clr-bg) 0%, transparent 40%, var(--clr-bg) 100%)",
                    }}
                />
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full py-20">
                <div className="max-w-3xl">

                    {/* Badge */}
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        transition={{ duration: 0.5 }}
                        className="mb-8"
                    >
                        <span className="tag">{hero.badge}</span>
                    </motion.div>

                    {/* Heading */}
                    <motion.h1
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="font-display text-5xl sm:text-6xl md:text-7xl font-bold leading-[1.05] mb-6"
                        style={{ color: "var(--clr-text)" }}
                    >
                        {hero.heading}
                    </motion.h1>

                    {/* Sub */}
                    <motion.p
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-lg md:text-xl leading-relaxed mb-10 max-w-xl"
                        style={{ color: "var(--clr-muted)" }}
                    >
                        {hero.sub}
                    </motion.p>

                    {/* CTA buttons */}
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="flex flex-wrap gap-4"
                    >
                        <button
                            id="hero-portfolio-btn"
                            onClick={() => go(hero.cta1.href)}
                            className="btn-primary"
                        >
                            {hero.cta1.label} <FiArrowRight />
                        </button>
                        <button
                            id="hero-contact-btn"
                            onClick={() => go(hero.cta2.href)}
                            className="btn-outline"
                        >
                            {hero.cta2.label} <FiExternalLink size={14} />
                        </button>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        transition={{ duration: 0.6, delay: 0.45 }}
                        className="flex flex-wrap gap-10 mt-16 pt-10 border-t"
                        style={{ borderColor: "var(--clr-border)" }}
                    >
                        {hero.stats.map((stat) => (
                            <div key={stat.label}>
                                <p
                                    className="font-display text-3xl font-bold"
                                    style={{ color: "var(--clr-accent)" }}
                                >
                                    {stat.value}
                                </p>
                                <p className="text-sm mt-0.5" style={{ color: "var(--clr-muted)" }}>
                                    {stat.label}
                                </p>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <motion.div
                    animate={{ y: [0, 6, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-px h-10"
                    style={{ background: "linear-gradient(to bottom, var(--clr-accent), transparent)" }}
                />
                <p className="text-[10px] tracking-[0.2em] uppercase" style={{ color: "var(--clr-muted)" }}>
                    Scroll
                </p>
            </motion.div>
        </section>
    );
}
