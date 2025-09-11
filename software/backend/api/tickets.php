<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';
include_once '../models/Ticket.php';

$database = new Database();
$db = $database->getConnection();
$ticket = new Ticket($db);

$request_method = $_SERVER["REQUEST_METHOD"];

switch($request_method) {
    case 'GET':
        if(!empty($_GET["qr_code"])) {
            $ticket->qr_code = $_GET["qr_code"];
            $ticket_data = $ticket->readByQR();
            
            if($ticket_data) {
                http_response_code(200);
                echo json_encode($ticket_data);
            } else {
                http_response_code(404);
                echo json_encode(array("message" => "Ticket not found."));
            }
        } else {
            $stmt = $ticket->read();
            $num = $stmt->rowCount();
            
            if($num > 0) {
                $tickets_arr = array();
                $tickets_arr["records"] = array();
                
                while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                    extract($row);
                    $ticket_item = array(
                        "id" => $id,
                        "ticket_number" => $ticket_number,
                        "package_id" => $package_id,
                        "package_name" => $package_name,
                        "customer_name" => $customer_name,
                        "customer_email" => $customer_email,
                        "customer_phone" => $customer_phone,
                        "adults" => $adults,
                        "children" => $children,
                        "total_amount" => $total_amount,
                        "payment_id" => $payment_id,
                        "payment_status" => $payment_status,
                        "booking_date" => $booking_date,
                        "visit_date" => $visit_date,
                        "qr_code" => $qr_code,
                        "is_used" => $is_used,
                        "check_in_time" => $check_in_time,
                        "created_at" => $created_at
                    );
                    array_push($tickets_arr["records"], $ticket_item);
                }
                
                http_response_code(200);
                echo json_encode($tickets_arr);
            } else {
                http_response_code(404);
                echo json_encode(array("message" => "No tickets found."));
            }
        }
        break;
        
    case 'POST':
        $data = json_decode(file_get_contents("php://input"));
        
        if(!empty($data->package_id) && !empty($data->customer_name)) {
            $ticket->ticket_number = $ticket->generateTicketNumber();
            $ticket->package_id = $data->package_id;
            $ticket->customer_name = $data->customer_name;
            $ticket->customer_email = $data->customer_email;
            $ticket->customer_phone = $data->customer_phone;
            $ticket->adults = $data->adults;
            $ticket->children = $data->children;
            $ticket->total_amount = $data->total_amount;
            $ticket->payment_id = $data->payment_id ?? null;
            $ticket->payment_status = $data->payment_status ?? 'pending';
            $ticket->booking_date = date('Y-m-d H:i:s');
            $ticket->visit_date = $data->visit_date;
            $ticket->qr_code = $ticket->generateQRCode();
            
            if($ticket->create()) {
                http_response_code(201);
                echo json_encode(array(
                    "message" => "Ticket was created.",
                    "ticket_number" => $ticket->ticket_number,
                    "qr_code" => $ticket->qr_code
                ));
            } else {
                http_response_code(503);
                echo json_encode(array("message" => "Unable to create ticket."));
            }
        } else {
            http_response_code(400);
            echo json_encode(array("message" => "Unable to create ticket. Data is incomplete."));
        }
        break;
        
    case 'PUT':
        if(!empty($_GET["action"]) && $_GET["action"] == "checkin") {
            $data = json_decode(file_get_contents("php://input"));
            $ticket->qr_code = $data->qr_code;
            
            if($ticket->checkIn()) {
                http_response_code(200);
                echo json_encode(array("message" => "Ticket checked in successfully."));
            } else {
                http_response_code(503);
                echo json_encode(array("message" => "Unable to check in ticket."));
            }
        }
        break;
        
    default:
        http_response_code(405);
        echo json_encode(array("message" => "Method not allowed."));
        break;
}
?>
