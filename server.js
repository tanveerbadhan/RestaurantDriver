const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const Driver = require("./models/driver");

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
    const email = "";
    const signUpEmail = "";
    const sendData = {
        email,
        signUpEmail,
        usernameError: false,
        passwordError: false,
        createUsernameError: false,
        confimPasswordError: false,
    };
    return res.render("home", sendData);
});

app.post("/login", async (req, res) => {
    const email = req.body.loginEmail;
    const password = req.body.loginPassword;
    const signUpEmail = req.body.signUpEmail;
    const sendData = {
        email,
        signUpEmail,
        usernameError: false,
        passwordError: false,
        createUsernameError: false,
        confimPasswordError: false,
    };

    const driver = await Driver.find({ email });

    if (driver.length === 0) {
        sendData.usernameError = true;
        return res.render("home", sendData);
    }

    const driverWithPass = await Driver.find({ email, password });

    if (driverWithPass.length === 0) {
        sendData.usernameError = false;
        sendData.passwordError = true;
        return res.render("home", sendData);
    }

    try {
        return res.render("home", sendData);
    } catch (error) {
        return res.send(error.message);
    }
});

app.post("/signup", async (req, res) => {
    const email = req.body.loginEmail;
    const password = req.body.signUpPassword;
    const confirmPassword = req.body.signUpPasswordConfirm;
    const signUpEmail = req.body.signUpEmail;
    const sendData = {
        email,
        signUpEmail,
        usernameError: false,
        passwordError: false,
        createUsernameError: false,
        confimPasswordError: false,
    };

    try {
        const driver = await Driver.find({ email: signUpEmail });

        if (driver.length) {
            sendData.createUsernameError = true;
            return res.render("home", sendData);
        }

        if (password !== confirmPassword) {
            sendData.createUsernameError = false;
            sendData.confimPasswordError = true;
            return res.render("home", sendData);
        }

        const newDriver = new Driver({
            email: signUpEmail,
            password,
        });
        await newDriver.save();
        return res.render("home", sendData, email);
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
