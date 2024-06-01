// controllers/product/deleteProduct.js
const Product = require("../../models/productModel");
const cloudinary = require('../../config/cloundinary')

const deleteProduct = async (req, res) => {
    try {
        const { productId } = req.body;
        const product = await Product.findById(productId);

        // Validate productId
        if (!productId) {
            return res.status(400).json({
                message: "Product ID is required",
                error: true,
                success: false,
            });
        }

        for (const imageUrl of product.productImage) {
            const publicId = imageUrl.split('/').pop().split('.')[0]; // Extract publicId from the Cloudinary URL
            await cloudinary.uploader.destroy(publicId); // Delete the image from Cloudinary
        }

        // Find and delete the product by its ID
        const deletedProduct = await Product.findByIdAndDelete(productId);

        // If the product is not found
        if (!deletedProduct) {
            return res.status(404).json({
                message: "Product not found",
                error: true,
                success: false,
            });
        }

        // Return success message
        res.json({
            message: "Product deleted successfully",
            error: false,
            success: true,
            data: deletedProduct,
        });
    } catch (err) {
        console.error('Error deleting product:', err);
        res.status(500).json({
            message: err.message || "Failed to delete the product",
            error: true,
            success: false,
        });
    }
};

module.exports = deleteProduct;
