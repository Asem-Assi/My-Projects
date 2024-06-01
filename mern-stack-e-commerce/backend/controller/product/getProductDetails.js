const productModel = require("../../models/productModel");
const userModel=require("../../models/userModel");

const getProductDetails = async(req, res) => {
    try {
        const { productId } = req.body;

        const product = await productModel.findById(productId)
            .populate({
                path: 'comments.user',
                model: 'user',
                select: 'name' // Select only the name of the user
            });

        // Extract comments with username
        const comments = product.comments.map(comment => ({
            text: comment.text,
            createdAt: comment.createdAt,
            userName: comment.user.name // Extract username from populated user object
        }));

        res.json({
            data: {
                productName: product.productName,
                brandName: product.brandName,
                category: product.category,
                productImage: product.productImage,
                description: product.description,
                price: product.price,
                sellingPrice: product.sellingPrice,
                comments: comments // Send comments with username
            },
            message: "Ok",
            success: true,
            error: false
        });
    } catch (err) {
        res.json({
            message: err?.message || err,
            error: true,
            success: false
        });
    }
}

module.exports = getProductDetails;
