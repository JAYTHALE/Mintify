const router = require("express").Router();
const { placeOrder, getAllOrders, getCustomerOrders } = require("../controller/order.controller");
const { userProtected } = require("../middleware/Userprotected");

router.post("/place", placeOrder);

router.get("/orders", getAllOrders);

router.get("/yourorder", userProtected, getCustomerOrders);

module.exports = router;
