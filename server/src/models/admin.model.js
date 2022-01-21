const mongoose = require('mongoose');
const { Schema } = mongoose;


const adminSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: {
        type: String,
        default: "admin"
    },
});

module.exports = mongoose.model('admin', adminSchema)