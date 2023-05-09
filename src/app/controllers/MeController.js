const Course = require('../models/Course');
const Blog = require('../models/Blog');

class MeController {
    
    // [GET] /me/stored/courses
    storedCourses(req, res, next) {
        //res.json(res.locals._sort);
        const user = res.locals.currentUser; // Lấy user hiện đang login (theo session)
        
        // Lấy tất cả document chưa xóa (Sắp xếp lại nếu cần) & số lượng document đã xóa trong collection
        Promise.all([Course.find({ author: user._id }).sortable(req), Course.countDocumentsDeleted({ author: user._id })])
            .then(([courses, deletedCount]) => res.render('me/stored-courses', { 
                courses, deletedCount
            })) // Render view 'stored-courses'
            .catch(next);
    }
    
    // [GET] /me/trash/courses
    trashCourses(req, res, next) {
        const user = req.session.currentUser; // Lấy user hiện đang login (theo session)

        Course.findDeleted({ author: user._id }) // Lấy tất cả document đã xóa (deleted: true) trong collection
            .then(courses => res.render('me/trash-courses', { courses })) // Render view 'trash-courses'
            .catch(next);
    }

    // [GET] /me/stored/blogs
    storedBlogs(req, res, next) {
        const user = req.session.currentUser; // Lấy user hiện đang login (theo session)

        // Lấy tất cả document chưa xóa (Sắp xếp lại nếu cần) & số lượng document đã xóa trong collection
        Promise.all([Blog.find({ author: user._id }).sortable(req), Blog.countDocumentsDeleted({ author: user._id })])
            .then(([blogs, deletedCount]) => res.render('me/stored-blogs', { 
                blogs, deletedCount 
            })) // Render view 'stored-blogs'
            .catch(next);
    }
    
    // [GET] /me/trash/blogs
    trashBlogs(req, res, next) {
        const user = req.session.currentUser; // Lấy user hiện đang login (theo session)

        Blog.findDeleted({ author: user._id }) // Lấy tất cả document đã xóa (deleted: true) trong collection
            .then(blogs => res.render('me/trash-blogs', { blogs })) // Render view 'trash-blogs'
            .catch(next);
    }
}

module.exports = new MeController;