const siteRouter = require('./site');
const courseRouter = require('./course');
const blogRouter = require('./blog');
const meRouter = require('./me');
const userRouter = require('./user');
const sortMiddleware = require('../app/middlewares/SortMiddleware');
const sessionMiddleware = require('../app/middlewares/SessionMiddleware');
const loginMiddleware = require('../app/middlewares/LoginMiddleware');

function route(app) {
    // GET method
    app.get('/search', (req, res) => {
        console.log('> Query (GET method): ');
        console.log(req.query);
        res.render('search'); // Render file 'main' và append file 'search' vào {{{body}}}
    });
    // POST method
    app.post('/search', (req, res) => {
        console.log('> Body (POST method): ');
        console.log(req.body);
        res.send('');
    });

    // Middleware
    app.get('/middleware', 
        // Middleware => localhost:3000/middleware?tiket=vip
        (req, res, next) => {
            if (['vip', 'vippro'].includes(req.query.ticket)) { // Kiểm tra ticket (trong url request)
                req.permission = 'OK';
                return next(); // Hợp lệ => Hàm xử lý (response) phía dưới
            } else {
                res.status(403).json({ message: 'Access denied!' }); // Không hợp lệ => Cảnh báo
            }
        },
        (req, res, next) => { // Hàm xử lý sau khi kiểm tra
            res.json({ message: 'Successfully!', permission: req.permission });
        }
    );

    // Middleware function
    function validation (req, res, next) {
        if (['vip', 'vippro'].includes(req.query.ticket)) { // Kiểm tra ticket (trong url request)
            return next(); // Hợp lệ => Hàm xử lý response
        } else {
            res.status(403).json({ message: 'Access denied!' }); // Không hợp lệ => Cảnh báo
        }
    }
    // Áp dụng middleware function cho toàn bộ request trong các route phía dưới
    //app.use(validation);
    app.use(sortMiddleware); // Sắp xếp document
    app.use(sessionMiddleware); // Gửi session (nếu có) tới view
    
    // Route modules
    app.use('/course', courseRouter);
    app.use('/blog', blogRouter);
    app.use('/me', loginMiddleware, meRouter);
    app.use('/user', userRouter);
    app.use('/', siteRouter);
}

module.exports = route;
