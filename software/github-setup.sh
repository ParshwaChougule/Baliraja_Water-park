#!/bin/bash

echo "🚀 Baliraja Water Park Management System - GitHub Setup"
echo "======================================================="
echo ""

# Check if GitHub repository URL is provided
if [ -z "$1" ]; then
    echo "❌ Error: Please provide your GitHub repository URL"
    echo ""
    echo "Usage: ./github-setup.sh <your-github-repo-url>"
    echo "Example: ./github-setup.sh https://github.com/yourusername/baliraja-water-park-management.git"
    echo ""
    echo "Steps to get your repository URL:"
    echo "1. Go to https://github.com"
    echo "2. Click '+' → 'New repository'"
    echo "3. Name: baliraja-water-park-management"
    echo "4. Don't initialize with README"
    echo "5. Click 'Create repository'"
    echo "6. Copy the HTTPS URL from the quick setup"
    exit 1
fi

REPO_URL=$1

echo "📁 Setting up remote repository..."
git remote add origin $REPO_URL

echo "📤 Pushing to GitHub..."
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ SUCCESS! Your software has been uploaded to GitHub!"
    echo "🔗 Repository URL: $REPO_URL"
    echo ""
    echo "Next steps:"
    echo "1. Your software is now on GitHub"
    echo "2. We'll configure your website to connect to this software"
    echo "3. The management system will be accessible via the web"
    echo ""
else
    echo ""
    echo "❌ Error: Failed to push to GitHub"
    echo "Please check:"
    echo "1. Repository URL is correct"
    echo "2. You have access to the repository"
    echo "3. Repository exists and is empty"
    echo ""
fi
