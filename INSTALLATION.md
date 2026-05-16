# Installation Guide - Medical Emergency System

## Prerequisites

- PHP 8.0 or higher
- MySQL 5.7 or higher
- Apache/Nginx web server
- Composer (optional, for dependencies)
- Google Maps API key

## Step-by-Step Installation

### 1. Clone or Download the Project

```bash
git clone <repository-url>
cd medical-emergency
```

### 2. Database Setup

1. Create a MySQL database:
```sql
CREATE DATABASE medical_emergency CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

2. Import the database schema:
```bash
mysql -u root -p medical_emergency < database/schema.sql
```

Or use phpMyAdmin to import `database/schema.sql`

### 3. Configure Database Connection

Edit `config/database.php` and update the database credentials:

```php
define('DB_HOST', 'localhost');
define('DB_NAME', 'medical_emergency');
define('DB_USER', 'your_username');
define('DB_PASS', 'your_password');
```

### 4. Configure Application Settings

Edit `config/config.php`:

1. Set your base URL:
```php
define('BASE_URL', 'http://localhost/medical-emergency');
```

2. Add your Google Maps API key:
```php
define('GOOGLE_MAPS_API_KEY', 'YOUR_ACTUAL_API_KEY');
```

3. Change the JWT secret key:
```php
define('JWT_SECRET_KEY', 'your-unique-secret-key-here');
```

### 5. Set File Permissions

```bash
chmod 755 uploads/
chmod 644 config/*.php
```

### 6. Web Server Configuration

#### Apache

The `.htaccess` file is already configured. Ensure `mod_rewrite` is enabled:

```bash
sudo a2enmod rewrite
sudo systemctl restart apache2
```

#### Nginx

Add this to your Nginx configuration:

```nginx
location /api {
    try_files $uri $uri/ /api/index.php?$query_string;
}

location ~ \.php$ {
    fastcgi_pass unix:/var/run/php/php8.0-fpm.sock;
    fastcgi_index index.php;
    include fastcgi_params;
}
```

### 7. Get Google Maps API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable these APIs:
   - Maps JavaScript API
   - Geocoding API
   - Places API
4. Create credentials (API Key)
5. Add the key to `config/config.php`

### 8. Test the Installation

1. Open your browser and navigate to:
```
http://localhost/medical-emergency/public/
```

2. Register a new account
3. Login and test the emergency alert feature

## Default Test Data

The database schema includes sample facilities and first aid tips. You can add more using the admin panel or directly in the database.

## Troubleshooting

### Database Connection Error
- Check database credentials in `config/database.php`
- Ensure MySQL service is running
- Verify database exists

### 404 Errors on API Calls
- Check `.htaccess` file exists
- Ensure `mod_rewrite` is enabled (Apache)
- Verify file permissions

### Location Not Working
- Enable HTTPS (required for geolocation)
- Check browser permissions
- Verify Google Maps API key

### File Upload Issues
- Check `uploads/` directory permissions
- Verify PHP upload settings in `.htaccess`
- Check `MAX_FILE_SIZE` in `config/config.php`

## Security Recommendations for Production

1. **Change all default credentials**
2. **Enable HTTPS** - Uncomment HTTPS redirect in `.htaccess`
3. **Update JWT secret key** - Use a strong random string
4. **Restrict CORS** - Update allowed origins in `config/config.php`
5. **Disable error display** - Set `display_errors = 0` in production
6. **Regular backups** - Backup database and uploaded files
7. **Update dependencies** - Keep PHP and MySQL updated
8. **Restrict API key** - Add domain restrictions in Google Cloud Console

## Support

For issues and questions, please check the documentation or create an issue in the repository.
