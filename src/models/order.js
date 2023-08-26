const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'product',
    required: true
  }],
  //   totalAmount: {
  //     type: Number,
  //     required: true,
  //     min: 0
  //   },
  //   shippingAddress: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: 'User'
  //   },
  // //   paymentStatus: {
  // //     type: String,
  // //     enum: ['Pending', 'Paid'],
  // //     default: 'Pending'
  //   },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Order_model = mongoose.model('Order', orderSchema);

module.exports = Order_model;
