const express = require("express");
const router = express.Router();

const Order = require("../models/order");

router.get("/orderlist", async (req, res) => {
    try {
        const orderlist = await Order.find();
        return res.send(JSON.stringify(orderlist));
    } catch (error) {
        return res.send(error.message);
    }
});

module.exports = router;
