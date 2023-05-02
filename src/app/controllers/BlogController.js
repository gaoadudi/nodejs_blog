const Blog = require('../models/Blog');

class BlogController {

    // [GET] /blog/:slug (slug => parameter in url)
    show(req, res, next) {
        Blog.findOne({ slug: req.params.slug }) // Lấy dữ liệu theo điều kiện 'slug'
            .then(blog => res.render('blog/show', { blog })) // Render view 'show'
            .catch(next);
    }

    // [GET] /blog/create
    create(req, res, next) {
        res.render('blog/create'); // Render view 'create'
    }

    // [POST] /blog/store
    store(req, res, next) {
        const blog = new Blog(req.body); // Document dạng json nhận từ request
        blog.save() // Lưu document vào database
            .then(() => res.redirect('/blogs')) // Chuyển hướng về url '/blogs'
            .catch(next);
    }
    
    // [GET] /blog/:id/edit
    edit(req, res, next) {
        Blog.findById(req.params.id) // Lấy document theo điều kiện 'id'
            .then(blog => res.render('blog/edit', { blog })) // Render view 'edit'
            .catch(next);
    }

    // [PUT] /blog/:id
    update(req, res, next) {
        Blog.updateOne({ _id: req.params.id }, req.body) // Cập nhật document theo điều kiện 'id'
            .then(() => res.redirect('/me/stored/blogs')) // Chuyển hướng về url '/me/stored/blogs'
            .catch(next);
    }

    // [DELETE] /blog/:id
    delete(req, res, next) {
        Blog.delete({ _id: req.params.id }) // Xóa mềm document theo điều kiện 'id'
            .then(() => res.redirect('back')) // Chuyển hướng về url trước đó '/me/stored/blogs'
            .catch(next);
    }

    // [PATCH] /blog/:id/restore
    restore(req, res, next) {
        Blog.restore({ _id: req.params.id },) // Khôi phục document đã xóa mềm theo điều kiện 'id'
            .then(() => res.redirect('back')) // Chuyển hướng về url trước đó '/me/trash/blogs'
            .catch(next);
    }

    // [DELETE] /blog/:id/force
    forceDelete(req, res, next) {
        Blog.deleteOne({ _id: req.params.id }) // Xóa vĩnh viễn document theo điều kiện 'id'
            .then(() => res.redirect('back')) // Chuyển hướng về url trước đó '/me/stored/blogs'
            .catch(next);
    }

    // [POST] /blog/handle-form-action
    handleForm(req, res, next) {
        switch(req.body.action) {
            case 'delete': // action = delete, danh sách _id = blogIds[]
                Blog.delete({ _id: { $in: req.body.blogIds } }) // Xóa mềm document theo điều kiện 'id'
                    .then(() => res.redirect('back')) // Chuyển hướng về url trước đó '/me/stored/blogs'
                    .catch(next);
                break;
            case 'restore': // action = restore, danh sách _id = blogIds[]
                Blog.restore({ _id: { $in: req.body.blogIds } }) // Khôi phục document theo điều kiện 'id'
                    .then(() => res.redirect('back')) // Chuyển hướng về url trước đó '/me/trash/blogs'
                    .catch(next);
                break;
            default:
                req.json({ message: 'Action is invalid!' });
        }
    }
}

module.exports = new BlogController;