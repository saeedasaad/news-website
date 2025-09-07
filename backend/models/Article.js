import mongoose from "mongoose";

const articleSchema = new mongoose.Schema({
  source: {id: String,name: String,},
  author: String,
  title: { type: String, required: true },
  description: String,
  url: { type: String, required: true, unique: true },
  urlToImage: String,
  publishedAt: Date,
  content: String,
  fetchedAt: { type: Date, default: Date.now },
});

const Article = mongoose.models.Article || mongoose.model("Article", articleSchema);
export default Article;
