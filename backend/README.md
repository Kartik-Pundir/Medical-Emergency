# Medical Emergency System - Backend API

PHP backend API for the Medical Emergency Management System.

## Requirements

- PHP 8.0 or higher
- MySQL 5.7 or higher
- Apache/Nginx with mod_rewrite

## Installation

1. **Import Database**
   ```bash
   mysql -u root -p < database/schema.sql
   ```

2. **Configure Database**
   Edit `config/database.php`:
   ```php
   define('DB_HOST', 'localhost');
   define('DB_NAME', 'medical_emergency');
   define('DB_USER', 'your_username');
   define('DB_PASS', 'your_password');
   ```

3. **Configure Application**
   Edit `config/config.php`:
   - Set your Google Maps API key
   - Change JWT secret key
   - Update BASE_URL if needed

4. **Set Permissions**
   ```bash
   chmod 755 uploads/
   chmod 644 config/*.php
   ```

5. **Start PHP Server**
   ```bash
   php -S localhost:8000
   ```

## API Endpoints

### Authentication
- `POST /api/auth.php?action=register` - Register new user
- `POST /api/auth.php?action=login` - Login user

### Emergency Alerts
- `POST /api/emergency.php` - Create emergency alert
- `GET /api/emergency.php` - Get user's alerts
- `PUT /api/emergency.php?id={id}` - Update alert status

### Facilities
- `GET /api/facilities.php?action=nearby&latitude={lat}&longitude={lng}` - Find nearby facilities
- `GET /api/facilities.php?action=details&id={id}` - Get facility details
- `GET /api/facilities.php?action=search&q={query}` - Search facilities
- `GET /api/facilities.php?action=type&type={type}` - Get by type

### Medical Records
- `POST /api/medical-records.php` - Add medical record
- `GET /api/medical-records.php?action=list` - Get all records
- `GET /api/medical-records.php?action=critical` - Get critical records
- `DELETE /api/medical-records.php?id={id}` - Delete record

### First Aid
- `GET /api/first-aid.php?action=list` - Get all tips
- `GET /api/first-aid.php?action=categories` - Get categories
- `GET /api/first-aid.php?action=details&id={id}` - Get tip details

## Authentication

All endpoints (except auth and first-aid) require JWT token in header:
```
Authorization: Bearer {token}
```

## Response Format

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {}
}
```

## CORS

CORS is enabled for all origins. Update `.htaccess` for production.
