const express = require('express');
const router = express.Router();
const { register, login, logout, registerCustomer, loginCustomer, logoutCustomer } = require('../controller/auth.controller');

// admin routes
router.post('/admin/register', register);
router.post('/admin/login', login);
router.post('/admin/logout', logout);

// // User routes
router.post('/user/register', registerCustomer);
router.post('/user/login', loginCustomer);
router.post('/user/logout', logoutCustomer);

module.exports = router;