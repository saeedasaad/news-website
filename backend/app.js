import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import newsRoutes from "./routes/news.js";
import connectDB from "./config/connectDB.js";

dotenv.config();
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

// Routes
app.use("/api", newsRoutes);

// Static file serving
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// app.use(express.static(path.join(__dirname, "public")));

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "index.html"));
// });

export default app;