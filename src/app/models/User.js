const mongoose = require('mongoose');
//const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

// Define user schema => Tự động ánh xạ tới collection 'users' trong MongoDB
const UserSchema = new Schema({
    //_id: { type: Number },
    username: { type: String, required: true, unique: true, maxLength: 250 },
    password: { type: String, required: true, maxLength: 250 },
}, {
    //_id: false, // Mongoose sẽ không tác động tới field '_id'
    timestamps: true, // createdAt, updatedAt (Thêm timestamps cho document)
});

// Add plugin
//UserSchema.plugin(AutoIncrement); // Sử dụng auto-increment _id

module.exports = mongoose.model('User', UserSchema);