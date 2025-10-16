const EMP = require("../models/empDetails");
const Inventory = require("../models/inventory");
const Orders = require("../models/orderDetails");

async function GetEmpDetails(req, res) {
  try {
    const details = await EMP.find();
    res.json(details);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function GetInvenDetails(req, res) {
  try {
    const details = await Inventory.find();
    res.json(details);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function GetOrderDetails(req, res) {
  try {
    const details = await Orders.find();
    res.json(details);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function PlaceOrder(req, res) {}
async function POSTRoute(req, res) {
  try {
    const { items, tableNo, status, orderId } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ msg: "No items were ordered" });
    }
    if (!orderId) {
      return res
        .status(400)
        .json({ msg: "No order can be placed without order ID" });
    }
    if (!tableNo) {
      return res.status(400).json({ msg: "No table number provided" });
    }
    if (!status) {
      return res.status(400).json({ msg: "Order status is required" });
    }
    const totalAmount = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    if (totalAmount <= 0) {
      return res
        .status(400)
        .json({ msg: "Total amount must be greater than 0" });
    }

    const newOrder = new Orders({
      orderId,
      tableNo,
      status,
      items,
      totalAmount,
    });

    await newOrder.save();

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order: newOrder,
    });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = { POSTRoute };

module.exports = {
  GetEmpDetails,
  GetInvenDetails,
  GetOrderDetails,
  POSTRoute,
};
