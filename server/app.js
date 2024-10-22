const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static("public"));

// const userRoutes = require("./routes/user");
// const postRoutes = require("./routes/post");
// const topicRoutes = require("./routes/topic");

// app.use("/user", userRoutes);
// app.use("/post", postRoutes);
// app.use("/topic", topicRoutes);

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
