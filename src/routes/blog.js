const express = require('express');
const router = express.Router();
const blogController = require('../app/controllers/BlogController');
const loginMiddleware = require('../app/middlewares/LoginMiddleware');

// Define 'blog' route
router.get('/create', loginMiddleware, blogController.create);
router.post('/store', loginMiddleware, blogController.store);
router.get('/:slug', blogController.show); // slug => param
router.use(loginMiddleware); // Middleware Kiểm tra user login
router.get('/:id/edit', blogController.edit); // id => param
router.put('/:id', blogController.update);
router.delete('/:id', blogController.delete);
router.patch('/:id/restore', blogController.restore);
router.delete('/:id/force', blogController.forceDelete);
router.post('/handle-form', blogController.handleForm);

module.exports = router;