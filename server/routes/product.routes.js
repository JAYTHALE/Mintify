const express = require("express");
const router = express.Router();

const { createProduct, updateProduct, deleteProduct, getAllProducts, uploadProductImages, getProductById } = require("../controller/product.controller");

router.post("/add", uploadProductImages, createProduct);
router.put("/update/:id", updateProduct);
router.delete("/delete/:id", deleteProduct);
router.get("/all", getAllProducts);
router.get("/product/:id", getProductById);
module.exports = router;
