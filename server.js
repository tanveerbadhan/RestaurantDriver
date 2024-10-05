const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const Driver = require("./models/driver");

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
    const sendErrorData = {
        usernameError: false,
        passwordError: false,
        confimPasswordError: false,
    };
    return res.render("home", sendErrorData);
});

app.post("/login", async (req, res) => {
    const sendErrorData = {
        usernameError: true,
        passwordError: false,
        confimPasswordError: false,
    };
    const email = req.body.loginEmail;
    const password = req.body.loginPassword;

    const driver = await Driver.find({ email });

    if (driver.length === 0) {
        return res.render("home", sendErrorData);
    }

    const driverWithPass = await Driver.find({ email, password });

    if (driverWithPass.length === 0) {
        sendErrorData.usernameError = false;
        sendErrorData.passwordError = true;
        return res.render("home", sendErrorData);
    }

    sendErrorData.usernameError = false;
    sendErrorData.passwordError = false;

    try {
        return res.render("home", sendErrorData);
    } catch (error) {
        return res.send(error.message);
    }
});

app.post("/signup", async (req, res) => {
    const sendErrorData = {
        usernameError: false,
        confimPasswordError: false,
        confimPasswordError: false,
    };

    const email = req.body.signUpEmail;
    const password = req.body.signUpPassword;
    const confirmPassword = req.body.signUpPasswordConfirm;

    if (password !== confirmPassword) {
        sendErrorData.confimPasswordError = true;
        return res.render("home", sendErrorData);
    }

    sendErrorData.confimPasswordError = false;

    try {
        const newDriver = new Driver({
            email,
            password,
        });
        await newDriver.save();
        return res.render("home", sendErrorData);
    } catch (error) {
        return res.send(error.message);
    }
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
