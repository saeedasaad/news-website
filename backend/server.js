import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import newsRoutes from "./routes/news.js";

dotenv.config();

const app = express();
app.use(express.json());

// CORS setup
const allowedOrigins = [process.env.FRONTEND_URL, "http://localhost:3000"];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error("CORS policy does not allow this origin."), false);
  },
  credentials: true
}));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB connected"))
  .catch(err => {
    console.error("MongoDB error:", err);
    process.exit(1);
  });

// Routes
app.use("/api", newsRoutes);


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "public")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});


export default app;