const mongoose = require('mongoose');

const OrdersSchema = new mongoose.Schema({
  orderId: {
    type: String,
    unique: true,
    required: true,
  },
  tableNo: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'preparing', 'served', 'completed', 'cancelled'],
    default: 'pending',
  },
  items: [
    {
      name: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
    },
    
  ],
  totalAmount: {
    type: Number,
    required: true,
  },
});


OrdersSchema.pre('save', function (next) {
  this.totalAmount = this.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  next();
});

const Orders = mongoose.model('Order', OrdersSchema);
module.exports = Orders;
