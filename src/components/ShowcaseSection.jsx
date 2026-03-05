import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronLeft, FiChevronRight, FiX } from "react-icons/fi";
import { SITE_CONFIG } from "../config/site.config";

function SkeletonGrid({ count = 6 }) {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {Array.from({ length: count }).map((_, i) => (
                <div key={i} className="aspect-square skeleton" />
            ))}
        </div>
    );
}

export default function ShowcaseSection({
    items = [],
    loading = false,
    onNext,
    onPrev,
    hasNext = false,
    hasPrev = false,
}) {
    const [lightbox, setLightbox] = useState(null);
    const { showcase } = SITE_CONFIG;

    return (
        <section
            id="showcase"
            className="py-24 px-6"
            style={{ background: "var(--clr-bg-card)" }}
        >
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="max-w-xl mb-14"
                >
                    <p className="section-label">{showcase.heading}</p>
                    <h2 className="section-title">{showcase.subheading}</h2>
                    <span className="accent-line" />
                </motion.div>

                {loading ? (
                    <SkeletonGrid count={6} />
                ) : items.length === 0 ? (
                    <div
                        className="py-20 text-center rounded-2xl border"
                        style={{ borderColor: "var(--clr-border)", borderStyle: "dashed" }}
                    >
                        <p className="text-4xl mb-4">◇</p>
                        <p className="text-base" style={{ color: "var(--clr-muted)" }}>
                            {showcase.emptyMessage}
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            {items.map((item, i) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: i * 0.05 }}
                                    className="relative group aspect-square rounded-xl overflow-hidden cursor-pointer ring-1"
                                    style={{ boxShadow: "var(--shadow)", ringColor: "var(--clr-border)" }}
                                    onClick={() => setLightbox(item)}
                                >
                                    <img
                                        src={item.url}
                                        alt={item.name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        loading="lazy"
                                        onError={(e) => { e.currentTarget.src = "/placeholder-2.png"; }}
                                    />
                                    <div
                                        className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)" }}
                                    >
                                        <p className="text-white text-sm font-medium truncate">{item.name}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {(hasPrev || hasNext) && (
                            <div className="flex justify-center gap-3 mt-10">
                                <button
                                    onClick={onPrev}
                                    disabled={!hasPrev}
                                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium border transition-all disabled:opacity-30"
                                    style={{ borderColor: "var(--clr-border)", color: "var(--clr-text)" }}
                                >
                                    <FiChevronLeft /> Previous
                                </button>
                                <button
                                    onClick={onNext}
                                    disabled={!hasNext}
                                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all disabled:opacity-30"
                                    style={{ background: "var(--clr-accent)", color: "#1a1a1a" }}
                                >
                                    Next <FiChevronRight />
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {lightbox && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[200] flex items-center justify-center p-4"
                        style={{ background: "rgba(0,0,0,0.92)" }}
                        onClick={() => setLightbox(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.85, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.85, opacity: 0 }}
                            className="relative max-w-2xl w-full"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setLightbox(null)}
                                className="absolute top-3 right-3 z-10 p-2 rounded-full text-white"
                                style={{ background: "rgba(0,0,0,0.5)" }}
                            >
                                <FiX size={18} />
                            </button>
                            <img
                                src={lightbox.url}
                                alt={lightbox.name}
                                className="w-full rounded-xl max-h-[78vh] object-contain"
                                onError={(e) => { e.currentTarget.src = "/placeholder-2.png"; }}
                            />
                            <p className="text-white text-center mt-3 font-medium">{lightbox.name}</p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
