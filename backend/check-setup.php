<?php
/**
 * Setup Diagnostic Script
 * Run this to check if your backend is properly configured
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$checks = [
    'php_version' => phpversion(),
    'checks' => []
];

// Check PHP version
$checks['checks']['php_version'] = [
    'status' => version_compare(PHP_VERSION, '7.4.0', '>='),
    'message' => 'PHP version: ' . PHP_VERSION . ' (Required: 7.4+)'
];

// Check PDO MySQL extension
$checks['checks']['pdo_mysql'] = [
    'status' => extension_loaded('pdo_mysql'),
    'message' => 'PDO MySQL extension: ' . (extension_loaded('pdo_mysql') ? 'Installed' : 'NOT INSTALLED')
];

// Check database connection
try {
    require_once __DIR__ . '/config/database.php';
    $db = Database::getInstance()->getConnection();
    $checks['checks']['database'] = [
        'status' => true,
        'message' => 'Database connection: SUCCESS'
    ];
    
    // Check if users table exists
    $stmt = $db->query("SHOW TABLES LIKE 'users'");
    $tableExists = $stmt->rowCount() > 0;
    $checks['checks']['users_table'] = [
        'status' => $tableExists,
        'message' => 'Users table: ' . ($tableExists ? 'EXISTS' : 'NOT FOUND - Run schema.sql')
    ];
    
    // Check if there are any users
    if ($tableExists) {
        $stmt = $db->query("SELECT COUNT(*) as count FROM users");
        $result = $stmt->fetch();
        $checks['checks']['user_count'] = [
            'status' => true,
            'message' => 'Total users in database: ' . $result['count']
        ];
    }
    
} catch (Exception $e) {
    $checks['checks']['database'] = [
        'status' => false,
        'message' => 'Database connection: FAILED - ' . $e->getMessage()
    ];
}

// Check uploads directory
$uploadsDir = __DIR__ . '/uploads';
$checks['checks']['uploads_dir'] = [
    'status' => is_dir($uploadsDir) && is_writable($uploadsDir),
    'message' => 'Uploads directory: ' . (is_dir($uploadsDir) && is_writable($uploadsDir) ? 'OK' : 'NOT WRITABLE')
];

// Check config file
$checks['checks']['config'] = [
    'status' => file_exists(__DIR__ . '/config/config.php'),
    'message' => 'Config file: ' . (file_exists(__DIR__ . '/config/config.php') ? 'EXISTS' : 'NOT FOUND')
];

// Overall status
$allPassed = true;
foreach ($checks['checks'] as $check) {
    if (!$check['status']) {
        $allPassed = false;
        break;
    }
}

$checks['overall_status'] = $allPassed ? 'READY' : 'ISSUES FOUND';
$checks['success'] = $allPassed;

echo json_encode($checks, JSON_PRETTY_PRINT);
