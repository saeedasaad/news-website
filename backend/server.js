import dotenv from "dotenv";
dotenv.config();

import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import cors from "cors";
import newsRoutes from "./routes/news.js";
import connectDB from "./config/connectDB.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();


app.use(express.json());


connectDB();

// CORS setup
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  process.env.FRONTEND_URL
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


app.use(express.static(path.join(__dirname, "dist")));


app.use("/api/news", newsRoutes);


// Handle root path
app.get("/", (req, res) => {
  res.json({ message: "API running..." });
});


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
