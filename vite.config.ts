import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import fs from "fs-extra";

// Plugin to copy .nojekyll and other files with logging
const copyExtraFiles = () => {
  return {
    name: "copy-extra-files",
    closeBundle: async () => {
      console.log("🔍 Starting file copy process...");

      try {
        // Log current working directory
        console.log("📂 Current working directory:", process.cwd());

        // Ensure the dist directory exists
        await fs.ensureDir("dist");
        console.log("✅ Dist directory ensured");

        // List contents of public directory
        const publicContents = await fs.readdir("public");
        console.log("📁 Public directory contents:", publicContents);

        // Copy .nojekyll
        if (await fs.exists("public/.nojekyll")) {
          await fs.copy("public/.nojekyll", "dist/.nojekyll");
          console.log("✅ Copied .nojekyll file");
        } else {
          console.log("⚠️ .nojekyll not found in public directory");
          // Create it if it doesn't exist
          await fs.writeFile("dist/.nojekyll", "");
          console.log("✅ Created new .nojekyll file");
        }

        // Copy favicon files if they exist
        const faviconFiles = [
          'favicon.ico',
          'favicon-16x16.png',
          'favicon-32x32.png'
        ];
        
        for (const faviconFile of faviconFiles) {
          if (await fs.exists(`public/${faviconFile}`)) {
            await fs.copy(`public/${faviconFile}`, `dist/${faviconFile}`);
            console.log(`✅ Copied ${faviconFile}`);
          } else {
            console.log(`⚠️ ${faviconFile} not found`);
          }
        }

        // Copy profile.jpg for OG tags
        if (await fs.exists("public/profile.jpg")) {
          await fs.copy("public/profile.jpg", "dist/profile.jpg");
          console.log("✅ Copied profile.jpg");
        } else {
          console.log("⚠️ profile.jpg not found");
        }

        // List contents of dist directory after copying
        const distContents = await fs.readdir("dist");
        console.log("📁 Final dist directory contents:", distContents);
      } catch (error) {
        console.error("❌ Error during file copy:", error);
        throw error;
      }
    },
  };
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    copyExtraFiles(),
    {
      name: "log-build-info",
      configResolved(config) {
        console.log("📝 Build Configuration:");
        console.log("- Base URL:", config.base);
        console.log("- Output Directory:", config.build.outDir);
        console.log("- Public Directory:", config.publicDir);
      },
    },
  ],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  build: {
    outDir: "dist",
    minify: "terser",
    sourcemap: false,
    assetsInlineLimit: 4096, // 4kb
    copyPublicDir: true,
    assetsDir: "assets",
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "framer-motion"],
          ui: ["lucide-react", "@radix-ui/react-slot"],
        },
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          
          // Special handling for images
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
            return `images/[name].[hash][extname]`;
          }
          
          // Other assets
          return `assets/[name].[hash][extname]`;
        },
        entryFileNames: 'js/[name].[hash].js',
        chunkFileNames: 'js/[name].[hash].js',
      },
      input: {
        main: './index.html',
      },
    },
  },
  server: {
    port: 3000,
    strictPort: true,
    host: true,
    watch: {
      usePolling: true,
    },
    headers: {
      'Cache-Control': 'no-store',
    },
  },
  preview: {
    port: 4173,
    strictPort: true,
    host: true,
  },
  base: "/",
  publicDir: "public",
  assetsInclude: [
    "**/*.png",
    "**/*.jpg",
    "**/*.jpeg",
    "**/*.gif",
    "**/*.svg",
    "**/*.ico",
    "**/*.pdf",
  ],
});
