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
    // Target modern browsers for smaller, faster output
    target: 'esnext',
    // Use esbuild for minification (much faster than terser)
    minify: 'esbuild',
    // Raise the warning threshold slightly — we're code splitting
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Heavy animation library
          if (id.includes('framer-motion')) return 'vendor-framer-motion';
          // Code editor (very heavy ~2MB, only used in ProblemWorkspace)
          if (id.includes('@monaco-editor') || id.includes('monaco-editor')) return 'vendor-monaco';
          // Charts (only used in Dashboard)
          if (id.includes('recharts') || id.includes('d3-')) return 'vendor-recharts';
          // React Query
          if (id.includes('@tanstack')) return 'vendor-tanstack';
          // Radix UI primitives
          if (id.includes('@radix-ui')) return 'vendor-radix';
          // GSAP animation library
          if (id.includes('gsap')) return 'vendor-gsap';
          // React markdown rendering
          if (id.includes('react-markdown') || id.includes('remark') || id.includes('micromark')) return 'vendor-markdown';
          // Remaining node_modules go into a general vendor chunk
          if (id.includes('node_modules')) return 'vendor';
        },
      },
    },
  },
}));
