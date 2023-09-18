const mongoose = require('mongoose');

const subcategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'category',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const SubcategoryModel = mongoose.model('subcategory', subcategorySchema);

module.exports = SubcategoryModel;
