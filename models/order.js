const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
    {
        customerName: {
            type: String,
            required: true,
        },
        deliveryAddress: {
            type: String,
            required: true,
        },
        itemsOrdered: [
            {
                type: String,
                required: true,
            },
        ],
        date: {
            type: Date,
            required: true,
        },
        status: {
            type: String,
            enum: ["READY_FOR_DELIVERY", "IN_TRANSIT", "DELIVERED"],
            required: true,
            default: "READY_FOR_DELIVERY",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
