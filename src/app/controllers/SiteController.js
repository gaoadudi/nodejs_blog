const Course = require('../models/Course');
const Blog = require('../models/Blog');

class SiteController {

    // [GET] /
    index(req, res, next) {
        // Sử dụng model 'Course' để query: Lấy dữ liệu documents của collection 'courses' ở dạng json
        Course.find({}) // Lấy tất cả document trong collection
            .then(docs => res.render('site/home', { courses: docs })) // Render view 'home' và truyền vào chuỗi json 'courses'
            .catch(next); // Nếu gặp lỗi thì next, bỏ qua
    }

    // [GET] /blogs
    blogs(req, res, next) {
        // Sử dụng model 'Blog' để query: Lấy dữ liệu documents của collection 'blogs' ở dạng json
        Blog.find({}) // Lấy tất cả document trong collection
            .then(docs => res.render('site/news', { blogs: docs })) // Render view 'news' và truyền vào chuỗi json 'blogs'
            .catch(next); // Nếu gặp lỗi thì next, bỏ qua
    }
}

module.exports = new SiteController;