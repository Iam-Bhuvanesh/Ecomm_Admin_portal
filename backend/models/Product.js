const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        default: 0,
    },
    originalPrice: {
        type: Number,
    },
    discount: {
        type: String,
    },
    sizes: {
        type: [String],
        required: true,
        enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL', 'FS'],
        default: ['S', 'M', 'L'],
    },
    gender: {
        type: String,
        required: true,
        enum: ['Male', 'Female', 'Unisex', 'Kids', 'Men', 'Women'],
        default: 'Unisex',
    },
    images: {
        type: [String],
        required: true,
    },
    category: {
        type: String, // Kept as String for storefront compatibility, can store Name
        required: false,
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: false,
    },
    isNewArrival: {
        type: Boolean,
        default: true,
    },
    isRecent: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true,
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
