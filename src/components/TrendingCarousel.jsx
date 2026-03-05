import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronLeft, FiChevronRight, FiMessageCircle } from "react-icons/fi";
import { SITE_CONFIG } from "../config/site.config";

/**
 * 🌸 TrendingCarousel
 * Auto-scrolling product carousel with WhatsApp order integration.
 */
export default function TrendingCarousel({ items = [], loading = false }) {
    const [activeIdx, setActiveIdx] = useState(0);
    const [modalItem, setModalItem] = useState(null);
    const { brand } = SITE_CONFIG;

    const next = () => setActiveIdx((i) => (i + 1) % items.length);
    const prev = () =>
        setActiveIdx((i) => (i - 1 + items.length) % items.length);

    const openWhatsApp = (item) => {
        const msg = encodeURIComponent(
            `${brand.whatsappMessage} "${item.name}"`
        );
        window.open(
            `https://wa.me/${brand.whatsappNumber}?text=${msg}`,
            "_blank"
        );
    };

    if (loading) {
        return (
            <section className="py-20 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="h-96 skeleton rounded-3xl" />
                </div>
            </section>
        );
    }

    if (!items.length) return null;

    const item = items[activeIdx];

    return (
        <section id="trending" className="py-20 px-4">
            <div className="max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2 className="section-title mb-4">Featured Bouquets</h2>
                    <p className="section-subtitle">
                        Our most loved creations, crafted with the finest blooms
                    </p>
                </motion.div>

                <div className="relative flex items-center gap-4">
                    {/* Prev Arrow */}
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={prev}
                        className="flex-shrink-0 p-3 rounded-full shadow-xl text-white z-10"
                        style={{ background: "linear-gradient(135deg, #6d28d9, #f472b6)" }}
                        aria-label="Previous"
                    >
                        <FiChevronLeft size={22} />
                    </motion.button>

                    {/* Card */}
                    <div className="flex-1 overflow-hidden">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, x: 60 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -60 }}
                                transition={{ duration: 0.4 }}
                                className="card-glass rounded-3xl overflow-hidden cursor-pointer"
                                onClick={() => setModalItem(item)}
                            >
                                <div className="flex flex-col md:flex-row">
                                    <div className="md:w-1/2 h-72 md:h-96 overflow-hidden">
                                        <img
                                            src={item.url}
                                            alt={item.name}
                                            className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                                        />
                                    </div>
                                    <div className="md:w-1/2 p-8 flex flex-col justify-center">
                                        <span className="text-xs font-semibold tracking-widest text-purple-500 dark:text-purple-300 uppercase mb-2">
                                            Featured
                                        </span>
                                        <h3 className="font-serif text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-3">
                                            {item.name}
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                                            {item.description && item.description.trim().length > 0
                                                ? item.description
                                                : "A handcrafted bouquet designed with love and detail."}
                                        </p>
                                        <button
                                            id={`trending-order-${activeIdx}`}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                openWhatsApp(item);
                                            }}
                                            className="btn-primary self-start"
                                        >
                                            <FiMessageCircle />
                                            Order on WhatsApp
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Next Arrow */}
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={next}
                        className="flex-shrink-0 p-3 rounded-full shadow-xl text-white z-10"
                        style={{ background: "linear-gradient(135deg, #6d28d9, #f472b6)" }}
                        aria-label="Next"
                    >
                        <FiChevronRight size={22} />
                    </motion.button>
                </div>

                {/* Dots */}
                <div className="flex justify-center gap-2 mt-6">
                    {items.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setActiveIdx(i)}
                            className={`transition-all duration-300 rounded-full ${i === activeIdx
                                    ? "w-6 h-2.5 bg-purple-600"
                                    : "w-2.5 h-2.5 bg-purple-200 dark:bg-purple-800 hover:bg-purple-400"
                                }`}
                            aria-label={`Go to slide ${i + 1}`}
                        />
                    ))}
                </div>
            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {modalItem && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
                        onClick={() => setModalItem(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            className="card-glass rounded-3xl overflow-hidden max-w-2xl w-full"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src={modalItem.url}
                                alt={modalItem.name}
                                className="w-full h-72 object-cover"
                            />
                            <div className="p-6">
                                <h3 className="font-serif text-2xl font-bold gradient-text mb-2">
                                    {modalItem.name}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 mb-4">
                                    {modalItem.description ||
                                        "A handcrafted bouquet designed with love and detail."}
                                </p>
                                <button
                                    onClick={() => openWhatsApp(modalItem)}
                                    className="btn-primary"
                                >
                                    <FiMessageCircle />
                                    Order on WhatsApp
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
