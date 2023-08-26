const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'product',
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
    comment:{
      type:String
    } 
  },
{timestamps:true}
);

const ReviewModel = mongoose.model('Review', reviewSchema);

module.exports = ReviewModel;
