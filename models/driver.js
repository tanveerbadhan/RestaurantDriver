const mongoose = require("mongoose");

const driverSchema = mongoose.Schema(
    {
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
