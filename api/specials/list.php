<?php
/**
 * Get All Special Offers (Manager/Admin Only)
 * Returns ALL specials regardless of published status
 * 
 * Developer: Ntlantla Mabindisa (NMAB TECH SERVICES)
 * Contact: mabindisantla92@gmail.com | +27 60 229 0710
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');

require_once '../config/database.php';

try {
    $database = new Database();
    $db = $database->getConnection();
    
    // Get ALL specials (for manager dashboard)
    $query = "SELECT 
                id,
                title,
                description,
                discount_type,
                discount_value,
                valid_from,
                valid_until,
                published,
                status,
                uses_count,
                max_uses,
                created_at
              FROM specials
              ORDER BY created_at DESC";
    
    $stmt = $db->prepare($query);
    $stmt->execute();
    
    $specials = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode([
        'success' => true,
        'data' => $specials,
        'count' => count($specials)
    ]);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Failed to fetch specials',
        'error' => $e->getMessage()
    ]);
}
?>
