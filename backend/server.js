import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
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

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});