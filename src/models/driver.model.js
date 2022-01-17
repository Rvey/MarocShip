const mongoose = require('mongoose');
const { Schema } = mongoose;


const driverSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    file: { type: String, required: true },
    role: {
        type: String,
        default: "driver"
    },
    verified: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('driver', driverSchema)