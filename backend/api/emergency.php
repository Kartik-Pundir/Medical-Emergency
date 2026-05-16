<?php
/**
 * Emergency Alert API Endpoints
 */

require_once __DIR__ . '/../config/config.php';
require_once __DIR__ . '/../includes/Auth.php';
require_once __DIR__ . '/../includes/EmergencyAlert.php';

$auth = new Auth();
$emergency = new EmergencyAlert();
$method = $_SERVER['REQUEST_METHOD'];
$input = json_decode(file_get_contents('php://input'), true);

// Authenticate user
$userId = $auth->getAuthenticatedUserId();
if (!$userId) {
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'Unauthorized']);
    exit;
}

switch ($method) {
    case 'POST':
        // Create emergency alert
        if (empty($input['alert_type']) || empty($input['severity']) || 
            empty($input['latitude']) || empty($input['longitude'])) {
            echo json_encode(['success' => false, 'message' => 'Missing required fields']);
            exit;
        }
        
        $result = $emergency->createAlert($userId, $input);
        echo json_encode($result);
        break;
        
    case 'GET':
        // Get user's alerts
        $limit = $_GET['limit'] ?? 10;
        $result = $emergency->getUserAlerts($userId, $limit);
        echo json_encode($result);
        break;
        
    case 'PUT':
        // Update alert status
        $alertId = $_GET['id'] ?? null;
        $status = $input['status'] ?? null;
        
        if (!$alertId || !$status) {
            echo json_encode(['success' => false, 'message' => 'Alert ID and status required']);
            exit;
        }
        
        $result = $emergency->updateAlertStatus($alertId, $status);
        echo json_encode($result);
        break;
        
    default:
        http_response_code(405);
        echo json_encode(['success' => false, 'message' => 'Method not allowed']);
}
