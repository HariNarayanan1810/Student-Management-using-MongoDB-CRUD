const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    roll: {
        type: Number,
        required: true,
        unique: true
    },
    category: {
        type: String,
        enum: ['Hosteller', 'Dayscholar'],
        required: true
    },
    parentInfo: {
        address: String,
        mobile: String
    }
});

module.exports = mongoose.model('Student', studentSchema);
