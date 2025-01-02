const { Cashfree } = require('cashfree-sdk');
const db = require('../utils/db');

exports.initiatePayment = (req, res) => {
  const { userId } = req.body;

  db.serialize(() => {
    // Fetch the user's cart
    db.get(`SELECT id, total_price FROM carts WHERE user_id = ?`, [userId], (err, cart) => {
      if (err) {
        return res.status(500).json({ message: 'Error fetching cart', error: err });
      }

      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }

      // Initiate payment with Cashfree
      const orderId = `order_${Date.now()}`;
      const paymentData = {
        orderId: orderId,
        orderAmount: cart.total_price,
        orderCurrency: "INR",
        customerEmail: "user@example.com", // Replace with dynamic email
        customerPhone: "9999999999",       // Replace with dynamic phone number
      };

      try {
        const paymentResponse = Cashfree.initiatePayment(paymentData);
        res.status(200).json({
          message: 'Payment initiated successfully',
          paymentResponse,
          orderId,
        });
      } catch (error) {
        res.status(500).json({ message: 'Payment initiation failed', error });
      }
    });
  });
};
