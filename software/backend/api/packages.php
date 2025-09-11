<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';
include_once '../models/Package.php';

$database = new Database();
$db = $database->getConnection();
$package = new Package($db);

$request_method = $_SERVER["REQUEST_METHOD"];

switch($request_method) {
    case 'GET':
        if(!empty($_GET["id"])) {
            $package->id = intval($_GET["id"]);
            if($package->readOne()) {
                $package_arr = array(
                    "id" => $package->id,
                    "name" => $package->name,
                    "description" => $package->description,
                    "price" => $package->price,
                    "duration" => $package->duration,
                    "facilities" => $package->facilities,
                    "image_url" => $package->image_url,
                    "is_active" => $package->is_active
                );
                http_response_code(200);
                echo json_encode($package_arr);
            } else {
                http_response_code(404);
                echo json_encode(array("message" => "Package not found."));
            }
        } else {
            $stmt = $package->read();
            $num = $stmt->rowCount();
            
            if($num > 0) {
                $packages_arr = array();
                $packages_arr["records"] = array();
                
                while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                    extract($row);
                    $package_item = array(
                        "id" => $id,
                        "name" => $name,
                        "description" => $description,
                        "price" => $price,
                        "duration" => $duration,
                        "facilities" => $facilities,
                        "image_url" => $image_url,
                        "is_active" => $is_active,
                        "created_at" => $created_at
                    );
                    array_push($packages_arr["records"], $package_item);
                }
                
                http_response_code(200);
                echo json_encode($packages_arr);
            } else {
                http_response_code(404);
                echo json_encode(array("message" => "No packages found."));
            }
        }
        break;
        
    case 'POST':
        $data = json_decode(file_get_contents("php://input"));
        
        if(!empty($data->name) && !empty($data->price)) {
            $package->name = $data->name;
            $package->description = $data->description;
            $package->price = $data->price;
            $package->duration = $data->duration;
            $package->facilities = $data->facilities;
            $package->image_url = $data->image_url;
            
            if($package->create()) {
                http_response_code(201);
                echo json_encode(array("message" => "Package was created."));
            } else {
                http_response_code(503);
                echo json_encode(array("message" => "Unable to create package."));
            }
        } else {
            http_response_code(400);
            echo json_encode(array("message" => "Unable to create package. Data is incomplete."));
        }
        break;
        
    case 'PUT':
        $data = json_decode(file_get_contents("php://input"));
        
        $package->id = $data->id;
        $package->name = $data->name;
        $package->description = $data->description;
        $package->price = $data->price;
        $package->duration = $data->duration;
        $package->facilities = $data->facilities;
        $package->image_url = $data->image_url;
        
        if($package->update()) {
            http_response_code(200);
            echo json_encode(array("message" => "Package was updated."));
        } else {
            http_response_code(503);
            echo json_encode(array("message" => "Unable to update package."));
        }
        break;
        
    case 'DELETE':
        $data = json_decode(file_get_contents("php://input"));
        
        $package->id = $data->id;
        
        if($package->delete()) {
            http_response_code(200);
            echo json_encode(array("message" => "Package was deleted."));
        } else {
            http_response_code(503);
            echo json_encode(array("message" => "Unable to delete package."));
        }
        break;
        
    default:
        http_response_code(405);
        echo json_encode(array("message" => "Method not allowed."));
        break;
}
?>
