const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static("public"));

const adminRoutes = require("./routes/admin");
const userRoutes = require("./routes/user");
const contentRoutes = require("./routes/content");

app.use("/admin", adminRoutes);
app.use("/user", userRoutes);
app.use("/content", contentRoutes);

const PORT = process.env.PORT;
const SERVER_URL = process.env.SERVER_URL;
const DATABASE = process.env.DATABASE;
mongoose
    .connect(DATABASE)
    .then(() => {
        console.log("Connected to database!");
        app.listen(PORT, () => {
            console.log(`Server is running: ${SERVER_URL}`);
        });
    })
    .catch((err) => console.log(err));
