<?php
/**
 * Medical Records Management
 */

require_once __DIR__ . '/../config/database.php';

class MedicalRecord {
    private $db;
    
    public function __construct() {
        $this->db = Database::getInstance()->getConnection();
    }
    
    /**
     * Add medical record
     */
    public function addRecord($userId, $data) {
        try {
            $stmt = $this->db->prepare("
                INSERT INTO medical_records 
                (user_id, record_type, title, description, date_recorded, document_path, is_critical)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            ");
            
            $stmt->execute([
                $userId,
                $data['record_type'],
                $data['title'],
                $data['description'] ?? null,
                $data['date_recorded'] ?? date('Y-m-d'),
                $data['document_path'] ?? null,
                $data['is_critical'] ?? false
            ]);
            
            return [
                'success' => true,
                'message' => 'Medical record added successfully',
                'record_id' => $this->db->lastInsertId()
            ];
            
        } catch (Exception $e) {
            error_log("Add Record Error: " . $e->getMessage());
            return ['success' => false, 'message' => 'Failed to add record'];
        }
    }
    
    /**
     * Get user's medical records
     */
    public function getUserRecords($userId, $type = null) {
        try {
            $sql = "SELECT * FROM medical_records WHERE user_id = ?";
            $params = [$userId];
            
            if ($type) {
                $sql .= " AND record_type = ?";
                $params[] = $type;
            }
            
            $sql .= " ORDER BY is_critical DESC, date_recorded DESC";
            
            $stmt = $this->db->prepare($sql);
            $stmt->execute($params);
            
            return [
                'success' => true,
                'records' => $stmt->fetchAll()
            ];
            
        } catch (Exception $e) {
            error_log("Get Records Error: " . $e->getMessage());
            return ['success' => false, 'message' => 'Failed to fetch records'];
        }
    }
    
    /**
     * Get critical medical information
     */
    public function getCriticalInfo($userId) {
        try {
            $stmt = $this->db->prepare("
                SELECT * FROM medical_records 
                WHERE user_id = ? AND is_critical = TRUE
                ORDER BY date_recorded DESC
            ");
            $stmt->execute([$userId]);
            
            return [
                'success' => true,
                'critical_records' => $stmt->fetchAll()
            ];
            
        } catch (Exception $e) {
            error_log("Get Critical Info Error: " . $e->getMessage());
            return ['success' => false, 'message' => 'Failed to fetch critical info'];
        }
    }
    
    /**
     * Delete medical record
     */
    public function deleteRecord($recordId, $userId) {
        try {
            $stmt = $this->db->prepare("
                DELETE FROM medical_records 
                WHERE id = ? AND user_id = ?
            ");
            $stmt->execute([$recordId, $userId]);
            
            return ['success' => true, 'message' => 'Record deleted successfully'];
            
        } catch (Exception $e) {
            error_log("Delete Record Error: " . $e->getMessage());
            return ['success' => false, 'message' => 'Failed to delete record'];
        }
    }
}
