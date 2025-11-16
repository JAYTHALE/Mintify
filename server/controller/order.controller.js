const Customer = require("../models/Customer");
const Order = require("../models/Order");
const Product = require("../models/Product");
//order
exports.placeOrder = async (req, res) => {
    try {
        const { customerId, productId, emiId, color, storage } = req.body;

        if (!customerId || !productId || !emiId || !color || !storage) {
            return res.status(400).json({ message: "All fields required" });
        }

        const customer = await Customer.findById(customerId);
        if (!customer) return res.status(404).json({ message: "Customer not found" });

        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ message: "Product not found" });

        const variant = product.variants.find(v => v.color === color);
        if (!variant) return res.status(404).json({ message: "Color variant not found" });

        const storageOption = variant.storageOptions.find(s => s.storage === storage);
        if (!storageOption)
            return res.status(404).json({ message: "Storage variant not found" });

        const emiPlan = product.emiOptions.find(e => e._id.toString() === emiId);
        if (!emiPlan)
            return res.status(404).json({ message: "EMI option not found" });

        const order = await Order.create({
            customerId: customer._id,
            customer: {
                name: customer.name,
                email: customer.email,
                mobile: customer.mobile,
                address: customer.address || {}
            },
            product: {
                name: product.name,
                brand: product.brand,
                category: product.category,
                mainImage: product.mainImage,
                price: storageOption.price,
                selectedVariant: {
                    color,
                    storage
                }
            },
            emiPlan: {
                months: emiPlan.months,
                interest: emiPlan.interestRate,
                monthlyEMI: emiPlan.emiAmount,
                totalPayable: emiPlan.emiAmount * emiPlan.months
            },
            status: "Pending"
        });

        return res.status(201).json({
            message: "Order placed successfully",
            order
        });

    } catch (err) {
        console.error("Order Error:", err);
        return res.status(500).json({ message: "Internal Server Error", err });
    }
};

exports.getAllOrders = async (req, res) => {
    try {
        let { page = 1, limit = 20 } = req.query;

        page = parseInt(page);
        limit = parseInt(limit);

        const skip = (page - 1) * limit;

        // Fetch all orders with pagination
        const orders = await Order.find()
            .sort({ createdAt: -1 }) // latest first
            .skip(skip)
            .limit(limit);

        const totalOrders = await Order.countDocuments();

        return res.status(200).json({
            message: "Orders fetched successfully",
            page,
            limit,
            totalOrders,
            totalPages: Math.ceil(totalOrders / limit),
            orders,
        });

    } catch (error) {
        console.log("Get Orders Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.getCustomerOrders = async (req, res) => {
    try {
        const customerId = req.user._id; // auth middleware पासून येते

        if (!customerId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        // Fetch orders for this customer
        const orders = await Order.find({ customerId }).sort({ createdAt: -1 });

        return res.status(200).json({
            message: "Orders fetched successfully",
            orders
        });

    } catch (err) {
        console.error("Get Orders Error:", err);
        return res.status(500).json({ message: "Internal Server Error", err });
    }
};
