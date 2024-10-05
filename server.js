const express = require("express");
const mongoose = require("mongoose");
const auth = require("./routes/auth");
const order = require("./routes/order");
require("dotenv").config();

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// setup sessions
const session = require("express-session");
app.use(
    session({
        secret: "the quick brown fox jumped over the lazy dog 1234567890", // random string, used for configuring the session
        resave: false,
        saveUninitialized: true,
    })
);

app.use("/", auth);
app.use("/", order);

const initServer = async () => {
    console.log("Listing on Port", process.env.PORT);
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Successfully connected to MongoDB server");
    } catch (error) {
        console.log(error.message);
    }
};

app.listen(process.env.PORT, initServer);
