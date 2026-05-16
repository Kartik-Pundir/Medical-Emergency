# Troubleshooting Guide

## ✅ System is Now Ready!

The database has been created and configured. Both servers are running:
- **Backend**: http://localhost:8000
- **Frontend**: http://localhost:3000

## 🎯 How to Use the Application

### 1. Register a New Account
1. Open http://localhost:3000
2. Click "Register here"
3. Fill in the form:
   - Full Name: Your Name
   - Email: your@email.com
   - Phone: 1234567890
   - Blood Group: (optional)
   - Password: minimum 6 characters
4. Click "Register"

### 2. Login
1. After registration, you'll be redirected to login
2. Enter your email and password
3. Click "Login"
4. You should be redirected to the dashboard

### 3. Test Features
- **SOS Button**: Click the red SOS button (allow location access)
- **Nearby Facilities**: View hospitals and clinics near you
- **Emergency Alert**: Create an emergency alert

## 🔍 Common Issues & Solutions

### Issue 1: "Cannot connect to server"
**Solution:**
```bash
# Check if backend is running
curl http://localhost:8000/test.php

# If not running, restart:
cd backend
php -S localhost:8000
```

### Issue 2: "Database connection failed"
**Solution:**
```bash
# Verify database exists
mysql -u root -e "SHOW DATABASES LIKE 'medical_emergency';"

# If not exists, create it:
mysql -u root -e "CREATE DATABASE medical_emergency;"
mysql -u root medical_emergency < backend/database/schema.sql
```

### Issue 3: Login not working
**Checklist:**
1. ✅ Database created and imported
2. ✅ Backend server running on port 8000
3. ✅ Frontend server running on port 3000
4. ✅ User registered successfully

**Test manually:**
```bash
# Test registration
curl -X POST 'http://localhost:8000/api/auth.php?action=register' \
  -H "Content-Type: application/json" \
  -d '{"full_name":"Test User","email":"test@test.com","phone":"1234567890","password":"test123"}'

# Test login
curl -X POST 'http://localhost:8000/api/auth.php?action=login' \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test123"}'
```

### Issue 4: Location not detected
**Solution:**
- Click the location icon in browser address bar
- Allow location access
- Refresh the page
- For HTTPS requirement in production, use SSL certificate

### Issue 5: CORS errors in browser console
**Solution:**
The backend `.htaccess` already allows CORS. If still having issues:

Edit `backend/.htaccess` and ensure these lines exist:
```apache
Header set Access-Control-Allow-Origin "*"
Header set Access-Control-Allow-Methods "GET, POST, PUT, DELETE, OPTIONS"
Header set Access-Control-Allow-Headers "Content-Type, Authorization"
```

### Issue 6: React app not loading
**Solution:**
```bash
# Check if running
curl http://localhost:3000

# If not, restart:
cd frontend
npm start
```

## 🧪 Test Credentials

A test user has been created:
- **Email**: test@test.com
- **Password**: test123

You can login with these credentials or create your own account.

## 📊 Verify Database Tables

```bash
mysql -u root -e "USE medical_emergency; SHOW TABLES;"
```

Should show:
- ambulances
- emergency_alerts
- emergency_contacts
- facilities
- first_aid_tips
- medical_records
- notifications
- users

## 🔧 Reset Everything

If you want to start fresh:

```bash
# Drop and recreate database
mysql -u root -e "DROP DATABASE IF EXISTS medical_emergency;"
mysql -u root -e "CREATE DATABASE medical_emergency;"
mysql -u root medical_emergency < backend/database/schema.sql

# Restart servers
# Stop both servers (Ctrl+C in their terminals)
cd backend && php -S localhost:8000 &
cd frontend && npm start
```

## 📱 Browser Console

Open browser DevTools (F12) and check:
1. **Console tab**: Look for JavaScript errors
2. **Network tab**: Check API requests
   - Should see requests to `http://localhost:8000/api/`
   - Status should be 200 OK
   - Response should have `success: true`

## 🎯 Expected Behavior

### Registration Flow:
1. Fill form → Click Register
2. See "Registration successful!" message
3. Redirect to login page after 2 seconds

### Login Flow:
1. Enter email/password → Click Login
2. See loading spinner
3. Redirect to dashboard
4. See welcome message with your name

### Dashboard:
1. See SOS button in center
2. See 4 quick action cards
3. See "Recent Alerts" section
4. Location should be detected automatically

## 🆘 Still Having Issues?

1. **Check browser console** (F12 → Console tab)
2. **Check backend logs** in the terminal running PHP server
3. **Verify all services are running**:
   ```bash
   # Backend
   curl http://localhost:8000/test.php
   
   # Frontend
   curl http://localhost:3000
   
   # Database
   mysql -u root -e "SELECT COUNT(*) FROM medical_emergency.users;"
   ```

## 📞 Quick Commands

```bash
# Check if servers are running
lsof -i :8000  # Backend
lsof -i :3000  # Frontend

# View backend logs
tail -f /path/to/php/error.log

# Test database connection
mysql -u root medical_emergency -e "SELECT 'Connected!' as status;"
```

---

**Everything should be working now! Try logging in at http://localhost:3000** 🚀
