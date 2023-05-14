const Course = require('../models/Course');
const Blog = require('../models/Blog');

class MeController {
    
    // [GET] /me/stored/courses
    storedCourses(req, res, next) {
        //res.json(res.locals._sort);
        const user = res.locals.currentUser; // Lấy user hiện đang login (theo session)
        
        const perPage = 4; // Số document mỗi trang
        const page = parseInt(req.query.page) || 1; // Số trang hiện tại
        
        // _sort href
        const hrefSort = req.query.hasOwnProperty('_sort') ? `&_sort&column=${req.query.column}&type=${req.query.type}` : '';
        
        /* Lấy tất cả document chưa xóa (Sắp xếp lại nếu cần) & 
            số lượng document đã xóa trong collection & số lượng document chưa xóa */
        Promise.all([
                Course.find({ author: user._id }).sortable(req).skip(perPage * (page - 1)).limit(perPage), 
                Course.countDocumentsDeleted({ author: user._id }), 
                Course.countDocuments()
            ])
            .then(([courses, deletedCount, count]) => res.render('me/stored-courses', { 
                courses, 
                deletedCount, 
                current: page, // Số trang hiện tại
                pageCount: Math.ceil(count / perPage), // Tổng số trang
                pages: Array.from({ length: Math.ceil(count / perPage) }, (_, index) => index + 1), // Danh sách số trang
                hrefSort: hrefSort,
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

        const perPage = 4; // Số document mỗi trang
        const page = parseInt(req.query.page) || 1; // Số trang hiện tại

        // _sort href
        const hrefSort = req.query.hasOwnProperty('_sort') ? `&_sort&column=${req.query.column}&type=${req.query.type}` : '';
        
        /* Lấy tất cả document chưa xóa (Sắp xếp lại nếu cần) & 
            số lượng document đã xóa trong collection & số lượng document chưa xóa */
        Promise.all([
                Blog.find({ author: user._id }).sortable(req).skip(perPage * (page - 1)).limit(perPage), 
                Blog.countDocumentsDeleted({ author: user._id }), 
                Blog.countDocuments()
            ])
            .then(([blogs, deletedCount, count]) => res.render('me/stored-blogs', { 
                blogs, 
                deletedCount, 
                current: page, // Số trang hiện tại
                pageCount: Math.ceil(count / perPage), // Tổng số trang
                pages: Array.from({ length: Math.ceil(count / perPage) }, (_, index) => index + 1), // Danh sách số trang
                hrefSort: hrefSort,
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