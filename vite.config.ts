import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

// Plugin to duplicate index.html to 404.html for GitHub Pages SPA routing
const copyIndexTo404 = () => ({
  name: 'copy-index-to-404',
  closeBundle() {
    const distPath = path.resolve(__dirname, 'dist');
    const indexPath = path.resolve(distPath, 'index.html');
    const notFoundPath = path.resolve(distPath, '404.html');
    if (fs.existsSync(indexPath)) {
      fs.copyFileSync(indexPath, notFoundPath);
    }
  },
});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), copyIndexTo404()],
  base: './',
  server: {
    port: 3000,
    open: false,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          qr: ['qr-code-styling', 'jsqr'],
          export: ['jspdf', 'jszip', 'canvas-confetti'],
        },
      },
    },
  },
});
