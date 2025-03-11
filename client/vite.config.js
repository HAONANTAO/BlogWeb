/*
 * @Date: 2024-04-06 20:14:19
 * @LastEditors: 陶浩南 14639548+haonantao-aaron@user.noreply.gitee.com
 * @LastEditTime: 2025-03-11 22:39:16
 * @FilePath: /BlogWeb/client/vite.config.js
 */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target:
          "https://blog-web-eight-zeta.vercel.app/api" ||
          "http://localhost:3000", // 使用环境变量控制 API URL
        secure: false, // 不使用 https 时设置为 false
        changeOrigin: true, // 确保正确代理请求
      },
    },
  },
  plugins: [react()],
});
