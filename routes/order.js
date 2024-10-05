const express = require("express");
const router = express.Router();

const Order = require("../models/order");

const checkIfUserIsLoggedIn = (req, res, next) => {
    if (req.session.hasOwnProperty("loggedInUser") === true) {
        next();
    } else {
        return res.redirect("/");
    }
};

router.get("/orderlist", checkIfUserIsLoggedIn, async (req, res) => {
    try {
        const orderList = await Order.find();
        return res.render("openOrders", { orderList, name: req.session.loggedInUser });
    } catch (error) {
        return res.send(error.message);
    }
});

module.exports = router;
