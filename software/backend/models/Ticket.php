<?php
class Ticket {
    private $conn;
    private $table_name = "tickets";

    public $id;
    public $ticket_number;
    public $package_id;
    public $customer_name;
    public $customer_email;
    public $customer_phone;
    public $adults;
    public $children;
    public $total_amount;
    public $payment_id;
    public $payment_status;
    public $booking_date;
    public $visit_date;
    public $qr_code;
    public $is_used;
    public $check_in_time;
    public $created_at;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function create() {
        $query = "INSERT INTO " . $this->table_name . " 
                SET ticket_number=:ticket_number, package_id=:package_id, 
                    customer_name=:customer_name, customer_email=:customer_email,
                    customer_phone=:customer_phone, adults=:adults, children=:children,
                    total_amount=:total_amount, payment_id=:payment_id,
                    payment_status=:payment_status, booking_date=:booking_date,
                    visit_date=:visit_date, qr_code=:qr_code";
        
        $stmt = $this->conn->prepare($query);
        
        $stmt->bindParam(":ticket_number", $this->ticket_number);
        $stmt->bindParam(":package_id", $this->package_id);
        $stmt->bindParam(":customer_name", $this->customer_name);
        $stmt->bindParam(":customer_email", $this->customer_email);
        $stmt->bindParam(":customer_phone", $this->customer_phone);
        $stmt->bindParam(":adults", $this->adults);
        $stmt->bindParam(":children", $this->children);
        $stmt->bindParam(":total_amount", $this->total_amount);
        $stmt->bindParam(":payment_id", $this->payment_id);
        $stmt->bindParam(":payment_status", $this->payment_status);
        $stmt->bindParam(":booking_date", $this->booking_date);
        $stmt->bindParam(":visit_date", $this->visit_date);
        $stmt->bindParam(":qr_code", $this->qr_code);
        
        if($stmt->execute()) {
            return true;
        }
        return false;
    }

    public function read() {
        $query = "SELECT t.*, p.name as package_name FROM " . $this->table_name . " t 
                 LEFT JOIN packages p ON t.package_id = p.id 
                 ORDER BY t.created_at DESC";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    public function readByQR() {
        $query = "SELECT t.*, p.name as package_name, p.facilities 
                 FROM " . $this->table_name . " t 
                 LEFT JOIN packages p ON t.package_id = p.id 
                 WHERE t.qr_code = ? LIMIT 0,1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->qr_code);
        $stmt->execute();
        
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        if($row) {
            $this->id = $row['id'];
            $this->ticket_number = $row['ticket_number'];
            $this->package_id = $row['package_id'];
            $this->customer_name = $row['customer_name'];
            $this->customer_email = $row['customer_email'];
            $this->customer_phone = $row['customer_phone'];
            $this->adults = $row['adults'];
            $this->children = $row['children'];
            $this->total_amount = $row['total_amount'];
            $this->payment_status = $row['payment_status'];
            $this->visit_date = $row['visit_date'];
            $this->is_used = $row['is_used'];
            $this->check_in_time = $row['check_in_time'];
            return $row;
        }
        return false;
    }

    public function checkIn() {
        $query = "UPDATE " . $this->table_name . " 
                 SET is_used = 1, check_in_time = NOW() 
                 WHERE qr_code = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->qr_code);
        
        if($stmt->execute()) {
            return true;
        }
        return false;
    }

    public function generateTicketNumber() {
        return 'BLR' . date('Ymd') . rand(1000, 9999);
    }

    public function generateQRCode() {
        return md5(uniqid(rand(), true));
    }
}
?>
