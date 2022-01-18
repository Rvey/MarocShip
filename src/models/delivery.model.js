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
        type: String,
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
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    shipmentMethod: {
        type: String,
        required: true,
        default: "car" | "truck" | "van"
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "manager",
        required: true
    },
    AcceptedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "driver",
        required: true
    },
    region: {
        type: String,
        required: true,
        default: "Europe" | "Asia" | "Africa" | "America" | "National"
    },
    createdAt: {
        type: Date,
        immutable: true,
        default: Date.now
    },
});

module.exports = mongoose.model("delivery", deliverySchema);