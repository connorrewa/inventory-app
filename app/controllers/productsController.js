const asyncHandler = require('express-async-handler');
const pool = require('../configs/db.config');
const products = [
    {
        name: 'lettuce',
        description: 'yum!',
    },
    {
        name: 'carrot',
        description: 'yuk',
    },
];

const productsListGet = asyncHandler(async (req, res) => {
    const result = await pool.query('select * from items');
    console.log(result.rows);
    res.render('index', { products: result.rows });
});

// Get specific product by ID
const productGet = asyncHandler(async (req, res) => {
    // Logic to get a product by id
    res.send(`Product detail for ID ${req.params.productId}`);
});

// Display form for creating a new product
const productCreateGet = asyncHandler(async (req, res) => {
    // Logic to display product creation form
    res.render('new_product');
});

// Handle creating a new product
const productCreatePost = asyncHandler(async (req, res) => {
    // Logic to handle product creation
    res.send('Product created');
});

// Display form for updating a product
const productUpdateGet = asyncHandler(async (req, res) => {
    // Logic to display update form
    res.send(`Update form for product ID ${req.params.productId}`);
});

// Handle updating a product
const productUpdatePost = asyncHandler(async (req, res) => {
    // Logic to handle product update
    res.send(`Product ID ${req.params.productId} updated`);
});

// Handle deleting a product
const productDeletePost = asyncHandler(async (req, res) => {
    // Logic to handle product deletion
    res.send(`Product ID ${req.params.productId} deleted`);
});

module.exports = {
    productsListGet,
    productGet,
    productCreateGet,
    productCreatePost,
    productUpdateGet,
    productUpdatePost,
    productDeletePost,
};
