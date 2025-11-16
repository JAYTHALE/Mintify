const express = require("express");
const router = express.Router();
const { getAllCustomers } = require("../controller/customer.controller");

// GET all customers - Admin only
router.get("/customers", getAllCustomers);

module.exports = router;
