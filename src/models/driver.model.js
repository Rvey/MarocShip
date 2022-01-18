const mongoose = require('mongoose');
const {
    Schema
} = mongoose;


const driverSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: true
    },
    file: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "driver"
    },
    delivery: [
        {
            type: Schema.Types.ObjectId,
            ref: "delivery"
        }
    ],
    truck: {
        type: Schema.Types.ObjectId,
        ref: "truck"
    },
    verified: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        immutable: true,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('driver', driverSchema)