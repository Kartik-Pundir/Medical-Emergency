<?php
/**
 * Healthcare Facilities API Endpoints
 */

require_once __DIR__ . '/../config/config.php';
require_once __DIR__ . '/../includes/Auth.php';
require_once __DIR__ . '/../includes/Facility.php';

$auth = new Auth();
$facility = new Facility();
$method = $_SERVER['REQUEST_METHOD'];

// Authenticate user
$userId = $auth->getAuthenticatedUserId();
if (!$userId) {
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'Unauthorized']);
    exit;
}

switch ($method) {
    case 'GET':
        $action = $_GET['action'] ?? 'nearby';
        
        if ($action === 'nearby') {
            // Find nearby facilities
            $latitude = $_GET['latitude'] ?? null;
            $longitude = $_GET['longitude'] ?? null;
            $type = $_GET['type'] ?? null;
            $radius = $_GET['radius'] ?? EMERGENCY_RADIUS_KM;
            
            if (!$latitude || !$longitude) {
                echo json_encode(['success' => false, 'message' => 'Location required']);
                exit;
            }
            
            $result = $facility->findNearby($latitude, $longitude, $type, $radius);
            echo json_encode($result);
            
        } elseif ($action === 'details') {
            // Get facility details
            $facilityId = $_GET['id'] ?? null;
            
            if (!$facilityId) {
                echo json_encode(['success' => false, 'message' => 'Facility ID required']);
                exit;
            }
            
            $result = $facility->getFacilityDetails($facilityId);
            echo json_encode($result);
            
        } elseif ($action === 'search') {
            // Search facilities
            $query = $_GET['q'] ?? '';
            
            if (empty($query)) {
                echo json_encode(['success' => false, 'message' => 'Search query required']);
                exit;
            }
            
            $result = $facility->search($query);
            echo json_encode($result);
            
        } elseif ($action === 'type') {
            // Get by type
            $type = $_GET['type'] ?? null;
            
            if (!$type) {
                echo json_encode(['success' => false, 'message' => 'Type required']);
                exit;
            }
            
            $result = $facility->getByType($type);
            echo json_encode($result);
            
        } else {
            echo json_encode(['success' => false, 'message' => 'Invalid action']);
        }
        break;
        
    default:
        http_response_code(405);
        echo json_encode(['success' => false, 'message' => 'Method not allowed']);
}
