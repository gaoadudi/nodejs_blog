const mongoose = require('mongoose');

// Connect Database MongoDB
async function connect() {
    try {
        await mongoose.connect('mongodb+srv://gaoadudi:MyDatabase@cluster0.92chkca.mongodb.net/blog', {
            useNewUrlParser: true, 
            useUnifiedTopology: true
        });
        console.log('> Connect to MongoDB successfully!');
    } catch (error) {
        console.log('> Connect to MongoDB failure!');
    }
}

module.exports = { connect };
