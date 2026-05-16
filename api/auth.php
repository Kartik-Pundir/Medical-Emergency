<?php
/**
 * Authentication API Endpoints
 */

require_once __DIR__ . '/../config/config.php';
require_once __DIR__ . '/../includes/Auth.php';

$auth = new Auth();
$method = $_SERVER['REQUEST_METHOD'];
$input = json_decode(file_get_contents('php://input'), true);

switch ($method) {
    case 'POST':
        $action = $_GET['action'] ?? '';
        
        if ($action === 'register') {
            $result = $auth->register($input);
            echo json_encode($result);
            
        } elseif ($action === 'login') {
            if (empty($input['email']) || empty($input['password'])) {
                echo json_encode(['success' => false, 'message' => 'Email and password required']);
                exit;
            }
            
            $result = $auth->login($input['email'], $input['password']);
            echo json_encode($result);
            
        } else {
            echo json_encode(['success' => false, 'message' => 'Invalid action']);
        }
        break;
        
    default:
        http_response_code(405);
        echo json_encode(['success' => false, 'message' => 'Method not allowed']);
}
