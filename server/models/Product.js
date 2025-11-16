const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        brand: { type: String },
        category: {
            type: String,
            required: true,
        },
        price: { type: Number, required: true },
        stock: { type: Number, default: 0 },
        variants: [
            {
                color: { type: String, required: true },

                storageOptions: [
                    {
                        storage: { type: String, required: true },
                        price: { type: Number }
                    }
                ],

                images: [String]
            }
        ],
        emiOptions: [
            {
                months: Number,
                interestRate: Number,
                emiAmount: Number
            }
        ],
        specifications: {
            type: Object,
            default: {},
        },
        description: { type: String },
        mainImage: {
            type: String,
            required: true,
        },
        galleryImages: [String],
        rating: { type: Number, default: 0 },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
