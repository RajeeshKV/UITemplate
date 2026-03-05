/**
 * ═══════════════════════════════════════════════
 *  SITE CONFIGURATION — Edit this file to personalise
 *  the entire website without touching any component.
 * ═══════════════════════════════════════════════
 */

export const SITE_CONFIG = {
    // ─── Brand ────────────────────────────────────
    brand: {
        name: "Luminary Studio",
        logoSrc: "/logo.png",          // Replace with your logo path
        tagline: "Crafting Visual Stories.",
        subTagline:
            "We create bold, intentional work that resonates — from brand identities to editorial campaigns.",
        ctaBadge: "✦ Now accepting projects for 2025",
        ctaText: "Limited slots available — book a discovery call today.",
        // Contact action (WhatsApp / email / form link)
        contactHref: "https://wa.me/919876543210",
        contactLabel: "Start a Project",
        // WhatsApp for item ordering (optional)
        whatsappNumber: "919876543210",
        whatsappMessage: "Hi! I'm interested in",
    },

    // ─── Navigation ───────────────────────────────
    nav: {
        links: [
            { label: "Home", href: "#home" },
            { label: "Work", href: "#featured" },
            { label: "About", href: "#about" },
            { label: "Portfolio", href: "#portfolio" },
            { label: "Contact", href: "#contact" },
        ],
    },

    // ─── Hero Section ─────────────────────────────
    hero: {
        badge: "✦ Now accepting projects for 2025",
        heading: "Crafting Visual Stories.",
        sub: "We create bold, intentional work that resonates — from brand identities to editorial campaigns.",
        cta1: { label: "View Portfolio", href: "#portfolio" },
        cta2: { label: "Start a Project", href: "#contact" },
        stats: [
            { value: "200+", label: "Projects Delivered" },
            { value: "50+", label: "Happy Clients" },
            { value: "8 yrs", label: "Industry Experience" },
        ],
    },

    // ─── About ────────────────────────────────────
    about: {
        heading: "About Us",
        subheading: "We're a boutique creative studio obsessed with precision, aesthetics, and storytelling.",
        story: {
            heading: "Our Story",
            paragraphs: [
                "Founded in 2017, Luminary Studio began as a two-person passion project with one conviction: that great design has the power to change how people feel about a brand.",
                "Today we're a full-service creative studio working with founders, agencies, and enterprises across the globe. We bring strategy, craft, and soul to every engagement — no cookie-cutter solutions, no shortcuts.",
            ],
        },
        values: [
            {
                icon: "◎",
                heading: "Craft-First",
                text: "Every pixel, word, and interaction is deliberate. We obsess over the details so your audience notices the difference.",
            },
            {
                icon: "▲",
                heading: "Strategy-Led",
                text: "Beautiful work that doesn't perform isn't enough. Our process starts with purpose and ends with measurable results.",
            },
            {
                icon: "◇",
                heading: "Collaborative",
                text: "Your vision is the brief. We partner closely with every client, keeping communication honest and transparent.",
            },
        ],
    },

    // ─── Featured Section (Carousel) ──────────────
    featured: {
        heading: "Featured Work",
        subheading: "A selection of projects we're proud of",
    },

    // ─── Portfolio Gallery ─────────────────────────
    portfolio: {
        heading: "Portfolio",
        subheading: "Browse the full body of work",
        emptyMessage: "No projects available yet. Check back soon.",
        // Fallback images shown if Cloudinary returns nothing
        placeholders: [
            { id: "ph1", url: "/placeholder-1.png", name: "Editorial — Still Life", description: "Luxury product photography series for a lifestyle brand." },
            { id: "ph2", url: "/placeholder-2.png", name: "Brand Identity — Terra Co.", description: "Complete visual identity system for an organic skincare label." },
            { id: "ph3", url: "/placeholder-3.png", name: "Architecture — The Loft", description: "Interior photography campaign for a luxury property developer." },
            { id: "ph4", url: "/placeholder-4.png", name: "Fashion — Avant Editorial", description: "High-fashion editorial shoot for a Berlin-based fashion house." },
            { id: "ph5", url: "/placeholder-5.png", name: "Fine Art — Fluid Series", description: "Abstract fine art prints for gallery exhibition and print sales." },
        ],
    },

    // ─── Showcase (Customer Uploads) ──────────────
    showcase: {
        heading: "Client Showcase",
        subheading: "Projects in the wild — shared by our clients",
        emptyMessage: "Client features coming soon.",
    },

    // ─── Contact / Footer ─────────────────────────
    contact: {
        heading: "Let's Build Something Together",
        subheading: "Have a project in mind? We'd love to hear about it. Reach out and let's start a conversation.",
        social: {
            instagram: "https://instagram.com/luminarystudio",
            linkedin: "https://linkedin.com/company/luminarystudio",
            twitter: "https://twitter.com/luminarystudio",
            email: "mailto:hello@luminarystudio.co",
        },
        email: "hello@luminarystudio.co",
        tagline: "© Luminary Studio — Made with intention.",
    },

    // ─── SEO ──────────────────────────────────────
    seo: {
        title: "Luminary Studio | Creative Design & Photography",
        description: "A boutique creative studio specialising in brand identity, editorial photography, and visual storytelling.",
        keywords: "creative studio, brand identity, photography, design, portfolio",
        siteUrl: "https://luminarystudio.co",
    },

    // ─── Theme ────────────────────────────────────
    // Particle animation type: "dots" | "lines" | "bubbles"
    particleStyle: "dots",
};
