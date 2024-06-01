// controllers/orderController.js
const Order = require('../../models/orders');
const submitOrder = async (req, res) => {
    try {
      const { mobile, city, detailedAddress, fN, lN, totalPrice, totalQty } = req.body;
      const { orderProductDetails } = req.body;
      console.log(req.body);
  
      // Extracting user ID from the request
      const userId = req.userId; // Assuming you have middleware to extract user ID from the request
  
      // Constructing products array with productId and quantity
      const products = orderProductDetails.map(product => ({
        productId: product.productId._id,
        quantity: product.quantity
      }));
  
      // Creating the order
      const order = new Order({
        userId,
        products,
        totalPrice,
        status: 'pending', // Default status is pending
        shippingAddress: {
          city,
          detailedAddress
        }
      });
  
      await order.save();
  
      res.status(201).json({ message: 'Order submitted successfully', order });
    } catch (error) {
      console.error('Error submitting order:', error);
      res.status(500).json({ message: 'Server error', error });
    }
  };
  

module.exports = submitOrder
