const mongoose = require('mongoose');
const {
    Schema
} = mongoose;

const driverSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
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
    AcceptedDeliveries: [{
        type: Schema.Types.ObjectId,
        ref: "delivery"
    }],
    TotalTraveledDistance: {
        type: Number,
        default: 0
    },
    license: {
        type: String,
        required: true,
    },
    bonus: {
        type: Number,
        default: 0
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
    verifiedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('driver', driverSchema)