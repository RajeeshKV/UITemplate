import React from "react";
import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import {
    FaInstagram, FaLinkedin, FaTwitter, FaEnvelope,
} from "react-icons/fa";
import { SITE_CONFIG } from "../config/site.config";

const SOCIAL_ICONS = {
    instagram: { Icon: FaInstagram, label: "Instagram" },
    linkedin: { Icon: FaLinkedin, label: "LinkedIn" },
    twitter: { Icon: FaTwitter, label: "Twitter" },
    email: { Icon: FaEnvelope, label: "Email" },
};

export default function ContactFooter() {
    const { contact, brand, nav } = SITE_CONFIG;

    const go = (href) => {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <footer
            id="contact"
            className="relative pt-24 pb-12 px-6 overflow-hidden"
            style={{ background: "var(--clr-accent2)" }}
        >
            {/* Background accent blobs */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div
                    className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-10"
                    style={{ background: "var(--clr-accent)" }}
                />
                <div
                    className="absolute bottom-0 left-0 w-64 h-64 rounded-full blur-3xl opacity-10"
                    style={{ background: "var(--clr-accent)" }}
                />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Main contact block */}
                <div className="grid md:grid-cols-2 gap-16 mb-20 items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2
                            className="font-display text-4xl md:text-6xl font-bold leading-tight mb-6 text-white"
                        >
                            {contact.heading}
                        </h2>
                        <p className="text-base leading-relaxed mb-8 text-gray-300 max-w-md">
                            {contact.subheading}
                        </p>
                        <a
                            id="contact-email-btn"
                            href={`mailto:${contact.email}`}
                            className="btn-primary inline-flex"
                        >
                            {contact.email} <FiArrowUpRight size={16} />
                        </a>
                    </motion.div>

                    {/* Social icons */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="flex flex-wrap gap-4"
                    >
                        {Object.entries(SOCIAL_ICONS).map(([key, { Icon, label }]) => {
                            const href = contact.social[key];
                            if (!href) return null;
                            return (
                                <motion.a
                                    key={key}
                                    href={href}
                                    id={`social-${key}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.1, y: -4 }}
                                    whileTap={{ scale: 0.96 }}
                                    className="flex flex-col items-center gap-2 p-5 rounded-2xl border border-white/10 hover:border-white/30 hover:bg-white/5 transition-all"
                                    aria-label={label}
                                >
                                    <Icon size={24} className="text-white" />
                                    <span className="text-xs text-gray-400">{label}</span>
                                </motion.a>
                            );
                        })}
                    </motion.div>
                </div>

                {/* Divider */}
                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-5">
                    {/* Logo */}
                    <div className="flex items-center gap-3">
                        <img
                            src={brand.logoSrc}
                            alt={brand.name}
                            className="h-7 w-7 rounded-sm object-contain opacity-80"
                            onError={(e) => { e.currentTarget.style.display = "none"; }}
                        />
                        <span className="font-display font-bold text-white">{brand.name}</span>
                    </div>

                    {/* Nav links (footer) */}
                    <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center">
                        {nav.links.map((link) => (
                            <button
                                key={link.href}
                                onClick={() => go(link.href)}
                                className="text-sm text-gray-400 hover:text-white transition-colors"
                            >
                                {link.label}
                            </button>
                        ))}
                    </div>

                    {/* Copyright */}
                    <p className="text-xs text-gray-500">
                        © {new Date().getFullYear()} {brand.name}
                    </p>
                </div>
            </div>
        </footer>
    );
}
