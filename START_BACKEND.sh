#!/bin/bash

# Start PHP Backend Server
echo "🚀 Starting PHP Backend Server..."
echo "📍 Backend will run at: http://localhost:8000"
echo "📁 Serving from: backend/"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

cd backend
php -S localhost:8000
