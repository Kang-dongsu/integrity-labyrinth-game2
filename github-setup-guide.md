# GitHub Repository Setup Guide

## 🔗 **Step-by-Step GitHub Repository Creation**

### **Option 1: Using GitHub Web Interface (Recommended)**

1. **Go to GitHub.com**
   - Open your web browser
   - Navigate to https://github.com
   - Sign in to your account (or create one if needed)

2. **Create New Repository**
   - Click the "+" icon in the top right corner
   - Select "New repository"
   - Repository name: `labyrinth-of-integrity-game`
   - Description: `청렴의 미궁 - 30명 동시 접속 지원 방탈출 게임`
   - Set to **Public** (required for free Netlify deployment)
   - ✅ **Do NOT** initialize with README, .gitignore, or license
   - Click "Create repository"

3. **Copy Repository URL**
   - After creation, copy the HTTPS URL (should look like):
   - `https://github.com/[YOUR_USERNAME]/labyrinth-of-integrity-game.git`

### **Option 2: Using GitHub CLI (Advanced)**

If you have GitHub CLI installed:
```bash
gh repo create labyrinth-of-integrity-game --public --description "청렴의 미궁 - 30명 동시 접속 지원 방탈출 게임"
```

## 📤 **Pushing Code to GitHub**

### **Method 1: Using Command Line**

Open Command Prompt or PowerShell in your project folder and run:

```bash
# Initialize git repository (if not already done)
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: 청렴의 미궁 - 30명 동시 접속 웹앱"

# Add remote repository (replace [YOUR_REPO_URL] with actual URL)
git remote add origin [YOUR_REPO_URL]

# Push to GitHub
git branch -M main
git push -u origin main
```

### **Method 2: Using the Batch File**

Run the provided batch file:
```bash
.\github-push.bat
```

## ✅ **Verification Steps**

After pushing to GitHub:

1. **Check Repository Content**
   - Refresh your GitHub repository page
   - Verify all files are uploaded:
     - `src/` folder with components
     - `package.json`
     - `vite.config.ts`
     - `netlify.toml`
     - `index.html`

2. **Verify File Count**
   - Should see approximately 15-20 files
   - Key files must be present for deployment

3. **Check Commit History**
   - Should see your initial commit
   - Commit message should be visible

## 🔧 **Troubleshooting**

### **Error: "fatal: remote origin already exists"**
```bash
git remote remove origin
git remote add origin [YOUR_REPO_URL]
```

### **Error: "Permission denied"**
- Check if you're signed in to GitHub
- Verify repository URL is correct
- Try using GitHub Desktop instead

### **Error: "Nothing to commit"**
```bash
git add .
git commit -m "Force commit"
```

### **Large file warnings**
- If you see warnings about large files, that's normal
- `node_modules` should be ignored by `.gitignore`

## 🎯 **Next Steps After GitHub Setup**

Once your code is successfully pushed to GitHub:

1. ✅ Repository created and code uploaded
2. ➡️ **Next: Netlify Deployment**
3. ➡️ **Next: Environment Variables Setup**
4. ➡️ **Next: Live Testing with 30 users**

## 📋 **Ready for Netlify?**

Your repository should contain:
- ✅ Source code in `src/` folder
- ✅ `package.json` with dependencies
- ✅ `netlify.toml` configuration
- ✅ `.env.example` for environment variables
- ✅ Build configuration files

**🚀 You're now ready to deploy to Netlify!**