# ⚡ IMMEDIATE FIX - Sign-In Not Working on Vercel

## 🔴 The Problem

Your app is deployed on Vercel at `medical-emergency-seven.vercel.app` but:

1. **Frontend is looking for backend at `localhost:8000`** ❌
2. **Backend PHP files are not deployed** ❌  
3. **No database connection** ❌

## ✅ The Solution

You have **2 options**:

---

## Option 1: Quick Fix - Deploy Backend Separately (Recommended)

### What you need:
- Deploy backend to a PHP hosting service
- Update frontend to point to that backend

### Steps:

#### 1. Deploy Backend to Railway.app (Free)

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Go to backend folder
cd backend

# Initialize Railway project
railway init

# Deploy
railway up
```

#### 2. Add MySQL Database
- Go to Railway dashboard
- Click "New" → "Database" → "MySQL"
- Copy the connection details

#### 3. Update Database Config
In Railway dashboard, add environment variables:
```
DB_HOST=<from-railway>
DB_NAME=railway
DB_USER=root
DB_PASS=<from-railway>
JWT_SECRET_KEY=your-secret-key-here
```

#### 4. Import Database Schema
```bash
# Connect to Railway MySQL
railway connect mysql

# Import schema
SOURCE database/schema.sql;
SOURCE database/create-test-user.sql;
EXIT;
```

#### 5. Get Your Backend URL
- In Railway dashboard, copy your app URL
- Example: `https://your-app.railway.app`

#### 6. Update Vercel Environment Variable
- Go to Vercel dashboard
- Your project → Settings → Environment Variables
- Add:
  ```
  Name: REACT_APP_API_URL
  Value: https://your-app.railway.app/api
  ```

#### 7. Redeploy Vercel
- Go to Deployments tab
- Click "Redeploy" on latest deployment

---

## Option 2: Use Mock/Demo Mode (Temporary)

If you just want to demo the frontend without a working backend:

### Create a mock API service:

```javascript
// frontend/src/services/mockApi.js
export const authAPI = {
  register: async (userData) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock successful registration
    return {
      data: {
        success: true,
        message: 'Registration successful',
        user: {
          id: 1,
          full_name: userData.full_name,
          email: userData.email,
          phone: userData.phone
        },
        token: 'mock-jwt-token-' + Date.now()
      }
    };
  },
  
  login: async (email, password) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock successful login
    return {
      data: {
        success: true,
        message: 'Login successful',
        user: {
          id: 1,
          full_name: 'Demo User',
          email: email,
          phone: '1234567890'
        },
        token: 'mock-jwt-token-' + Date.now()
      }
    };
  }
};
```

Then update `frontend/src/services/api.js`:

```javascript
// At the top of the file
const USE_MOCK_API = process.env.REACT_APP_USE_MOCK === 'true';

// Import mock API
import * as mockAPI from './mockApi';

// Export either real or mock API
export const authAPI = USE_MOCK_API ? mockAPI.authAPI : {
  register: (userData) => api.post('/auth.php?action=register', userData),
  login: (email, password) => api.post('/auth.php?action=login', { email, password }),
};
```

Add to Vercel environment variables:
```
REACT_APP_USE_MOCK=true
```

---

## 🎯 Which Option Should You Choose?

### Choose Option 1 (Railway) if:
- ✅ You want a fully working app
- ✅ You need real authentication
- ✅ You want to store real data
- ✅ You're ready to deploy properly

### Choose Option 2 (Mock) if:
- ✅ You just want to demo the UI
- ✅ You don't need real data yet
- ✅ You want a quick temporary fix
- ✅ You'll deploy backend later

---

## 🚀 Fastest Path (5 Minutes)

If you want it working RIGHT NOW:

### Use Railway (Easiest)

```bash
# 1. Install Railway CLI
npm install -g @railway/cli

# 2. Login
railway login

# 3. Deploy backend
cd backend
railway init
railway up

# 4. Add MySQL in Railway dashboard (click "New" → "Database" → "MySQL")

# 5. Import schema
railway connect mysql
SOURCE database/schema.sql;
SOURCE database/create-test-user.sql;
EXIT;

# 6. Copy your Railway URL (e.g., https://backend-production-xxxx.up.railway.app)

# 7. Add to Vercel:
# Go to Vercel → Settings → Environment Variables
# Add: REACT_APP_API_URL = https://your-railway-url.railway.app/api

# 8. Redeploy Vercel
```

Done! Your app should work now.

---

## 🐛 Troubleshooting

### After deploying, still not working?

1. **Check Vercel environment variable**
   - Make sure `REACT_APP_API_URL` is set
   - Make sure you redeployed AFTER adding it

2. **Check Railway backend**
   ```bash
   curl https://your-railway-url.railway.app/test.php
   ```
   Should return: `{"success":true,"message":"Backend API is working!"}`

3. **Check database connection**
   ```bash
   curl https://your-railway-url.railway.app/check-setup.php
   ```
   Should show all checks passing

4. **Check browser console**
   - Open DevTools (F12)
   - Check Console for errors
   - Check Network tab for API calls
   - Should see requests going to Railway URL, not localhost

---

## 📝 Summary

**Current state:**
- ❌ Frontend on Vercel trying to connect to localhost
- ❌ Backend not deployed
- ❌ No database

**After fix:**
- ✅ Frontend on Vercel
- ✅ Backend on Railway
- ✅ Database on Railway
- ✅ Everything connected and working

---

## 💡 Why This Happened

Vercel is designed for **frontend apps** (React, Next.js, etc.). It has limited PHP support and no built-in database.

Your app needs:
- **Frontend hosting** → Vercel ✅ (already done)
- **Backend hosting** → Railway/Heroku/etc ❌ (needs to be done)
- **Database** → MySQL on Railway/etc ❌ (needs to be done)

---

## 🎓 Learn More

- [Railway Documentation](https://docs.railway.app/)
- [Deploying PHP Apps](https://docs.railway.app/languages/php)
- [Vercel Environment Variables](https://vercel.com/docs/environment-variables)

---

**Ready to fix it?** Follow Option 1 above and your app will be working in 5-10 minutes! 🚀
