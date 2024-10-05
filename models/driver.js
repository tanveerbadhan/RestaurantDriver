const mongoose = require("mongoose");

const driverSchema = mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
        },
        vehicleModel: {
            type: String,
            required: true,
        },
        color: {
            type: String,
            required: true,
        },
        licensePlate: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Driver", driverSchema);
