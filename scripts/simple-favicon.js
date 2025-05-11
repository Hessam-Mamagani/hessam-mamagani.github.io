import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current file and directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generateSimpleFavicon() {
  try {
    // Define source and target paths
    const inputPath = path.join(__dirname, '../public/profile.jpg');
    const outputPathIco = path.join(__dirname, '../public/favicon.ico');
    const outputPathPng16 = path.join(__dirname, '../public/favicon-16x16.png');
    const outputPathPng32 = path.join(__dirname, '../public/favicon-32x32.png');
    
    console.log(`Processing image from: ${inputPath}`);
    
    if (!fs.existsSync(inputPath)) {
      console.error('Profile image not found at:', inputPath);
      return;
    }

    // Generate 16x16 PNG
    await sharp(inputPath)
      .resize(16, 16, { fit: 'cover' })
      .png()
      .toFile(outputPathPng16);
    console.log('Created 16x16 PNG favicon');
    
    // Generate 32x32 PNG
    await sharp(inputPath)
      .resize(32, 32, { fit: 'cover' })
      .png()
      .toFile(outputPathPng32);
    console.log('Created 32x32 PNG favicon');
    
    // Copy the 32x32 PNG as favicon.ico (simple approach)
    fs.copyFileSync(outputPathPng32, outputPathIco);
    console.log('Created favicon.ico');
    
    console.log('Successfully generated favicon files');
  } catch (error) {
    console.error('Error generating favicon:', error);
  }
}

generateSimpleFavicon(); 