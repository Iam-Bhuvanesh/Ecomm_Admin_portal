const Product = require('../models/Product');
const { uploadToCloudinary } = require('../utils/cloudinaryHelper');

// @desc    Get all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Add a new product
// @route   POST /api/products
// @access  Private/Admin
const addProduct = async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: 'No images uploaded' });
        }

        const imageUrls = [];
        for (const file of req.files) {
            const url = await uploadToCloudinary(file.path, 'products');
            imageUrls.push(url);
        }

        const product = new Product({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            sizes: Array.isArray(req.body.sizes) ? req.body.sizes : JSON.parse(req.body.sizes),
            gender: req.body.gender,
            images: imageUrls,
            category: req.body.category || null,
        });

        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (product) {
            await product.deleteOne();
            res.json({ message: 'Product removed' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (product) {
            product.name = req.body.name || product.name;
            product.description = req.body.description || product.description;
            product.price = req.body.price || product.price;
            product.sizes = req.body.sizes ? (Array.isArray(req.body.sizes) ? req.body.sizes : JSON.parse(req.body.sizes)) : product.sizes;
            product.gender = req.body.gender || product.gender;
            product.category = req.body.category || product.category;

            if (req.files && req.files.length > 0) {
                const imageUrls = [];
                for (const file of req.files) {
                    const url = await uploadToCloudinary(file.path, 'products');
                    imageUrls.push(url);
                }
                product.images = imageUrls;
            }

            const updatedProduct = await product.save();
            res.json(updatedProduct);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getProducts, addProduct, deleteProduct, updateProduct };
