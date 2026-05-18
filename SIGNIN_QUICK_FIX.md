# 🔧 Sign-In Page Quick Fix

## What Was Fixed

I've identified and fixed several issues with the sign-in page:

### ✅ Backend Fixes Applied
1. **Added CORS headers** to the authentication API
2. **Improved error handling** with proper HTTP status codes
3. **Added database connection validation**
4. **Better input validation** for login requests
5. **Created diagnostic tools** to help troubleshoot

### 📁 New Files Created
- `backend/check-setup.php` - Diagnostic script to check your setup
- `backend/database/create-test-user.sql` - SQL to create a test user
- `setup-database.sh` - Automated database setup script
- `START_SIGNIN_TEST.sh` - Quick test script for sign-in
- `SIGNIN_FIX.md` - Detailed troubleshooting guide

## 🚀 Quick Start (3 Steps)

### Option A: Automated Setup (Recommended)

```bash
# 1. Setup database (one-time)
./setup-database.sh

# 2. Start backend
cd backend
php -S localhost:8000

# 3. In a new terminal, start frontend
cd frontend
npm start
```

### Option B: Manual Setup

```bash
# 1. Create database and import schema
mysql -u root -p
```

In MySQL:
```sql
CREATE DATABASE medical_emergency;
USE medical_emergency;
SOURCE backend/database/schema.sql;
SOURCE backend/database/create-test-user.sql;
EXIT;
```

```bash
# 2. Start backend
cd backend
php -S localhost:8000

# 3. Start frontend (new terminal)
cd frontend
npm start
```

## 🧪 Test Your Setup

### Test 1: Check Backend Health
Open in browser: `http://localhost:8000/check-setup.php`

You should see all checks passing ✅

### Test 2: Test Login API
```bash
curl -X POST http://localhost:8000/api/auth.php?action=login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password"}'
```

Expected response:
```json
{
  "success": true,
  "message": "Login successful",
  "user": { ... },
  "token": "..."
}
```

### Test 3: Login via Frontend
1. Open `http://localhost:3000`
2. Use credentials:
   - **Email:** test@example.com
   - **Password:** password
3. You should be redirected to the dashboard

## 🐛 Still Having Issues?

### Issue: "Cannot connect to server"
**Check:**
- Is backend running? `curl http://localhost:8000/test.php`
- Is it on the right port? Frontend expects port 8000

**Fix:**
```bash
cd backend
php -S localhost:8000
```

### Issue: "Database connection failed"
**Check:**
- Is MySQL running? `mysql.server status` (Mac) or `sudo service mysql status` (Linux)
- Can you connect? `mysql -u root -p`

**Fix:**
```bash
# Start MySQL (Mac)
mysql.server start

# Or (Linux)
sudo service mysql start

# Then run setup
./setup-database.sh
```

### Issue: "Invalid credentials"
**Check:**
- Does the test user exist?
```bash
mysql -u root -p medical_emergency -e "SELECT email FROM users WHERE email='test@example.com'"
```

**Fix:**
```bash
mysql -u root -p medical_emergency < backend/database/create-test-user.sql
```

### Issue: CORS errors in browser
**Check:**
- Browser console (F12) for exact error
- Backend terminal for PHP errors

**Fix:**
- The CORS fix has been applied to `backend/api/auth.php`
- Restart the backend server
- Clear browser cache (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows)

### Issue: "Users table not found"
**Fix:**
```bash
mysql -u root -p medical_emergency < backend/database/schema.sql
```

## 📊 Diagnostic Commands

```bash
# Check if backend is running
curl http://localhost:8000/test.php

# Check setup status
curl http://localhost:8000/check-setup.php

# Test login endpoint
curl -X POST http://localhost:8000/api/auth.php?action=login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password"}'

# Check database
mysql -u root -p medical_emergency -e "SELECT COUNT(*) FROM users"
```

## 🔍 Understanding the Fix

### What was wrong?
1. **CORS headers** weren't being sent properly, causing browser to block requests
2. **Error handling** wasn't catching database connection failures
3. **No diagnostic tools** to identify the problem

### What changed?
1. **backend/api/auth.php** - Added CORS headers at the top, improved error handling
2. **Created diagnostic tools** - Easy way to check what's wrong
3. **Created test scripts** - Automated testing and setup

## 📝 Test Credentials

After running the setup, you can login with:
- **Email:** test@example.com
- **Password:** password

## 🎯 Next Steps

Once sign-in is working:
1. ✅ Test the registration page
2. ✅ Test dashboard features
3. ✅ Test emergency alert
4. ✅ Test other features

## 📚 Additional Resources

- **Detailed Guide:** See `SIGNIN_FIX.md` for comprehensive troubleshooting
- **Database Schema:** `backend/database/schema.sql`
- **API Documentation:** Check individual API files in `backend/api/`

## 💡 Pro Tips

1. **Keep backend terminal visible** - You'll see PHP errors immediately
2. **Use browser DevTools** - Network tab shows exact API requests/responses
3. **Check both terminals** - Frontend (npm) and backend (php) errors
4. **Test API first** - Use curl to isolate frontend vs backend issues

---

**Need more help?** Check the detailed guide in `SIGNIN_FIX.md` or run the diagnostic script!
