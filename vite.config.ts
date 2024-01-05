import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    define: {
      "process.env.NODE_ENV": JSON.stringify("production"),
    },
    plugins: [react(), cssInjectedByJsPlugin()],
    build: {
      modulePreload: false,
      lib: {
        entry: resolve(__dirname, "src/main.tsx"),
        name: "f22",
        formats: ["iife"],
        fileName: "f22",
      },
    },
  };
});
