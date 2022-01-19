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
    AcceptedDeliveries: [{
        type: Schema.Types.ObjectId,
        unique: true,
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

driverSchema.pre('update', function(doc , next) {
    doc.verifiedAt = new Date();
    next();
})

module.exports = mongoose.model('driver', driverSchema)