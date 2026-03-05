export const runtime = "nodejs";

import cloudinary from "cloudinary";

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

function applyCors(req, res) {
    const origin = req.headers.origin || "";
    if (origin.includes("localhost") || origin.endsWith("vercel.app") || origin.includes(process.env.ALLOWED_ORIGIN || "")) {
        res.setHeader("Access-Control-Allow-Origin", origin);
    } else {
        res.setHeader("Access-Control-Allow-Origin", "*");
    }
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    if (req.method === "OPTIONS") {
        res.status(200).end();
        return true;
    }
    return false;
}

export default async function handler(req, res) {
    if (applyCors(req, res)) return;

    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { folder, config, password } = req.body;

    if (password !== process.env.ADMIN_PASSWORD) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    if (!folder) {
        return res.status(400).json({ error: "Folder is required" });
    }

    try {
        const configJson = JSON.stringify(config || {});
        const buffer = Buffer.from(configJson, "utf-8");
        const base64 = buffer.toString("base64");
        const dataUri = `data:application/json;base64,${base64}`;

        await new Promise((resolve, reject) => {
            cloudinary.v2.uploader.upload(
                dataUri,
                {
                    public_id: `${folder}/seraphine-config`,
                    resource_type: "raw",
                    overwrite: true,
                    invalidate: true,
                },
                (err, result) => {
                    if (err) reject(err);
                    else resolve(result);
                }
            );
        });

        return res.status(200).json({ success: true });
    } catch (error) {
        console.error("❌ Save config error:", error);
        return res.status(500).json({ error: error.message || "Failed to save config" });
    }
}
