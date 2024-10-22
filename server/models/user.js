const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
    {
        email: {
            type: String,
            required: [true, "Please enter email!"],
        },
        username: {
            type: String,
            required: [true, "Please enter username!"],
        },
        password: {
            type: String,
            required: [true, "Please enter password!"],
        },
        pp_path: {
            type: String,
            default: null,
        },
        telephone: {
            type: Number,
            default: null,
        },
        aboutme: {
            type: String,
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
