import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

export default defineConfig({
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
  },
  plugins: [react(), cssInjectedByJsPlugin()],
  build: {
    modulePreload: false,
    lib: {
      entry: resolve(__dirname, "src/main.tsx"),
      name: "stories",
      formats: ["iife"],
      fileName: "stories",
    },
  },
});