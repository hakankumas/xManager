const asyncHandler = require("express-async-handler");
const Content = require("../models/Content");
const User = require("../models/User");

exports.getall_content = asyncHandler(async (req, res) => {
    const contents = await Content.find().populate("user");
    if (!contents)
        return res.status(404).json({ message: "Contents not reached!" });
    res.status(200).json({ message: "Successfully!", contents });
});

exports.get_content = asyncHandler(async (req, res) => {
    const { _id } = req.params;
    const content = await Content.findById(_id).populate("user");
    if (!content)
        return res.status(500).json({ message: "Content not found!" });
    res.status(200).json({ message: "Successfully!", content });
});

exports.create_content = asyncHandler(async (req, res) => {
    const user = await User.findById(req.body.user_id);
    const content = await Content.create({
        content: req.body.content,
        user,
    });
    if (!content)
        return res.status(500).json({ message: "Content couldn't created!" });
    res.status(200).json({ message: "Successfully!", content });
});

exports.delete_content = asyncHandler(async (req, res) => {
    const { _id } = req.params;
    const content = await Content.findByIdAndDelete(_id);
    if (!content)
        return res.status(500).json({ message: "Content couldn't deleted!" });
    res.status(200).json({ message: "Successfully deleted!", content });
});

exports.update_content = asyncHandler(async (req, res) => {
    const { _id } = req.params;
    const updateFields = {};
    if (req.body.content) updateFields.content = req.body.content;
    const content = await Content.findByIdAndUpdate(_id, updateFields, {
        new: true,
    }).populate("user");
    if (!content)
        return res.status(500).json({ message: "Content couldn't updated!" });
    res.status(200).json({ message: "Successfully updated!", content });
});
