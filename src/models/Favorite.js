const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  productId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    }
  ],

},
{timestamps:true}
);

const FavoriteModel = mongoose.model('Favorite', favoriteSchema);

module.exports = FavoriteModel;