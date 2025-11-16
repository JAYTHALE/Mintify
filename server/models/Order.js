const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
        required: true
    },
    customer: {
        name: String,
        email: String,
        mobile: String,
        address: {
            house: String,
            area: String,
            city: String,
            state: String,
            pincode: String
        }
    },

    product: {
        name: String,
        brand: String,
        category: String,
        mainImage: String,
        price: Number,
        selectedVariant: {
            color: String,
            storage: String
        }
    },

    emiPlan: {
        months: Number,
        interest: Number,
        monthlyEMI: Number,
        totalPayable: Number
    },

    status: {
        type: String,
        default: "Pending"
    }

}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);
