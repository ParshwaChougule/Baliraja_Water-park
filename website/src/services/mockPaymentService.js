// Mock Payment Service for Baliraja Water Park
// This service simulates payment processing when PHP backend is not available

export const createMockOrder = async (bookingData) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const orderId = `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  const ticketNumber = `BLR${Date.now().toString().slice(-6)}`;
  
  return {
    success: true,
    razorpay_order: {
      key_id: 'rzp_test_mock_key_id', // Mock Razorpay key
      amount: bookingData.total_amount * 100, // Amount in paise
      currency: 'INR',
      order_id: orderId,
    },
    ticket_number: ticketNumber,
    booking_id: `booking_${Date.now()}`
  };
};

export const verifyMockPayment = async (paymentData) => {
  // Simulate payment verification delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const ticketNumber = `BLR${Date.now().toString().slice(-6)}`;
  const qrCode = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
    JSON.stringify({
      ticketNumber: ticketNumber,
      customerName: paymentData.customer_name,
      packageName: paymentData.package_name,
      visitDate: paymentData.visit_date,
      adults: paymentData.adults,
      children: paymentData.children,
      amount: paymentData.amount
    })
  )}`;
  
  return {
    success: true,
    payment_status: 'success',
    ticket_number: ticketNumber,
    qr_code: qrCode,
    booking_id: `booking_${Date.now()}`,
    message: 'Payment verified successfully'
  };
};

// Mock Razorpay integration
export const initializeMockRazorpay = () => {
  if (!window.Razorpay) {
    // Create a mock Razorpay object
    window.Razorpay = function(options) {
      return {
        open: () => {
          // Simulate payment success after a short delay
          setTimeout(() => {
            const mockResponse = {
              razorpay_payment_id: `pay_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
              razorpay_order_id: options.order_id,
              razorpay_signature: `mock_signature_${Date.now()}`
            };
            
            if (options.handler) {
              options.handler(mockResponse);
            }
          }, 2000);
        }
      };
    };
  }
  return true;
};
