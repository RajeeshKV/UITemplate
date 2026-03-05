import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX, FiSun, FiMoon } from "react-icons/fi";
import { SITE_CONFIG } from "../config/site.config";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [dark, setDark] = useState(
        () => document.documentElement.classList.contains("dark") ||
            localStorage.getItem("theme") === "dark"
    );

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 30);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        if (dark) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [dark]);

    const go = (href) => {
        setMenuOpen(false);
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: "smooth" });
    };

    const { brand, nav } = SITE_CONFIG;

    return (
        <>
            <motion.header
                initial={{ y: -64 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled
                        ? "backdrop-blur-xl bg-[var(--clr-bg)]/80 border-b border-[var(--clr-border)] shadow-sm"
                        : "bg-transparent"
                    }`}
            >
                <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-16">

                    {/* Logo */}
                    <button
                        id="nav-logo"
                        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                        className="flex items-center gap-3 group"
                    >
                        <img
                            src={brand.logoSrc}
                            alt={brand.name}
                            className="h-8 w-8 rounded-sm object-contain"
                            onError={(e) => { e.currentTarget.style.display = "none"; }}
                        />
                        <span
                            className="font-display font-bold text-lg tracking-tight"
                            style={{ color: "var(--clr-text)" }}
                        >
                            {brand.name}
                        </span>
                    </button>

                    {/* Desktop nav */}
                    <nav className="hidden md:flex items-center gap-1">
                        {nav.links.map((link) => (
                            <button
                                key={link.href}
                                id={`nav-${link.label.toLowerCase()}`}
                                onClick={() => go(link.href)}
                                className="px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200"
                                style={{ color: "var(--clr-muted)" }}
                                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--clr-text)")}
                                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--clr-muted)")}
                            >
                                {link.label}
                            </button>
                        ))}

                        {/* CTA */}
                        <button
                            id="nav-cta"
                            onClick={() => go("#contact")}
                            className="btn-primary ml-3 !py-2 !px-5"
                        >
                            {brand.contactLabel}
                        </button>

                        {/* Dark toggle */}
                        <button
                            id="nav-theme"
                            onClick={() => setDark((d) => !d)}
                            className="ml-2 p-2 rounded-full transition-all"
                            style={{
                                background: "var(--clr-border)",
                                color: "var(--clr-text)",
                            }}
                            aria-label="Toggle theme"
                        >
                            {dark ? <FiSun size={16} /> : <FiMoon size={16} />}
                        </button>
                    </nav>

                    {/* Mobile controls */}
                    <div className="md:hidden flex items-center gap-2">
                        <button
                            id="nav-theme-mobile"
                            onClick={() => setDark((d) => !d)}
                            className="p-2 rounded-full"
                            style={{ background: "var(--clr-border)", color: "var(--clr-text)" }}
                            aria-label="Toggle theme"
                        >
                            {dark ? <FiSun size={15} /> : <FiMoon size={15} />}
                        </button>
                        <button
                            id="nav-menu-btn"
                            onClick={() => setMenuOpen((v) => !v)}
                            className="p-2"
                            style={{ color: "var(--clr-text)" }}
                            aria-label="Toggle menu"
                        >
                            {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
                        </button>
                    </div>
                </div>

                {/* Mobile drawer */}
                <AnimatePresence>
                    {menuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="md:hidden overflow-hidden border-t"
                            style={{ background: "var(--clr-bg)", borderColor: "var(--clr-border)" }}
                        >
                            <div className="px-6 py-4 space-y-1">
                                {nav.links.map((link) => (
                                    <button
                                        key={link.href}
                                        onClick={() => go(link.href)}
                                        className="w-full text-left px-4 py-3 text-sm font-medium rounded-lg transition-all"
                                        style={{ color: "var(--clr-muted)" }}
                                    >
                                        {link.label}
                                    </button>
                                ))}
                                <button
                                    onClick={() => go("#contact")}
                                    className="btn-primary w-full justify-center mt-3"
                                >
                                    {brand.contactLabel}
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.header>
        </>
    );
}
