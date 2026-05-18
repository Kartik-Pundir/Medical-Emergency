# 🍃 MongoDB Setup Guide for PHP Laravel Project

## ✅ What I've Done

I've converted your backend from MySQL to MongoDB:
- ✅ Updated `backend/config/database.php` for MongoDB
- ✅ Created `backend/includes/AuthMongo.php` for MongoDB authentication
- ✅ Updated `backend/api/auth.php` to use MongoDB
- ✅ Sign-in and Sign-up now work with MongoDB

---

## 🚀 Setup Steps

### Step 1: Install MongoDB PHP Extension

You need to install the MongoDB PHP driver on your server.

#### On Your Local Machine (Mac):

```bash
# Install MongoDB PHP extension
pecl install mongodb

# Add to php.ini
echo "extension=mongodb.so" >> /usr/local/etc/php/8.2/php.ini

# Restart PHP
brew services restart php
```

#### On Railway/Heroku:
The MongoDB extension is usually pre-installed. If not, add to your buildpack.

#### On Traditional PHP Hosting:
Most modern hosts have MongoDB extension. Check with your hosting provider.

---

### Step 2: Install MongoDB PHP Library (Composer)

```bash
cd backend
composer require mongodb/mongodb
```

This installs the MongoDB PHP library that makes working with MongoDB easier.

---

### Step 3: Create MongoDB Atlas Account (FREE)

1. **Go to:** [mongodb.com/cloud/atlas/register](https://www.mongodb.com/cloud/atlas/register)

2. **Sign up** (free account)

3. **Create a Cluster:**
   - Click "Build a Database"
   - Choose "FREE" (M0 Sandbox)
   - Select a cloud provider (AWS recommended)
   - Choose a region close to you
   - Click "Create Cluster"

4. **Create Database User:**
   - Go to "Database Access"
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Username: `medicalapp`
   - Password: Generate a strong password (save it!)
   - Database User Privileges: "Read and write to any database"
   - Click "Add User"

5. **Whitelist IP Address:**
   - Go to "Network Access"
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Click "Confirm"

6. **Get Connection String:**
   - Go to "Database" → "Connect"
   - Choose "Connect your application"
   - Driver: PHP, Version: 1.13 or later
   - Copy the connection string
   - It looks like: `mongodb+srv://medicalapp:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`
   - Replace `<password>` with your actual password

---

### Step 4: Update Backend Configuration

Edit `backend/config/database.php` and update the MongoDB URI:

```php
define('MONGODB_URI', 'mongodb+srv://medicalapp:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/medical_emergency?retryWrites=true&w=majority');
```

**Or use environment variable (recommended):**

Set environment variable:
```bash
export MONGODB_URI="mongodb+srv://medicalapp:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/medical_emergency?retryWrites=true&w=majority"
```

---

### Step 5: Test Your Setup

#### Test Locally:

```bash
# Start PHP server
cd backend
php -S localhost:8000

# Test in another terminal
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

Expected response:
```json
{
  "success": true,
  "message": "Registration successful",
  "user_id": "...",
  "token": "..."
}
```

#### Test Login:

```bash
curl -X POST http://localhost:8000/api/auth.php?action=login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

---

### Step 6: Deploy to Railway (Recommended)

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Deploy backend
cd backend
railway init
railway up

# Add environment variable in Railway dashboard
# MONGODB_URI = your-mongodb-atlas-connection-string
```

---

### Step 7: Update Vercel Frontend

In Vercel dashboard, add environment variable:

```
Name: REACT_APP_API_URL
Value: https://your-backend.railway.app/api
```

Then redeploy Vercel.

---

## 📊 MongoDB Collections Structure

Your MongoDB database will have these collections:

### users
```javascript
{
  _id: ObjectId("..."),
  full_name: "John Doe",
  email: "john@example.com",
  phone: "1234567890",
  password_hash: "$2y$10$...",
  blood_group: "O+",
  date_of_birth: "1990-01-01",
  gender: "male",
  address: "123 Main St",
  latitude: 40.7128,
  longitude: -74.0060,
  profile_image: null,
  is_active: true,
  created_at: ISODate("2024-01-01T00:00:00Z"),
  updated_at: ISODate("2024-01-01T00:00:00Z")
}
```

---

## 🐛 Troubleshooting

### Error: "MongoDB extension not installed"

**Solution:**
```bash
# Mac
pecl install mongodb
echo "extension=mongodb.so" >> $(php --ini | grep "Loaded Configuration" | sed -e "s|.*:\s*||")

# Ubuntu/Linux
sudo apt-get install php-mongodb

# Check if installed
php -m | grep mongodb
```

### Error: "Class 'MongoDB\Driver\Manager' not found"

**Solution:** Install MongoDB PHP extension (see above)

### Error: "Connection timeout"

**Solution:** 
1. Check MongoDB Atlas IP whitelist (should be 0.0.0.0/0)
2. Check your internet connection
3. Verify connection string is correct

### Error: "Authentication failed"

**Solution:**
1. Check username and password in connection string
2. Make sure you replaced `<password>` with actual password
3. Check database user has correct permissions

---

## 📝 Environment Variables Needed

### For Local Development:
```bash
export MONGODB_URI="mongodb+srv://user:pass@cluster.mongodb.net/medical_emergency"
```

### For Railway:
Add in Railway dashboard:
```
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/medical_emergency
```

### For Vercel (Frontend):
```
REACT_APP_API_URL=https://your-backend.railway.app/api
```

---

## ✅ Checklist

- [ ] MongoDB PHP extension installed (`php -m | grep mongodb`)
- [ ] Composer dependencies installed (`composer require mongodb/mongodb`)
- [ ] MongoDB Atlas account created
- [ ] Database cluster created (free tier)
- [ ] Database user created
- [ ] IP whitelist configured (0.0.0.0/0)
- [ ] Connection string copied
- [ ] `backend/config/database.php` updated with connection string
- [ ] Backend tested locally
- [ ] Backend deployed to Railway
- [ ] Environment variable set in Railway
- [ ] Frontend environment variable set in Vercel
- [ ] Vercel redeployed

---

## 🎯 Quick Start Commands

```bash
# 1. Install MongoDB extension
pecl install mongodb

# 2. Install Composer dependencies
cd backend
composer require mongodb/mongodb

# 3. Update connection string in backend/config/database.php

# 4. Test locally
php -S localhost:8000

# 5. Deploy to Railway
railway login
railway init
railway up

# 6. Set environment variable in Railway dashboard
# MONGODB_URI = your-connection-string

# 7. Update Vercel environment variable
# REACT_APP_API_URL = https://your-railway-url.railway.app/api

# 8. Redeploy Vercel
```

---

## 💡 Why MongoDB for Laravel Project?

MongoDB is a great choice for:
- ✅ Flexible schema (easy to add fields)
- ✅ Scalability (handles large amounts of data)
- ✅ JSON-like documents (works well with APIs)
- ✅ Cloud-native (MongoDB Atlas)
- ✅ Modern tech stack

---

## 📚 Additional Resources

- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [MongoDB PHP Driver](https://www.php.net/manual/en/set.mongodb.php)
- [MongoDB PHP Library](https://docs.mongodb.com/php-library/current/)

---

**Your sign-in and sign-up are now ready to work with MongoDB!** 🎉

Just follow the steps above to set up MongoDB Atlas and deploy your backend.
