import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000", //contains /api make the request prefix localhost
        secure: false, //because not https
      },
    },
  },
  plugins: [react()],
});
