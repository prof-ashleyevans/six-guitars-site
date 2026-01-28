# Image Optimization Guide

## Overview
All images use the `unoptimized` prop to prevent Next.js image transformations (0 transformations = 0 cost).

Images are pre-optimized at build time using Sharp for fast loading while avoiding runtime transformations.

## How It Works

1. **Pre-optimization**: Images are optimized using Sharp before deployment
2. **Unoptimized prop**: All Next.js Image components use `unoptimized` prop
3. **Result**: 0 image transformations, fast loading, no Vercel optimization costs

## Optimizing Images

### First Time Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the optimization script:
   ```bash
   npm run optimize-images
   ```

### What the Script Does

- **Backs up originals**: Saves original images to `public/images-original/`
- **Optimizes in place**: Replaces images in `public/images/` with optimized versions
- **Smart resizing**: Different settings for hero, gallery, about, characters, icons
- **Quality**: 85% quality for great visuals with smaller file sizes

### Image Type Settings

- **Hero images**: Max 1920x1080px, 85% quality
- **Gallery images**: Max 1920x1080px, 85% quality  
- **About images**: Max 1920x1080px, 85% quality
- **Character images**: Max 1200px width, 85% quality
- **Icons**: Max 256px, 85% quality

## Adding New Images

1. Add new images to `public/images/` (in appropriate subfolder)
2. Run `npm run optimize-images` to optimize them
3. Images will automatically use `unoptimized` prop (already configured)

## Restoring Originals

If you need to restore original images:
```bash
cp -r public/images-original/* public/images/
```

## Benefits

✅ **0 Image Transformations** - No Vercel optimization costs
✅ **Fast Loading** - Pre-optimized images load quickly
✅ **Small File Sizes** - Optimized for web (typically 80-95% smaller)
✅ **Great Quality** - 85% quality maintains visual quality

## Current Status

All images in the following components use `unoptimized`:
- ✅ PhotoGallery
- ✅ HeroSection
- ✅ About
- ✅ Reviews
- ✅ Contact
- ✅ AudienceReviews
- ✅ CharacterGridSection
- ✅ HeaderNav
- ✅ IconRow
