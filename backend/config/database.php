<?php
/**
 * MongoDB Database Configuration
 */

// MongoDB Atlas Connection String
// Replace with your actual MongoDB Atlas connection string
define('MONGODB_URI', getenv('MONGODB_URI') ?: 'mongodb+srv://username:password@cluster.mongodb.net/medical_emergency?retryWrites=true&w=majority');
define('DB_NAME', 'medical_emergency');

class Database {
    private static $instance = null;
    private $client;
    private $database;
    
    private function __construct() {
        try {
            // Check if MongoDB extension is loaded
            if (!extension_loaded('mongodb')) {
                throw new Exception("MongoDB extension not loaded. Install: composer require mongodb/mongodb");
            }
            
            // Create MongoDB client
            $this->client = new MongoDB\Driver\Manager(MONGODB_URI);
            
            // For MongoDB PHP Library (if using composer)
            // Uncomment below if you install via composer
            // $this->client = new MongoDB\Client(MONGODB_URI);
            // $this->database = $this->client->selectDatabase(DB_NAME);
            
        } catch (Exception $e) {
            error_log("MongoDB Connection Error: " . $e->getMessage());
            throw new Exception("Database connection failed: " . $e->getMessage());
        }
    }
    
    public static function getInstance() {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }
    
    public function getConnection() {
        return $this->client;
    }
    
    public function getDatabase() {
        return $this->database;
    }
    
    // Helper method to get collection
    public function getCollection($collectionName) {
        return $this->database->selectCollection($collectionName);
    }
    
    // Prevent cloning
    private function __clone() {}
    
    // Prevent unserialization
    public function __wakeup() {
        throw new Exception("Cannot unserialize singleton");
    }
}
