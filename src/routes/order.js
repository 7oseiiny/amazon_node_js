const express = require('express')
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var { promisify } = require('util')
var router = express.Router()
const userModel = require('../models/user');
const cart = require('../controllers/cart')
var { getCartByUserId } = require('../controllers/cart');
var { orderDelete, addOrder, getOrderItems,getOrderItemsByUserID,getAllOrders } = require("../controllers/order")


// router.post("/:userId/addNewOrder", async (req, res) => {
//     var userId = req.params.userId

//     var cartt = await getCartByUserId(userId)
//    if (cartt.items.length==0) {
//     res.status(500).json({ data:"card is  empty" })

//    }else{
//     res.status(201).json({ data:cartt})

//    }

// })

router.post("/:userId/addNewOrder", async (req, res) => {
    var cartt = await addOrder(req.body)
    if (cartt.products.length == 0) {
        res.status(500).json({ data: "card is  empty" })

    } else {
        res.status(200).json({ data: cartt })

    }

})
router.delete("/:orderId", async (req, res) => {
    var { orderId } = req.params
    try {
        var order = await orderDelete(orderId);
        if(order.deletedCount > 0){
            res.status(200).json({ data: true })
        }else{
            throw new Error("not found")
        }
    } catch (err) {
        if(err.message === "not found"){
            res.status(404).json({message: "Order not found, make sure of the correct id", deleted: false})
        }else{
            res.status(500).json({ message: err })
        }

    }


})
router.get("/:orderId", async (req, res) => {
    var id = req.params.orderId
    try {
        var order = await getOrderItems(id);
        var lang = req.headers.localization
        if(lang === "en"){
            let productsT = order.products.map(prd=>{ 
                return {
                    id: prd._id,
                    title: prd.title_en,
                    description: prd.description_en,
                }
            })
        }
        if (order) {
            res.status(200).json({ data: order })
        } else {
            res.status(404).json({ data: "not found" })
        }
    } catch (err) {
        res.status(500).json({ massage: "id not  found" })
    }
});

router.get("/", async (req, res) => {

    try {
        var orders = await getAllOrders()
        res.json({ data: orders })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})
router.get("/getByUserId/:userId", async (req, res) => {
    const userID = req.params.userId;
    try {
        var orders = await getOrderItemsByUserID(userID);
        res.status(200).json({data: orders})

    }catch(error){
        res.status(500).json({message: error})
    }
})

module.exports = router 