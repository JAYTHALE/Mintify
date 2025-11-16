const Product = require("../models/Product");
const { cloudinary } = require("../utils/cloudinary.config");
const multer = require("multer");

// Create Product
// EMI CALCULATION UTILITY
function calculateEMI(principal, annualRate, tenureMonths) {
    const r = annualRate / 12 / 100;

    // 🔥 ZERO interest — avoid division by zero
    if (r === 0) {
        return (principal / tenureMonths).toFixed(2);
    }

    // Normal EMI formula
    return (
        (principal * r * Math.pow(1 + r, tenureMonths)) /
        (Math.pow(1 + r, tenureMonths) - 1)
    ).toFixed(2);
}
function generateEMIOptions(price) {
    price = Number(price); // ensure price is always numeric

    const plans = [
        { months: 3, interest: 0 },   // 🔥 ZERO interest
        { months: 6, interest: 12 },
        { months: 12, interest: 12 },
        { months: 24, interest: 12 }
    ];

    return plans.map(p => {
        const emiAmount = calculateEMI(price, p.interest, p.months);
        return {
            months: p.months,
            interestRate: p.interest,
            emiAmount: Number(emiAmount) // convert string → number
        };
    });
}

const storage = multer.memoryStorage();
const upload = multer({ storage }).any();
exports.uploadProductImages = upload;
exports.createProduct = async (req, res) => {
    try {
        const { name, brand, category, price, stock, variants, specifications, description } = req.body;

        if (!name || !category || !price) {
            return res.status(400).json({
                message: "Name, Category & Price are required",
            });
        }

        // ---------------------------------
        // 1️⃣ PRICE MUST BE NUMBER → FIX
        // ---------------------------------
        const productPrice = Number(price);

        if (!productPrice || isNaN(productPrice)) {
            return res.status(400).json({ message: "Invalid Product Price" });
        }

        // ---------------------------------
        // 2️⃣ MAIN IMAGE
        // ---------------------------------
        let mainImageUrl = "";
        if (req.files) {
            const mainImg = req.files.find(f => f.fieldname === "mainImage");
            if (mainImg) {
                mainImageUrl = await new Promise((resolve, reject) => {
                    cloudinary.uploader.upload_stream(
                        { folder: "ecommerce/products/main" },
                        (error, result) => error ? reject(error) : resolve(result.secure_url)
                    ).end(mainImg.buffer);
                });
            }
        }

        if (!mainImageUrl) {
            return res.status(400).json({ message: "Main Image is required" });
        }

        // ---------------------------------
        // 3️⃣ GALLERY IMAGES
        // ---------------------------------
        let galleryImageUrls = [];
        const galleryFiles = req.files.filter(f => f.fieldname === "galleryImages");

        for (const img of galleryFiles) {
            const uploaded = await new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream(
                    { folder: "ecommerce/products/gallery" },
                    (error, result) => error ? reject(error) : resolve(result.secure_url)
                ).end(img.buffer);
            });
            galleryImageUrls.push(uploaded);
        }

        // ---------------------------------
        // 4️⃣ VARIANT IMAGES
        // ---------------------------------
        let parsedVariants = variants ? JSON.parse(variants) : [];

        for (let v of parsedVariants) {
            let variantImages = [];
            const fieldName = v.imagesFieldName;

            if (fieldName) {
                const files = req.files.filter(f => f.fieldname === fieldName);

                for (const img of files) {
                    const uploaded = await new Promise((resolve, reject) => {
                        cloudinary.uploader.upload_stream(
                            { folder: `ecommerce/products/variants/${v.color}` },
                            (error, result) => error ? reject(error) : resolve(result.secure_url)
                        ).end(img.buffer);
                    });
                    variantImages.push(uploaded);
                }
            }

            v.images = variantImages;
        }

        // ---------------------------------
        // 5️⃣ 🔥 AUTO-GENERATE EMI OPTIONS (FIXED)
        // ---------------------------------
        const emiOptions = generateEMIOptions(productPrice);

        // ---------------------------------
        // 6️⃣ SAVE PRODUCT
        // ---------------------------------
        const product = await Product.create({
            name,
            brand,
            category,
            price: productPrice,
            stock: stock || 0,
            variants: parsedVariants,
            specifications: specifications ? JSON.parse(specifications) : {},
            description,
            mainImage: mainImageUrl,
            galleryImages: galleryImageUrls,
            emiOptions: emiOptions, // 👈 FINAL ADD
        });

        res.status(201).json({
            message: "Product created successfully",
            product
        });

    } catch (error) {
        console.error("Product Add Error:", error);
        res.status(500).json({ message: "Internal Server Error", error });
    }
};



//Updated Product
exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;

        // Find existing product
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        // Update allowed fields dynamically
        const updatableFields = [
            "name",
            "brand",
            "category",
            "price",
            "stock",
            "variants",
            "specifications",
            "description",
            "mainImage",
            "galleryImages"
        ];

        updatableFields.forEach((field) => {
            if (req.body[field] !== undefined) {
                product[field] = req.body[field];
            }
        });

        // Save updated product
        await product.save();

        res.status(200).json({
            message: "Product updated successfully",
            product
        });

    } catch (error) {
        console.error("Product Update Error:", error);
        res.status(500).json({ message: "Internal Server Error", error });
    }
};
// Delete Product
exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        await Product.findByIdAndDelete(id);

        res.status(200).json({
            message: "Product deleted successfully"
        });

    } catch (error) {
        console.error("Delete Product Error:", error);
        res.status(500).json({
            message: "Internal Server Error",
            error
        });
    }
};

// Get Single Product by ID
exports.getProductById = async (req, res) => {
    try {
        const { id } = req.params;

        // Find product by ID
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.status(200).json({
            message: "Product fetched successfully",
            product
        });

    } catch (error) {
        console.error("Get Product By ID Error:", error);
        res.status(500).json({
            message: "Internal Server Error",
            error
        });
    }
};


//Get AllProduct
exports.getAllProducts = async (req, res) => {
    try {
        // Pagination
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 20;
        const skip = (page - 1) * limit;

        // Filters
        const filter = {};

        if (req.query.category) {
            filter.category = req.query.category;
        }

        if (req.query.brand) {
            filter.brand = req.query.brand;
        }

        // Price Range
        if (req.query.minPrice || req.query.maxPrice) {
            filter.price = {};
            if (req.query.minPrice) filter.price.$gte = Number(req.query.minPrice);
            if (req.query.maxPrice) filter.price.$lte = Number(req.query.maxPrice);
        }

        // Search
        if (req.query.search) {
            filter.name = { $regex: req.query.search, $options: "i" };
        }

        // Sorting (price / newest / oldest)
        const sort = {};
        if (req.query.sortBy === "priceAsc") sort.price = 1;
        if (req.query.sortBy === "priceDesc") sort.price = -1;
        if (req.query.sortBy === "new") sort.createdAt = -1;
        if (req.query.sortBy === "old") sort.createdAt = 1;

        // Fetch Products
        const products = await Product.find(filter)
            .sort(sort)
            .skip(skip)
            .limit(limit);

        const totalProducts = await Product.countDocuments(filter);

        res.status(200).json({
            totalProducts,
            currentPage: page,
            totalPages: Math.ceil(totalProducts / limit),
            products
        });

    } catch (error) {
        console.error("Get All Products Error:", error);
        res.status(500).json({
            message: "Internal Server Error",
            error
        });
    }
};

