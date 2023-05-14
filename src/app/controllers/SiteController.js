const Course = require('../models/Course');
const Blog = require('../models/Blog');

class SiteController {

    // [GET] /
    index(req, res, next) {
        // Sử dụng model 'Course' để query: Lấy dữ liệu documents của collection 'courses' ở dạng json
        /* Course.find({}).skip(perPage * (page - 1)).limit(perPage) // Lấy tất cả document trong collection
            .then(docs => res.render('site/home', { courses: docs })) // Render view 'home' và truyền vào chuỗi json 'courses'
            .catch(next); // Nếu gặp lỗi thì next, bỏ qua */

        // Phân trang
        const perPage = 6; // Số document mỗi trang
        const page = parseInt(req.query.page) || 1; // Số trang hiện tại
        
        Promise.all([
                Course.find({}).skip(perPage * (page - 1)).limit(perPage), // Lấy tất cả document trong collection (skip: phân trang)
                Course.countDocuments() // Lấy số lượng document trong collection
            ])
            .then(([courses, count]) => res.render('site/home', { 
                courses, 
                current: page, // Số trang hiện tại
                pageCount: Math.ceil(count / perPage), // Tổng số trang
            })) // Render view 'home' và truyền vào chuỗi json 'courses'
            .catch(next); // Nếu gặp lỗi thì next, bỏ qua
    }

    // [GET] /lazy-load
    loadCourses(req, res, next) {
        // Phân trang
        const perPage = 6; // Số document mỗi trang
        const page = parseInt(req.query.page) || 1; // Số trang hiện tại
        
        Course.find({}).skip(perPage * (page - 1)).limit(perPage) // Lấy tất cả document trong collection (skip: phân trang)
            .then(courses => res.send(courses)) // Gửi đi chuỗi json 'courses'
            .catch(next); // Nếu gặp lỗi thì next, bỏ qua
    }

    // [GET] /blogs
    blogs(req, res, next) {
        // Sử dụng model 'Blog' để query: Lấy dữ liệu documents của collection 'blogs' ở dạng json
        /* Blog.find({}) // Lấy tất cả document trong collection
            .then(docs => res.render('site/news', { blogs: docs })) // Render view 'news' và truyền vào chuỗi json 'blogs'
            .catch(next); // Nếu gặp lỗi thì next, bỏ qua */

        // Phân trang
        const perPage = 6; // Số document mỗi trang
        const page = parseInt(req.query.page) || 1; // Số trang hiện tại
        
        Promise.all([
                Blog.find({}).skip(perPage * (page - 1)).limit(perPage), // Lấy tất cả document trong collection (skip: phân trang)
                Blog.countDocuments() // Lấy số lượng document trong collection
            ])
            .then(([blogs, count]) => res.render('site/news', { 
                blogs, 
                current: page, // Số trang hiện tại
                pageCount: Math.ceil(count / perPage), // Tổng số trang
            })) // Render view 'news' và truyền vào chuỗi json 'blogs'
            .catch(next);
    }

    // [GET] /blogs/lazy-load
    loadBlogs(req, res, next) {
        // Phân trang
        const perPage = 6; // Số document mỗi trang
        const page = parseInt(req.query.page) || 1; // Số trang hiện tại
        
        Blog.find({}).skip(perPage * (page - 1)).limit(perPage) // Lấy tất cả document trong collection (skip: phân trang)
            .then(blogs => res.send(blogs))
            .catch(next);
    }
}

module.exports = new SiteController;