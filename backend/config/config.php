<?php
/**
 * Application Configuration
 */

// Application Settings
define('APP_NAME', 'Medical Emergency System');
define('APP_VERSION', '1.0.0');
define('BASE_URL', 'http://localhost/medical-emergency');

// API Keys
define('GOOGLE_MAPS_API_KEY', 'YOUR_GOOGLE_MAPS_API_KEY_HERE');

// Security
define('JWT_SECRET_KEY', 'your-secret-key-change-this-in-production');
define('JWT_EXPIRY', 3600 * 24); // 24 hours

// File Upload Settings
define('UPLOAD_DIR', __DIR__ . '/../uploads/');
define('MAX_FILE_SIZE', 5 * 1024 * 1024); // 5MB
define('ALLOWED_FILE_TYPES', ['jpg', 'jpeg', 'png', 'pdf']);

// Emergency Settings
define('EMERGENCY_RADIUS_KM', 10); // Search radius for nearby facilities
define('AMBULANCE_RESPONSE_TIME', 15); // Expected response time in minutes

// Timezone
date_default_timezone_set('UTC');

// Error Reporting (disable in production)
error_reporting(E_ALL);
ini_set('display_errors', 1);

// CORS Settings
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}
