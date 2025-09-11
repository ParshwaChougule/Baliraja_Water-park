<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Mock packages data for testing
$packages = [
    [
        'id' => 1,
        'name' => 'Basic Package',
        'description' => 'Pool Access, Basic Locker, 1 Meal Voucher, Safety Equipment, Basic First Aid',
        'price' => 2000,
        'duration' => '1 Day',
        'facilities' => 'Pool Access, Basic Locker, 1 Meal Voucher',
        'image_url' => 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        'is_active' => true
    ],
    [
        'id' => 2,
        'name' => 'Family Package',
        'description' => 'All Pool Access, Premium Locker, Family Meal Deal, Priority Booking, Free Parking, Kids Play Area',
        'price' => 6500,
        'duration' => '1 Day',
        'facilities' => 'All Pool Access, Premium Locker, Family Meal Deal, Priority Booking',
        'image_url' => 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        'is_active' => true
    ],
    [
        'id' => 3,
        'name' => 'VIP Package',
        'description' => 'All Premium Access, VIP Locker Room, Unlimited Food & Drinks, Personal Attendant, Express Lane Access',
        'price' => 3500,
        'duration' => '1 Day',
        'facilities' => 'All Premium Access, VIP Locker Room, Unlimited Food & Drinks, Personal Attendant',
        'image_url' => 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        'is_active' => true
    ]
];

$method = $_SERVER['REQUEST_METHOD'];

switch($method) {
    case 'GET':
        echo json_encode([
            'success' => true,
            'records' => $packages,
            'count' => count($packages)
        ]);
        break;
        
    case 'POST':
        $input = json_decode(file_get_contents('php://input'), true);
        // Mock response for adding package
        echo json_encode([
            'success' => true,
            'message' => 'Package added successfully',
            'id' => rand(4, 100)
        ]);
        break;
        
    case 'PUT':
        $input = json_decode(file_get_contents('php://input'), true);
        // Mock response for updating package
        echo json_encode([
            'success' => true,
            'message' => 'Package updated successfully'
        ]);
        break;
        
    case 'DELETE':
        // Mock response for deleting package
        echo json_encode([
            'success' => true,
            'message' => 'Package deleted successfully'
        ]);
        break;
        
    default:
        http_response_code(405);
        echo json_encode([
            'success' => false,
            'error' => 'Method not allowed'
        ]);
}
?>
