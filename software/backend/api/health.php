<?php
// Suppress PHP error output to prevent JSON corruption
error_reporting(0);
ini_set('display_errors', 0);

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

// Simple health check endpoint
$response = [
    'status' => 'healthy',
    'message' => 'Baliraja Water Park Management System Backend is running',
    'timestamp' => date('Y-m-d H:i:s'),
    'version' => '1.0.0'
];

echo json_encode($response);
?>
