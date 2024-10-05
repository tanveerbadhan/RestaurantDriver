const express = require("express");
const router = express.Router();

const Driver = require("../models/driver");

router.get("/", (req, res) => {
    const email = "";
    const signUpEmail = "";
    const sendData = {
        email,
        signUpEmail,
        usernameError: false,
        passwordError: false,
        createUsernameError: false,
        confimPasswordError: false,
        fullName: "",
        vehicleModel: "",
        color: "",
        licensePlate: "",
    };
    return res.render("home", sendData);
});

router.post("/login", async (req, res) => {
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
        fullName: "",
        vehicleModel: "",
        color: "",
        licensePlate: "",
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

router.post("/signup", async (req, res) => {
    const email = req.body.loginEmail;
    const password = req.body.signUpPassword;
    const confirmPassword = req.body.signUpPasswordConfirm;
    const signUpEmail = req.body.signUpEmail;
    const fullName = req.body.fullName;
    const vehicleModel = req.body.vehicleModel;
    const color = req.body.color;
    const licensePlate = req.body.licensePlate;
    const sendData = {
        email,
        signUpEmail,
        usernameError: false,
        passwordError: false,
        createUsernameError: false,
        confimPasswordError: false,
        fullName,
        vehicleModel,
        color,
        licensePlate,
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
            fullName,
            vehicleModel,
            color,
            licensePlate,
            email: signUpEmail,
            password,
        });
        await newDriver.save();
        return res.render("home", sendData, email);
    } catch (error) {
        return res.send(error.message);
    }
});

module.exports = router;
