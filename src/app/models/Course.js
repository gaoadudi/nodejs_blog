const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

// Define course schema => Tự động ánh xạ tới collection 'courses' trong MongoDB
const Course = new Schema({
    name: { type: String, required: true, maxLength: 250 },
    description: { type: String, maxLength: 500 },
    image: { type: String, maxLength: 250 },
    slug: { type: String, maxLength: 50 },
    videoId: { type: String, maxLength: 250 },
    level: { type: String, maxLength: 250 },
    slug: { type: String, slug: "name", unique: true }, // Thêm slug cho document dựa theo 'name'
}, {
    timestamps: true, // createdAt, updatedAt (Thêm timestamps cho document)
});

// Add plugin
mongoose.plugin(slug); // Sử dụng slug (param)
Course.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
}); // Sử dụng soft delete (xóa mềm, có thể khôi phục)

module.exports = mongoose.model('Course', Course);