const newsRouter = require('./news');
const siteRouter = require('./site');

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

    // Route: Route get path (in url) and call the handler function 
    app.use('/news', newsRouter);
    app.use('/', siteRouter); // (path, handler)
}

    module.exports = route;