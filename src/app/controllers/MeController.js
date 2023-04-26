const Course = require('../models/Course');

class MeController {
    // [GET] /me/stored/courses
    storedCourses(req, res, next) {
        //res.json(res.locals._sort);

        // Lấy tất cả document chưa xóa (Sắp xếp lại nếu cần) & số lượng document đã xóa trong collection
        Promise.all([Course.find({}).sortable(req), Course.countDocumentsDeleted({})])
            .then(([courses, deletedCount]) => res.render('me/stored-courses', { 
                courses, deletedCount 
            })) // Render view 'stored-courses'
            .catch(next);

        /*
        Course.countDocumentsDeleted({}) // Lấy số lượng document đã xóa trong collection
            .then(deletedCount => res.render('me/stored-courses', { deletedCount })) // Render view 'stored-courses'
            .catch(() => {});
        Course.find({}) // Lấy tất cả document trong collection
            .then(courses => res.render('me/stored-courses', { courses })) // Render view 'stored-courses'
            .catch(next);
        */ 
    }
    
    // [GET] /me/trash/courses
    trashCourses(req, res, next) {
        Course.findDeleted() // Lấy tất cả document đã xóa (deleted: true) trong collection
            .then(courses => res.render('me/trash-courses', { courses })) // Render view 'trash-courses'
            .catch(next);
    }
}

module.exports = new MeController;