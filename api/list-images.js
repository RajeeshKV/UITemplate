export const runtime = "nodejs";

import cloudinary from "cloudinary";

// ✅ Configure Cloudinary
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ✅ CORS helper
function applyCors(req, res) {
    const origin = req.headers.origin || "";
    if (
        origin.includes("localhost") ||
        origin.endsWith("vercel.app") ||
        origin.includes(process.env.ALLOWED_ORIGIN || "")
    ) {
        res.setHeader("Access-Control-Allow-Origin", origin);
    } else {
        res.setHeader("Access-Control-Allow-Origin", "*");
    }
    res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    if (req.method === "OPTIONS") {
        res.status(200).end();
        return true;
    }
    return false;
}

export default async function handler(req, res) {
    if (applyCors(req, res)) return;

    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const folder = req.query.folder || "Seraphine-Trending";
        const maxResults = parseInt(req.query.pageSize || "12");
        const nextCursor = req.query.nextCursor || undefined;

        const search = cloudinary.v2.search
            .expression(`folder="${folder}" AND resource_type:image`)
            .sort_by("created_at", "desc")
            .max_results(maxResults);

        if (nextCursor) search.next_cursor(nextCursor);

        const searchResult = await search.execute();

        const items = (searchResult.resources || []).map((r) => ({
            id: r.public_id,
            url: r.secure_url,
            name: r.public_id.split("/").pop(),
            format: r.format,
            width: r.width,
            height: r.height,
            created_at: r.created_at,
        }));

        return res.status(200).json({
            items,
            nextCursor: searchResult.next_cursor || null,
        });
    } catch (error) {
        console.error("❌ Cloudinary search error:", error);
        return res.status(500).json({
            error: error.message || "Failed to fetch Cloudinary images",
        });
    }
}
