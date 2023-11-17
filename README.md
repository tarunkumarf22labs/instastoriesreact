# To deploy 
 use below vite config file: 

import { defineConfig ,loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from "path";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

export default defineConfig(  ({mode}) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    define: {
      'process.env.NODE_ENV': JSON.stringify("production")
    },
    plugins: [react(), cssInjectedByJsPlugin()],
    build: {
      modulePreload: false,
      lib: {
        entry: resolve(  __dirname   , "src/main.tsx"),
        name: "f22",
        formats: ["iife"],
        fileName: "f22",
      },
    },
  } 
});

# To run on local host
use below vite config file: 

import { defineConfig ,loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
import { resolve } from "path";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

// https://vitejs.dev/config/
export default defineConfig( {
  // const env = loadEnv(mode, process.cwd(), '');

    plugins: [react(), cssInjectedByJsPlugin()],
    build: {
      modulePreload: false,
      lib: {
        // Could also be a dictionary or array of multiple entry points
        entry: resolve(  __dirname   , "src/main.tsx"),
        name: "f22",
        formats: ["iife"],
        // the proper extensions will be added
        fileName: "f22",
      },

  } 

});

