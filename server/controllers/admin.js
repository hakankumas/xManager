const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admin = require("./models/Admin");

exports.register = asyncHandler(async (req, res) => {
    const { email, username, password } = req.body;
    const query_email = await Admin.findOne({ email });
    if (query_email)
        return res.status(500).json({ message: "This email already exists!" });
    const query_username = await Admin.findOne({ username });
    if (query_username)
        return res
            .status(500)
            .json({ message: "This username already exists!" });
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = await Admin.create({
        email,
        username,
        password: hashedPassword,
        role: "superadmin",
    });
    if (!admin) return res.status(500).json({ message: "Failed!" });
    res.status(200).json({ message: "Successfully!", admin });
});

exports.login = asyncHandler(async (req, res) => {
    res.send("login");
});

exports.getadmin = asyncHandler(async (req, res) => {
    res.send("getadmin");
});

exports.getalladmin = asyncHandler(async (req, res) => {
    res.send("getalladmin");
});
