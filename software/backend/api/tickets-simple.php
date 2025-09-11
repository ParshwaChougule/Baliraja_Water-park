<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Include booking system to get real bookings
require_once 'booking-system.php';

try {
    $bookingSystem = new BookingSystem();
    $result = $bookingSystem->getAllBookings();
    
    if ($result['success']) {
        // Convert bookings to tickets format
        $tickets = [];
        if (isset($result['bookings'])) {
            foreach ($result['bookings'] as $booking) {
                $tickets[] = [
                    'id' => $booking['id'],
                    'ticket_number' => $booking['ticket_number'],
                    'customer_name' => $booking['customer_name'],
                    'customer_email' => $booking['customer_email'],
                    'customer_phone' => $booking['customer_phone'],
                    'package_name' => $booking['package_name'],
                    'adults' => $booking['adults'],
                    'children' => $booking['children'],
                    'total_amount' => $booking['total_amount'],
                    'payment_status' => $booking['payment_status'],
                    'visit_date' => $booking['visit_date'],
                    'qr_code' => $booking['qr_code'],
                    'is_used' => $booking['is_used'] ?? false,
                    'created_at' => $booking['created_at']
                ];
            }
        }
        
        echo json_encode([
            'success' => true,
            'records' => $tickets,
            'count' => count($tickets)
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'error' => 'Failed to fetch bookings',
            'records' => [],
            'count' => 0
        ]);
    }
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'error' => 'Server error: ' . $e->getMessage(),
        'records' => [],
        'count' => 0
    ]);
}
?>
