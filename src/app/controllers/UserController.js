const User = require('../models/User');
const bcrypt = require('bcrypt');

class UserController {

    // [GET] /login
    login(req, res, next) {
        res.render('user/login'); // Render view 'login'
    }

    // [POST] /authen
    async authen(req, res, next) {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (user && (await bcrypt.compare(password, user.password))) {
            req.session.regenerate(function (err) {
                if (err) next(err);
                req.session.currentUser = user; // Lưu thông tin user vào session 'currentUser'
                //req.session.save(); // Lưu session
                res.redirect('/'); // Chuyển hướng về url '/' (view 'home')
            });
        } else {
            res.render('user/login', { error: 'Sai username hoặc password!' }); // Render view 'login'
        }
    }

    // [GET] /logout
    logout(req, res, next) {
        req.session.destroy(); // Xóa session
        res.redirect('/'); // Chuyển hướng về url '/' (view 'home')
    }

    // [GET] /user/create
    create(req, res, next) {
        res.render('user/create'); // Render view 'create'
    }

    // [POST] /user/store
    async store(req, res, next) {
        req.body.password = await bcrypt.hash(req.body.password, 10); // Mã hóa password
        const user = new User(req.body); // Document dạng json nhận từ request
        user.save() // Lưu document vào database
            .then(() => res.redirect('/')) // Chuyển hướng về url '/' (view 'home')
            .catch(next);
    }

    // [GET] /user/change/password
    changePassword(req, res, next) {
        res.render('user/change-password'); // Render view 'change-password'
    }

    // [PUT] /user/:id/update/password
    async updatePassword(req, res, next) {
        const { oldPassword, newPassword, confirmPassword } = req.body;
        const user = res.locals.currentUser; // Lấy user hiện đang login (theo session)

        if (await bcrypt.compare(oldPassword, user.password) === false) {
            res.render('user/change-password', { error: 'Mật khẩu cũ không chính xác!' });
        } else if (newPassword !== confirmPassword) {
            res.render('user/change-password', { error: 'Mật khẩu mới và mật khẩu xác nhận không khớp!' });
        } else {
            user.password = await bcrypt.hash(newPassword, 10); // Mã hóa password mới
            User.updateOne({ _id: user._id }, user) // Cập nhật document theo điều kiện 'id'
                .then(() => res.render('user/change-password', { success: 'Thay đổi mật khẩu thành công.' }))
                .catch(next);
        }
    }
}

module.exports = new UserController;