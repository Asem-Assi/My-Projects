const Order = require('../../models/orders');

const getUserOrders = async (req, res) => {
  try {
    const userId = req.userId; // Assuming the auth middleware sets req.userId

    const orders = await Order.find({ userId }).populate('products.productId');

    if (!orders) {
      return res.status(404).json({ message: 'No orders found for this user' });
    }

    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching user orders:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports =  getUserOrders ;
