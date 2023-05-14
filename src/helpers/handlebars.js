const Handlebars = require('handlebars');

module.exports = { // Hàm hỗ trợ cho việc hiển thị view handlebars
    sum: (a, b) => a + b, // Tính tổng
    sub: (a, b) => a - b, // Tính hiệu

    // So sánh
    greater: (a, b) => a > b,
    equal: (a, b) => a == b,
    less: (a, b) => a < b,

    // Hiển thị thời gian
    formatDate: (date) => {
        return date.toLocaleString();
    },
    
    // Hiển thị tính năng Sắp xếp
    sortable: (field, sort) => {
        const sortType = (field === sort.column) ? sort.type : 'default';

        const icons = {
            default: 'oi oi-elevator',
            asc: 'oi oi-sort-ascending',
            desc: 'oi oi-sort-descending',
        };
        const icon = icons[sortType];
        
        const types = {
            default: 'desc',
            asc: 'desc',
            desc: 'asc',
        };
        const type = types[sortType];

        // Escape HTML
        const href = Handlebars.escapeExpression(`?_sort&column=${field}&type=${type}`);

        const output = `<a href="${href}">
            <span class="${icon}"></span>
        </a>`;

        return new Handlebars.SafeString(output);
    },
};