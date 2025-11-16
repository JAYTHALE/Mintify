const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const Auth = require('../models/Auth');
const { checkEmpty } = require('../utils/checkEmpty');
const Customer = require('../models/Customer');

// Register admin
exports.register = asyncHandler(async (req, res) => {
    const { name, email, mobile, password } = req.body;

    const { isError, error } = checkEmpty({ name, email, mobile, password })
    if (isError) {
        return res.status(400).json({ message: "All Fields are required", error });
    }
    if (!validator.isEmail(email)) {
        return res.status(400).json({ message: "Invalid Email" });
    }
    if (!validator.isMobilePhone(mobile.toString(), "en-IN")) {
        return res.status(400).json({ message: "Invalid Mobile Number" });
    }
    if (!validator.isStrongPassword(password)) {
        return res.status(400).json({ message: "Provide Strong Password" });
    }

    // Check if already registered
    const userExists = await Auth.findOne({ email });
    if (userExists) {
        return res.status(400).json({ message: "Email Already Registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await Auth.create({
        Name: name,
        email,
        mobile,
        password: hashedPassword,
    });

    res.status(201).json({ message: "User registered successfully", userId: newUser._id });
});
// Login with password
exports.login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and Password required" });
    }

    const user = await Auth.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    // Issue JWT token
    const token = jwt.sign(
        { userId: user._id, email: user.email },
        process.env.JWT_KEY,
        { expiresIn: '1d' }
    );

    res.cookie("Admin", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 24 * 60 * 60 * 1000,
        path: "/",
    });

    // Only send required fields in response
    const responseData = {
        Name: user.Name,
        email: user.email,
        mobile: user.mobile,
    };

    res.json({ message: "Login success", data: responseData });
});
// Logout admin
exports.logout = asyncHandler(async (req, res) => {
    res.clearCookie('authToken');
    res.json({ message: "Logout success" });
});


//register user
exports.registerCustomer = asyncHandler(async (req, res) => {
    const { name, email, mobile, password, address } = req.body;

    const { isError, error } = checkEmpty({ name, email, mobile, password })
    if (isError) {
        return res.status(400).json({ message: "All Fields are required", error });
    }

    if (!validator.isEmail(email)) {
        return res.status(400).json({ message: "Invalid Email" });
    }

    if (!validator.isMobilePhone(mobile.toString(), "en-IN")) {
        return res.status(400).json({ message: "Invalid Mobile Number" });
    }

    if (!validator.isStrongPassword(password)) {
        return res.status(400).json({ message: "Password must be strong" });
    }

    const existingUser = await Customer.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newCustomer = await Customer.create({
        name,
        email,
        mobile,
        password: hashedPassword,
        address: address || ""   // optional field
    });

    return res.status(201).json({
        message: "Customer registered successfully",
        customerId: newCustomer._id
    });
});
// // Login with password
exports.loginCustomer = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // 1️⃣ Check empty fields
    if (!email || !password) {
        return res.status(400).json({ message: "Email & Password are required" });
    }

    // 2️⃣ Validate Email
    if (!validator.isEmail(email)) {
        return res.status(400).json({ message: "Invalid Email" });
    }

    // 3️⃣ Find user
    const customer = await Customer.findOne({ email });
    if (!customer) {
        return res.status(404).json({ message: "Customer not found" });
    }

    // 4️⃣ Compare password
    const isMatch = await bcrypt.compare(password, customer.password);
    if (!isMatch) {
        return res.status(400).json({ message: "Incorrect Password" });
    }

    // 5️⃣ Generate JWT Token
    const token = jwt.sign(
        { id: customer._id },
        process.env.JWT_KEY,
        { expiresIn: "7d" }
    );
    res.cookie("Cutomer", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 24 * 60 * 60 * 1000,
        path: "/",
    });
    // 6️⃣ Send Response
    res.status(200).json({
        message: "Login Successful",
        customer: {
            id: customer._id,
            name: customer.name,
            email: customer.email,
            mobile: customer.mobile,
        }
    });
});
// // Logout user
exports.logoutCustomer = asyncHandler(async (req, res) => {
    res.clearCookie('Cutomer');
    res.json({ message: "Logout success" });
});





