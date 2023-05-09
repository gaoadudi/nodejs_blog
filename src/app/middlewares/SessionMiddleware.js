module.exports = function sessionMiddleware(req, res, next) { // Hàm middleware gửi session tới view
    if (req.session.currentUser) { // Nếu có session 'currentUser'
        // Biến locals 'currentUser' sẽ được truyền vào view khi có render()
        res.locals.currentUser = req.session.currentUser;
        next();
    } else {
        next();
    }
};