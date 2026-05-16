# 🚀 How to Run the Medical Emergency Application

## Prerequisites

- ✅ Node.js installed
- ✅ PHP 7.4+ installed
- ✅ MySQL installed and running

## Step 1: Setup Database

```bash
# Create database
mysql -u root -p
CREATE DATABASE medical_emergency;
exit;

# Import schema
mysql -u root -p medical_emergency < backend/database/schema.sql
```

## Step 2: Configure Backend

Edit `backend/config/database.php` with your MySQL credentials:

```php
define('DB_HOST', 'localhost');
define('DB_NAME', 'medical_emergency');
define('DB_USER', 'root');
define('DB_PASS', 'your_password');
```

## Step 3: Start Backend Server

### Option A: Using the script (Recommended)
```bash
./START_BACKEND.sh
```

### Option B: Manual command
```bash
cd backend
php -S localhost:8000
```

The backend will run at: **http://localhost:8000**

## Step 4: Start Frontend (In a New Terminal)

```bash
cd frontend
npm install    # Only needed first time
npm start
```

The frontend will run at: **http://localhost:3000**

## 🎉 Access the Application

Open your browser and go to: **http://localhost:3000**

## 📝 Default Test Account

If you've imported the schema with sample data:
- Email: `test@example.com`
- Password: `password123`

Or register a new account!

## 🛑 To Stop the Servers

- Backend: Press `Ctrl+C` in the backend terminal
- Frontend: Press `Ctrl+C` in the frontend terminal

## ⚠️ Troubleshooting

### "Cannot connect to server" Error
- Make sure the backend is running on port 8000
- Check if MySQL is running
- Verify database credentials in `backend/config/database.php`

### Port Already in Use
```bash
# Kill process on port 8000
lsof -ti:8000 | xargs kill -9

# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

### Database Connection Error
- Verify MySQL is running: `mysql.server status`
- Check database exists: `mysql -u root -p -e "SHOW DATABASES;"`
- Verify credentials in config file

## 📚 API Endpoints

Backend API is available at: `http://localhost:8000/api/`

- `/api/auth.php` - Authentication
- `/api/emergency.php` - Emergency alerts
- `/api/facilities.php` - Healthcare facilities
- `/api/medical-records.php` - Medical records
- `/api/first-aid.php` - First aid guides

## 🔧 Development Mode

Both servers support hot-reload:
- Frontend: Changes auto-refresh
- Backend: Restart server to see changes

---

**Need Help?** Check TROUBLESHOOTING.md or open an issue on GitHub!
