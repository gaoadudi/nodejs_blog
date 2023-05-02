const express = require('express');
const router = express.Router();
const blogController = require('../app/controllers/BlogController');

// Define 'blog' route
router.get('/create', blogController.create);
router.post('/store', blogController.store);
router.get('/:slug', blogController.show); // slug => param
router.get('/:id/edit', blogController.edit); // id => param
router.put('/:id', blogController.update);
router.delete('/:id', blogController.delete);
router.patch('/:id/restore', blogController.restore);
router.delete('/:id/force', blogController.forceDelete);
router.post('/handle-form', blogController.handleForm);

module.exports = router;