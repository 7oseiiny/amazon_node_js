const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  img: {
    type: String,
    required: true,
  },
  price: {
    old: Number,
    new:{
      type:Number,
      required:true
    },
    discount: Number,
    shipping: Number,
  },
  info: {
    type: Object,
  },
  aboutItem: {
    type: Array,
    required:true,
  },
  categoryId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Category',
  },

},
{timestamps:true}
);
const productModel=mongoose.model("product",productSchema)
module.exports =productModel;