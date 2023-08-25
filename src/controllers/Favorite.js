const FavoriteModel = require("../models/Favorite");
const User_model = require("../models/user");

async function saveFavorite(favorite) {
    try {
        let newFav = FavoriteModel.create(favorite);
        let userId = favorite.userId;
        let user = await User_model.findById(userId);
        if (user) {
            user.favorite.push((await newFav)._id);
            await user.save();
        } else {
            console.log("product not found");
        }
        return newFav;
    } catch (err) {
        console.log(err);
    }
}
function getFavoriteByUserId(userId) {
    return FavoriteModel.findOne({ userId: userId }).populate("userId");
}

function getAllFavorites() {
    return FavoriteModel.find().populate("userId");
}

async function addNewProductsInFav(userId, products) {
    var oldFav = await getFavoriteByUserId(userId);
    var newFavitems = [...oldFav.productId, ...products];
    return FavoriteModel.findOneAndUpdate(
        { userId: userId },
        { productId: newFavitems },
        { new: true }
    ).populate("userId");
}

async function removeProductsInFav(userId, productId) {
    var oldFav = await getFavoriteByUserId(userId);
    console.log(oldFav);
    for (let i = 0; i < oldFav.productId.length; i++) {
        if (oldFav.productId[i] == productId) {
            oldFav.productId.splice(i, 1);
        }
    }
    console.log(oldFav);
    var newFavitems = [...oldFav.productId];

    return FavoriteModel.findOneAndUpdate(
        { userId: userId },
        { productId: newFavitems },
        { new: true }
    ).populate("userId");
}

module.exports = {
    saveFavorite,
    getAllFavorites,
    addNewProductsInFav,
    getFavoriteByUserId,
    removeProductsInFav,
};
