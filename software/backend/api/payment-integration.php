<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

require_once '../config/database.php';
require_once '../config/razorpay.php';
require_once '../vendor/autoload.php';

use Razorpay\Api\Api;
use Kreait\Firebase\Factory;
use Kreait\Firebase\ServiceAccount;

// Load environment variables
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/..');
$dotenv->load();

class PaymentIntegration {
    private $db;
    private $razorpay;
    private $firebase;
    
    public function __construct() {
        $database = new Database();
        $this->db = $database->getConnection();
        
        // Initialize Razorpay
        $this->razorpay = new Api(
            RazorpayConfig::getKeyId(),
            RazorpayConfig::getKeySecret()
        );
        
        // Initialize Firebase
        try {
            $factory = (new Factory)
                ->withDatabaseUri($_ENV['FIREBASE_DATABASE_URL'] ?? 'https://water-park-731dd-default-rtdb.firebaseio.com');
            $this->firebase = $factory->createDatabase();
        } catch (Exception $e) {
            error_log("Firebase initialization failed: " . $e->getMessage());
            $this->firebase = null;
        }
    }
    
    // Create Razorpay order
    public function createOrder($data) {
        try {
            $orderData = [
                'receipt' => 'order_' . time(),
                'amount' => $data['amount'] * 100, // Convert to paise
                'currency' => 'INR',
                'notes' => [
                    'customer_name' => $data['customer_name'],
                    'customer_email' => $data['customer_email'],
                    'package_name' => $data['package_name'],
                    'source' => $data['source'] ?? 'website' // website or software
                ]
            ];
            
            $order = $this->razorpay->order->create($orderData);
            
            // Store order in database
            $this->storeOrder($order, $data);
            
            return [
                'success' => true,
                'order_id' => $order['id'],
                'amount' => $order['amount'],
                'currency' => $order['currency'],
                'key_id' => RazorpayConfig::getKeyId()
            ];
            
        } catch (Exception $e) {
            return [
                'success' => false,
                'error' => $e->getMessage()
            ];
        }
    }
    
    // Verify payment and update records
    public function verifyPayment($data) {
        try {
            $attributes = [
                'razorpay_order_id' => $data['razorpay_order_id'],
                'razorpay_payment_id' => $data['razorpay_payment_id'],
                'razorpay_signature' => $data['razorpay_signature']
            ];
            
            $this->razorpay->utility->verifyPaymentSignature($attributes);
            
            // Payment verified successfully
            $this->updatePaymentStatus($data['razorpay_order_id'], 'completed', $data['razorpay_payment_id']);
            
            // Sync to Firebase if booking came from website
            $this->syncToFirebase($data['razorpay_order_id']);
            
            return [
                'success' => true,
                'message' => 'Payment verified successfully'
            ];
            
        } catch (Exception $e) {
            $this->updatePaymentStatus($data['razorpay_order_id'], 'failed');
            
            return [
                'success' => false,
                'error' => 'Payment verification failed: ' . $e->getMessage()
            ];
        }
    }
    
    // Store order in MySQL database
    private function storeOrder($order, $data) {
        $query = "INSERT INTO bookings (
            order_id, customer_name, customer_email, customer_phone,
            package_name, adults, children, total_amount, visit_date,
            payment_status, source, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', ?, NOW())";
        
        $stmt = $this->db->prepare($query);
        $stmt->execute([
            $order['id'],
            $data['customer_name'],
            $data['customer_email'],
            $data['customer_phone'],
            $data['package_name'],
            $data['adults'] ?? 1,
            $data['children'] ?? 0,
            $order['amount'] / 100, // Convert back to rupees
            $data['visit_date'],
            $data['source'] ?? 'website'
        ]);
    }
    
    // Update payment status
    private function updatePaymentStatus($orderId, $status, $paymentId = null) {
        $query = "UPDATE bookings SET payment_status = ?, payment_id = ?, updated_at = NOW() WHERE order_id = ?";
        $stmt = $this->db->prepare($query);
        $stmt->execute([$status, $paymentId, $orderId]);
    }
    
    // Sync successful booking to Firebase
    private function syncToFirebase($orderId) {
        if (!$this->firebase) {
            return false;
        }
        
        try {
            // Get booking details from MySQL
            $query = "SELECT * FROM bookings WHERE order_id = ? AND payment_status = 'completed'";
            $stmt = $this->db->prepare($query);
            $stmt->execute([$orderId]);
            $booking = $stmt->fetch(PDO::FETCH_ASSOC);
            
            if ($booking) {
                // Create Firebase booking data
                $firebaseData = [
                    'id' => $booking['order_id'],
                    'name' => $booking['customer_name'],
                    'email' => $booking['customer_email'],
                    'phone' => $booking['customer_phone'],
                    'packageName' => $booking['package_name'],
                    'adults' => (int)$booking['adults'],
                    'children' => (int)$booking['children'],
                    'totalAmount' => (float)$booking['total_amount'],
                    'visitDate' => $booking['visit_date'],
                    'status' => 'confirmed',
                    'createdAt' => $booking['created_at'],
                    'updatedAt' => $booking['updated_at'],
                    'source' => $booking['source']
                ];
                
                // Store in Firebase
                $this->firebase->getReference('bookings/' . $booking['order_id'])->set($firebaseData);
                
                return true;
            }
        } catch (Exception $e) {
            error_log("Firebase sync failed: " . $e->getMessage());
        }
        
        return false;
    }
    
    // Get all bookings (for admin dashboard)
    public function getAllBookings() {
        try {
            $query = "SELECT * FROM bookings ORDER BY created_at DESC";
            $stmt = $this->db->prepare($query);
            $stmt->execute();
            $bookings = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            return [
                'success' => true,
                'bookings' => $bookings
            ];
        } catch (Exception $e) {
            return [
                'success' => false,
                'error' => $e->getMessage()
            ];
        }
    }
    
    // Sync Firebase bookings to MySQL (for management software)
    public function syncFromFirebase() {
        if (!$this->firebase) {
            return ['success' => false, 'error' => 'Firebase not initialized'];
        }
        
        try {
            $firebaseBookings = $this->firebase->getReference('bookings')->getValue();
            $syncedCount = 0;
            
            if ($firebaseBookings) {
                foreach ($firebaseBookings as $bookingId => $booking) {
                    // Check if booking already exists in MySQL
                    $query = "SELECT id FROM bookings WHERE order_id = ?";
                    $stmt = $this->db->prepare($query);
                    $stmt->execute([$bookingId]);
                    
                    if (!$stmt->fetch()) {
                        // Insert new booking from Firebase
                        $insertQuery = "INSERT INTO bookings (
                            order_id, customer_name, customer_email, customer_phone,
                            package_name, adults, children, total_amount, visit_date,
                            payment_status, source, created_at
                        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'website', ?)";
                        
                        $insertStmt = $this->db->prepare($insertQuery);
                        $insertStmt->execute([
                            $bookingId,
                            $booking['name'] ?? '',
                            $booking['email'] ?? '',
                            $booking['phone'] ?? '',
                            $booking['packageName'] ?? '',
                            $booking['adults'] ?? 1,
                            $booking['children'] ?? 0,
                            $booking['totalAmount'] ?? 0,
                            $booking['visitDate'] ?? date('Y-m-d'),
                            $booking['status'] === 'confirmed' ? 'completed' : 'pending',
                            $booking['createdAt'] ?? date('Y-m-d H:i:s')
                        ]);
                        
                        $syncedCount++;
                    }
                }
            }
            
            return [
                'success' => true,
                'synced_count' => $syncedCount,
                'message' => "Synced {$syncedCount} bookings from Firebase"
            ];
            
        } catch (Exception $e) {
            return [
                'success' => false,
                'error' => $e->getMessage()
            ];
        }
    }
}

// Handle API requests
$payment = new PaymentIntegration();
$method = $_SERVER['REQUEST_METHOD'];
$input = json_decode(file_get_contents('php://input'), true);

switch ($method) {
    case 'POST':
        if (isset($input['action'])) {
            switch ($input['action']) {
                case 'create_order':
                    echo json_encode($payment->createOrder($input));
                    break;
                    
                case 'verify_payment':
                    echo json_encode($payment->verifyPayment($input));
                    break;
                    
                case 'sync_from_firebase':
                    echo json_encode($payment->syncFromFirebase());
                    break;
                    
                default:
                    echo json_encode(['success' => false, 'error' => 'Invalid action']);
            }
        } else {
            echo json_encode(['success' => false, 'error' => 'Action required']);
        }
        break;
        
    case 'GET':
        echo json_encode($payment->getAllBookings());
        break;
        
    default:
        echo json_encode(['success' => false, 'error' => 'Method not allowed']);
}
?>
