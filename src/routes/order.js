const express =require('express')
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var {promisify}=require('util')
var router=express.Router()
const userModel = require('../models/user');
const cart = require('../controllers/cart')
var {getCartByUserId} = require('../controllers/cart');


router.post("/:userId/addNewOrder", async (req, res) => {
    var userId = req.params.userId

    var cartt = await getCartByUserId(userId)
   if (cartt.items.length==0) {
    res.status(500).json({ data: "cart is empty" })

   }else{
    res.status(500).json({ data: "cart is maliana" })
    ////// start feom here
   }
    //    if


    // var newOrder = await addOrder(user)
    // res.status(201).json({ data: newOrder })
   
})

module.exports = router 