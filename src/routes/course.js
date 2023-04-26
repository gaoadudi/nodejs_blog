const express = require('express');
const router = express.Router();
const courseController = require('../app/controllers/CourseController');

// Define 'course' route
router.post('/handle-form', courseController.handleForm);
router.get('/create', courseController.create);
router.post('/store', courseController.store);
router.get('/:id/edit', courseController.edit); // id => param
router.put('/:id', courseController.update);
router.patch('/:id/restore', courseController.restore);
router.delete('/:id', courseController.delete);
router.delete('/:id/force', courseController.forceDelete);
router.get('/:slug', courseController.show); // slug => param

module.exports = router;