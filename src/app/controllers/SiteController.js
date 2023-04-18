const Course = require('../models/Course');

class SiteController {

    // [GET] /
    index(req, res, next) {
        // Sử dụng model 'Course' để query: Lấy dữ liệu documents của collection 'courses' ở dạng json
        Course.find({}) // Lấy tất cả document trong collection
            .then(docs => res.render('home', { courses: docs })) // Render view 'home' và truyền vào chuỗi json 'courses'
            .catch(next); // Nếu gặp lỗi thì next, bỏ qua
    }
}

module.exports = new SiteController;