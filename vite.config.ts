import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs-extra';

// Plugin to copy .nojekyll and other files with logging
const copyExtraFiles = () => {
  return {
    name: 'copy-extra-files',
    closeBundle: async () => {
      console.log('🔍 Starting file copy process...');
      
      try {
        // Log current working directory
        console.log('📂 Current working directory:', process.cwd());
        
        // Ensure the dist directory exists
        await fs.ensureDir('dist');
        console.log('✅ Dist directory ensured');
        
        // List contents of public directory
        const publicContents = await fs.readdir('public');
        console.log('📁 Public directory contents:', publicContents);
        
        // Copy .nojekyll
        if (await fs.exists('public/.nojekyll')) {
          await fs.copy('public/.nojekyll', 'dist/.nojekyll');
          console.log('✅ Copied .nojekyll file');
        } else {
          console.log('⚠️ .nojekyll not found in public directory');
          // Create it if it doesn't exist
          await fs.writeFile('dist/.nojekyll', '');
          console.log('✅ Created new .nojekyll file');
        }
        
        // Create CNAME if needed
        await fs.writeFile('dist/CNAME', 'hessam-mamagani.github.io');
        console.log('✅ Created CNAME file');
        
        // Copy 404.html for GitHub Pages
        if (await fs.exists('public/404.html')) {
          await fs.copy('public/404.html', 'dist/404.html');
          console.log('✅ Copied 404.html');
        }
        
        // Copy favicon files if they exist
        if (await fs.exists('public/favicon.ico')) {
          await fs.copy('public/favicon.ico', 'dist/favicon.ico');
          console.log('✅ Copied favicon.ico');
        } else {
          console.log('⚠️ favicon.ico not found');
        }
        
        if (await fs.exists('public/favicon.svg')) {
          await fs.copy('public/favicon.svg', 'dist/favicon.svg');
          console.log('✅ Copied favicon.svg');
        } else {
          console.log('⚠️ favicon.svg not found');
        }
        
        // List contents of dist directory after copying
        const distContents = await fs.readdir('dist');
        console.log('📁 Final dist directory contents:', distContents);
        
      } catch (error) {
        console.error('❌ Error during file copy:', error);
        throw error;
      }
    }
  };
};

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => ({
  plugins: [
    react(),
    copyExtraFiles(),
    {
      name: 'log-build-info',
      configResolved(config) {
        console.log('📝 Build Configuration:');
        console.log('- Base URL:', config.base);
        console.log('- Output Directory:', config.build.outDir);
        console.log('- Public Directory:', config.publicDir);
      }
    }
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  base: command === 'serve' ? '/' : '/',
  build: {
    outDir: 'dist',
    minify: 'terser',
    sourcemap: false,
    assetsInlineLimit: 4096,
    copyPublicDir: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html')
      },
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'framer-motion'],
          ui: ['lucide-react', '@radix-ui/react-slot'],
        },
        format: 'es',
        assetFileNames: (assetInfo) => {
          const name = assetInfo.name || '';
          const extType = name.split('.').at(1) || 'asset';
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            return `assets/img/[name].[hash][extname]`;
          }
          return `assets/${extType}/[name].[hash][extname]`;
        },
        chunkFileNames: 'assets/js/[name].[hash].js',
        entryFileNames: 'assets/js/[name].[hash].js',
      },
    },
  },
  server: {
    port: 3000,
    strictPort: true,
    host: true,
    hmr: {
      overlay: true,
      clientPort: 3000
    },
    watch: {
      usePolling: true
    }
  },
  preview: {
    port: 4173,
    strictPort: true,
    host: true,
  },
  publicDir: 'public',
  assetsInclude: ['**/*.svg', '**/*.ico', '**/*.pdf', '**/*.jpg', '**/*.png'],
}));