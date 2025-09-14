# 🚀 GitHub Setup Guide for Baliraja Water Park Management System

## Step 1: Create GitHub Repository

1. Go to [GitHub.com](https://github.com) and sign in
2. Click the **"+"** icon in the top right corner
3. Select **"New repository"**
4. Fill in the details:
   - **Repository name**: `baliraja-water-park-management`
   - **Description**: `Complete water park management system with React frontend and PHP backend`
   - **Visibility**: Choose Public or Private
   - ⚠️ **Important**: Do NOT check "Add a README file", ".gitignore", or "license" (we already have these)
5. Click **"Create repository"**

## Step 2: Upload Your Code to GitHub

After creating the repository, GitHub will show you setup instructions. Follow these commands:

### Option A: Using Our Setup Script (Recommended)
```bash
cd /Users/parshwachougale/Desktop/Baliraja/software
./github-setup.sh https://github.com/YOUR_USERNAME/baliraja-water-park-management.git
```

### Option B: Manual Setup
```bash
cd /Users/parshwachougale/Desktop/Baliraja/software
git remote add origin https://github.com/YOUR_USERNAME/baliraja-water-park-management.git
git push -u origin main
```

**Replace `YOUR_USERNAME` with your actual GitHub username!**

## Step 3: Deploy Backend to Web Hosting

Since GitHub Pages only hosts static files, you need to deploy the PHP backend to a web hosting service:

### Recommended Hosting Options:

#### 1. **Netlify + Serverless Functions** (Free)
- Deploy the React frontend to Netlify
- Convert PHP APIs to Netlify Functions

#### 2. **Vercel + Serverless Functions** (Free)
- Deploy frontend to Vercel
- Convert PHP to Vercel serverless functions

#### 3. **Traditional Web Hosting** (Paid)
- Upload backend folder to any PHP hosting (cPanel, etc.)
- Examples: Hostinger, SiteGround, Bluehost

#### 4. **Railway/Heroku** (Free/Paid)
- Deploy full-stack application
- Supports PHP and MySQL

## Step 4: Update Website Configuration

After deploying your backend, update the website configuration:

1. Open `/Users/parshwachougale/Desktop/Baliraja/website/src/config/api.js`
2. Replace the URLs in the `PRODUCTION` section:

```javascript
PRODUCTION: {
  BASE_URL: 'https://your-deployed-backend-url.com/api',
  BOOKING_ENDPOINT: 'https://your-deployed-backend-url.com/api/booking-system.php',
  PACKAGES_ENDPOINT: 'https://your-deployed-backend-url.com/api/packages.php',
  TICKETS_ENDPOINT: 'https://your-deployed-backend-url.com/api/tickets.php'
}
```

## Step 5: Environment Variables

Create a `.env` file in your website root with:

```env
REACT_APP_API_URL=https://your-deployed-backend-url.com/api
REACT_APP_ENVIRONMENT=production
```

## Step 6: Test the Integration

1. **Test Backend Health**:
   ```bash
   curl https://your-deployed-backend-url.com/api/health.php
   ```

2. **Test Website Connection**:
   - Open your website
   - Try booking a package
   - Check if it connects to your deployed backend

## Quick Deployment Commands

### For Netlify Deployment:
```bash
cd /Users/parshwachougale/Desktop/Baliraja/website
npm run build
# Then drag the 'build' folder to Netlify
```

### For Vercel Deployment:
```bash
cd /Users/parshwachougale/Desktop/Baliraja/website
npx vercel
```

## Repository Structure After Upload

```
baliraja-water-park-management/
├── backend/                 # PHP Backend APIs
│   ├── api/                # REST API endpoints
│   ├── config/             # Database & payment config
│   └── vendor/             # PHP dependencies
├── baliraja-management/    # React Admin Dashboard
│   ├── src/                # React components
│   └── public/             # Static assets
├── README.md               # Documentation
├── github-setup.sh         # Setup script
└── GITHUB_SETUP_GUIDE.md   # This guide
```

## Next Steps

1. ✅ Upload code to GitHub
2. 🚀 Deploy backend to hosting service
3. 🔗 Update website API configuration
4. 🧪 Test the complete integration
5. 🎉 Your water park management system is live!

## Support

If you encounter any issues:
1. Check the backend health endpoint
2. Verify API URLs in configuration
3. Check browser console for errors
4. Ensure CORS is properly configured

---

**🌊 Built for Baliraja Water Park Management**
