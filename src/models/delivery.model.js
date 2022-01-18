const mongoose = require("mongoose");
const {
    Schema
} = mongoose;

const deliverySchema = new Schema({
    delivery: {
        type: String,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    from: {
        type: String,
        required: true,
    },
    to: {
        type: String,
        required: true,
    },
    distance: {
        type: String,
    },
    price: {
        type: String,
    },
    shipmentMethod: {
        type: String,
        required: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "manager",
    },
    region: {
        type: String,
        required: true,
        default: "Europe" | "Asia" | "Africa" | "America" | "National"
    },
    AcceptedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "driver",
    },
    Available: {
        type: Boolean,
        default: true
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


module.exports = mongoose.model("delivery", deliverySchema);