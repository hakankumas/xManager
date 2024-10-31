const mongoose = require("mongoose");

const ContentSchema = mongoose.Schema(
    {
        content: {
            type: String,
            required: [true, "Please enter content!"],
        },
        user: {
            required: [true, "Please enter user!"],
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    },
    {
        timestamps: true,
    }
);

const Content = mongoose.model("Content", ContentSchema);
module.exports = Content;
