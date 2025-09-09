import express from "express";
import Article from "../models/Article.js";
import fetchAndStoreNews from "../utils/fetchAndStoreNews.js";

const router = express.Router();
const TTL_MINUTES = 30;

router.get("/news", async (req, res) => {
  try {
    res.setHeader("Content-Type", "application/json");

    const latest = await Article.findOne().sort({ fetchedAt: -1 }).lean();
    const now = Date.now();

    if (latest && now - new Date(latest.fetchedAt).getTime() < TTL_MINUTES * 60 * 1000) {
      const cached = await Article.find().sort({ publishedAt: -1 }).limit(50).lean();
      return res.status(200).json({ source: "cache", articles: cached });
    }

    await fetchAndStoreNews();
    const stored = await Article.find().sort({ publishedAt: -1 }).limit(50).lean();
    return res.status(200).json({ source: "api", articles: stored });
  } catch (err) {
    console.error("GET /news error:", err.message);
    const fallback = await Article.find().sort({ publishedAt: -1 }).limit(50).lean();
    return res.status(500).json({ error: "Failed to fetch news", articles: fallback });
  }
});

export default router;