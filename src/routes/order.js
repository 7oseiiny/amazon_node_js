const express =require('express')
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var {promisify}=require('util')
var router=express.Router()
const userModel = require('../models/user');
const cart = require('../controllers/cart')
var {getAllcarts} = require('../controllers/cart');


router.post("/addNewOrder", async (req, res) => {
    var cartt = await getAllcarts()
    // console.log(cartt);
   if (cartt.length==0) {
    res.status(500).json({ data: "cart is empty" })

   }else{
    console.log("maliana");  ////// start feom here
   }
    //    if


    // var newOrder = await addOrder(user)
    // res.status(201).json({ data: newOrder })
   
})

module.exports = router 