<?php
/**
 * Authentication API - Works on Vercel with remote MySQL
 */

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Database config from environment variables (set in Vercel dashboard)
$db_host = getenv('DB_HOST') ?: 'localhost';
$db_name = getenv('DB_NAME') ?: 'medical_emergency';
$db_user = getenv('DB_USER') ?: 'root';
$db_pass = getenv('DB_PASS') ?: '';

// JWT config
define('JWT_SECRET', getenv('JWT_SECRET') ?: 'medical-emergency-secret-key-2024');
define('JWT_EXPIRY', 86400); // 24 hours

// Connect to database
try {
    $pdo = new PDO(
        "mysql:host={$db_host};dbname={$db_name};charset=utf8mb4",
        $db_user,
        $db_pass,
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ]
    );
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Database connection failed: ' . $e->getMessage()
    ]);
    exit();
}

$method = $_SERVER['REQUEST_METHOD'];
$action = $_GET['action'] ?? '';
$input = json_decode(file_get_contents('php://input'), true) ?? [];

if ($method !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit();
}

// ─── REGISTER ────────────────────────────────────────────────────────────────
if ($action === 'register') {
    $required = ['full_name', 'email', 'phone', 'password'];
    foreach ($required as $field) {
        if (empty($input[$field])) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => "$field is required"]);
            exit();
        }
    }

    if (!filter_var($input['email'], FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Invalid email format']);
        exit();
    }

    // Check duplicate email
    $stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
    $stmt->execute([$input['email']]);
    if ($stmt->fetch()) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Email already registered']);
        exit();
    }

    $hash = password_hash($input['password'], PASSWORD_BCRYPT);
    $stmt = $pdo->prepare("
        INSERT INTO users (full_name, email, phone, password_hash, blood_group, is_active)
        VALUES (?, ?, ?, ?, ?, 1)
    ");
    $stmt->execute([
        $input['full_name'],
        $input['email'],
        $input['phone'],
        $hash,
        $input['blood_group'] ?? null
    ]);

    $userId = $pdo->lastInsertId();
    $token  = generateToken($userId);

    echo json_encode([
        'success'  => true,
        'message'  => 'Registration successful',
        'user_id'  => $userId,
        'token'    => $token
    ]);
    exit();
}

// ─── LOGIN ────────────────────────────────────────────────────────────────────
if ($action === 'login') {
    if (empty($input['email']) || empty($input['password'])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Email and password are required']);
        exit();
    }

    $stmt = $pdo->prepare("SELECT id, full_name, email, phone, password_hash, is_active FROM users WHERE email = ?");
    $stmt->execute([$input['email']]);
    $user = $stmt->fetch();

    if (!$user || !password_verify($input['password'], $user['password_hash'])) {
        http_response_code(401);
        echo json_encode(['success' => false, 'message' => 'Invalid email or password']);
        exit();
    }

    if (!$user['is_active']) {
        http_response_code(401);
        echo json_encode(['success' => false, 'message' => 'Account is inactive']);
        exit();
    }

    $token = generateToken($user['id']);
    unset($user['password_hash']);

    echo json_encode([
        'success' => true,
        'message' => 'Login successful',
        'user'    => $user,
        'token'   => $token
    ]);
    exit();
}

http_response_code(400);
echo json_encode(['success' => false, 'message' => 'Invalid action. Use ?action=login or ?action=register']);

// ─── JWT HELPERS ──────────────────────────────────────────────────────────────
function generateToken($userId) {
    $header  = base64url(json_encode(['typ' => 'JWT', 'alg' => 'HS256']));
    $payload = base64url(json_encode(['user_id' => $userId, 'exp' => time() + JWT_EXPIRY]));
    $sig     = base64url(hash_hmac('sha256', "$header.$payload", JWT_SECRET, true));
    return "$header.$payload.$sig";
}

function base64url($data) {
    return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
}
