const path = require('path'); // Thư viện nodejs: Quản lý đường dẫn
const express = require('express');
const morgan = require('morgan');
const { engine } = require('express-handlebars');
const route = require('./routes');

const app = express();
const port = 3000;

// Middleware: Xử lý dữ liệu gửi lên bằng POST (body-parser)
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json()); // Tiếp nhận dữ liệu dạng json

// Static folder: Các file/folder trong 'public' có thể truy cập public (ví dụ qua url)
app.use(express.static(path.join(__dirname, 'public'))); // test => localhost:3000/img/logo.png

// HTTP logger
app.use(morgan('combined')); 

// Template engine
app.engine('hbs', engine(
    {extname: '.hbs'}
));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

// -----------------MVC-----------------
// Routes init
route(app);

app.listen(port, () => {
    console.log(`> Example app listening on port ${port}`)
}); // localhost:3000