import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import newsRoutes from "./routes/news.js";
import connectDB from "./config/connectDB.js";

const app = express();

// Middleware
app.use(express.json());

// Connect to DB
connectDB();

// CORS setup (allow frontend domain on Vercel + local dev)
const allowedOrigins = [
  "http://localhost:5173",      // Vite dev
  "http://localhost:3000",      // CRA dev
  process.env.FRONTEND_URL      // your frontend Vercel URL, e.g. https://frontend.vercel.app
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("CORS policy does not allow this origin."), false);
    },
    credentials: true,
  })
);

// API routes only
app.use("/api/news", newsRoutes);

// Default route for health check
app.get("/", (req, res) => {
  res.json({ message: "Backend API is running 🚀" });
});

// Start server (for local dev, Vercel ignores listen)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
