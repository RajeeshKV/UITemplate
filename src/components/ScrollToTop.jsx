import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowUp } from "react-icons/fi";

export default function ScrollToTop() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const onScroll = () => setVisible(window.scrollY > 500);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <AnimatePresence>
            {visible && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.6 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.94 }}
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    id="scroll-to-top"
                    className="fixed bottom-8 right-8 z-50 p-3.5 rounded-full shadow-2xl text-white"
                    style={{ background: "var(--clr-accent2)" }}
                    aria-label="Scroll to top"
                >
                    <FiArrowUp size={18} />
                </motion.button>
            )}
        </AnimatePresence>
    );
}
