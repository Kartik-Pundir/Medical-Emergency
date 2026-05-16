# Medical Emergency System - Setup Guide

## ✅ System Status

Both servers are now running:

- **PHP Backend API**: http://localhost:8000
- **React Frontend**: http://localhost:3000 (should open automatically)

## 📋 Next Steps

### 1. Setup Database

```bash
# Create database
mysql -u root -p

# In MySQL prompt:
CREATE DATABASE medical_emergency CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
exit;

# Import schema
mysql -u root -p medical_emergency < backend/database/schema.sql
```

### 2. Configure Backend

Edit `backend/config/database.php`:
```php
define('DB_HOST', 'localhost');
define('DB_NAME', 'medical_emergency');
define('DB_USER', 'root');  // Your MySQL username
define('DB_PASS', '');      // Your MySQL password
```

Edit `backend/config/config.php`:
```php
// Add your Google Maps API key
define('GOOGLE_MAPS_API_KEY', 'YOUR_API_KEY_HERE');

// Change JWT secret for production
define('JWT_SECRET_KEY', 'your-unique-secret-key');
```

### 3. Test the Application

1. Open http://localhost:3000 in your browser
2. Click "Register here" to create a new account
3. Fill in your details and register
4. Login with your credentials
5. Allow location access when prompted
6. Test the SOS button and other features

## 🎯 Features Available

### ✅ Working Features:
- User Registration & Login
- JWT Authentication
- Dashboard with SOS button
- Emergency Alert System
- Nearby Facilities Finder
- Real-time Location Tracking
- Responsive Design

### 🚧 To Be Implemented:
- Medical Records Management
- First Aid Guide
- Ambulance Tracking
- Push Notifications

## 🔧 Troubleshooting

### Database Connection Error
```bash
# Check MySQL is running
mysql --version

# Test connection
mysql -u root -p
```

### CORS Issues
The backend `.htaccess` allows all origins. For production, update:
```apache
Header set Access-Control-Allow-Origin "https://yourdomain.com"
```

### Location Not Working
- Use HTTPS in production (required for geolocation)
- Check browser permissions
- Enable location services on your device

### Port Already in Use
```bash
# Backend (change port)
php -S localhost:8001

# Frontend (change port)
PORT=3001 npm start
```

## 📱 API Endpoints

### Authentication
- `POST /api/auth.php?action=register` - Register
- `POST /api/auth.php?action=login` - Login

### Emergency
- `POST /api/emergency.php` - Create alert
- `GET /api/emergency.php` - Get alerts

### Facilities
- `GET /api/facilities.php?action=nearby&latitude=X&longitude=Y` - Find nearby

## 🔐 Security Notes

For production deployment:
1. Change JWT secret key
2. Update database credentials
3. Enable HTTPS
4. Restrict CORS origins
5. Disable PHP error display
6. Add rate limiting
7. Implement input sanitization

## 📞 Support

For issues:
1. Check browser console for errors
2. Check PHP error logs
3. Verify database connection
4. Ensure location services are enabled

## 🚀 Deployment

### Frontend (React)
```bash
cd frontend
npm run build
# Deploy 'build' folder to hosting
```

### Backend (PHP)
```bash
# Upload 'backend' folder to server
# Configure Apache/Nginx
# Update config files
# Import database
```

---

**Enjoy your Medical Emergency Management System!** 🏥
