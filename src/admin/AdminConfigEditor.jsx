import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiLock, FiLogOut, FiRefreshCw, FiTrash2, FiSave } from "react-icons/fi";
import { clearAllCache } from "../utils/useDriveFolderData";
import { SITE_CONFIG } from "../config/site.config";

const FOLDERS = {
    gallery: import.meta.env.VITE_CLOUDINARY_GALLERY_FOLDER || "Portfolio-Gallery",
    featured: import.meta.env.VITE_CLOUDINARY_FEATURED_FOLDER || "Portfolio-Featured",
    showcase: import.meta.env.VITE_CLOUDINARY_SHOWCASE_FOLDER || "Portfolio-Showcase",
};

export default function AdminConfigEditor() {
    const [authed, setAuthed] = useState(false);
    const [password, setPassword] = useState("");
    const [authError, setAuthError] = useState("");
    const [activeFolder, setActiveFolder] = useState("gallery");
    const [configText, setConfigText] = useState("{}");
    const [status, setStatus] = useState("");

    const adminPwd = import.meta.env.VITE_ADMIN_PASSWORD || "admin";
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const { brand } = SITE_CONFIG;

    const login = (e) => {
        e.preventDefault();
        if (password === adminPwd) { setAuthed(true); setAuthError(""); }
        else setAuthError("Incorrect password.");
    };

    const loadConfig = async () => {
        setStatus("Loading…");
        try {
            const folder = FOLDERS[activeFolder];
            const url = `https://res.cloudinary.com/${cloudName}/raw/upload/${folder}/config.json?t=${Date.now()}`;
            const res = await fetch(url, { cache: "no-store" });
            if (res.ok) {
                const data = await res.json();
                setConfigText(JSON.stringify(data, null, 2));
                setStatus("Loaded ✓");
            } else {
                setConfigText("{}");
                setStatus("No config found — starting fresh.");
            }
        } catch { setStatus("Error loading config."); }
    };

    useEffect(() => { if (authed) loadConfig(); }, [authed, activeFolder]);

    const saveConfig = async () => {
        setStatus("Saving…");
        try {
            const parsed = JSON.parse(configText);
            const res = await fetch("/api/save-config", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    folder: FOLDERS[activeFolder],
                    config: parsed,
                    password: import.meta.env.VITE_ADMIN_PASSWORD,
                }),
            });
            setStatus(res.ok ? "Saved ✓" : `Error: ${(await res.json()).error}`);
        } catch { setStatus("Invalid JSON — check syntax."); }
    };

    if (!authed) {
        return (
            <div
                className="min-h-screen flex items-center justify-center px-4"
                style={{ background: "var(--clr-bg)" }}
            >
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="card p-10 w-full max-w-sm text-center"
                    style={{ background: "var(--clr-bg-card)" }}
                >
                    <div
                        className="w-14 h-14 mx-auto mb-6 rounded-2xl flex items-center justify-center"
                        style={{ background: "var(--clr-accent)" }}
                    >
                        <FiLock size={22} style={{ color: "#1a1a1a" }} />
                    </div>
                    <h1 className="font-display text-2xl font-bold mb-1" style={{ color: "var(--clr-text)" }}>
                        Admin Panel
                    </h1>
                    <p className="text-sm mb-8" style={{ color: "var(--clr-muted)" }}>{brand.name}</p>

                    <form onSubmit={login} className="space-y-4 text-left">
                        <label className="block text-sm font-medium" style={{ color: "var(--clr-text)" }}>
                            Password
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="mt-1.5 w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2"
                                style={{
                                    borderColor: "var(--clr-border)",
                                    background: "var(--clr-bg)",
                                    color: "var(--clr-text)",
                                    "--tw-ring-color": "var(--clr-accent)",
                                }}
                                placeholder="Enter admin password"
                                autoFocus
                            />
                        </label>
                        {authError && <p className="text-red-500 text-xs">{authError}</p>}
                        <button type="submit" className="btn-primary w-full justify-center">
                            Sign In
                        </button>
                    </form>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen px-6 py-12" style={{ background: "var(--clr-bg)" }}>
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <h1 className="font-display text-3xl font-bold" style={{ color: "var(--clr-text)" }}>
                            Admin Panel
                        </h1>
                        <p className="text-sm mt-1" style={{ color: "var(--clr-muted)" }}>
                            Manage Cloudinary folder configurations
                        </p>
                    </div>
                    <button
                        onClick={() => { setAuthed(false); setPassword(""); }}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl border text-sm transition-all"
                        style={{ borderColor: "var(--clr-border)", color: "var(--clr-muted)" }}
                    >
                        <FiLogOut size={14} /> Logout
                    </button>
                </div>

                <div className="space-y-6">
                    {/* Folder selector */}
                    <div className="card p-6" style={{ background: "var(--clr-bg-card)" }}>
                        <h2 className="font-semibold mb-4 text-sm" style={{ color: "var(--clr-text)" }}>
                            Select Folder
                        </h2>
                        <div className="flex flex-wrap gap-3">
                            {Object.keys(FOLDERS).map((k) => (
                                <button
                                    key={k}
                                    onClick={() => setActiveFolder(k)}
                                    className="px-4 py-2 rounded-full text-sm font-medium capitalize border transition-all"
                                    style={
                                        k === activeFolder
                                            ? { background: "var(--clr-accent)", color: "#1a1a1a", borderColor: "var(--clr-accent)" }
                                            : { borderColor: "var(--clr-border)", color: "var(--clr-muted)", background: "transparent" }
                                    }
                                >
                                    {k} <span className="opacity-50 ml-1 text-xs">({FOLDERS[k]})</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Config editor */}
                    <div className="card p-6" style={{ background: "var(--clr-bg-card)" }}>
                        <div className="flex items-center justify-between mb-3">
                            <h2 className="font-semibold text-sm" style={{ color: "var(--clr-text)" }}>
                                config.json
                            </h2>
                            <button
                                onClick={loadConfig}
                                className="flex items-center gap-1.5 text-xs transition-all"
                                style={{ color: "var(--clr-accent)" }}
                            >
                                <FiRefreshCw size={12} /> Reload
                            </button>
                        </div>
                        <p className="text-xs mb-3" style={{ color: "var(--clr-muted)" }}>
                            Format: <code className="opacity-60">{`{ "filename": { "name": "Display Name", "description": "..." } }`}</code>
                        </p>
                        <textarea
                            value={configText}
                            onChange={(e) => setConfigText(e.target.value)}
                            className="w-full h-64 font-mono text-sm px-4 py-3 rounded-xl border resize-y focus:outline-none focus:ring-2"
                            style={{
                                borderColor: "var(--clr-border)",
                                background: "var(--clr-bg)",
                                color: "var(--clr-text)",
                            }}
                            spellCheck={false}
                        />
                        <div className="flex items-center justify-between mt-4">
                            <p
                                className={`text-xs ${status.toLowerCase().includes("error") || status.toLowerCase().includes("invalid")
                                    ? "text-red-400"
                                    : "text-green-500"
                                    }`}
                            >
                                {status}
                            </p>
                            <button onClick={saveConfig} className="btn-primary !py-2 !px-5 text-sm">
                                <FiSave size={14} /> Save
                            </button>
                        </div>
                    </div>

                    {/* Cache */}
                    <div className="card p-6" style={{ background: "var(--clr-bg-card)" }}>
                        <h2 className="font-semibold text-sm mb-1" style={{ color: "var(--clr-text)" }}>
                            Cache Management
                        </h2>
                        <p className="text-xs mb-4" style={{ color: "var(--clr-muted)" }}>
                            Images are cached locally for 1 hour to reduce API calls. Clear to force a refresh.
                        </p>
                        <button
                            onClick={() => { clearAllCache(); setStatus("Cache cleared ✓"); }}
                            className="flex items-center gap-2 px-4 py-2.5 rounded-full border text-sm font-medium transition-all text-red-400 border-red-400/30 hover:bg-red-400/10"
                        >
                            <FiTrash2 size={13} /> Clear All Cache
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
