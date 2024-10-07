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

router.put("/addtodelivery", checkIfUserIsLoggedIn, async (req, res) => {
    const ids = req.body ?? [];
    try {
        const result = await Order.updateMany({ _id: { $in: ids } }, { status: "IN_TRANSIT" }, { runValidators: true });
        console.log("Update result:", result);
    } catch (error) {
        return res.send(error.message);
    }
});

module.exports = router;
