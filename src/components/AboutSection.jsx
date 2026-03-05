import React from "react";
import { motion } from "framer-motion";
import { SITE_CONFIG } from "../config/site.config";

const fadeUp = (delay = 0) => ({
    hidden: { opacity: 0, y: 36 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay } },
});

export default function AboutSection() {
    const { about } = SITE_CONFIG;

    return (
        <section
            id="about"
            className="py-24 px-6"
            style={{ background: "var(--clr-bg)" }}
        >
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <motion.div
                    variants={fadeUp(0)}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="max-w-2xl mb-16"
                >
                    <p className="section-label">{about.heading}</p>
                    <h2 className="section-title">{about.subheading}</h2>
                    <span className="accent-line" />
                </motion.div>

                {/* Story + Image */}
                <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
                    {/* Image */}
                    <motion.div
                        variants={fadeUp(0.1)}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="overflow-hidden rounded-2xl shadow-2xl"
                        style={{ aspectRatio: "4/5" }}
                    >
                        <img
                            src="/about-image.png"
                            alt="About us"
                            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                            onError={(e) => { e.currentTarget.src = "/placeholder-3.png"; }}
                        />
                    </motion.div>

                    {/* Text */}
                    <motion.div
                        variants={fadeUp(0.2)}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <h3
                            className="font-display text-2xl font-bold mb-6"
                            style={{ color: "var(--clr-text)" }}
                        >
                            {about.story.heading}
                        </h3>
                        {about.story.paragraphs.map((p, i) => (
                            <p
                                key={i}
                                className="leading-relaxed mb-5 text-base"
                                style={{ color: "var(--clr-muted)" }}
                            >
                                {p}
                            </p>
                        ))}
                    </motion.div>
                </div>

                {/* Values */}
                <div className="grid sm:grid-cols-3 gap-6">
                    {about.values.map((v, i) => (
                        <motion.div
                            key={v.heading}
                            variants={fadeUp(i * 0.1)}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="card p-8"
                            style={{ background: "var(--clr-bg-card)" }}
                        >
                            <span
                                className="block text-3xl font-bold mb-5"
                                style={{ color: "var(--clr-accent)" }}
                            >
                                {v.icon}
                            </span>
                            <h4
                                className="font-display text-lg font-semibold mb-3"
                                style={{ color: "var(--clr-text)" }}
                            >
                                {v.heading}
                            </h4>
                            <p className="text-sm leading-relaxed" style={{ color: "var(--clr-muted)" }}>
                                {v.text}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
