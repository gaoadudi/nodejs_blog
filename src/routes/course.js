const express = require('express');
const router = express.Router();
const courseController = require('../app/controllers/CourseController');

// Define 'course' route
router.get('/create', courseController.create);
router.post('/store', courseController.store);
router.get('/:slug', courseController.show); // slug => param
router.get('/:id/edit', courseController.edit); // id => param
router.put('/:id', courseController.update);
router.delete('/:id', courseController.delete);
router.patch('/:id/restore', courseController.restore);
router.delete('/:id/force', courseController.forceDelete);
router.post('/handle-form', courseController.handleForm);

module.exports = router;