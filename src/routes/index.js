const newsRouter = require('./news');
const siteRouter = require('./site');
const courseRouter = require('./course');
const meRouter = require('./me');

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

    // Route modules
    app.use('/news', newsRouter);
    app.use('/course', courseRouter);
    app.use('/me', meRouter);
    app.use('/', siteRouter); 
}

module.exports = route;
