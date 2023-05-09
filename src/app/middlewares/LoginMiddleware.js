module.exports = function loginMiddleware(req, res, next) { // Hàm middleware kiểm tra login
    if (req.session.currentUser) { // Nếu có session 'currentUser'
        next();
    } else {
        res.redirect('/user/login');
    }
};