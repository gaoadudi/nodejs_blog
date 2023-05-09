const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
const mongooseDelete = require('mongoose-delete');
//const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

// Define blog schema => Tự động ánh xạ tới collection 'blogs' trong MongoDB
const BlogSchema = new Schema({
    //_id: { type: Number },
    title: { type: String, required: true, maxLength: 250 },
    description: { type: String, maxLength: 500 },
    content: { type: String },
    slug: { type: String, slug: "title", unique: true }, // Thêm slug cho document dựa theo field 'title'
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Khóa ngoại reference: User._id
}, {
    //_id: false, // Mongoose sẽ không tác động tới field '_id'
    timestamps: true, // createdAt, updatedAt (Thêm timestamps cho document)
});

// Custom query helpers
BlogSchema.query.sortable = function (req) { // Hàm sắp xếp document
    if (req.query.hasOwnProperty('_sort')) {  // Nếu request url có '_sort' => Sắp xếp
        const isValidType = ['asc', 'desc'].includes(req.query.type);
        return this.sort({
            [req.query.column]: isValidType ? req.query.type : 'desc', // Sắp xếp column (field) theo type (asc, desc)
        });
    }
    return this; // Nếu không => Trả về document ban đầu
}

// Add plugin
mongoose.plugin(slug); // Sử dụng slug (param)
BlogSchema.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
}); // Sử dụng soft delete (xóa mềm, có thể khôi phục)
//BlogSchema.plugin(AutoIncrement); // Sử dụng auto-increment _id

module.exports = mongoose.model('Blog', BlogSchema);