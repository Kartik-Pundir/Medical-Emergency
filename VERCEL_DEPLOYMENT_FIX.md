# 🚀 Vercel Deployment Fix Guide

## Current Issue

Your app is deployed on Vercel but the sign-in/registration is failing because:

1. ❌ **Frontend is trying to connect to localhost** - Won't work in production
2. ❌ **Backend API files missing CORS headers** - Browser blocks requests
3. ❌ **No database connection in production** - PHP backend needs a database
4. ❌ **Missing environment variables** - API URL not configured

## ⚠️ Important: PHP Backend on Vercel

**Vercel has limited PHP support.** For a production Medical Emergency System, you need:

### Option 1: Use a Proper PHP Hosting (Recommended)

**Best for PHP + MySQL apps:**
- **Railway.app** - Easy PHP + MySQL deployment
- **Heroku** - Supports PHP with MySQL add-ons
- **DigitalOcean App Platform** - Full PHP + MySQL support
- **AWS Elastic Beanstalk** - Enterprise-grade
- **Traditional hosting** - Hostinger, SiteGround, etc.

### Option 2: Separate Frontend/Backend (Current Setup)

- **Frontend on Vercel** (React app)
- **Backend on PHP hosting** (API + Database)

## 🔧 Quick Fix for Current Deployment

### Step 1: Deploy Backend to PHP Hosting

You need to deploy the `backend` folder to a PHP hosting service with MySQL.

**Recommended: Railway.app (Free tier available)**

1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Create new project
4. Add MySQL database
5. Deploy PHP backend
6. Get your backend URL (e.g., `https://your-app.railway.app`)

### Step 2: Update Frontend Environment Variables

In your Vercel dashboard:

1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add this variable:
   ```
   REACT_APP_API_URL = https://your-backend-url.com/api
   ```
4. Redeploy the frontend

### Step 3: Update Database Configuration

In your backend hosting, update `backend/config/database.php` with production credentials:

```php
define('DB_HOST', 'your-production-db-host');
define('DB_NAME', 'your-production-db-name');
define('DB_USER', 'your-production-db-user');
define('DB_PASS', 'your-production-db-password');
```

## 📋 Detailed Setup Guide

### A. Deploy Backend to Railway.app

1. **Create Railway Account**
   ```bash
   # Install Railway CLI
   npm install -g @railway/cli
   
   # Login
   railway login
   ```

2. **Create New Project**
   ```bash
   cd backend
   railway init
   ```

3. **Add MySQL Database**
   - In Railway dashboard, click "New"
   - Select "Database" → "MySQL"
   - Note the connection details

4. **Configure Environment Variables**
   In Railway dashboard, add:
   ```
   DB_HOST=mysql-host-from-railway
   DB_NAME=railway
   DB_USER=root
   DB_PASS=password-from-railway
   JWT_SECRET_KEY=your-secure-random-string
   ```

5. **Deploy**
   ```bash
   railway up
   ```

6. **Import Database Schema**
   ```bash
   # Connect to Railway MySQL
   railway connect mysql
   
   # Then import
   SOURCE database/schema.sql;
   SOURCE database/create-test-user.sql;
   ```

### B. Update Vercel Frontend

1. **Go to Vercel Dashboard**
   - Open your project
   - Go to Settings → Environment Variables

2. **Add Environment Variable**
   ```
   Name: REACT_APP_API_URL
   Value: https://your-backend.railway.app/api
   ```

3. **Redeploy**
   - Go to Deployments
   - Click "Redeploy" on latest deployment

### C. Alternative: Deploy Everything to Railway

If you want to deploy both frontend and backend to Railway:

1. **Create Railway Project**
   ```bash
   railway init
   ```

2. **Add MySQL Database**
   - Add MySQL service in dashboard

3. **Configure Build**
   Create `railway.toml`:
   ```toml
   [build]
   builder = "nixpacks"
   
   [deploy]
   startCommand = "php -S 0.0.0.0:$PORT -t backend"
   ```

4. **Deploy**
   ```bash
   railway up
   ```

## 🔍 Testing Your Deployment

### Test Backend API

```bash
# Test backend health
curl https://your-backend-url.com/test.php

# Test login endpoint
curl -X POST https://your-backend-url.com/api/auth.php?action=login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password"}'
```

### Test Frontend

1. Open your Vercel URL
2. Open browser console (F12)
3. Try to login
4. Check Network tab for API calls
5. Should see requests going to your backend URL

## 🐛 Common Issues

### Issue 1: "Cannot connect to server"

**Cause:** Frontend can't reach backend

**Fix:**
1. Verify backend is deployed and running
2. Check REACT_APP_API_URL in Vercel environment variables
3. Ensure backend URL is correct (with `/api` at the end)
4. Redeploy frontend after adding env variable

### Issue 2: CORS errors

**Cause:** Backend not sending CORS headers

**Fix:** Already fixed in the updated `api/auth.php` file. Make sure to deploy the latest code.

### Issue 3: "Database connection failed"

**Cause:** Backend can't connect to database

**Fix:**
1. Verify database is running
2. Check database credentials in backend config
3. Ensure database is accessible from backend server
4. Import schema if tables don't exist

### Issue 4: "Invalid credentials" even with correct password

**Cause:** Test user doesn't exist in production database

**Fix:**
```bash
# Connect to production database
mysql -h your-db-host -u your-user -p your-database

# Import test user
SOURCE backend/database/create-test-user.sql;
```

## 📝 Environment Variables Checklist

### Vercel (Frontend)
- [ ] `REACT_APP_API_URL` - Your backend API URL

### Backend Hosting (Railway/Heroku/etc)
- [ ] `DB_HOST` - Database host
- [ ] `DB_NAME` - Database name
- [ ] `DB_USER` - Database user
- [ ] `DB_PASS` - Database password
- [ ] `JWT_SECRET_KEY` - Secret key for JWT tokens

## 🔐 Security Checklist

Before going live:

- [ ] Change JWT_SECRET_KEY to a strong random string
- [ ] Update CORS to allow only your frontend domain
- [ ] Use HTTPS for both frontend and backend
- [ ] Set strong database password
- [ ] Remove test user or change password
- [ ] Enable error logging (disable display_errors)
- [ ] Set up database backups

## 📊 Recommended Architecture

```
┌─────────────────┐
│  Vercel         │
│  (Frontend)     │
│  React App      │
└────────┬────────┘
         │ HTTPS
         │ API Calls
         ▼
┌─────────────────┐
│  Railway/Heroku │
│  (Backend)      │
│  PHP API        │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  MySQL Database │
│  (Same host)    │
└─────────────────┘
```

## 🎯 Quick Start Commands

```bash
# 1. Deploy backend to Railway
cd backend
railway init
railway up

# 2. Add MySQL database in Railway dashboard

# 3. Import schema
railway connect mysql
SOURCE database/schema.sql;
SOURCE database/create-test-user.sql;
EXIT;

# 4. Get backend URL from Railway dashboard

# 5. Add to Vercel environment variables
# REACT_APP_API_URL=https://your-backend.railway.app/api

# 6. Redeploy Vercel frontend
```

## 💡 Pro Tips

1. **Use Railway for quick deployment** - Free tier, easy setup
2. **Keep backend and database together** - Faster, more secure
3. **Use environment variables** - Never hardcode credentials
4. **Test locally first** - Ensure everything works before deploying
5. **Monitor logs** - Check Railway/Vercel logs for errors

## 📚 Additional Resources

- [Railway Documentation](https://docs.railway.app/)
- [Vercel Environment Variables](https://vercel.com/docs/environment-variables)
- [PHP on Railway](https://docs.railway.app/languages/php)

## 🆘 Still Having Issues?

1. Check Railway/backend logs for errors
2. Check Vercel deployment logs
3. Check browser console for frontend errors
4. Verify environment variables are set correctly
5. Test backend API directly with curl
6. Ensure database schema is imported

---

**Need help?** The issue is that Vercel doesn't fully support PHP backends with databases. You need to deploy the backend separately to a PHP-compatible hosting service.
