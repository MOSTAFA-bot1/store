import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(process.cwd(), 'src'),
    },
  },
  server: {
    port: 5173,
    strictPort: false,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
      '/uploads': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
  preview: {
    port: 4173,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    chunkSizeWarningLimit: 1200,
    rollupOptions: {
      output: {
        // Rolldown/Vite 8 expects manualChunks as a function.
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined;
          if (id.includes('react-router')) return 'router';
          if (id.includes('react-dom') || id.includes('/react/')) return 'react';
          if (id.includes('axios') || id.includes('zustand')) return 'vendor';
          return undefined;
        },
      },
    },
  },
  define: {
    __CLIENT_URL__: JSON.stringify(CLIENT_URL),
  },
});
