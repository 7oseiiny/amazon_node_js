const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  price: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    enum: ['Electronics', 'Clothing', 'Books', 'Other']
  },
  quantity:{
    type :Number 
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Product_model = mongoose.model('Product', productSchema);

module.exports = Product_model;
