import axios from "axios";
import Article from "../models/Article.js";

const NEWS_API = "https://newsapi.org/v2/top-headlines";
const TTL_MINUTES = 30;

export default async function fetchAndStoreNews() {
  try {
    const response = await axios.get(NEWS_API, {
      params: {
        country: "us",
        pageSize: 50,
        apiKey: process.env.NEWS_API_KEY,
      },
      timeout: 15000,
    });

    const articles = response.data.articles || [];

    if (!Array.isArray(articles) || articles.length === 0) {
      console.warn("No articles received from News API.");
      return [];
    }

    const operations = articles.map((article) => ({
      updateOne: {
        filter: { url: article.url },
        update: {
          $set: {
            source: article.source || {},
            author: article.author || "Unknown",
            title: article.title,
            description: article.description || "",
            url: article.url,
            urlToImage: article.urlToImage || "",
            publishedAt: article.publishedAt ? new Date(article.publishedAt) : null,
            content: article.content || "",
            fetchedAt: new Date(),
          },
        },
        upsert: true,
      },
    }));

    await Article.bulkWrite(operations);
    return articles;
  } catch (error) {
    console.error("Error fetching news:", error.message || error);
    return [];
  }
}