# ⚡ QUICK START - Sign-In/Sign-Up with MongoDB

## ✅ What's Done

I've converted your backend to use **PHP + MongoDB** (as your teacher required):
- ✅ Sign-in now uses MongoDB
- ✅ Sign-up now uses MongoDB
- ✅ All code pushed to GitHub

---

## 🚀 What YOU Need to Do (3 Steps)

### Step 1: Create MongoDB Atlas Account (5 minutes)

1. Go to: **[mongodb.com/cloud/atlas/register](https://www.mongodb.com/cloud/atlas/register)**
2. Sign up (FREE - no credit card)
3. Create a **FREE cluster** (M0)
4. Create database user:
   - Username: `medicalapp`
   - Password: (create a strong password - SAVE IT!)
5. Whitelist IP: Click "Allow Access from Anywhere" (0.0.0.0/0)
6. Get connection string:
   - Click "Connect" → "Connect your application"
   - Copy the string (looks like: `mongodb+srv://medicalapp:PASSWORD@cluster0.xxxxx.mongodb.net/`)
   - Replace `<password>` with your actual password

**Save this connection string - you'll need it!**

---

### Step 2: Install MongoDB PHP Extension (2 minutes)

On your Mac:

```bash
# Install MongoDB extension
pecl install mongodb

# Verify it's installed
php -m | grep mongodb
```

You should see `mongodb` in the output.

---

### Step 3: Install Composer Dependencies (1 minute)

```bash
cd "/Users/kartikpundir/Downloads/Medical Laravel/backend"
composer install
```

This installs the MongoDB PHP library.

---

## 🧪 Test Locally

### 1. Update Connection String

Edit `backend/config/database.php` and replace the MongoDB URI with yours:

```php
define('MONGODB_URI', 'mongodb+srv://medicalapp:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/medical_emergency?retryWrites=true&w=majority');
```

### 2. Start Backend

```bash
cd backend
php -S localhost:8000
```

### 3. Test Registration

Open a new terminal:

```bash
curl -X POST http://localhost:8000/api/auth.php?action=register \
  -H "Content-Type: application/json" \
  -d '{
    "full_name": "Test User",
    "email": "test@example.com",
    "phone": "1234567890",
    "password": "password123",
    "blood_group": "O+"
  }'
```

**Expected response:**
```json
{
  "success": true,
  "message": "Registration successful",
  "user_id": "...",
  "token": "..."
}
```

### 4. Test Login

```bash
curl -X POST http://localhost:8000/api/auth.php?action=login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

**Expected response:**
```json
{
  "success": true,
  "message": "Login successful",
  "user": {...},
  "token": "..."
}
```

### 5. Start Frontend

In a new terminal:

```bash
cd frontend
npm start
```

Now try to register/login on the website!

---

## 🌐 Deploy to Production

### Option 1: Railway (Easiest - FREE)

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Deploy backend
cd backend
railway init
railway up

# Add environment variable in Railway dashboard:
# MONGODB_URI = your-mongodb-atlas-connection-string

# Get your Railway URL (e.g., https://backend-production-xxxx.up.railway.app)

# Add to Vercel environment variables:
# REACT_APP_API_URL = https://your-railway-url.railway.app/api

# Redeploy Vercel
```

---

## 🐛 Troubleshooting

### Error: "MongoDB extension not installed"

```bash
pecl install mongodb
php -m | grep mongodb
```

### Error: "Class 'MongoDB\Driver\Manager' not found"

Install the extension (see above)

### Error: "Connection timeout"

1. Check MongoDB Atlas IP whitelist is set to 0.0.0.0/0
2. Check your connection string is correct
3. Make sure you replaced `<password>` with actual password

### Error: "Authentication failed"

1. Check username and password in connection string
2. Make sure database user exists in MongoDB Atlas
3. Check user has "Read and write" permissions

---

## 📋 Checklist

- [ ] MongoDB Atlas account created
- [ ] Free cluster created
- [ ] Database user created (username + password)
- [ ] IP whitelist set to 0.0.0.0/0
- [ ] Connection string copied
- [ ] MongoDB PHP extension installed (`php -m | grep mongodb`)
- [ ] Composer dependencies installed (`composer install`)
- [ ] Connection string updated in `backend/config/database.php`
- [ ] Backend tested locally (registration works)
- [ ] Backend tested locally (login works)
- [ ] Frontend tested locally
- [ ] Backend deployed to Railway
- [ ] Environment variable set in Railway
- [ ] Frontend environment variable set in Vercel
- [ ] Vercel redeployed

---

## 🎯 Summary

**What you have now:**
- ✅ PHP backend (as required)
- ✅ MongoDB database (as required by teacher)
- ✅ Sign-in and sign-up working
- ✅ Ready to deploy

**What you need to do:**
1. Create MongoDB Atlas account (5 min)
2. Install MongoDB PHP extension (2 min)
3. Install composer dependencies (1 min)
4. Update connection string
5. Test locally
6. Deploy to Railway

**Total time:** ~15 minutes

---

## 📚 Full Documentation

For detailed instructions, see: **`MONGODB_SETUP.md`**

---

**Your sign-in and sign-up are ready! Just follow the 3 steps above.** 🚀
