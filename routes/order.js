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
        const orderList = await Order.find({ status: "READY_FOR_DELIVERY" });
        return res.render("openOrders", { orderList, name: req.session.loggedInUser });
    } catch (error) {
        return res.send(error.message);
    }
});

router.put("/addtodelivery", checkIfUserIsLoggedIn, async (req, res) => {
    const ids = req.body ?? [];
    try {
        await Order.updateMany({ _id: { $in: ids } }, { status: "IN_TRANSIT" }, { runValidators: true });
        return res.send("Added to delivery");
    } catch (error) {
        return res.send(error.message);
    }
});

router.get("/delivery", async (req, res) => {
    try {
        const orderList = await Order.find({ status: "IN_TRANSIT" });
        const deliveredList = await Order.find({ status: "DELIVERED" });
        return res.render("delivery", { orderList, deliveredList, name: req.session.loggedInUser });
    } catch (error) {
        return res.send(error.message);
    }
});

router.put("/deliver", checkIfUserIsLoggedIn, async (req, res) => {
    const id = req.body.deliverId;
    try {
        await Order.updateOne({ _id: id }, { status: "DELIVERED" }, { runValidators: true });
        return res.send("Added to delivery");
    } catch (error) {
        return res.send(error.message);
    }
});

module.exports = router;
