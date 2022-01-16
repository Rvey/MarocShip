const mongoose = require('mongoose');
const { Schema } = mongoose;


const deliveryMangerSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: {
        type: String,
        default: "deliveryManger"
    },
});

module.exports = mongoose.model('deliveryManger', deliveryMangerSchema)