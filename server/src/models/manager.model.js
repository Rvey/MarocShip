const mongoose = require('mongoose');
const { Schema } = mongoose;


const managerSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String },
    role: {
        type: String,
        default: "manager"
    },
});

module.exports = mongoose.model('manager', managerSchema)