import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import svgr from "vite-plugin-svgr"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr(), tailwindcss()],
  build: {
    chunkSizeWarningLimit: 700,
    rollupOptions: {
      output: {
        /** Split only stable, low-dependency packages to avoid circular chunk graphs */
        manualChunks(id) {
          if (!id.includes("node_modules")) return undefined
          if (id.includes("react-dom")) return "react-dom"
          if (id.includes("react-router")) return "react-router"
          if (id.includes("lucide-react")) return "lucide"
          return undefined
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 5178,
  },
})
