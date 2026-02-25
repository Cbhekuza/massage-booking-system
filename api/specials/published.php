<?php
/**
 * Get Published Special Offers (Customer-Facing)
 * Only returns specials where published=TRUE
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
    
    // CRITICAL: Only select published specials that are currently valid
    $query = "SELECT 
                id,
                title,
                description,
                discount_type,
                discount_value,
                valid_from,
                valid_until
              FROM specials
              WHERE published = TRUE 
                AND status = 'active'
                AND CURDATE() BETWEEN valid_from AND valid_until
              ORDER BY discount_value DESC";
    
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
        'message' => 'Failed to fetch published specials',
        'error' => $e->getMessage()
    ]);
}
?>
