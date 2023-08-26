const Order_model = require('../models/order');

function addOrder(body) {
    return Order_model.create(body)
}
function orderDelete(id) {
    return Order_model.deleteOne({ _id: id })
}
function getOrderItems(id) {
    return Order_model.findOne({ _id: id })
}
function getOrderItemsByUserID(id) {
    return Order_model.find({ user: id })
}



module.exports = { addOrder, orderDelete, getOrderItems, getOrderItemsByUserID }