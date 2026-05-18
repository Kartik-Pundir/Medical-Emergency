<?php
/**
 * Authentication Handler for MongoDB
 */

require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../config/config.php';

class AuthMongo {
    private $manager;
    private $dbName = 'medical_emergency';
    
    public function __construct() {
        $db = Database::getInstance();
        $this->manager = $db->getConnection();
    }
    
    /**
     * Register a new user
     */
    public function register($data) {
        try {
            // Validate required fields
            $required = ['full_name', 'email', 'phone', 'password'];
            foreach ($required as $field) {
                if (empty($data[$field])) {
                    return ['success' => false, 'message' => "Field $field is required"];
                }
            }
            
            // Validate email
            if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
                return ['success' => false, 'message' => 'Invalid email format'];
            }
            
            // Check if email already exists
            $filter = ['email' => $data['email']];
            $query = new MongoDB\Driver\Query($filter);
            $cursor = $this->manager->executeQuery($this->dbName . '.users', $query);
            $existingUsers = $cursor->toArray();
            
            if (count($existingUsers) > 0) {
                return ['success' => false, 'message' => 'Email already registered'];
            }
            
            // Hash password
            $passwordHash = password_hash($data['password'], PASSWORD_BCRYPT);
            
            // Prepare user document
            $userDoc = [
                'full_name' => $data['full_name'],
                'email' => $data['email'],
                'phone' => $data['phone'],
                'password_hash' => $passwordHash,
                'blood_group' => $data['blood_group'] ?? null,
                'date_of_birth' => $data['date_of_birth'] ?? null,
                'gender' => $data['gender'] ?? null,
                'address' => $data['address'] ?? null,
                'latitude' => isset($data['latitude']) ? (float)$data['latitude'] : null,
                'longitude' => isset($data['longitude']) ? (float)$data['longitude'] : null,
                'profile_image' => null,
                'is_active' => true,
                'created_at' => new MongoDB\BSON\UTCDateTime(),
                'updated_at' => new MongoDB\BSON\UTCDateTime()
            ];
            
            // Insert user
            $bulk = new MongoDB\Driver\BulkWrite;
            $userId = $bulk->insert($userDoc);
            $this->manager->executeBulkWrite($this->dbName . '.users', $bulk);
            
            $token = $this->generateToken((string)$userId);
            
            return [
                'success' => true,
                'message' => 'Registration successful',
                'user_id' => (string)$userId,
                'token' => $token
            ];
            
        } catch (Exception $e) {
            error_log("Registration Error: " . $e->getMessage());
            return ['success' => false, 'message' => 'Registration failed: ' . $e->getMessage()];
        }
    }
    
    /**
     * Login user
     */
    public function login($email, $password) {
        try {
            // Find user by email
            $filter = ['email' => $email];
            $query = new MongoDB\Driver\Query($filter);
            $cursor = $this->manager->executeQuery($this->dbName . '.users', $query);
            $users = $cursor->toArray();
            
            if (count($users) === 0) {
                return ['success' => false, 'message' => 'Invalid credentials'];
            }
            
            $user = $users[0];
            
            if (!$user->is_active) {
                return ['success' => false, 'message' => 'Account is inactive'];
            }
            
            if (!password_verify($password, $user->password_hash)) {
                return ['success' => false, 'message' => 'Invalid credentials'];
            }
            
            $token = $this->generateToken((string)$user->_id);
            
            // Convert user object to array and remove password
            $userArray = [
                'id' => (string)$user->_id,
                'full_name' => $user->full_name,
                'email' => $user->email,
                'phone' => $user->phone,
                'blood_group' => $user->blood_group ?? null,
                'is_active' => $user->is_active
            ];
            
            return [
                'success' => true,
                'message' => 'Login successful',
                'user' => $userArray,
                'token' => $token
            ];
            
        } catch (Exception $e) {
            error_log("Login Error: " . $e->getMessage());
            return ['success' => false, 'message' => 'Login failed: ' . $e->getMessage()];
        }
    }
    
    /**
     * Generate JWT token
     */
    private function generateToken($userId) {
        $header = json_encode(['typ' => 'JWT', 'alg' => 'HS256']);
        $payload = json_encode([
            'user_id' => $userId,
            'exp' => time() + JWT_EXPIRY
        ]);
        
        $base64UrlHeader = $this->base64UrlEncode($header);
        $base64UrlPayload = $this->base64UrlEncode($payload);
        
        $signature = hash_hmac('sha256', 
            $base64UrlHeader . "." . $base64UrlPayload, 
            JWT_SECRET_KEY, 
            true
        );
        $base64UrlSignature = $this->base64UrlEncode($signature);
        
        return $base64UrlHeader . "." . $base64UrlPayload . "." . $base64UrlSignature;
    }
    
    /**
     * Verify JWT token
     */
    public function verifyToken($token) {
        try {
            $tokenParts = explode('.', $token);
            if (count($tokenParts) !== 3) {
                return false;
            }
            
            $header = base64_decode($tokenParts[0]);
            $payload = base64_decode($tokenParts[1]);
            $signatureProvided = $tokenParts[2];
            
            $base64UrlHeader = $this->base64UrlEncode($header);
            $base64UrlPayload = $this->base64UrlEncode($payload);
            
            $signature = hash_hmac('sha256',
                $base64UrlHeader . "." . $base64UrlPayload,
                JWT_SECRET_KEY,
                true
            );
            $base64UrlSignature = $this->base64UrlEncode($signature);
            
            if ($base64UrlSignature !== $signatureProvided) {
                return false;
            }
            
            $payloadData = json_decode($payload, true);
            
            if ($payloadData['exp'] < time()) {
                return false;
            }
            
            return $payloadData['user_id'];
            
        } catch (Exception $e) {
            return false;
        }
    }
    
    /**
     * Get authenticated user ID from request
     */
    public function getAuthenticatedUserId() {
        $headers = getallheaders();
        $token = null;
        
        if (isset($headers['Authorization'])) {
            $token = str_replace('Bearer ', '', $headers['Authorization']);
        }
        
        if (!$token) {
            return false;
        }
        
        return $this->verifyToken($token);
    }
    
    private function base64UrlEncode($data) {
        return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
    }
}
