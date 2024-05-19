// controllers/wishlistController.js
const Wishlist = require('../../models/wishlist');
const Product = require('../../models/productModel');
const User = require('../../models/userModel');

// Add product to wishlist
const addProductToWishlist = async (req, res) => {
  try {
    const userId = req.userId;
    const { productId } = req.body;

    // Find the wishlist for the user
    let wishlist = await Wishlist.findOne({ user: userId });

    // If no wishlist exists for the user, create a new one
    if (!wishlist) {
      wishlist = new Wishlist({ user: userId, products: [] });
    }

    // Add the product to the wishlist if it's not already there
    if (!wishlist.products.includes(productId)) {
      wishlist.products.push(productId);
    }

    await wishlist.save();

    res.json({
      message: 'Product added to wishlist',
      success: true,
      data: wishlist,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message || 'Failed to add product to wishlist',
      success: false,
    });
  }
};

// Remove product from wishlist
const removeProductFromWishlist = async (req, res) => {
  try {
    const userId = req.userId;
    const { productId } = req.body;

    const wishlist = await Wishlist.findOne({ user: userId });

    if (!wishlist) {
      return res.status(404).json({
        message: 'Wishlist not found',
        success: false,
      });
    }

    wishlist.products = wishlist.products.filter(
      (id) => id.toString() !== productId
    );

    await wishlist.save();

    res.json({
      message: 'Product removed from wishlist',
      success: true,
      data: wishlist,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message || 'Failed to remove product from wishlist',
      success: false,
    });
  }
};

// Get all wishlist items for a user
const getWishlist = async (req, res) => {
  try {
    const userId = req.userId;

    const wishlist = await Wishlist.findOne({ user: userId }).populate('products');

    if (!wishlist) {
      return res.status(404).json({
        message: 'Wishlist not found',
        success: false,
      });
    }

    res.json({
      message: 'Wishlist retrieved successfully',
      success: true,
      data: wishlist.products,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message || 'Failed to retrieve wishlist',
      success: false,
    });
  }
};

module.exports = {
  addProductToWishlist,
  removeProductFromWishlist,
  getWishlist,
};
