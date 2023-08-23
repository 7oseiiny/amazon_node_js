const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
},
{timestamps:true}
);

const Category_model = mongoose.model('Category', categorySchema);

module.exports = Category_model;
