const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title_en: {
    type: String,
    required: true
  },
  title_ar: {
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
  info_en: {
    type: Object,
  },
  info_ar: {
    type: Object,
  },
  aboutItem_en: {
    type: Array,
    required: false,
  },
  aboutItem_ar: {
    type: Array,
    required: false,
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