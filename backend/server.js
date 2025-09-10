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

// CORS setup
const allowedOrigins = [
  "http://localhost:5173",                    
  "http://localhost:3000",                     
  "https://news-website-frontend-ochre.vercel.app", 
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(
        new Error("CORS policy does not allow this origin."),
        false
      );
    },
    credentials: true,
  })
);

// API routes
app.use("/api/news", newsRoutes);

// Health check route
app.get("/", (req, res) => {
  res.json({ message: "Backend API is running " });
});

// Local dev server (Vercel ignores this)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
