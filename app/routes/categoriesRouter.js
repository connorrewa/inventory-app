const { Router } = require('express');
const categoriesRouter = Router();
const categoriesController = require('../controllers/categoriesController');

categoriesRouter.get('/', categoriesController.categoriesListGet);
categoriesRouter.get('/create', categoriesController.categoriesCreateGet);
categoriesRouter.get('/:categoryId/detail', categoriesController.categoryGet);
categoriesRouter.get(
    '/:categoryId/update',
    categoriesController.categoryUpdateGet
);

categoriesRouter.post(
    ':/categoryId/update',
    categoriesController.categoryUpdatePost
);
categoriesRouter.post('/create', categoriesController.categoriesCreatePost);

categoriesRouter.post(
    '/:categoryId/delete',
    categoriesController.categoryDeletePost
);

module.exports = categoriesRouter;
