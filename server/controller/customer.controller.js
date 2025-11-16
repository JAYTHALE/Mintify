const Customer = require("../models/Customer");


exports.getAllCustomers = async (req, res) => {
    try {

        const customers = await Customer.find().sort({ createdAt: -1 });

        return res.status(200).json({
            message: "Customers fetched successfully",
            totalCustomers: customers.length,
            customers
        });
    } catch (err) {
        console.error("Get All Customers Error:", err);
        return res.status(500).json({ message: "Internal Server Error", err });
    }
};