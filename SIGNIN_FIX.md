# Sign-In Page Fix Guide

## Issues Fixed

1. ✅ Added proper CORS headers to authentication API
2. ✅ Improved error handling and validation
3. ✅ Added database connection error handling
4. ✅ Added proper HTTP status codes
5. ✅ Created diagnostic script to check setup

## How to Test the Fix

### Step 1: Check Backend Setup

1. Make sure your backend server is running on port 8000:
   ```bash
   cd backend
   php -S localhost:8000
   ```

2. Test the diagnostic script in your browser:
   ```
   http://localhost:8000/check-setup.php
   ```
   
   This will show you if:
   - Database is connected
   - Users table exists
   - PHP extensions are installed

### Step 2: Verify Database Setup

If the diagnostic shows database issues:

1. Make sure MySQL/MariaDB is running
2. Create the database and import the schema:
   ```bash
   mysql -u root -p
   ```
   
   Then in MySQL:
   ```sql
   CREATE DATABASE medical_emergency;
   USE medical_emergency;
   SOURCE backend/database/schema.sql;
   ```

### Step 3: Create a Test User

You can create a test user directly in the database:

```sql
USE medical_emergency;

INSERT INTO users (full_name, email, phone, password_hash, is_active) 
VALUES (
    'Test User', 
    'test@example.com', 
    '1234567890', 
    '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 
    TRUE
);
```

**Test credentials:**
- Email: `test@example.com`
- Password: `password`

### Step 4: Test the Login API Directly

Test the login endpoint with curl:

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
  "user": {...},
  "token": "..."
}
```

### Step 5: Start Frontend

```bash
cd frontend
npm start
```

The frontend should now be able to connect to the backend at `http://localhost:8000/api`

## Common Issues and Solutions

### Issue 1: "Cannot connect to server"
**Solution:** Make sure the backend is running on port 8000
```bash
cd backend
php -S localhost:8000
```

### Issue 2: "Database connection failed"
**Solution:** 
1. Check MySQL is running: `mysql.server status` (Mac) or `sudo service mysql status` (Linux)
2. Verify database credentials in `backend/config/database.php`
3. Create the database: `mysql -u root -p -e "CREATE DATABASE medical_emergency"`
4. Import schema: `mysql -u root -p medical_emergency < backend/database/schema.sql`

### Issue 3: "Invalid credentials"
**Solution:** 
1. Make sure you have a user in the database
2. Use the test user credentials above
3. Or register a new account first

### Issue 4: CORS errors in browser console
**Solution:** The fix has been applied. Make sure you restart the backend server after the changes.

### Issue 5: "Users table not found"
**Solution:** Import the database schema:
```bash
mysql -u root -p medical_emergency < backend/database/schema.sql
```

## Debugging Tips

1. **Check browser console** (F12) for detailed error messages
2. **Check backend PHP errors**: Look at the terminal where you started the PHP server
3. **Test API directly**: Use the curl commands above to isolate frontend vs backend issues
4. **Check network tab**: In browser DevTools, see if the request is reaching the backend

## Next Steps

After fixing the sign-in:
1. Test registration page
2. Test dashboard access after login
3. Verify token is stored in localStorage
4. Test protected routes

## Need More Help?

If you're still having issues:
1. Run the diagnostic script: `http://localhost:8000/check-setup.php`
2. Check the browser console for errors
3. Check the PHP server terminal for errors
4. Verify all the steps above
