const Cart_model = require('../models/cart');


function getAllcarts (){
    return Cart_model.find().populate('user')
}

function getCartByUserId(userId){
    return Cart_model.findOne({user:userId}).populate('user')
}

function addNewCart(cart){

    return Cart_model.create(cart)
}


async function  addNewProductsInCart (userId ,products){
    var oldCart=await getCartByUserId(userId)
    var newcartitems=[...oldCart.items,...products]
    return Cart_model.findOneAndUpdate({user:userId},{items:newcartitems},{new:true}).populate('user')
}
async function removeProductsInCart(userId,productId ){
    var oldCart=await getCartByUserId(userId)
    console.log(oldCart);
    for (let i = 0; i < oldCart.items.length; i++) {
        if (oldCart.items[i].product === productId) {
            oldCart.items.splice(i, 1);
        }
    }
    console.log(oldCart);
    var newcartitems =[...oldCart.items]

    return Cart_model.findOneAndUpdate({user:userId},{items:newcartitems},{new:true}).populate('user')
}




 
module.exports = {getAllcarts,getCartByUserId,addNewCart,addNewProductsInCart,removeProductsInCart}