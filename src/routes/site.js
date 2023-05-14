const express = require('express');
const router = express.Router();
const siteController = require('../app/controllers/SiteController');

// Define 'site' route
// -> Route get path (in url) and call the handler function (in controller)
router.get('/blogs/lazy-load', siteController.loadBlogs);
router.get('/blogs', siteController.blogs);
router.get('/lazy-load', siteController.loadCourses);
router.get('/', siteController.index); // (path, handler)

module.exports = router;