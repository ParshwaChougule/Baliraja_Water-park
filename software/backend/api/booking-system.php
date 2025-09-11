<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

require_once '../vendor/autoload.php';
require_once '../config/razorpay.php';
require_once '../config/firebase-sync.php';

// Load environment variables
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/..');
$dotenv->load();

use Razorpay\Api\Api;

class BookingSystem {
    private $razorpay;
    private $bookingsFile;
    private $firebaseSync;
    
    public function __construct() {
        $this->razorpay = new Api(
            RazorpayConfig::getKeyId(),
            RazorpayConfig::getKeySecret()
        );
        $this->bookingsFile = __DIR__ . '/../data/bookings.json';
        $this->firebaseSync = new FirebaseSync();
        $this->ensureDataDirectory();
    }
    
    private function ensureDataDirectory() {
        $dataDir = dirname($this->bookingsFile);
        if (!is_dir($dataDir)) {
            mkdir($dataDir, 0755, true);
        }
        if (!file_exists($this->bookingsFile)) {
            file_put_contents($this->bookingsFile, json_encode([]));
        }
    }
    
    private function loadBookings() {
        $content = file_get_contents($this->bookingsFile);
        return json_decode($content, true) ?: [];
    }
    
    private function saveBookings($bookings) {
        file_put_contents($this->bookingsFile, json_encode($bookings, JSON_PRETTY_PRINT));
    }
    
    // Create manual booking with payment
    public function createBooking($data) {
        try {
            // Generate ticket number
            $ticketNumber = 'BRJ' . date('Ymd') . rand(1000, 9999);
            
            // Create Razorpay order
            $orderData = [
                'receipt' => $ticketNumber,
                'amount' => $data['total_amount'] * 100,
                'currency' => 'INR',
                'notes' => [
                    'customer_name' => $data['customer_name'],
                    'package_name' => $data['package_name'],
                    'source' => 'software',
                    // Add payment split information
                    'payment_split_enabled' => isset($data['payment_split']) ? 'true' : 'false',
                    'agro_tourism_amount' => isset($data['payment_split']) ? $data['payment_split']['agro_tourism_amount'] : 0,
                    'fun_waterpark_amount' => isset($data['payment_split']) ? $data['payment_split']['fun_waterpark_amount'] : 0,
                    'agro_tourism_percentage' => isset($data['payment_split']) ? $data['payment_split']['agro_tourism_percentage'] : 0,
                    'fun_waterpark_percentage' => isset($data['payment_split']) ? $data['payment_split']['fun_waterpark_percentage'] : 0
                ]
            ];
            
            $order = $this->razorpay->order->create($orderData);
            
            // Generate QR code data
            $qrData = json_encode([
                'ticket_number' => $ticketNumber,
                'customer_name' => $data['customer_name'],
                'visit_date' => $data['visit_date'],
                'adults' => $data['adults'],
                'children' => $data['children'],
                'package_name' => $data['package_name'],
                'total_amount' => $data['total_amount']
            ]);
            
            $booking = [
                'id' => rand(1000, 9999),
                'ticket_number' => $ticketNumber,
                'customer_name' => $data['customer_name'],
                'customer_email' => $data['customer_email'],
                'customer_phone' => $data['customer_phone'],
                'package_name' => $data['package_name'],
                'adults' => $data['adults'],
                'children' => $data['children'],
                'total_amount' => $data['total_amount'],
                'visit_date' => $data['visit_date'],
                'payment_status' => 'pending',
                'order_id' => $order['id'],
                'qr_code' => base64_encode($qrData),
                'created_at' => date('Y-m-d H:i:s'),
                'is_used' => false,
                // Add payment split information to booking record
                'payment_split' => isset($data['payment_split']) ? [
                    'enabled' => true,
                    'agro_tourism_amount' => $data['payment_split']['agro_tourism_amount'],
                    'fun_waterpark_amount' => $data['payment_split']['fun_waterpark_amount'],
                    'agro_tourism_percentage' => $data['payment_split']['agro_tourism_percentage'],
                    'fun_waterpark_percentage' => $data['payment_split']['fun_waterpark_percentage'],
                    'split_ratio' => '60:40'
                ] : ['enabled' => false]
            ];
            
            return [
                'success' => true,
                'booking' => $booking,
                'razorpay_order' => [
                    'order_id' => $order['id'],
                    'amount' => $order['amount'],
                    'currency' => $order['currency'],
                    'key_id' => RazorpayConfig::getKeyId()
                ]
            ];
            
        } catch (Exception $e) {
            return [
                'success' => false,
                'error' => $e->getMessage()
            ];
        }
    }
    
    // Verify payment and update booking
    public function verifyPayment($data) {
        try {
            $attributes = [
                'razorpay_order_id' => $data['razorpay_order_id'],
                'razorpay_payment_id' => $data['razorpay_payment_id'],
                'razorpay_signature' => $data['razorpay_signature']
            ];
            
            $this->razorpay->utility->verifyPaymentSignature($attributes);
            
            // Generate ticket number
            $ticketNumber = 'BRJ' . date('Ymd') . rand(1000, 9999);
            
            // Generate QR code data
            $qrData = json_encode([
                'ticket_number' => $ticketNumber,
                'customer_name' => $data['customer_name'],
                'visit_date' => $data['visit_date'],
                'adults' => $data['adults'],
                'children' => $data['children'],
                'package_name' => $data['package_name'] ?? 'Package',
                'total_amount' => $data['amount']
            ]);
            
            // Save booking to file
            $bookings = $this->loadBookings();
            $newBooking = [
                'id' => count($bookings) + 1,
                'ticket_number' => $ticketNumber,
                'customer_name' => $data['customer_name'],
                'customer_email' => $data['customer_email'],
                'customer_phone' => $data['customer_phone'],
                'package_name' => $data['package_name'] ?? 'Package',
                'adults' => $data['adults'],
                'children' => $data['children'],
                'total_amount' => $data['amount'],
                'visit_date' => $data['visit_date'],
                'payment_status' => 'completed',
                'payment_id' => $data['razorpay_payment_id'],
                'order_id' => $data['razorpay_order_id'],
                'qr_code' => base64_encode($qrData),
                'created_at' => date('Y-m-d H:i:s'),
                'is_used' => false,
                // Add payment split processing result
                'payment_split' => [
                    'enabled' => true,
                    'processed' => true,
                    'agro_tourism_amount' => round($data['amount'] * 0.6),
                    'fun_waterpark_amount' => round($data['amount'] * 0.4),
                    'agro_tourism_percentage' => 60,
                    'fun_waterpark_percentage' => 40,
                    'split_ratio' => '60:40',
                    'split_timestamp' => date('Y-m-d H:i:s')
                ]
            ];
            
            $bookings[] = $newBooking;
            $this->saveBookings($bookings);
            
            // Sync to Firebase
            $firebaseResult = $this->firebaseSync->syncBookingToFirebase($newBooking);
            if (!$firebaseResult['success']) {
                error_log('Firebase sync failed: ' . $firebaseResult['error']);
            }
            
            return [
                'success' => true,
                'payment_status' => 'success',
                'message' => 'Payment verified successfully',
                'payment_id' => $data['razorpay_payment_id'],
                'ticket_number' => $ticketNumber,
                'qr_code' => base64_encode($qrData)
            ];
            
        } catch (Exception $e) {
            return [
                'success' => false,
                'payment_status' => 'failed',
                'error' => 'Payment verification failed: ' . $e->getMessage()
            ];
        }
    }
    
    // Get all bookings
    public function getAllBookings() {
        try {
            $bookings = $this->loadBookings();
            
            // Sort by created_at descending (newest first)
            usort($bookings, function($a, $b) {
                return strtotime($b['created_at']) - strtotime($a['created_at']);
            });
            
            return [
                'success' => true,
                'bookings' => $bookings,
                'stats' => [
                    'total' => count($bookings),
                    'completed' => count(array_filter($bookings, fn($b) => $b['payment_status'] === 'completed')),
                    'pending' => count(array_filter($bookings, fn($b) => $b['payment_status'] === 'pending')),
                    'revenue' => array_sum(array_column(array_filter($bookings, fn($b) => $b['payment_status'] === 'completed'), 'total_amount'))
                ]
            ];
        } catch (Exception $e) {
            return [
                'success' => false,
                'error' => 'Failed to load bookings: ' . $e->getMessage(),
                'bookings' => [],
                'stats' => ['total' => 0, 'completed' => 0, 'pending' => 0, 'revenue' => 0]
            ];
        }
    }
    
    // Check-in ticket
    public function checkInTicket($ticketNumber) {
        // Mock check-in logic
        return [
            'success' => true,
            'message' => 'Ticket checked in successfully',
            'ticket_details' => [
                'ticket_number' => $ticketNumber,
                'customer_name' => 'Sample Customer',
                'package_name' => 'Family Package',
                'visit_date' => date('Y-m-d'),
                'adults' => 2,
                'children' => 1,
                'check_in_time' => date('Y-m-d H:i:s')
            ]
        ];
    }
}

// Handle API requests
$booking = new BookingSystem();
$method = $_SERVER['REQUEST_METHOD'];
$input = json_decode(file_get_contents('php://input'), true);

switch ($method) {
    case 'POST':
        if (isset($input['action'])) {
            switch ($input['action']) {
                case 'create_booking':
                    echo json_encode($booking->createBooking($input));
                    break;
                    
                case 'verify_payment':
                    echo json_encode($booking->verifyPayment($input));
                    break;
                    
                case 'check_in':
                    echo json_encode($booking->checkInTicket($input['ticket_number']));
                    break;
                    
                default:
                    echo json_encode(['success' => false, 'error' => 'Invalid action']);
            }
        } else {
            echo json_encode(['success' => false, 'error' => 'Action required']);
        }
        break;
        
    case 'GET':
        echo json_encode($booking->getAllBookings());
        break;
        
    default:
        echo json_encode(['success' => false, 'error' => 'Method not allowed']);
}
?>
