<?php
/**
 * First Aid Tips API Endpoints
 */

require_once __DIR__ . '/../config/config.php';
require_once __DIR__ . '/../config/database.php';

$db = Database::getInstance()->getConnection();
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        $action = $_GET['action'] ?? 'list';
        
        if ($action === 'list') {
            // Get all first aid tips
            $category = $_GET['category'] ?? null;
            
            $sql = "SELECT * FROM first_aid_tips";
            $params = [];
            
            if ($category) {
                $sql .= " WHERE category = ?";
                $params[] = $category;
            }
            
            $sql .= " ORDER BY category, title";
            
            $stmt = $db->prepare($sql);
            $stmt->execute($params);
            
            echo json_encode([
                'success' => true,
                'tips' => $stmt->fetchAll()
            ]);
            
        } elseif ($action === 'categories') {
            // Get all categories
            $stmt = $db->query("SELECT DISTINCT category FROM first_aid_tips ORDER BY category");
            
            echo json_encode([
                'success' => true,
                'categories' => $stmt->fetchAll(PDO::FETCH_COLUMN)
            ]);
            
        } elseif ($action === 'details') {
            // Get tip details
            $id = $_GET['id'] ?? null;
            
            if (!$id) {
                echo json_encode(['success' => false, 'message' => 'Tip ID required']);
                exit;
            }
            
            $stmt = $db->prepare("SELECT * FROM first_aid_tips WHERE id = ?");
            $stmt->execute([$id]);
            $tip = $stmt->fetch();
            
            if ($tip) {
                echo json_encode(['success' => true, 'tip' => $tip]);
            } else {
                echo json_encode(['success' => false, 'message' => 'Tip not found']);
            }
        }
        break;
        
    default:
        http_response_code(405);
        echo json_encode(['success' => false, 'message' => 'Method not allowed']);
}
