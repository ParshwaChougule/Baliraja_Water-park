-- Create database
CREATE DATABASE IF NOT EXISTS baliraja_waterpark;
USE baliraja_waterpark;

-- Create packages table
CREATE TABLE IF NOT EXISTS packages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    duration VARCHAR(100),
    facilities TEXT,
    image_url VARCHAR(500),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create tickets table
CREATE TABLE IF NOT EXISTS tickets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ticket_number VARCHAR(50) UNIQUE NOT NULL,
    package_id INT,
    customer_name VARCHAR(255) NOT NULL,
    customer_email VARCHAR(255),
    customer_phone VARCHAR(20),
    adults INT DEFAULT 0,
    children INT DEFAULT 0,
    total_amount DECIMAL(10,2) NOT NULL,
    payment_id VARCHAR(255),
    payment_status ENUM('pending', 'completed', 'failed') DEFAULT 'pending',
    booking_date DATETIME NOT NULL,
    visit_date DATE NOT NULL,
    qr_code VARCHAR(255) UNIQUE NOT NULL,
    is_used BOOLEAN DEFAULT FALSE,
    check_in_time DATETIME NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (package_id) REFERENCES packages(id)
);

-- Create admin users table
CREATE TABLE IF NOT EXISTS admin_users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    role ENUM('admin', 'booking_staff', 'gate_staff') DEFAULT 'booking_staff',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert sample packages
INSERT INTO packages (name, description, price, duration, facilities, image_url) VALUES
('Basic Entry', 'Basic water park entry with access to all pools and slides', 299.00, 'Full Day', 'Swimming Pool, Water Slides, Changing Rooms, Lockers', 'https://via.placeholder.com/400x300'),
('Family Package', 'Perfect for families with children - includes meals and priority access', 899.00, 'Full Day', 'All Basic Facilities, Meals, Priority Access, Kids Play Area', 'https://via.placeholder.com/400x300'),
('Premium Experience', 'VIP experience with private cabana and premium services', 1499.00, 'Full Day', 'All Facilities, Private Cabana, Premium Meals, Personal Attendant', 'https://via.placeholder.com/400x300'),
('Group Package', 'Special package for groups of 10+ people', 2499.00, 'Full Day', 'All Facilities, Group Discounts, Dedicated Area, Catering Options', 'https://via.placeholder.com/400x300');

-- Insert default admin user (password: admin123)
INSERT INTO admin_users (username, password, email, role) VALUES
('admin', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin@baliraja.com', 'admin'),
('booking_staff', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'booking@baliraja.com', 'booking_staff'),
('gate_staff', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'gate@baliraja.com', 'gate_staff');
