<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';
include_once '../models/Package.php';
include_once '../models/Ticket.php';

$database = new Database();
$db = $database->getConnection();

$request_method = $_SERVER["REQUEST_METHOD"];

switch($request_method) {
    case 'GET':
        $action = $_GET['action'] ?? '';
        
        switch($action) {
            case 'packages':
                // Get packages for website display
                $package = new Package($db);
                $stmt = $package->read();
                $packages_arr = array();
                
                while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                    $package_item = array(
                        "id" => $row['id'],
                        "name" => $row['name'],
                        "description" => $row['description'],
                        "price" => $row['price'],
                        "duration" => $row['duration'],
                        "facilities" => $row['facilities'],
                        "image_url" => $row['image_url']
                    );
                    array_push($packages_arr, $package_item);
                }
                
                http_response_code(200);
                echo json_encode($packages_arr);
                break;
                
            case 'stats':
                // Get statistics for website dashboard
                $ticket = new Ticket($db);
                $stmt = $ticket->read();
                
                $total_bookings = 0;
                $total_revenue = 0;
                $today_bookings = 0;
                $today = date('Y-m-d');
                
                while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                    $total_bookings++;
                    $total_revenue += floatval($row['total_amount']);
                    
                    if (date('Y-m-d', strtotime($row['created_at'])) === $today) {
                        $today_bookings++;
                    }
                }
                
                $stats = array(
                    "total_bookings" => $total_bookings,
                    "total_revenue" => $total_revenue,
                    "today_bookings" => $today_bookings,
                    "active_packages" => count($packages_arr)
                );
                
                http_response_code(200);
                echo json_encode($stats);
                break;
                
            default:
                http_response_code(400);
                echo json_encode(array("message" => "Invalid action"));
                break;
        }
        break;
        
    case 'POST':
        $action = $_GET['action'] ?? '';
        
        switch($action) {
            case 'sync_booking':
                // Sync booking from website to management system
                $data = json_decode(file_get_contents("php://input"));
                
                if (!empty($data->package_id) && !empty($data->customer_name)) {
                    $ticket = new Ticket($db);
                    
                    $ticket->ticket_number = $ticket->generateTicketNumber();
                    $ticket->package_id = $data->package_id;
                    $ticket->customer_name = $data->customer_name;
                    $ticket->customer_email = $data->customer_email ?? '';
                    $ticket->customer_phone = $data->customer_phone ?? '';
                    $ticket->adults = $data->adults ?? 1;
                    $ticket->children = $data->children ?? 0;
                    $ticket->total_amount = $data->total_amount;
                    $ticket->payment_id = $data->payment_id ?? null;
                    $ticket->payment_status = $data->payment_status ?? 'completed';
                    $ticket->booking_date = date('Y-m-d H:i:s');
                    $ticket->visit_date = $data->visit_date ?? date('Y-m-d');
                    $ticket->qr_code = $ticket->generateQRCode();
                    
                    if ($ticket->create()) {
                        http_response_code(201);
                        echo json_encode(array(
                            "message" => "Booking synced successfully",
                            "ticket_number" => $ticket->ticket_number,
                            "qr_code" => $ticket->qr_code
                        ));
                    } else {
                        http_response_code(503);
                        echo json_encode(array("message" => "Unable to sync booking"));
                    }
                } else {
                    http_response_code(400);
                    echo json_encode(array("message" => "Invalid booking data"));
                }
                break;
                
            default:
                http_response_code(400);
                echo json_encode(array("message" => "Invalid action"));
                break;
        }
        break;
        
    default:
        http_response_code(405);
        echo json_encode(array("message" => "Method not allowed"));
        break;
}
?>
