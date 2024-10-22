const mongoose = require("mongoose");

const AdminSchema = mongoose.Schema(
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
        role: {
            type: String,
            enum: ["superadmin", "admin"],
            default: "admin",
        },
    },
    {
        timestamps: true,
    }
);

const Admin = mongoose.model("Admin", AdminSchema);
module.exports = Admin;
