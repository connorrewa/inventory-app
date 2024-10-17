const asyncHandler = require('express-async-handler');
const pool = require('../configs/db.config');

// List all categories
const categoriesListGet = asyncHandler(async (req, res) => {
    // Logic to get all categories
    const result = await pool.query('select * from categories');
    console.log(result.rows);
    res.render('categories_list', { categories: result.rows });
});

// Display form for creating a new category
const categoriesCreateGet = asyncHandler(async (req, res) => {
    // Logic to display category creation form
    res.render('new_category');
});

// Handle creating a new category
const categoriesCreatePost = asyncHandler(async (req, res) => {
    // Logic to handle category creation

    const { name, description } = req.body;

    try {
        const result = await pool.query(
            'INSERT INTO categories (name, description) VALUES ($1, $2) RETURNING *',
            [name, description]
        );

        console.log(result.rows[0]);
        res.redirect('/categories');
    } catch (error) {
        console.error('Error creating category', error.message);
        res.status(500).send('Error creating category');
    }
});

// Get specific category by ID
const categoryGet = asyncHandler(async (req, res) => {
    // Logic to get a category by id
    res.send(`Category detail for ID ${req.params.categoryId}`);
});

// Display form for updating a category
const categoryUpdateGet = asyncHandler(async (req, res) => {
    // Logic to display update form
    res.send(`Update form for category ID ${req.params.categoryId}`);
});

// Handle updating a category
const categoryUpdatePost = asyncHandler(async (req, res) => {
    // Logic to handle category update
    res.send(`Category ID ${req.params.categoryId} updated`);
});

// Handle deleting a category
const categoryDeletePost = asyncHandler(async (req, res) => {
    const { categoryId } = req.params;

    // Delete category from database
    await pool.query('DELETE FROM categories WHERE id = $1', [categoryId]);

    // Redirect back to the categories list
    res.redirect('/categories');
});
module.exports = {
    categoriesListGet,
    categoriesCreateGet,
    categoriesCreatePost,
    categoryGet,
    categoryUpdateGet,
    categoryUpdatePost,
    categoryDeletePost,
};
