const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.getall_user = asyncHandler(async (req, res) => {
    const user = await User.find();
    if (!user) return res.status(404).json({ message: "Users not reached!" });
    res.status(200).json({ message: "Successfully!", user });
});

exports.get_user = asyncHandler(async (req, res) => {
    const { _id } = req.params;
    const user = await User.findById(_id);
    if (!user) return res.status(404).json({ message: "User not found!" });
    res.status(200).json({ message: "Successfully!", user });
});

exports.create_user = asyncHandler(async (req, res) => {
    const { email, username, password } = req.body;
    const query_email = await User.findOne({ email });
    if (query_email)
        return res.status(500).json({ message: "This email already exists!" });
    const query_username = await User.findOne({ username });
    if (query_username)
        return res
            .status(500)
            .json({ message: "This username already exists!" });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        email,
        username,
        password: hashedPassword,
    });
    if (!user)
        return res.status(500).json({ message: "User couldn't created!" });
    res.status(200).json({ message: "Successfully created!", user });
});

exports.delete_user = asyncHandler(async (req, res) => {
    const { _id } = req.params;
    const user = await User.findByIdAndDelete(_id);
    if (!user)
        return res.status(404).json({ message: "User couldn't deleted!" });
    res.status(200).json({ message: "Successfully deleted!", user });
});

exports.update_user = asyncHandler(async (req, res) => {
    const { _id } = req.params;
    const { email, username, password } = req.body;
    const query_email = await User.findOne({ email });
    if (query_email)
        return res.status(500).json({ message: "This email already exists!" });
    const query_username = await User.findOne({ username });
    if (query_username)
        return res
            .status(500)
            .json({ message: "This username already exists!" });
    const forPassword = await User.findById(_id);
    const control_password = await bcrypt.compare(
        password,
        forPassword.password
    );
    if (control_password)
        return res
            .status(500)
            .json({ message: "This password already exists!" });
    const updateFields = {};
    if (email) updateFields.email = email;
    if (username) updateFields.username = username;
    if (password) {
        updateFields.password = await bcrypt.hash(password, 10);
    }
    const user = await User.findByIdAndUpdate(_id, updateFields, {
        new: true,
    });
    if (!user)
        return res.status(500).json({ message: "User couldn't updated!" });
    res.status(200).json({ message: "Successfully updated!", user });
});
