# GitHub Pages Deployment Guide

## Overview

Your Next.js portfolio has been configured for GitHub Pages deployment. Since GitHub Pages only serves static files, some modifications were necessary:

## What's Been Set Up

### 1. **Next.js Configuration**
- Static export enabled when `GITHUB_PAGES=true`
- Proper base path and asset prefix configuration
- Image optimization disabled for static export
- Trailing slashes enabled for GitHub Pages compatibility

### 2. **GitHub Actions Workflow**
- Automated deployment on push to `main` branch
- Builds and deploys to GitHub Pages
- Caches dependencies for faster builds

### 3. **Static Export Support**
- Added build scripts for GitHub Pages
- Proper handling of static assets
- `.nojekyll` file to prevent Jekyll processing

## Deployment Steps

### 1. Enable GitHub Pages

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Pages**
3. Under "Source", select **GitHub Actions**
4. Save the settings

### 2. Push Your Changes

```bash
git add .
git commit -m "Add GitHub Pages deployment"
git push origin main
```

### 3. Monitor Deployment

1. Go to the **Actions** tab in your repository
2. Watch the "Deploy to GitHub Pages" workflow
3. Once completed, your site will be available at:
   `https://ahmadcahyana.github.io/ahmadcahyana/`

## Important Limitations

### Server-Side Features Disabled

Since GitHub Pages only serves static files, the following features are **not available**:

1. **API Routes** - All `/api/*` endpoints won't work
2. **Server Actions** - Functions marked with `'use server'`
3. **AI Functionality** - The Genkit AI features won't work in static export
4. **Dynamic Routing** with server-side logic
5. **Real-time Features** - WebSockets, Server-Sent Events

### What Still Works

✅ **Static Content** - All your CV content, components, and styling
✅ **Client-Side JavaScript** - React interactions, state management
✅ **Static Images** - All images in the `/public` folder
✅ **CSS/Tailwind** - All styling and animations
✅ **Client-Side Routing** - Navigation between pages

## Alternative Deployment Options

If you need the full functionality (including AI features), consider these alternatives:

### 1. **Vercel** (Recommended for Next.js)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### 2. **Netlify**
- Connect your GitHub repository
- Build command: `npm run build`
- Publish directory: `.next`

### 3. **Docker Deployment**
Use the Docker setup we created earlier on any cloud provider:
- AWS ECS/Fargate
- Google Cloud Run
- DigitalOcean App Platform
- Railway
- Render

## File Structure Changes

```
├── .github/workflows/deploy.yml   # GitHub Actions workflow
├── next.config.ts                 # Updated with GitHub Pages config
├── package.json                   # Added GitHub Pages build scripts
├── public/.nojekyll              # Prevents Jekyll processing
└── README-github-pages.md        # This documentation
```

## Troubleshooting

### Build Fails
- Check the Actions tab for error details
- Ensure all dependencies are in `package.json`
- Verify no server-side code in static components

### Assets Not Loading
- Check that `basePath` is correctly set
- Verify image paths don't start with `/`
- Use relative paths for assets

### Page Not Found
- Ensure `trailingSlash: true` in next.config.ts
- Check that all routes are properly exported

## Local Testing

Test the static export locally:

```bash
# Build for GitHub Pages
npm run build:github

# Serve the static files
npx serve out
```

## Environment Variables

For GitHub Pages, add environment variables in:
**Repository Settings** → **Secrets and variables** → **Actions**

Note: Don't include sensitive data like API keys in static exports as they'll be visible to users.

## Custom Domain (Optional)

To use a custom domain:

1. Add a `CNAME` file to `/public/` with your domain name
2. Configure DNS to point to `ahmadcahyana.github.io`
3. Enable "Enforce HTTPS" in repository settings

---

Your portfolio is now ready for GitHub Pages! 🚀
