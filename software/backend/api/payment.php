<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once '../vendor/autoload.php';
include_once '../config/database.php';
include_once '../config/razorpay.php';
include_once '../models/Ticket.php';

use Razorpay\Api\Api;

$database = new Database();
$db = $database->getConnection();
$ticket = new Ticket($db);

$request_method = $_SERVER["REQUEST_METHOD"];

if($request_method == 'POST') {
    $action = $_GET['action'] ?? '';
    
    switch($action) {
        case 'create_order':
            $data = json_decode(file_get_contents("php://input"));
            
            try {
                $api = new Api(RazorpayConfig::$keyId, RazorpayConfig::$keySecret);
                
                $orderData = [
                    'receipt' => 'rcpt_' . time(),
                    'amount' => $data->amount * 100, // Amount in paise
                    'currency' => 'INR',
                    'notes' => [
                        'package_id' => $data->package_id,
                        'customer_name' => $data->customer_name,
                        'adults' => $data->adults,
                        'children' => $data->children
                    ]
                ];
                
                $razorpayOrder = $api->order->create($orderData);
                
                http_response_code(200);
                echo json_encode([
                    'order_id' => $razorpayOrder['id'],
                    'amount' => $razorpayOrder['amount'],
                    'currency' => $razorpayOrder['currency'],
                    'key_id' => RazorpayConfig::$keyId
                ]);
                
            } catch (Exception $e) {
                http_response_code(500);
                echo json_encode(['message' => 'Error creating order: ' . $e->getMessage()]);
            }
            break;
            
        case 'verify_payment':
            $data = json_decode(file_get_contents("php://input"));
            
            try {
                $api = new Api(RazorpayConfig::$keyId, RazorpayConfig::$keySecret);
                
                $attributes = [
                    'razorpay_order_id' => $data->razorpay_order_id,
                    'razorpay_payment_id' => $data->razorpay_payment_id,
                    'razorpay_signature' => $data->razorpay_signature
                ];
                
                $api->utility->verifyPaymentSignature($attributes);
                
                // Payment verified successfully, create ticket
                $ticket->ticket_number = $ticket->generateTicketNumber();
                $ticket->package_id = $data->package_id;
                $ticket->customer_name = $data->customer_name;
                $ticket->customer_email = $data->customer_email;
                $ticket->customer_phone = $data->customer_phone;
                $ticket->adults = $data->adults;
                $ticket->children = $data->children;
                $ticket->total_amount = $data->amount;
                $ticket->payment_id = $data->razorpay_payment_id;
                $ticket->payment_status = 'completed';
                $ticket->booking_date = date('Y-m-d H:i:s');
                $ticket->visit_date = $data->visit_date;
                $ticket->qr_code = $ticket->generateQRCode();
                
                if($ticket->create()) {
                    http_response_code(200);
                    echo json_encode([
                        'message' => 'Payment verified and ticket created successfully',
                        'ticket_number' => $ticket->ticket_number,
                        'qr_code' => $ticket->qr_code,
                        'payment_status' => 'success'
                    ]);
                } else {
                    http_response_code(500);
                    echo json_encode(['message' => 'Payment verified but ticket creation failed']);
                }
                
            } catch (Exception $e) {
                http_response_code(400);
                echo json_encode(['message' => 'Payment verification failed: ' . $e->getMessage()]);
            }
            break;
            
        default:
            http_response_code(400);
            echo json_encode(['message' => 'Invalid action']);
            break;
    }
} else {
    http_response_code(405);
    echo json_encode(['message' => 'Method not allowed']);
}
?>
