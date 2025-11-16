const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true, },
        email: { type: String, required: true, unique: true, },
        mobile: { type: String, required: true, unique: true, },
        password: { type: String, required: true, },
        address: { house: String, area: String, city: String, state: String, pincode: String, },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Customer", customerSchema);
