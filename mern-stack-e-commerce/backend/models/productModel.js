const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    productName: String,
    brandName: String,
    category: String,
    productImage: [],
    description: String,
    price: Number,
    sellingPrice: Number,
    comments: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        },
        text: String,
        createdAt: {
            type: Date,
            default: Date.now
        }
    }]
}, {
    timestamps: true
});

const productModel = mongoose.model("product", productSchema);

module.exports = productModel;
