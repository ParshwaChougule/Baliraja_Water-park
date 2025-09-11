<?php
require_once __DIR__ . '/../vendor/autoload.php';

// Load environment variables
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/..');
$dotenv->load();

class RazorpayConfig {
    public static function getKeyId() {
        return $_ENV['RAZORPAY_KEY_ID'] ?? 'rzp_test_your_key_id_here';
    }
    
    public static function getKeySecret() {
        return $_ENV['RAZORPAY_KEY_SECRET'] ?? 'your_secret_key_here';
    }
    
    public static function getWebhookSecret() {
        return $_ENV['RAZORPAY_WEBHOOK_SECRET'] ?? 'your_webhook_secret_here';
    }
    
    public static function isTestMode() {
        return strpos(self::getKeyId(), 'rzp_test_') === 0;
    }
}
?>
