<?php
/**
 * Authentication API Endpoints for MongoDB
 */

// CORS Headers - Must be set before any output
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once __DIR__ . '/../config/config.php';

// Check if MongoDB extension is available
if (!extension_loaded('mongodb')) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'MongoDB extension not installed. Please install: pecl install mongodb'
    ]);
    exit();
}

require_once __DIR__ . '/../includes/AuthMongo.php';

try {
    $auth = new AuthMongo();
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false, 
        'message' => 'Database connection failed: ' . $e->getMessage()
    ]);
    exit();
}

$method = $_SERVER['REQUEST_METHOD'];
$input = json_decode(file_get_contents('php://input'), true);

switch ($method) {
    case 'POST':
        $action = $_GET['action'] ?? '';
        
        if ($action === 'register') {
            // Validate input
            if (!$input || !is_array($input)) {
                http_response_code(400);
                echo json_encode(['success' => false, 'message' => 'Invalid request data']);
                exit;
            }
            
            $result = $auth->register($input);
            http_response_code($result['success'] ? 200 : 400);
            echo json_encode($result);
            
        } elseif ($action === 'login') {
            // Validate input
            if (!$input || !is_array($input)) {
                http_response_code(400);
                echo json_encode(['success' => false, 'message' => 'Invalid request data']);
                exit;
            }
            
            if (empty($input['email']) || empty($input['password'])) {
                http_response_code(400);
                echo json_encode(['success' => false, 'message' => 'Email and password are required']);
                exit;
            }
            
            $result = $auth->login($input['email'], $input['password']);
            http_response_code($result['success'] ? 200 : 401);
            echo json_encode($result);
            
        } else {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Invalid action. Use ?action=login or ?action=register']);
        }
        break;
        
    default:
        http_response_code(405);
        echo json_encode(['success' => false, 'message' => 'Method not allowed']);
}
