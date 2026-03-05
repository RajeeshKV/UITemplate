import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    FiChevronLeft, FiChevronRight,
    FiX, FiExternalLink
} from "react-icons/fi";
import { SITE_CONFIG } from "../config/site.config";

/* ── Skeleton grid ── */
function SkeletonGrid({ count = 9 }) {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {Array.from({ length: count }).map((_, i) => (
                <div key={i} className="aspect-square skeleton" />
            ))}
        </div>
    );
}

export default function PortfolioSection({
    items = [],
    loading = false,
    onNext,
    onPrev,
    hasNext = false,
    hasPrev = false,
}) {
    const [lightbox, setLightbox] = useState(null);
    const { portfolio, brand } = SITE_CONFIG;

    // Use real Cloudinary images if available, else show configured placeholders
    const displayItems = items.length ? items : portfolio.placeholders;

    const openContact = (item) => {
        const msg = encodeURIComponent(`${brand.whatsappMessage} "${item.name}"`);
        window.open(`https://wa.me/${brand.whatsappNumber}?text=${msg}`, "_blank");
    };

    return (
        <section
            id="portfolio"
            className="py-24 px-6"
            style={{ background: "var(--clr-bg)" }}
        >
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="max-w-xl mb-14"
                >
                    <p className="section-label">{portfolio.heading}</p>
                    <h2 className="section-title">{portfolio.subheading}</h2>
                    <span className="accent-line" />
                </motion.div>

                {/* Grid */}
                {loading ? (
                    <SkeletonGrid />
                ) : displayItems.length === 0 ? (
                    <div className="py-20 text-center" style={{ color: "var(--clr-muted)" }}>
                        <p className="text-5xl mb-4">◎</p>
                        <p className="text-lg">{portfolio.emptyMessage}</p>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            {displayItems.map((item, i) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.45, delay: i * 0.04 }}
                                    whileHover={{ scale: 1.01 }}
                                    className="relative group aspect-square rounded-xl overflow-hidden cursor-pointer"
                                    style={{ boxShadow: "var(--shadow)" }}
                                    onClick={() => setLightbox(item)}
                                >
                                    <img
                                        src={item.url}
                                        alt={item.name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        loading="lazy"
                                        onError={(e) => { e.currentTarget.src = "/placeholder-1.png"; }}
                                    />
                                    {/* Overlay */}
                                    <div className="absolute inset-0 flex flex-col justify-end p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)" }}
                                    >
                                        <p className="text-white font-semibold text-sm truncate">{item.name}</p>
                                        <button
                                            id={`portfolio-item-${i}`}
                                            onClick={(e) => { e.stopPropagation(); openContact(item); }}
                                            className="mt-2 self-start text-xs inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-white border border-white/30 hover:bg-white/20 transition-all"
                                        >
                                            Inquire <FiExternalLink size={10} />
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Pagination (only shows if real Cloudinary items) */}
                        {items.length > 0 && (hasPrev || hasNext) && (
                            <div className="flex justify-center gap-3 mt-10">
                                <button
                                    id="portfolio-prev"
                                    onClick={onPrev}
                                    disabled={!hasPrev}
                                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium border transition-all disabled:opacity-30"
                                    style={{ borderColor: "var(--clr-border)", color: "var(--clr-text)" }}
                                >
                                    <FiChevronLeft /> Previous
                                </button>
                                <button
                                    id="portfolio-next"
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
                        style={{ background: "rgba(0,0,0,0.9)" }}
                        onClick={() => setLightbox(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.85, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.85, opacity: 0 }}
                            transition={{ type: "spring", damping: 20 }}
                            className="relative max-w-3xl w-full"
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
                                className="w-full rounded-xl max-h-[75vh] object-contain"
                                onError={(e) => { e.currentTarget.src = "/placeholder-1.png"; }}
                            />
                            <div className="mt-4 flex items-center justify-between">
                                <div>
                                    <h3 className="text-white font-display font-bold text-xl">{lightbox.name}</h3>
                                    {lightbox.description && (
                                        <p className="text-gray-400 text-sm mt-1">{lightbox.description}</p>
                                    )}
                                </div>
                                <button onClick={() => openContact(lightbox)} className="btn-primary !py-2 !px-5 text-sm">
                                    Inquire <FiExternalLink size={13} />
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
