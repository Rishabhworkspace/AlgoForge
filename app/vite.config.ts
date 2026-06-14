import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig(() => ({
  base: '/',
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    'import.meta.env.VITE_API_BASE_URL': JSON.stringify(
      process.env.VITE_API_BASE_URL || 'https://algoforge-2-0.onrender.com'
    ),
  },
  build: {
    target: 'esnext',
    minify: 'esbuild',
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('framer-motion')) return 'vendor-framer-motion';
          if (id.includes('@monaco-editor') || id.includes('monaco-editor')) return 'vendor-monaco';
          if (id.includes('recharts') || id.includes('d3-')) return 'vendor-recharts';
          if (id.includes('@tanstack')) return 'vendor-tanstack';
          if (id.includes('@radix-ui')) return 'vendor-radix';
          if (id.includes('gsap')) return 'vendor-gsap';
          if (id.includes('react-markdown') || id.includes('remark') || id.includes('micromark')) return 'vendor-markdown';
          if (id.includes('node_modules')) return 'vendor';
        },
      },
    },
  },
}));