<?php
/**
 * Healthcare Facility Management
 */

require_once __DIR__ . '/../config/database.php';

class Facility {
    private $db;
    
    public function __construct() {
        $this->db = Database::getInstance()->getConnection();
    }
    
    /**
     * Find nearby facilities
     */
    public function findNearby($latitude, $longitude, $type = null, $radius = EMERGENCY_RADIUS_KM) {
        try {
            $sql = "
                SELECT *, 
                    (6371 * acos(cos(radians(?)) * cos(radians(latitude)) * 
                    cos(radians(longitude) - radians(?)) + sin(radians(?)) * 
                    sin(radians(latitude)))) AS distance
                FROM facilities
                WHERE 1=1
            ";
            
            $params = [$latitude, $longitude, $latitude];
            
            if ($type) {
                $sql .= " AND type = ?";
                $params[] = $type;
            }
            
            $sql .= " HAVING distance < ? ORDER BY distance LIMIT 20";
            $params[] = $radius;
            
            $stmt = $this->db->prepare($sql);
            $stmt->execute($params);
            
            return [
                'success' => true,
                'facilities' => $stmt->fetchAll()
            ];
            
        } catch (Exception $e) {
            error_log("Find Nearby Error: " . $e->getMessage());
            return ['success' => false, 'message' => 'Failed to find facilities'];
        }
    }
    
    /**
     * Get facility details
     */
    public function getFacilityDetails($facilityId) {
        try {
            $stmt = $this->db->prepare("
                SELECT f.*, 
                       COUNT(a.id) as total_ambulances,
                       SUM(CASE WHEN a.status = 'available' THEN 1 ELSE 0 END) as available_ambulances
                FROM facilities f
                LEFT JOIN ambulances a ON f.id = a.facility_id
                WHERE f.id = ?
                GROUP BY f.id
            ");
            $stmt->execute([$facilityId]);
            $facility = $stmt->fetch();
            
            if (!$facility) {
                return ['success' => false, 'message' => 'Facility not found'];
            }
            
            return [
                'success' => true,
                'facility' => $facility
            ];
            
        } catch (Exception $e) {
            error_log("Get Facility Error: " . $e->getMessage());
            return ['success' => false, 'message' => 'Failed to fetch facility'];
        }
    }
    
    /**
     * Search facilities by name or services
     */
    public function search($query) {
        try {
            $stmt = $this->db->prepare("
                SELECT *, 
                       MATCH(name, services) AGAINST(? IN NATURAL LANGUAGE MODE) as relevance
                FROM facilities
                WHERE MATCH(name, services) AGAINST(? IN NATURAL LANGUAGE MODE)
                   OR name LIKE ?
                ORDER BY relevance DESC, rating DESC
                LIMIT 20
            ");
            
            $searchTerm = "%$query%";
            $stmt->execute([$query, $query, $searchTerm]);
            
            return [
                'success' => true,
                'facilities' => $stmt->fetchAll()
            ];
            
        } catch (Exception $e) {
            error_log("Search Facilities Error: " . $e->getMessage());
            return ['success' => false, 'message' => 'Search failed'];
        }
    }
    
    /**
     * Get facilities by type
     */
    public function getByType($type) {
        try {
            $stmt = $this->db->prepare("
                SELECT * FROM facilities 
                WHERE type = ? AND is_verified = TRUE
                ORDER BY rating DESC
                LIMIT 50
            ");
            $stmt->execute([$type]);
            
            return [
                'success' => true,
                'facilities' => $stmt->fetchAll()
            ];
            
        } catch (Exception $e) {
            error_log("Get By Type Error: " . $e->getMessage());
            return ['success' => false, 'message' => 'Failed to fetch facilities'];
        }
    }
}
