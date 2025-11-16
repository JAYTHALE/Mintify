const jwt = require("jsonwebtoken");

exports.userProtected = (req, res, next) => {
    const { Cutomer } = req.cookies;

    if (!Cutomer) {
        return res.status(401).json({ message: "No Cookie Found" });
    }

    jwt.verify(Cutomer, process.env.JWT_KEY, (error, decode) => {
        if (error) {
            console.log(error);
            return res.status(401).json({ message: "Invalid Token" });
        }

        // Assign the logged-in user id to req.user
        req.user = { _id: decode.id };
        next(); // move next only after verification
    });
};
