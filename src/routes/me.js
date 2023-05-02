const express = require('express');
const router = express.Router();
const meController = require('../app/controllers/MeController');

// Define 'me' route
router.get('/stored/courses', meController.storedCourses);
router.get('/trash/courses', meController.trashCourses);
router.get('/stored/blogs', meController.storedBlogs);
router.get('/trash/blogs', meController.trashBlogs);

module.exports = router;