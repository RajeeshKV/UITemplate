import { useEffect, useState } from "react";

const ONE_HOUR_MS = 60 * 60 * 1000;
const PAGE_SIZE = 12;
const CACHE_PREFIX = "LUMINARY_CACHE_";

function nowMs() { return Date.now(); }
function cacheKey(k) { return `${CACHE_PREFIX}${k.toUpperCase()}`; }

function readCache(key) {
    try { return JSON.parse(localStorage.getItem(cacheKey(key)) || "null"); }
    catch { return null; }
}
function writeCache(key, val) {
    try { localStorage.setItem(cacheKey(key), JSON.stringify(val)); } catch { }
}
export function clearAllCache() {
    ["GALLERY", "FEATURED", "SHOWCASE"].forEach((k) =>
        localStorage.removeItem(cacheKey(k))
    );
}

/** Read image metadata from a Cloudinary-hosted JSON file */
async function loadConfig(cloudName, folderName) {
    if (!cloudName || !folderName) return {};
    const url = `https://res.cloudinary.com/${cloudName}/raw/upload/${folderName}/config.json?t=${Date.now()}`;
    try {
        const res = await fetch(url, { cache: "no-store" });
        if (res.ok) return await res.json();
    } catch { }
    return {};
}

/** Merge raw images with config metadata */
function mergeConfig(images, cfg) {
    return images.map((img) => {
        const base = (img.id || "").split("/").pop()?.split(".")[0] || "";
        const match =
            cfg[base] ||
            Object.values(cfg).find((v) => v.imageName?.startsWith(base));
        const pretty = base.replace(/[_-]+/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
        return { ...img, name: match?.name || pretty, description: match?.description || "" };
    });
}

/** Fetch one page of images from the API */
async function fetchPage(folder, cursor = null) {
    const base = "/api/list-images";
    const url = new URL(base, window.location.origin);
    url.searchParams.set("folder", folder);
    url.searchParams.set("pageSize", PAGE_SIZE);
    if (cursor) url.searchParams.set("nextCursor", cursor);
    url.searchParams.set("_", Date.now());

    const r = await fetch(url, { cache: "no-store" });
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    const d = await r.json();
    return d.items ? d : { items: [], nextCursor: null };
}

/**
 * useDriveFolderData
 * Cloudinary image hook for three configurable folders:
 *   - GALLERY  → main portfolio grid
 *   - FEATURED → carousel / featured section
 *   - SHOWCASE → client-submitted uploads
 */
export default function useDriveFolderData() {
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || "";
    const galleryFolder = import.meta.env.VITE_CLOUDINARY_GALLERY_FOLDER || "Portfolio-Gallery";
    const featuredFolder = import.meta.env.VITE_CLOUDINARY_FEATURED_FOLDER || "Portfolio-Featured";
    const showcaseFolder = import.meta.env.VITE_CLOUDINARY_SHOWCASE_FOLDER || "Portfolio-Showcase";

    const [gallery, setGallery] = useState([]);
    const [featured, setFeatured] = useState([]);
    const [showcase, setShowcase] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Gallery pagination state
    const [galleryCursor, setGalleryCursor] = useState(null);
    const [prevGalleryCursors, setPrevGalleryCursors] = useState([]);

    // Showcase pagination state
    const [showcaseCursor, setShowcaseCursor] = useState(null);
    const [prevShowcaseCursors, setPrevShowcaseCursors] = useState([]);

    async function loadFolder(folderName, cacheSlot) {
        const cached = readCache(cacheSlot);
        const cfg = await loadConfig(cloudName, folderName);
        if (cached?.items?.length > 0 && nowMs() - cached.timestamp < ONE_HOUR_MS) {
            return { items: mergeConfig(cached.items, cfg), nextCursor: cached.nextCursor || null };
        }
        const raw = await fetchPage(folderName);
        writeCache(cacheSlot, { timestamp: nowMs(), ...raw });
        return { items: mergeConfig(raw.items, cfg), nextCursor: raw.nextCursor || null };
    }

    useEffect(() => {
        let aborted = false;
        (async () => {
            setLoading(true);
            try {
                const [g, f, s] = await Promise.all([
                    loadFolder(galleryFolder, "GALLERY"),
                    loadFolder(featuredFolder, "FEATURED"),
                    loadFolder(showcaseFolder, "SHOWCASE"),
                ]);
                if (!aborted) {
                    setGallery(g.items); setGalleryCursor(g.nextCursor);
                    setFeatured(f.items);
                    setShowcase(s.items); setShowcaseCursor(s.nextCursor);
                }
            } catch (e) {
                if (!aborted) setError(e.message);
            } finally {
                if (!aborted) setLoading(false);
            }
        })();
        return () => { aborted = true; };
    }, []);

    // ── Gallery pagination ──
    const galleryNext = async () => {
        if (!galleryCursor) return;
        setLoading(true);
        try {
            const cfg = await loadConfig(cloudName, galleryFolder);
            const raw = await fetchPage(galleryFolder, galleryCursor);
            setPrevGalleryCursors((p) => [...p, galleryCursor]);
            setGallery(mergeConfig(raw.items, cfg));
            setGalleryCursor(raw.nextCursor);
        } catch (e) { setError(e.message); }
        finally { setLoading(false); }
    };

    const galleryPrev = async () => {
        if (!prevGalleryCursors.length) return;
        setLoading(true);
        try {
            const cfg = await loadConfig(cloudName, galleryFolder);
            const prev = prevGalleryCursors[prevGalleryCursors.length - 1];
            const raw = await fetchPage(galleryFolder, prev || undefined);
            setPrevGalleryCursors((p) => p.slice(0, -1));
            setGallery(mergeConfig(raw.items, cfg));
            setGalleryCursor(raw.nextCursor);
        } catch (e) { setError(e.message); }
        finally { setLoading(false); }
    };

    // ── Showcase pagination ──
    const showcaseNext = async () => {
        if (!showcaseCursor) return;
        setLoading(true);
        try {
            const cfg = await loadConfig(cloudName, showcaseFolder);
            const raw = await fetchPage(showcaseFolder, showcaseCursor);
            setPrevShowcaseCursors((p) => [...p, showcaseCursor]);
            setShowcase(mergeConfig(raw.items, cfg));
            setShowcaseCursor(raw.nextCursor);
        } catch (e) { setError(e.message); }
        finally { setLoading(false); }
    };

    const showcasePrev = async () => {
        if (!prevShowcaseCursors.length) return;
        setLoading(true);
        try {
            const cfg = await loadConfig(cloudName, showcaseFolder);
            const prev = prevShowcaseCursors[prevShowcaseCursors.length - 1];
            const raw = await fetchPage(showcaseFolder, prev || undefined);
            setPrevShowcaseCursors((p) => p.slice(0, -1));
            setShowcase(mergeConfig(raw.items, cfg));
            setShowcaseCursor(raw.nextCursor);
        } catch (e) { setError(e.message); }
        finally { setLoading(false); }
    };

    return {
        gallery, featured, showcase,
        loading, error,
        galleryNext, galleryPrev,
        hasGalleryNext: !!galleryCursor,
        hasGalleryPrev: prevGalleryCursors.length > 0,
        showcaseNext, showcasePrev,
        hasShowcaseNext: !!showcaseCursor,
        hasShowcasePrev: prevShowcaseCursors.length > 0,
    };
}
