const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
    return res.render("home");
});

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
