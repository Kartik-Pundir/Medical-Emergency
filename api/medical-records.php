<?php
/**
 * Medical Records API Endpoints
 */

require_once __DIR__ . '/../config/config.php';
require_once __DIR__ . '/../includes/Auth.php';
require_once __DIR__ . '/../includes/MedicalRecord.php';

$auth = new Auth();
$medicalRecord = new MedicalRecord();
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
        // Add medical record
        if (empty($input['record_type']) || empty($input['title'])) {
            echo json_encode(['success' => false, 'message' => 'Record type and title required']);
            exit;
        }
        
        $result = $medicalRecord->addRecord($userId, $input);
        echo json_encode($result);
        break;
        
    case 'GET':
        $action = $_GET['action'] ?? 'list';
        
        if ($action === 'list') {
            // Get all records
            $type = $_GET['type'] ?? null;
            $result = $medicalRecord->getUserRecords($userId, $type);
            echo json_encode($result);
            
        } elseif ($action === 'critical') {
            // Get critical records
            $result = $medicalRecord->getCriticalInfo($userId);
            echo json_encode($result);
            
        } else {
            echo json_encode(['success' => false, 'message' => 'Invalid action']);
        }
        break;
        
    case 'DELETE':
        // Delete record
        $recordId = $_GET['id'] ?? null;
        
        if (!$recordId) {
            echo json_encode(['success' => false, 'message' => 'Record ID required']);
            exit;
        }
        
        $result = $medicalRecord->deleteRecord($recordId, $userId);
        echo json_encode($result);
        break;
        
    default:
        http_response_code(405);
        echo json_encode(['success' => false, 'message' => 'Method not allowed']);
}
