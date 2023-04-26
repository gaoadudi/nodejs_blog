module.exports = function sortMiddleware(req, res, next) { // Hàm middleware sắp xếp
    // Biến local tồn tại trong 1 request và được truyền vào view khi sd res.render()
    res.locals._sort = { // Tạo object '_sort'
        enabled: false, // Bật/tắt tính năng
        type: 'default', // Kiểu sắp xếp
    };

    if (req.query.hasOwnProperty('_sort')) { // Nếu request url có '_sort' => Sắp xếp
        /*
        res.locals._sort.enabled = true;
        res.locals._sort.type = req.query.type;
        res.locals._sort.column = req.query.column; */ 

        // Tạo 1 object response từ object '_sort' bên trên với các giá trị nhận vào từ request
        Object.assign(res.locals._sort, {
            enabled: true,
            type: req.query.type,
            column: req.query.column,
        });
    }

    return next();
};