const asyncHandler = require('express-async-handler');
const pool = require('../configs/db.config');

const productsListGet = asyncHandler(async (req, res) => {
    const result = await pool.query('select * from items');
    console.log(result.rows);
    res.render('products_list', { products: result.rows });
});

// Get specific product by ID
const productGet = asyncHandler(async (req, res) => {
    // Logic to get a product by id
    const { productId } = req.params;
    const result = await pool.query('select * from items where id = $1', [
        productId,
    ]);

    if (result.rows.length === 0) {
        return res.status(404).send('Product not found');
    }

    console.log(result.rows);
    res.render('productDetail', { product: result.rows[0] });
});

// Display form for creating a new product
const productCreateGet = asyncHandler(async (req, res) => {
    try {
        // Query to get all categories
        const categoriesResult = await pool.query(
            'SELECT id, name FROM categories'
        );
        const categories = categoriesResult.rows;

        // Render the product creation form and pass the categories
        res.render('new_product', { categories });
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).send('Error fetching categories');
    }
});

// Handle creating a new product
const productCreatePost = asyncHandler(async (req, res) => {
    // Logic to handle product creation
    const { name, description, price, quantity, category_id } = req.body;

    try {
        const result = await pool.query(
            'INSERT INTO items (name, description, price, quantity, category_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [name, description, price, quantity, category_id]
        );
        console.log(result.rows[0]);
        res.redirect('/'); // Redirect back to the product list or desired page
    } catch (error) {
        // Handle error (could be a duplicate entry, invalid data, etc.)
        console.error('Error creating product:', error.message);
        res.status(500).send('Error creating product');
    }
});

// Display form for updating a product
const productUpdateGet = asyncHandler(async (req, res) => {
    const { productId } = req.params;

    const productResult = await pool.query(
        'SELECT * FROM items WHERE ID = $1',
        [productId]
    );

    const categoriesResult = await pool.query('SELECT * FROM categories');

    if (productResult.rows.length == 0) {
        res.status(404).send('Product not found');
    } else {
        const product = productResult.rows[0];
        const categories = categoriesResult.rows;
        res.render('update_product', { product, categories });
    }
});

// Handle updating a product
const productUpdatePost = asyncHandler(async (req, res) => {
    const { productId } = req.params;
    const { name, description, price, quantity, category_id } = req.body;

    await pool.query(
        `UPDATE items SET name = $1, description = $2, price = $3, quantity = $4, category_id = $5 WHERE id = $6`,
        [name, description, price, quantity, category_id, productId]
    );

    res.redirect(`/${productId}/detail`);
});

// Handle deleting a product
const productDeletePost = asyncHandler(async (req, res) => {
    const { productId } = req.params;

    // Delete product from database
    await pool.query('DELETE FROM items WHERE id = $1', [productId]);

    // Redirect back to the product list or send a success message
    res.redirect('/');
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
