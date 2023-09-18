const Order_model = require('../models/order');
var {clearCart} = require('../controllers/cart');

function addOrder(order ,userId) {
    // console.log(userId);

    return Order_model.create(order)
}
function orderDelete(id) {
    return Order_model.deleteOne({ _id: id })
}
// function updateOrder(id ,s) {
//     // return Order_model.updateOne({ _id: id })
//     return Order_model.findOneAndUpdate({ _id: id },{status:s},{new:true})

// }
function getOrderItems(id) {
    return Order_model.findOne({ _id: id }).populate('user').populate('products.product') 
}
function getOrderItemsByUserID(id) {
    return Order_model.find({ user: id }).populate('user').populate('products.product') 
}
function getAllOrders() {
    return Order_model.find().populate('user').populate('products.product')
}




module.exports = { addOrder, orderDelete, getOrderItems, getOrderItemsByUserID , getAllOrders   }