import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import newsRoutes from "./routes/news.js";
import connectDB from "./config/connectDB.js";

// Create Express app
const app = express();
app.use(express.json());

// Connect to MongoDB
connectDB();

// CORS setup
const allowedOrigins = [process.env.FRONTEND_URL, "http://localhost:3000"];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error("CORS policy does not allow this origin."), false);
  },
  credentials: true,
}));

// API Routes
app.get("/", (req, res) => {
  res.send("API is running...");
});
app.use("/api/news", newsRoutes);

app.get("/.well-known/appspecific/com.chrome.devtools.json", (req, res) => {
  res.status(204).end();
});

// ----------------------------
// ✅ Serve frontend build
// ----------------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "dist")));

// React Router fallback (for non-API routes)
app.get("*", (req, res) => {
  if (req.path.startsWith("/api")) {
    return res.status(404).json({ error: "API route not found" });
  }
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// ----------------------------

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
