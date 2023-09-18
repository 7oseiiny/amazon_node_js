const Cart_model = require('../models/cart');


function getAllcarts (){
    return Cart_model.find().populate('user')
}

function getCartByUserId(userId){
    return Cart_model.findOne({user:userId}).populate('user').populate('items.product')
}

function addNewCart(cart){

    return Cart_model.create(cart)
}


async function  addNewProductsInCart (userId ,products){

    var oldCart=await getCartByUserId(userId)
    // console.log(products);
    console.log("-------------------");
    // console.log(oldCart.items);


    for (const x of products) {
        for (const y of oldCart.items) {
            if((x.product) ==y.product._id.toString() ){
                y.quantity+=x.quantity
                var newcartitems=[...oldCart.items]

            }
            else{
                var newcartitems=[...oldCart.items,...products]
            }
           
        }
    }


    return Cart_model.findOneAndUpdate({user:userId},{items:newcartitems},{new:true}).populate('user').populate('items.product')
}

async function removeProductsInCart(userId,productId ){
    var oldCart=await getCartByUserId(userId)
    console.log(oldCart);
    for (let i = 0; i < oldCart.items.length; i++) {
        if (oldCart.items[i].product == productId) {
            oldCart.items.splice(i, 1);
        }
    }
    console.log(oldCart);
    var newcartitems =[...oldCart.items]

    return Cart_model.findOneAndUpdate({user:userId},{items:newcartitems},{new:true}).populate('user')
}




 
module.exports = {getAllcarts,getCartByUserId,addNewCart,addNewProductsInCart,removeProductsInCart}