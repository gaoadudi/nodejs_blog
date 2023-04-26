const Handlebars = require('handlebars');

module.exports = { // Hàm hỗ trợ cho việc hiển thị view handlebars
    sum: (a, b) => a + b, // Tính tổng
    
    sortable: (field, sort) => { // Sắp xếp
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