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
       
    },
    to: {
        type: String,
     
    },
    distance: {
        type: Number,
        default:0
    },
    price: {
        type: Number,
        default: 0
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