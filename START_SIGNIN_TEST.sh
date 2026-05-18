#!/bin/bash

# Medical Emergency System - Sign-In Test Script
# This script helps you test the sign-in functionality

echo "=================================="
echo "Medical Emergency - Sign-In Test"
echo "=================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if backend directory exists
if [ ! -d "backend" ]; then
    echo -e "${RED}Error: backend directory not found${NC}"
    exit 1
fi

echo -e "${YELLOW}Step 1: Testing Backend Setup${NC}"
echo "Starting PHP server on port 8000..."
echo ""

# Start backend server in background
cd backend
php -S localhost:8000 > /dev/null 2>&1 &
BACKEND_PID=$!
cd ..

# Wait for server to start
sleep 2

# Check if server is running
if ! curl -s http://localhost:8000/test.php > /dev/null; then
    echo -e "${RED}Failed to start backend server${NC}"
    kill $BACKEND_PID 2>/dev/null
    exit 1
fi

echo -e "${GREEN}✓ Backend server started on http://localhost:8000${NC}"
echo ""

# Run diagnostic check
echo -e "${YELLOW}Step 2: Running Diagnostic Check${NC}"
DIAGNOSTIC=$(curl -s http://localhost:8000/check-setup.php)
echo "$DIAGNOSTIC" | python3 -m json.tool 2>/dev/null || echo "$DIAGNOSTIC"
echo ""

# Test login endpoint
echo -e "${YELLOW}Step 3: Testing Login Endpoint${NC}"
echo "Testing with sample credentials..."
LOGIN_RESPONSE=$(curl -s -X POST http://localhost:8000/api/auth.php?action=login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password"}')

echo "$LOGIN_RESPONSE" | python3 -m json.tool 2>/dev/null || echo "$LOGIN_RESPONSE"
echo ""

# Check if login was successful
if echo "$LOGIN_RESPONSE" | grep -q '"success":true'; then
    echo -e "${GREEN}✓ Login endpoint is working!${NC}"
else
    echo -e "${RED}✗ Login failed. You may need to:${NC}"
    echo "  1. Create the database: mysql -u root -p -e 'CREATE DATABASE medical_emergency'"
    echo "  2. Import schema: mysql -u root -p medical_emergency < backend/database/schema.sql"
    echo "  3. Create a test user (see SIGNIN_FIX.md)"
fi
echo ""

echo -e "${YELLOW}Step 4: Instructions${NC}"
echo "Backend is running at: http://localhost:8000"
echo ""
echo "To start the frontend:"
echo "  cd frontend"
echo "  npm start"
echo ""
echo "To stop the backend server:"
echo "  kill $BACKEND_PID"
echo ""
echo "For detailed troubleshooting, see: SIGNIN_FIX.md"
echo ""
echo -e "${GREEN}Backend PID: $BACKEND_PID${NC}"
echo "Press Ctrl+C to stop the backend server"
echo ""

# Keep script running
wait $BACKEND_PID
