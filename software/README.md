# Baliraja Water Park Management System

A comprehensive water park management system with React frontend and PHP backend, featuring three specialized dashboards for different user roles.

## 🌊 Features

### Admin Dashboard
- **Package Management**: Create, edit, and delete water park packages
- **Revenue Analytics**: View total revenue and booking statistics
- **Ticket Overview**: Monitor all ticket bookings and their status
- **Real-time Stats**: Track daily visitors and active packages

### Booking Dashboard  
- **Package Selection**: Browse and select from available packages
- **Customer Management**: Collect customer information and preferences
- **Payment Integration**: Secure payment processing with Razorpay
- **QR Code Generation**: Generate unique QR codes for each ticket
- **Booking History**: View all previous bookings and their status

### Gate Check-in Dashboard
- **QR Code Scanner**: Real-time QR code scanning for ticket validation
- **Manual Entry**: Manual QR code entry option for backup
- **Ticket Validation**: Verify ticket authenticity and visit date
- **Guest Tracking**: Monitor daily check-ins and guest counts
- **Check-in History**: View recent check-ins and guest information

## 🛠️ Technology Stack

### Frontend
- **React 18** with TypeScript
- **Material-UI (MUI)** for professional UI components
- **React Router** for navigation
- **Axios** for API communication
- **HTML5-QRCode** for QR code scanning
- **React-QR-Code** for QR code generation
- **Razorpay** integration for payments

### Backend
- **PHP 7.4+** with PDO for database operations
- **MySQL** database
- **Razorpay API** for payment processing
- **RESTful API** architecture
- **CORS** enabled for cross-origin requests

## 📋 Prerequisites

- Node.js (v14 or higher)
- PHP 7.4 or higher
- MySQL 5.7 or higher
- Composer (for PHP dependencies)
- Web server (Apache/Nginx) or XAMPP/WAMP

## 🚀 Installation

### 1. Clone the Repository
```bash
cd /path/to/your/project
# The project is already in: /Users/tusharpawar/Downloads/Baliraja/software
```

### 2. Backend Setup

#### Install PHP Dependencies
```bash
cd backend
composer install
```

#### Database Setup
1. Create a MySQL database named `baliraja_waterpark`
2. Import the database schema:
```bash
mysql -u root -p baliraja_waterpark < database/schema.sql
```

#### Configure Database Connection
Edit `backend/config/database.php`:
```php
private $host = "localhost";
private $db_name = "baliraja_waterpark";
private $username = "your_db_username";
private $password = "your_db_password";
```

#### Configure Razorpay
Edit `backend/config/razorpay.php`:
```php
public static $keyId = "your_razorpay_key_id";
public static $keySecret = "your_razorpay_key_secret";
```

### 3. Frontend Setup

#### Install Node Dependencies
```bash
cd baliraja-management
npm install
```

#### Configure API Endpoints
Edit `src/config/api.ts` if needed:
```typescript
export const API_CONFIG = {
  BASE_URL: 'http://localhost/baliraja/software/backend/api',
  // ... other config
};
```

## 🏃‍♂️ Running the Application

### 1. Start the Backend Server
Place the backend folder in your web server directory:
- **XAMPP**: Copy to `htdocs/baliraja/software/backend`
- **WAMP**: Copy to `www/baliraja/software/backend`
- **Local Server**: Ensure PHP is serving the backend directory

### 2. Start the Frontend Development Server
```bash
cd baliraja-management
npm start
```

The application will open at `http://localhost:3000`

## 👥 User Roles & Access

### Admin
- **Username**: admin
- **Password**: admin123
- **Access**: Full system control, package management, analytics

### Booking Staff
- **Username**: booking
- **Password**: booking123  
- **Access**: Customer bookings, payment processing, ticket generation

### Gate Staff
- **Username**: gate
- **Password**: gate123
- **Access**: QR code scanning, ticket validation, check-in management

## 🎯 Usage Guide

### For Admin Users
1. Login with admin credentials
2. Manage packages in the "Packages Management" tab
3. Monitor bookings and revenue in the dashboard
4. View detailed ticket information and statistics

### For Booking Staff
1. Login with booking staff credentials
2. Browse available packages
3. Create new bookings with customer information
4. Process payments through Razorpay
5. Generate and provide QR codes to customers

### For Gate Staff
1. Login with gate staff credentials
2. Use QR scanner to validate tickets
3. Check ticket validity and visit dates
4. Confirm check-ins for valid tickets
5. Monitor daily visitor statistics

## 🔧 API Endpoints

### Packages
- `GET /api/packages.php` - Get all packages
- `POST /api/packages.php` - Create new package
- `PUT /api/packages.php` - Update package
- `DELETE /api/packages.php` - Delete package

### Tickets
- `GET /api/tickets.php` - Get all tickets
- `GET /api/tickets.php?qr_code={code}` - Get ticket by QR code
- `POST /api/tickets.php` - Create new ticket
- `PUT /api/tickets.php?action=checkin` - Check-in ticket

### Payments
- `POST /api/payment.php?action=create_order` - Create Razorpay order
- `POST /api/payment.php?action=verify_payment` - Verify payment

## 📱 Mobile Responsiveness

The application is fully responsive and works seamlessly on:
- Desktop computers
- Tablets
- Mobile phones
- QR code scanning works on mobile devices

## 🔒 Security Features

- Input validation and sanitization
- SQL injection prevention with PDO
- Payment security through Razorpay
- QR code encryption for tickets
- Role-based access control

## 🎨 UI/UX Features

- Modern Material Design interface
- Smooth animations and transitions
- Intuitive navigation
- Real-time feedback and notifications
- Professional color scheme
- Accessible design principles

## 🐛 Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure your web server allows cross-origin requests
2. **Database Connection**: Check database credentials and server status
3. **Razorpay Integration**: Verify API keys and webhook configuration
4. **QR Scanner**: Ensure HTTPS for camera access in production

### Support

For technical support or feature requests, please check the documentation or contact the development team.

## 📄 License

This project is developed for Baliraja Water Park. All rights reserved.

---

**Built with ❤️ for Baliraja Water Park Management**
