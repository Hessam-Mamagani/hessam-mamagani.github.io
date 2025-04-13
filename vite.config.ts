import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs-extra';

// Plugin to copy .nojekyll and other files
const copyExtraFiles = () => {
  return {
    name: 'copy-extra-files',
    closeBundle: async () => {
      // Ensure the dist directory exists
      await fs.ensureDir('dist');
      
      // Copy .nojekyll
      await fs.copy('public/.nojekyll', 'dist/.nojekyll');
      
      // Copy favicon files if they exist
      if (await fs.exists('public/favicon.ico')) {
        await fs.copy('public/favicon.ico', 'dist/favicon.ico');
      }
      if (await fs.exists('public/favicon.svg')) {
        await fs.copy('public/favicon.svg', 'dist/favicon.svg');
      }
    }
  };
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), copyExtraFiles()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  build: {
    outDir: 'dist',
    minify: 'terser',
    sourcemap: false,
    assetsInlineLimit: 4096, // 4kb
    copyPublicDir: true, // Ensure public directory is copied
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'framer-motion'],
          ui: ['lucide-react', '@radix-ui/react-slot'],
        },
        assetFileNames: 'assets/[name].[hash].[ext]',
      },
    },
  },
  server: {
    port: 3000,
    strictPort: true,
    host: true,
  },
  preview: {
    port: 4173,
    strictPort: true,
    host: true,
  },
  base: '/',
  publicDir: 'public',
  assetsInclude: ['**/*.svg', '**/*.ico', '**/*.pdf', '**/*.jpg', '**/*.png'],
});