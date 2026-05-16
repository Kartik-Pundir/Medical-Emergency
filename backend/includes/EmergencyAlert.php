<?php
/**
 * Emergency Alert Management
 */

require_once __DIR__ . '/../config/database.php';

class EmergencyAlert {
    private $db;
    
    public function __construct() {
        $this->db = Database::getInstance()->getConnection();
    }
    
    /**
     * Create new emergency alert
     */
    public function createAlert($userId, $data) {
        try {
            $stmt = $this->db->prepare("
                INSERT INTO emergency_alerts 
                (user_id, alert_type, severity, description, latitude, longitude, address, status)
                VALUES (?, ?, ?, ?, ?, ?, ?, 'pending')
            ");
            
            $stmt->execute([
                $userId,
                $data['alert_type'],
                $data['severity'],
                $data['description'] ?? null,
                $data['latitude'],
                $data['longitude'],
                $data['address'] ?? null
            ]);
            
            $alertId = $this->db->lastInsertId();
            
            // Find and assign nearest facility
            $this->assignNearestFacility($alertId, $data['latitude'], $data['longitude']);
            
            // Create notification
            $this->createNotification($userId, $alertId, 'Emergency Alert Created', 
                'Your emergency alert has been created and help is on the way.');
            
            return [
                'success' => true,
                'message' => 'Emergency alert created successfully',
                'alert_id' => $alertId
            ];
            
        } catch (Exception $e) {
            error_log("Create Alert Error: " . $e->getMessage());
            return ['success' => false, 'message' => 'Failed to create alert'];
        }
    }
    
    /**
     * Assign nearest facility to alert
     */
    private function assignNearestFacility($alertId, $latitude, $longitude) {
        try {
            // Find nearest hospital with emergency services
            $stmt = $this->db->prepare("
                SELECT id, 
                    (6371 * acos(cos(radians(?)) * cos(radians(latitude)) * 
                    cos(radians(longitude) - radians(?)) + sin(radians(?)) * 
                    sin(radians(latitude)))) AS distance
                FROM facilities
                WHERE has_emergency = TRUE AND type = 'hospital'
                ORDER BY distance
                LIMIT 1
            ");
            
            $stmt->execute([$latitude, $longitude, $latitude]);
            $facility = $stmt->fetch();
            
            if ($facility) {
                // Update alert with assigned facility
                $updateStmt = $this->db->prepare("
                    UPDATE emergency_alerts 
                    SET assigned_facility_id = ?, status = 'acknowledged'
                    WHERE id = ?
                ");
                $updateStmt->execute([$facility['id'], $alertId]);
                
                // Try to assign available ambulance
                $this->assignAmbulance($alertId, $facility['id']);
            }
            
        } catch (Exception $e) {
            error_log("Assign Facility Error: " . $e->getMessage());
        }
    }
    
    /**
     * Assign ambulance to alert
     */
    private function assignAmbulance($alertId, $facilityId) {
        try {
            $stmt = $this->db->prepare("
                SELECT id FROM ambulances 
                WHERE facility_id = ? AND status = 'available'
                LIMIT 1
            ");
            $stmt->execute([$facilityId]);
            $ambulance = $stmt->fetch();
            
            if ($ambulance) {
                // Update alert with ambulance
                $updateAlert = $this->db->prepare("
                    UPDATE emergency_alerts 
                    SET assigned_ambulance_id = ?, status = 'dispatched'
                    WHERE id = ?
                ");
                $updateAlert->execute([$ambulance['id'], $alertId]);
                
                // Update ambulance status
                $updateAmbulance = $this->db->prepare("
                    UPDATE ambulances SET status = 'on_duty' WHERE id = ?
                ");
                $updateAmbulance->execute([$ambulance['id']]);
            }
            
        } catch (Exception $e) {
            error_log("Assign Ambulance Error: " . $e->getMessage());
        }
    }
    
    /**
     * Get user's alerts
     */
    public function getUserAlerts($userId, $limit = 10) {
        try {
            $stmt = $this->db->prepare("
                SELECT ea.*, 
                       f.name as facility_name, f.phone as facility_phone,
                       a.vehicle_number, a.driver_name, a.driver_phone
                FROM emergency_alerts ea
                LEFT JOIN facilities f ON ea.assigned_facility_id = f.id
                LEFT JOIN ambulances a ON ea.assigned_ambulance_id = a.id
                WHERE ea.user_id = ?
                ORDER BY ea.created_at DESC
                LIMIT ?
            ");
            $stmt->execute([$userId, $limit]);
            
            return [
                'success' => true,
                'alerts' => $stmt->fetchAll()
            ];
            
        } catch (Exception $e) {
            error_log("Get Alerts Error: " . $e->getMessage());
            return ['success' => false, 'message' => 'Failed to fetch alerts'];
        }
    }
    
    /**
     * Update alert status
     */
    public function updateAlertStatus($alertId, $status) {
        try {
            $stmt = $this->db->prepare("
                UPDATE emergency_alerts 
                SET status = ?, 
                    resolved_at = IF(? = 'resolved', NOW(), NULL)
                WHERE id = ?
            ");
            $stmt->execute([$status, $status, $alertId]);
            
            return ['success' => true, 'message' => 'Alert status updated'];
            
        } catch (Exception $e) {
            error_log("Update Alert Error: " . $e->getMessage());
            return ['success' => false, 'message' => 'Failed to update alert'];
        }
    }
    
    /**
     * Create notification
     */
    private function createNotification($userId, $alertId, $title, $message) {
        try {
            $stmt = $this->db->prepare("
                INSERT INTO notifications (user_id, alert_id, title, message, type)
                VALUES (?, ?, ?, ?, 'alert')
            ");
            $stmt->execute([$userId, $alertId, $title, $message]);
        } catch (Exception $e) {
            error_log("Create Notification Error: " . $e->getMessage());
        }
    }
}
