# Seraphine Flowers UI Template

A **plug-and-play**, Cloudinary-powered floral e-commerce website template.

## 🚀 Quick Start

1. Copy this template
2. Set your environment variables in `.env`
3. Run `npm install && npm run dev`

## 🌸 Features

- Animated petal background (Framer Motion)
- Dynamic images from Cloudinary
- Dark/Light mode toggle
- Responsive Navbar with mobile menu
- Hero section with gradient CTA
- Product Carousel (Trending)
- Gallery with pagination
- About section
- Contact / Footer section
- Scroll-to-top button
- Admin panel at `/admin`

## ⚙️ Configuration

Edit `.env` file:

```
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_GALLERY_FOLDER=YourGalleryFolder
VITE_CLOUDINARY_TRENDING_FOLDER=YourTrendingFolder
VITE_CLOUDINARY_CUSTOMER_FOLDER=YourCustomerFolder
VITE_ADMIN_PASSWORD=your_admin_password

# For serverless API (Vercel deployment):
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
ADMIN_PASSWORD=your_admin_password
```

## 📁 Cloudinary Setup

Upload a `seraphine-config.json` to each Cloudinary folder to add metadata:

```json
{
  "image-name": {
    "name": "Display Name",
    "description": "Product description"
  }
}
```

## 🌐 Deployment

Deploy to Vercel for automatic serverless API support.

## ✏️ Customization

Edit `src/config/site.config.js` to update:
- Brand name & tagline
- Social media links
- Navigation links
- Contact info
- About text
