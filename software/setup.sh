#!/bin/bash

echo "🌊 Baliraja Water Park Management System Setup"
echo "=============================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if running on macOS
if [[ "$OSTYPE" == "darwin"* ]]; then
    echo -e "${BLUE}Detected macOS system${NC}"
else
    echo -e "${YELLOW}This script is optimized for macOS but may work on other Unix systems${NC}"
fi

echo ""
echo "📋 Prerequisites Check:"
echo "----------------------"

# Check Node.js
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    echo -e "${GREEN}✓ Node.js found: $NODE_VERSION${NC}"
else
    echo -e "${RED}✗ Node.js not found. Please install Node.js 14+ from https://nodejs.org${NC}"
    exit 1
fi

# Check npm
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm --version)
    echo -e "${GREEN}✓ npm found: $NPM_VERSION${NC}"
else
    echo -e "${RED}✗ npm not found${NC}"
    exit 1
fi

# Check PHP
if command -v php &> /dev/null; then
    PHP_VERSION=$(php --version | head -n 1)
    echo -e "${GREEN}✓ PHP found: $PHP_VERSION${NC}"
else
    echo -e "${RED}✗ PHP not found. Please install PHP 7.4+ or use XAMPP/MAMP${NC}"
    exit 1
fi

# Check Composer
if command -v composer &> /dev/null; then
    COMPOSER_VERSION=$(composer --version | head -n 1)
    echo -e "${GREEN}✓ Composer found: $COMPOSER_VERSION${NC}"
else
    echo -e "${YELLOW}⚠ Composer not found. Installing Composer...${NC}"
    # Install Composer
    curl -sS https://getcomposer.org/installer | php
    sudo mv composer.phar /usr/local/bin/composer
    echo -e "${GREEN}✓ Composer installed${NC}"
fi

# Check MySQL
if command -v mysql &> /dev/null; then
    echo -e "${GREEN}✓ MySQL found${NC}"
else
    echo -e "${YELLOW}⚠ MySQL not found. Please ensure MySQL is installed and running${NC}"
fi

echo ""
echo "🚀 Starting Installation:"
echo "------------------------"

# Install backend dependencies
echo -e "${BLUE}Installing PHP dependencies...${NC}"
cd backend
if composer install; then
    echo -e "${GREEN}✓ PHP dependencies installed${NC}"
else
    echo -e "${RED}✗ Failed to install PHP dependencies${NC}"
    exit 1
fi
cd ..

# Install frontend dependencies
echo -e "${BLUE}Installing React dependencies...${NC}"
cd baliraja-management
if npm install; then
    echo -e "${GREEN}✓ React dependencies installed${NC}"
else
    echo -e "${RED}✗ Failed to install React dependencies${NC}"
    exit 1
fi
cd ..

echo ""
echo "🗄️ Database Setup:"
echo "------------------"
echo -e "${YELLOW}Please ensure MySQL is running and create a database named 'baliraja_waterpark'${NC}"
echo -e "${YELLOW}Then import the schema: mysql -u root -p baliraja_waterpark < backend/database/schema.sql${NC}"

echo ""
echo "⚙️ Configuration:"
echo "----------------"
echo -e "${YELLOW}1. Update database credentials in: backend/config/database.php${NC}"
echo -e "${YELLOW}2. Update Razorpay keys in: backend/config/razorpay.php${NC}"
echo -e "${YELLOW}3. Place backend folder in your web server directory (htdocs/www)${NC}"

echo ""
echo "🎯 Running the Application:"
echo "--------------------------"
echo -e "${GREEN}Frontend (React):${NC} cd baliraja-management && npm start"
echo -e "${GREEN}Backend (PHP):${NC} Ensure web server is running and backend is accessible"

echo ""
echo "👥 Default Login Credentials:"
echo "----------------------------"
echo -e "${BLUE}Admin:${NC} admin / admin123"
echo -e "${BLUE}Booking Staff:${NC} booking / booking123"
echo -e "${BLUE}Gate Staff:${NC} gate / gate123"

echo ""
echo -e "${GREEN}🎉 Setup completed! Your Baliraja Water Park Management System is ready!${NC}"
echo -e "${BLUE}Visit: http://localhost:3000 to access the application${NC}"
