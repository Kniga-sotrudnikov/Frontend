import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import svgr from "vite-plugin-svgr";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd());
  return {plugins: [react(), tailwindcss(), svgr(), tsconfigPaths({ root: __dirname })],
  server: {
    proxy: {
      "/api/v1": {
        target: env.VITE_API_URL,
        changeOrigin: true,
        secure: false,
      },
    },
  },
};
  // resolve: {
  // alias: {
  // "@": path.resolve(__dirname, "./src"),
  // },
  // },
});
