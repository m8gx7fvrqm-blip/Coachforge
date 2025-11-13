# 🚀 GitHub Pages Deployment Guide

Follow these steps to deploy your CoachForge website to GitHub Pages:

## Step 1: Install Git (if needed)

If you don't have git installed, you can:
- **Option A**: Install Xcode Command Line Tools (recommended for Mac)
  - Open Terminal and run: `xcode-select --install`
  - Follow the installation prompts

- **Option B**: Install Git directly
  - Visit: https://git-scm.com/download/mac
  - Download and install

## Step 2: Create GitHub Account & Repository

1. Go to https://github.com and sign up (or sign in)
2. Click the **"+"** icon in the top right → **"New repository"**
3. Repository name: `coachforge` (or any name you prefer)
4. Make it **Public** (required for free GitHub Pages)
5. **DO NOT** initialize with README, .gitignore, or license
6. Click **"Create repository"**

## Step 3: Upload Files via GitHub Web Interface

1. On your new repository page, click **"uploading an existing file"**
2. Drag and drop these 3 files:
   - `index.html`
   - `styles.css`
   - `script.js`
3. Scroll down and click **"Commit changes"**

## Step 4: Enable GitHub Pages

1. In your repository, go to **Settings** (top menu)
2. Scroll down to **Pages** (left sidebar)
3. Under **Source**, select **"Deploy from a branch"**
4. Select branch: **main** (or **master**)
5. Select folder: **/ (root)**
6. Click **Save**

## Step 5: Get Your Live Link

1. Wait 1-2 minutes for GitHub to build your site
2. Your site will be live at:
   ```
   https://YOUR-USERNAME.github.io/coachforge
   ```
   (Replace YOUR-USERNAME with your GitHub username)

## Alternative: Using Terminal (If Git is Installed)

If you have git installed, you can use these commands:

```bash
cd "/Users/macbookpro/untitled folder"

# Initialize git
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit: CoachForge website"

# Add GitHub remote (replace YOUR-USERNAME and REPO-NAME)
git remote add origin https://github.com/YOUR-USERNAME/REPO-NAME.git

# Push to GitHub
git branch -M main
git push -u origin main
```

Then follow Step 4 above to enable GitHub Pages.

## Your Files Are Ready! ✅

All your website files are in this folder:
- ✅ index.html
- ✅ styles.css  
- ✅ script.js
- ✅ README.md
- ✅ .gitignore

Just upload them to GitHub and enable Pages!

---

**Need Help?** GitHub has great documentation: https://docs.github.com/en/pages

