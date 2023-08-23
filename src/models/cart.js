const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    // type: String,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  }
});

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique:true
  },
  items: [cartItemSchema],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Cart_model = mongoose.model('Cart', cartSchema);

module.exports = Cart_model;
