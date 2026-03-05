import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronLeft, FiChevronRight, FiX, FiMessageCircle } from "react-icons/fi";
import { SITE_CONFIG } from "../config/site.config";

/**
 * 🌸 CustomCurationsSection
 * Displays customer-submitted photos with pagination.
 */
export default function CustomCurationsSection({
    items = [],
    loading = false,
    onNext,
    onPrev,
    hasNext = false,
    hasPrev = false,
}) {
    const [lightbox, setLightbox] = useState(null);
    const { curations, brand } = SITE_CONFIG;

    const openWhatsApp = (item) => {
        const msg = encodeURIComponent(
            `${brand.whatsappMessage} "${item.name}"`
        );
        window.open(`https://wa.me/${brand.whatsappNumber}?text=${msg}`, "_blank");
    };

    return (
        <section
            id="curations"
            className="py-20 px-4 bg-gradient-to-br from-purple-50/50 to-pink-50/50 dark:from-purple-950/20 dark:to-pink-950/20"
        >
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2 className="section-title mb-4">{curations.heading}</h2>
                    <p className="section-subtitle">
                        Real bouquets crafted for our wonderful customers
                    </p>
                </motion.div>

                {loading ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className="aspect-square skeleton rounded-2xl" />
                        ))}
                    </div>
                ) : items.length === 0 ? (
                    <div className="text-center py-20 card-glass rounded-3xl">
                        <p className="text-6xl mb-4">🌸</p>
                        <p className="text-gray-400 text-lg">{curations.emptyMessage}</p>
                        <p className="text-gray-400 text-sm mt-2">
                            Be the first to share your experience!
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {items.map((item, i) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: i * 0.08 }}
                                    whileHover={{ scale: 1.02 }}
                                    className="relative group aspect-square rounded-2xl overflow-hidden cursor-pointer shadow-lg ring-2 ring-purple-100 dark:ring-purple-900/30"
                                    onClick={() => setLightbox(item)}
                                >
                                    <img
                                        src={item.url}
                                        alt={item.name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                                        <p className="text-white font-semibold text-sm">
                                            {item.name}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {(hasPrev || hasNext) && (
                            <div className="flex justify-center gap-4 mt-10">
                                <button
                                    onClick={onPrev}
                                    disabled={!hasPrev}
                                    className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium border-2 transition-all ${hasPrev
                                            ? "border-purple-500 text-purple-600 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/20"
                                            : "border-gray-200 text-gray-300 cursor-not-allowed"
                                        }`}
                                >
                                    <FiChevronLeft /> Previous
                                </button>
                                <button
                                    onClick={onNext}
                                    disabled={!hasNext}
                                    className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium border-2 transition-all ${hasNext
                                            ? "border-purple-500 text-purple-600 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/20"
                                            : "border-gray-200 text-gray-300 cursor-not-allowed"
                                        }`}
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
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
                        onClick={() => setLightbox(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            className="relative max-w-2xl w-full"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setLightbox(null)}
                                className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/50 text-white"
                            >
                                <FiX size={20} />
                            </button>
                            <img
                                src={lightbox.url}
                                alt={lightbox.name}
                                className="w-full rounded-2xl shadow-2xl max-h-[80vh] object-contain"
                            />
                            <div className="mt-4 flex items-center justify-between">
                                <h3 className="text-white font-semibold text-lg">
                                    {lightbox.name}
                                </h3>
                                <button
                                    onClick={() => openWhatsApp(lightbox)}
                                    className="btn-primary text-sm"
                                >
                                    <FiMessageCircle /> Order Similar
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
