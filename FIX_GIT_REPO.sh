#!/bin/bash

# Script to fix the git repository structure
# This will move the git repository from Downloads to Medical Laravel folder

echo "🔧 Fixing Git Repository Structure..."
echo ""

# Step 1: Remove the git repository from parent Downloads folder
echo "Step 1: Cleaning up parent git repository..."
cd /Users/kartikpundir/Downloads
if [ -d ".git" ]; then
    echo "  ⚠️  Found .git in Downloads folder"
    echo "  📦 Creating backup of .git folder..."
    mv .git .git.backup.$(date +%Y%m%d_%H%M%S)
    echo "  ✅ Backup created"
fi

# Step 2: Initialize fresh git repository in Medical Laravel folder
echo ""
echo "Step 2: Initializing git in Medical Laravel folder..."
cd "Medical Laravel"

# Remove any existing .git folder
if [ -d ".git" ]; then
    rm -rf .git
fi

# Initialize new repository
git init
echo "  ✅ Git initialized"

# Step 3: Add remote
echo ""
echo "Step 3: Adding remote repository..."
git remote add origin https://github.com/Kartik-Pundir/Medical-Emergency.git
echo "  ✅ Remote added"

# Step 4: Add all project files
echo ""
echo "Step 4: Adding project files..."
git add .
echo "  ✅ Files staged"

# Step 5: Create commit
echo ""
echo "Step 5: Creating commit..."
git commit -m "feat: Enhanced dashboard with comprehensive healthcare content

- Added hero section with call-to-action buttons
- Implemented statistics cards with trends
- Created emergency services section with 24/7 hotline
- Added healthcare services showcase (6 specialties)
- Expanded quick actions from 4 to 8 services
- Added 'Why Choose Us' section with key features
- Implemented emergency contact section
- Enhanced UI with modern healthcare theme
- Improved loading and empty states"
echo "  ✅ Commit created"

# Step 6: Push to GitHub
echo ""
echo "Step 6: Pushing to GitHub..."
echo "  ⚠️  This will force push to overwrite the remote repository"
read -p "  Do you want to continue? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    git push -f origin main
    echo "  ✅ Pushed to GitHub"
else
    echo "  ⏭️  Skipped push. You can manually push later with: git push -f origin main"
fi

echo ""
echo "✨ Done! Your git repository is now properly configured."
echo ""
echo "📍 Repository location: /Users/kartikpundir/Downloads/Medical Laravel"
echo "🔗 Remote URL: https://github.com/Kartik-Pundir/Medical-Emergency.git"
echo ""
echo "Next steps:"
echo "  1. Visit http://localhost:3000 to see your enhanced dashboard"
echo "  2. Check https://github.com/Kartik-Pundir/Medical-Emergency to verify the push"
echo ""
