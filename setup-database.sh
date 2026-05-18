#!/bin/bash

# Database Setup Script for Medical Emergency System

echo "=================================="
echo "Database Setup"
echo "=================================="
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Check if MySQL is running
if ! command -v mysql &> /dev/null; then
    echo -e "${RED}MySQL is not installed or not in PATH${NC}"
    echo "Please install MySQL first"
    exit 1
fi

echo -e "${YELLOW}This script will:${NC}"
echo "1. Create the medical_emergency database"
echo "2. Import the schema"
echo "3. Create a test user"
echo ""

read -p "Enter MySQL root password: " -s MYSQL_PASSWORD
echo ""

# Create database
echo -e "${YELLOW}Creating database...${NC}"
mysql -u root -p"$MYSQL_PASSWORD" -e "CREATE DATABASE IF NOT EXISTS medical_emergency CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;" 2>/dev/null

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Database created${NC}"
else
    echo -e "${RED}✗ Failed to create database. Check your password.${NC}"
    exit 1
fi

# Import schema
echo -e "${YELLOW}Importing schema...${NC}"
mysql -u root -p"$MYSQL_PASSWORD" medical_emergency < backend/database/schema.sql 2>/dev/null

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Schema imported${NC}"
else
    echo -e "${RED}✗ Failed to import schema${NC}"
    exit 1
fi

# Create test user
echo -e "${YELLOW}Creating test user...${NC}"
mysql -u root -p"$MYSQL_PASSWORD" medical_emergency < backend/database/create-test-user.sql 2>/dev/null

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Test user created${NC}"
else
    echo -e "${RED}✗ Failed to create test user${NC}"
    exit 1
fi

echo ""
echo -e "${GREEN}=================================="
echo "Setup Complete!"
echo "==================================${NC}"
echo ""
echo "Test Login Credentials:"
echo "  Email: test@example.com"
echo "  Password: password"
echo ""
echo "Next steps:"
echo "1. Start backend: cd backend && php -S localhost:8000"
echo "2. Start frontend: cd frontend && npm start"
echo "3. Open browser: http://localhost:3000"
echo ""
