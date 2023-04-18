// Load modules (libraries)
const path = require('path'); // Thư viện Quản lý đường dẫn
const express = require('express');
const methodOverride = require('method-override');
const morgan = require('morgan');
const { engine } = require('express-handlebars');

// App's libraries
const route = require('./routes');
const db = require('./config/db');

// Init app
const app = express();

// Method override: Cho phép sử dụng các method như: PUT, DELETE, ...
app.use(methodOverride('_method'));

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
app.engine('hbs', engine({
    extname: '.hbs', // Định dạng đuôi file view
    helpers: { // Hàm hỗ trợ cho việc hiển thị view
        sum: (a, b) => a + b, 
    },
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views')); // path: 'resources/views'

// -----------------MVC-----------------
// Connect to Database
db.connect();

// Init routes
route(app);

const port = 3000;
app.listen(port, () => console.log(`> App listening on port ${port}`)); // localhost:3000