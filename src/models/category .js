const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  products:
  [
    {type: mongoose.SchemaTypes.ObjectId, ref: 'product',},
  ]

}, {
  timestamps: true
}

);

const categoryModel = mongoose.model('category', categorySchema);

module.exports = categoryModel;
