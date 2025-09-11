<?php
class FirebaseSync {
    private $firebaseUrl;
    
    public function __construct() {
        $this->firebaseUrl = $_ENV['FIREBASE_DATABASE_URL'] ?? 'https://water-park-731dd-default-rtdb.firebaseio.com';
    }
    
    public function syncBookingToFirebase($booking) {
        try {
            // Convert booking data to Firebase format
            $firebaseBooking = [
                'id' => $booking['ticket_number'], // Use ticket number as ID
                'customerName' => $booking['customer_name'],
                'customerEmail' => $booking['customer_email'],
                'customerPhone' => $booking['customer_phone'],
                'packageName' => $booking['package_name'],
                'adults' => $booking['adults'],
                'children' => $booking['children'],
                'totalAmount' => $booking['total_amount'],
                'visitDate' => $booking['visit_date'],
                'status' => $booking['payment_status'] === 'completed' ? 'confirmed' : 'pending',
                'paymentId' => $booking['payment_id'] ?? '',
                'ticketNumber' => $booking['ticket_number'],
                'qrCode' => $booking['qr_code'],
                'createdAt' => $booking['created_at'],
                'source' => 'management_software'
            ];
            
            // Send to Firebase
            $url = $this->firebaseUrl . '/bookings/' . $booking['ticket_number'] . '.json';
            
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $url);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'PUT');
            curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($firebaseBooking));
            curl_setopt($ch, CURLOPT_HTTPHEADER, [
                'Content-Type: application/json'
            ]);
            
            $response = curl_exec($ch);
            $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
            curl_close($ch);
            
            if ($httpCode === 200) {
                return ['success' => true, 'message' => 'Booking synced to Firebase'];
            } else {
                return ['success' => false, 'error' => 'Firebase sync failed: ' . $response];
            }
            
        } catch (Exception $e) {
            return ['success' => false, 'error' => 'Firebase sync error: ' . $e->getMessage()];
        }
    }
    
    public function getFirebaseBookings() {
        try {
            $url = $this->firebaseUrl . '/bookings.json';
            
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $url);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            
            $response = curl_exec($ch);
            $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
            curl_close($ch);
            
            if ($httpCode === 200) {
                $data = json_decode($response, true);
                return ['success' => true, 'bookings' => $data ?: []];
            } else {
                return ['success' => false, 'error' => 'Failed to fetch Firebase bookings'];
            }
            
        } catch (Exception $e) {
            return ['success' => false, 'error' => 'Firebase fetch error: ' . $e->getMessage()];
        }
    }
}
?>
