const Course = require('../models/Course');

class CourseController {
    // [GET] /course/:slug (slug => parameter in url)
    show(req, res, next) {
        Course.findOne({ slug: req.params.slug }) // Lấy dữ liệu theo điều kiện 'slug'
            .then(course => res.render('course/show', { course })) // Render view 'show'
            .catch(next);
    }

    // [GET] /course/create
    create(req, res, next) {
        res.render('course/create'); // Render view 'create'
    }

    // [POST] /course/store
    store(req, res, next) {
        const course = new Course(req.body); // Document dạng json nhận từ request
        course.save() // Lưu document vào database
            .then(() => res.redirect('/')) // Chuyển hướng về url '/' (view 'home')
            .catch(next);
    }
    
    // [GET] /course/:id/edit
    edit(req, res, next) {
        Course.findById(req.params.id) // Lấy document theo điều kiện 'id'
            .then(course => res.render('course/edit', { course })) // Render view 'edit'
            .catch(next);
    }

    // [PUT] /course/:id
    update(req, res, next) {
        Course.updateOne({ _id: req.params.id }, req.body) // Cập nhật document theo điều kiện 'id'
            .then(() => res.redirect('/me/stored/courses')) // Chuyển hướng về url '/me/stored/courses'
            .catch(next);
    }

    // [DELETE] /course/:id
    delete(req, res, next) {
        Course.delete({ _id: req.params.id }) // Xóa mềm document theo điều kiện 'id'
            .then(() => res.redirect('back')) // Chuyển hướng về url trước đó '/me/stored/courses'
            .catch(next);
    }

    // [PATCH] /course/:id/restore
    restore(req, res, next) {
        Course.restore({ _id: req.params.id },) // Khôi phục document đã xóa mềm theo điều kiện 'id'
            .then(() => res.redirect('back')) // Chuyển hướng về url trước đó '/me/trash/courses'
            .catch(next);
    }

    // [DELETE] /course/:id/force
    forceDelete(req, res, next) {
        Course.deleteOne({ _id: req.params.id }) // Xóa vĩnh viễn document theo điều kiện 'id'
            .then(() => res.redirect('back')) // Chuyển hướng về url trước đó '/me/stored/courses'
            .catch(next);
    }
}

module.exports = new CourseController;