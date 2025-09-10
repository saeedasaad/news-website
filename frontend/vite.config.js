import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// 👇 Vercel will serve your frontend, not Express
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  }
});
