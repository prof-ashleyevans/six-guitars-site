import sharp from 'sharp';
import { readdir, stat, mkdir, copyFile } from 'fs/promises';
import { join, extname, basename, dirname } from 'path';
import { existsSync } from 'fs';

const IMAGES_DIR = './public/images';
const BACKUP_DIR = './public/images-original';

// Configuration for different image types
const CONFIG = {
  // Hero images - high quality, large
  hero: {
    jpeg: {
      quality: 85,
      progressive: true,
      mozjpeg: true
    },
    resize: {
      width: 1920,
      height: 1080,
      fit: 'inside',
      withoutEnlargement: true
    }
  },
  // Gallery images - high quality but compressed
  gallery: {
    jpeg: {
      quality: 85,
      progressive: true,
      mozjpeg: true
    },
    resize: {
      width: 1920,
      height: 1080,
      fit: 'inside',
      withoutEnlargement: true
    }
  },
  // About section images
  about: {
    jpeg: {
      quality: 85,
      progressive: true,
      mozjpeg: true
    },
    resize: {
      width: 1920,
      height: 1080,
      fit: 'inside',
      withoutEnlargement: true
    }
  },
  // Character images - smaller
  characters: {
    jpeg: {
      quality: 85,
      progressive: true,
      mozjpeg: true
    },
    resize: {
      width: 1200,
      fit: 'inside',
      withoutEnlargement: true
    }
  },
  // Icons and small images
  icons: {
    png: {
      compressionLevel: 9,
      quality: 85
    },
    resize: {
      width: 256,
      fit: 'inside',
      withoutEnlargement: true
    }
  },
  // Default for other images
  default: {
    jpeg: {
      quality: 85,
      progressive: true,
      mozjpeg: true
    },
    png: {
      compressionLevel: 9,
      quality: 85
    },
    resize: {
      width: 1920,
      fit: 'inside',
      withoutEnlargement: true
    }
  }
};

async function getFileSize(filePath) {
  const stats = await stat(filePath);
  return stats.size;
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

function getConfigForImage(filePath) {
  const fileName = basename(filePath).toLowerCase();
  const dir = dirname(filePath).toLowerCase();
  
  if (dir.includes('hero')) return CONFIG.hero;
  if (dir.includes('photo_gallery') || dir.includes('gallery')) return CONFIG.gallery;
  if (dir.includes('about')) return CONFIG.about;
  if (dir.includes('characters')) return CONFIG.characters;
  if (dir.includes('icons') || dir.includes('header_nav')) return CONFIG.icons;
  
  return CONFIG.default;
}

async function optimizeImage(inputPath, outputPath) {
  const fileName = basename(inputPath);
  const ext = extname(inputPath).toLowerCase();
  
  if (!['.jpg', '.jpeg', '.png'].includes(ext)) {
    console.log(`⏭️  Skipping ${fileName} (not an image)`);
    return null;
  }
  
  const config = getConfigForImage(inputPath);
  
  try {
    const originalSize = await getFileSize(inputPath);
    
    // Start with sharp
    let image = sharp(inputPath);
    
    // Apply resize if configured
    if (config.resize) {
      image = image.resize(config.resize);
    }
    
    // Convert and optimize based on file type
    if (ext === '.png' && config.png) {
      image = image.png(config.png);
    } else if (['.jpg', '.jpeg'].includes(ext) && config.jpeg) {
      image = image.jpeg(config.jpeg);
    }
    
    // Save the optimized image
    await image.toFile(outputPath);
    
    const optimizedSize = await getFileSize(outputPath);
    const savedBytes = originalSize - optimizedSize;
    const savedPercent = ((savedBytes / originalSize) * 100).toFixed(1);
    
    console.log(`✅ ${fileName}`);
    console.log(`   ${formatBytes(originalSize)} → ${formatBytes(optimizedSize)} (saved ${savedPercent}%)`);
    
    return { originalSize, optimizedSize, savedBytes };
  } catch (error) {
    console.error(`❌ Error optimizing ${fileName}:`, error.message);
    return null;
  }
}

async function processDirectory(dir, baseDir = IMAGES_DIR) {
  try {
    const files = await readdir(dir);
    let totalOriginal = 0;
    let totalOptimized = 0;
    let processedCount = 0;
    
    for (const file of files) {
      const filePath = join(dir, file);
      const stats = await stat(filePath);
      
      if (stats.isDirectory()) {
        // Recursively process subdirectories
        const subResults = await processDirectory(filePath, baseDir);
        totalOriginal += subResults.totalOriginal;
        totalOptimized += subResults.totalOptimized;
        processedCount += subResults.processedCount;
      } else {
        const ext = extname(file).toLowerCase();
        if (['.jpg', '.jpeg', '.png'].includes(ext)) {
          // Create backup
          const relativePath = filePath.replace(baseDir + '/', '');
          const backupPath = join(BACKUP_DIR, relativePath);
          const backupDir = dirname(backupPath);
          
          if (!existsSync(backupDir)) {
            await mkdir(backupDir, { recursive: true });
          }
          
          // Only backup if it doesn't exist
          if (!existsSync(backupPath)) {
            await copyFile(filePath, backupPath);
            console.log(`📦 Backed up: ${relativePath}`);
          }
          
          // Optimize in place
          const result = await optimizeImage(filePath, filePath);
          
          if (result) {
            totalOriginal += result.originalSize;
            totalOptimized += result.optimizedSize;
            processedCount++;
          }
        }
      }
    }
    
    return { totalOriginal, totalOptimized, processedCount };
  } catch (error) {
    console.error(`Error processing directory ${dir}:`, error);
    return { totalOriginal: 0, totalOptimized: 0, processedCount: 0 };
  }
}

async function main() {
  try {
    console.log('🖼️  Starting image optimization...\n');
    
    // Create backup directory
    await mkdir(BACKUP_DIR, { recursive: true });
    console.log(`📦 Original images will be backed up to: ${BACKUP_DIR}\n`);
    
    // Process images directory
    const results = await processDirectory(IMAGES_DIR);
    
    // Summary
    const totalSaved = results.totalOriginal - results.totalOptimized;
    const totalSavedPercent = results.totalOriginal > 0 
      ? ((totalSaved / results.totalOriginal) * 100).toFixed(1) 
      : '0';
    
    console.log('\n📊 Summary:');
    console.log(`   Images processed: ${results.processedCount}`);
    console.log(`   Original size:  ${formatBytes(results.totalOriginal)}`);
    console.log(`   Optimized size: ${formatBytes(results.totalOptimized)}`);
    console.log(`   Saved:          ${formatBytes(totalSaved)} (${totalSavedPercent}%)`);
    console.log(`\n✨ Images optimized in place`);
    console.log(`📦 Original images backed up to: ${BACKUP_DIR}`);
    console.log(`\n✅ All images are now optimized and ready to use with unoptimized prop!`);
    
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

// Run the optimization
main();
