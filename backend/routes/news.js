import express from "express";
import axios from "axios";
import Article from "../models/Article.js";

const router = express.Router();
const NEWS_API = "https://newsapi.org/v2/top-headlines"; 

const TTL_MINUTES = 30;

async function fetchAndStoreNews() {
  const resp = await axios.get(NEWS_API, {
    params: { country: "us", pageSize: 50, apiKey: process.env.NEWS_API_KEY },
    timeout: 15000,
  });

  const articles = resp.data.articles || [];

  const ops = articles.map((a) => ({
    updateOne: {
      filter: { url: a.url },
      update: { $set: { ...a, fetchedAt: new Date() } },
      upsert: true,
    },
  }));

  if (ops.length) await Article.bulkWrite(ops);
  return articles;
}

router.get("/news", async (req, res) => {
  try {
    const latest = await Article.findOne().sort({ fetchedAt: -1 }).lean();
    const now = Date.now();
    if (latest && now - new Date(latest.fetchedAt).getTime() < TTL_MINUTES * 60 * 1000) {
      const cached = await Article.find().sort({ publishedAt: -1 }).limit(50).lean();
      return res.json({ source: "cache", articles: cached });
    }

    const fetched = await fetchAndStoreNews();
    const stored = await Article.find().sort({ publishedAt: -1 }).limit(50).lean();
    return res.json({ source: "api", articles: stored });
  } catch (err) {
    console.error("GET /news error", err);
    const fallback = await Article.find().sort({ publishedAt: -1 }).limit(50).lean();
    return res.status(500).json({ error: "Failed to fetch news", articles: fallback });
  }
});

router.post("/news/refresh", async (req, res) => {
  if (req.headers["x-refresh-token"] !== process.env.REFRESH_TOKEN) {
    return res.status(403).json({ error: "Forbidden" });
  }
  try {
    await fetchAndStoreNews();
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "refresh failed" });
  }
});

export default router;
