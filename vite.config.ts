import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

// Custom plugin to create .htaccess for MIME types
const createHtaccessPlugin = () => {
  return {
    name: 'create-htaccess',
    closeBundle: () => {
      const htaccessContent = `
# Serve JS modules with the correct MIME type
<IfModule mod_mime.c>
  AddType application/javascript .js
  AddType application/javascript .mjs
</IfModule>

# For Vercel and other platforms that use headers
<IfModule mod_headers.c>
  <FilesMatch "\\.js$">
    Header set Content-Type "application/javascript"
  </FilesMatch>
  <FilesMatch "\\.mjs$">
    Header set Content-Type "application/javascript"
  </FilesMatch>
</IfModule>
      `;
      fs.writeFileSync(path.resolve(__dirname, 'dist', '.htaccess'), htaccessContent.trim());
    }
  };
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), createHtaccessPlugin()],
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
  assetsInclude: ['**/*.svg', '**/*.ico', '**/*.pdf'],
});