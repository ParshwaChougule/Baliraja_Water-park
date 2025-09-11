// Payment Split Service for Baliraja Water Park
// Handles 60/40 payment split between Agro Tourism and Fun & Waterpark

export const PAYMENT_SPLIT_CONFIG = {
  AGRO_TOURISM: {
    name: 'Baliraja Agro Tourism',
    percentage: 60,
    account_id: 'acc_agro_tourism_001' // This would be actual Razorpay account ID
  },
  FUN_WATERPARK: {
    name: 'Baliraja Fun & Waterpark',
    percentage: 40,
    account_id: 'acc_fun_waterpark_001' // This would be actual Razorpay account ID
  }
};

/**
 * Calculate payment split amounts
 * @param {number} totalAmount - Total payment amount
 * @returns {Object} Split amounts for each entity
 */
export const calculatePaymentSplit = (totalAmount) => {
  const agroAmount = Math.round((totalAmount * PAYMENT_SPLIT_CONFIG.AGRO_TOURISM.percentage) / 100);
  const waterparkAmount = Math.round((totalAmount * PAYMENT_SPLIT_CONFIG.FUN_WATERPARK.percentage) / 100);
  
  // Ensure the split amounts add up to the total (handle rounding differences)
  const difference = totalAmount - (agroAmount + waterparkAmount);
  
  return {
    total: totalAmount,
    agroTourism: {
      name: PAYMENT_SPLIT_CONFIG.AGRO_TOURISM.name,
      amount: agroAmount + (difference > 0 ? difference : 0), // Add any rounding difference to agro tourism
      percentage: PAYMENT_SPLIT_CONFIG.AGRO_TOURISM.percentage,
      accountId: PAYMENT_SPLIT_CONFIG.AGRO_TOURISM.account_id
    },
    funWaterpark: {
      name: PAYMENT_SPLIT_CONFIG.FUN_WATERPARK.name,
      amount: waterparkAmount + (difference < 0 ? Math.abs(difference) : 0), // Add any negative rounding difference to waterpark
      percentage: PAYMENT_SPLIT_CONFIG.FUN_WATERPARK.percentage,
      accountId: PAYMENT_SPLIT_CONFIG.FUN_WATERPARK.account_id
    },
    splitDetails: {
      agroPercentage: PAYMENT_SPLIT_CONFIG.AGRO_TOURISM.percentage,
      waterparkPercentage: PAYMENT_SPLIT_CONFIG.FUN_WATERPARK.percentage,
      splitSuccessful: true
    }
  };
};

/**
 * Create Razorpay order with payment split
 * @param {Object} orderData - Order creation data
 * @param {number} totalAmount - Total amount to be split
 * @returns {Object} Razorpay order data with split configuration
 */
export const createSplitPaymentOrder = (orderData, totalAmount) => {
  const splitAmounts = calculatePaymentSplit(totalAmount);
  
  // In a real implementation, this would use Razorpay's Route feature
  // For now, we'll simulate the split in the order notes
  const enhancedOrderData = {
    ...orderData,
    notes: {
      ...orderData.notes,
      payment_split: 'enabled',
      agro_tourism_amount: splitAmounts.agroTourism.amount,
      fun_waterpark_amount: splitAmounts.funWaterpark.amount,
      agro_tourism_percentage: splitAmounts.agroTourism.percentage,
      fun_waterpark_percentage: splitAmounts.funWaterpark.percentage
    }
  };
  
  return {
    orderData: enhancedOrderData,
    splitDetails: splitAmounts
  };
};

/**
 * Process payment split after successful payment
 * @param {Object} paymentData - Payment verification data
 * @param {number} totalAmount - Total amount paid
 * @returns {Object} Split processing result
 */
export const processSplitPayment = async (paymentData, totalAmount) => {
  try {
    const splitAmounts = calculatePaymentSplit(totalAmount);
    
    // In a real implementation, this would:
    // 1. Transfer funds to respective accounts using Razorpay Routes
    // 2. Record the split in the database
    // 3. Generate separate transaction records
    
    // For now, we'll simulate the split processing
    const splitTransactions = [
      {
        id: `split_agro_${Date.now()}_1`,
        entity: splitAmounts.agroTourism.name,
        amount: splitAmounts.agroTourism.amount,
        percentage: splitAmounts.agroTourism.percentage,
        accountId: splitAmounts.agroTourism.accountId,
        status: 'completed',
        timestamp: new Date().toISOString()
      },
      {
        id: `split_waterpark_${Date.now()}_2`,
        entity: splitAmounts.funWaterpark.name,
        amount: splitAmounts.funWaterpark.amount,
        percentage: splitAmounts.funWaterpark.percentage,
        accountId: splitAmounts.funWaterpark.accountId,
        status: 'completed',
        timestamp: new Date().toISOString()
      }
    ];
    
    return {
      success: true,
      splitProcessed: true,
      originalPaymentId: paymentData.razorpay_payment_id,
      totalAmount: totalAmount,
      splitTransactions: splitTransactions,
      splitSummary: {
        agroTourismAmount: splitAmounts.agroTourism.amount,
        funWaterparkAmount: splitAmounts.funWaterpark.amount,
        splitRatio: '60:40'
      }
    };
    
  } catch (error) {
    console.error('Payment split processing error:', error);
    return {
      success: false,
      splitProcessed: false,
      error: error.message,
      fallbackAction: 'manual_split_required'
    };
  }
};

/**
 * Get payment split summary for display
 * @param {number} totalAmount - Total amount
 * @returns {Object} Formatted split summary
 */
export const getPaymentSplitSummary = (totalAmount) => {
  const splitAmounts = calculatePaymentSplit(totalAmount);
  
  return {
    total: `₹${totalAmount}`,
    breakdown: [
      {
        entity: splitAmounts.agroTourism.name,
        amount: `₹${splitAmounts.agroTourism.amount}`,
        percentage: `${splitAmounts.agroTourism.percentage}%`
      },
      {
        entity: splitAmounts.funWaterpark.name,
        amount: `₹${splitAmounts.funWaterpark.amount}`,
        percentage: `${splitAmounts.funWaterpark.percentage}%`
      }
    ]
  };
};

export default {
  calculatePaymentSplit,
  createSplitPaymentOrder,
  processSplitPayment,
  getPaymentSplitSummary,
  PAYMENT_SPLIT_CONFIG
};
