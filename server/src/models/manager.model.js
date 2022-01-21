const mongoose = require('mongoose');
const { Schema } = mongoose;


const managerSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: {
        type: String,
        default: "manager"
    },
});

module.exports = mongoose.model('manager', managerSchema)