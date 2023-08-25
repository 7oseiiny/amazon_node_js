const express =require('express')
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var {promisify}=require('util')
var router=express.Router()
const userModel = require('../models/user');
var {getAllcarts,getCartByUserId,addNewCart,addNewProductsInCart,removeProductsInCart} = require('../controllers/cart');

const Cart = require('../models/cart'); // Adjust the path based on your project structure



router.get("/", async (req, res) => {

    try {
        var users = await getAllcarts()
        res.json({ data: users })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Get user's cart
router.get('/:userId', async (req, res) => {
    var userId = req.params.userId
console.log(userId);
    try {
        var cart = await getCartByUserId(userId)

        if (cart) {
            res.status(200).json({ data: cart })
        }
        else {
            res.status(404).json({ message: `${userId} not found` })
        }
    } catch (err) { res.status(404).json({ message: `${userId} not found` }) }

});

// create new cart for user
router.post('/:userId/newCart', async (req, res) => {
    var userId = req.params.userId
    var cart = req.body
    cart.user=userId
        try {
            var newcart = await addNewCart(cart)
            res.status(201).json({ data: newcart })
        } catch (err) {
            res.status(500).json({ message: err.message })
        }
});

// add new product in item in cart
router.post('/:userId/addProductInCart', async (req, res) => {
    var userId = req.params.userId
    var products = req.body
     try {
         var newproducts = await addNewProductsInCart(userId,products)
         res.status(201).json({ data: newproducts })
     } catch (err) {
         res.status(500).json({ message: err.message })
     }
 });
 ////////
// remove new product in item in cart
router.post('/:userId/removeProductsInCart/:productId', async (req, res) => {
    var userId = req.params.userId
    var productId = req.params.productId
    console.log(userId);
    console.log(productId);
     try {
         var newproducts = await removeProductsInCart(userId,productId)
         res.status(201).json({ data: newproducts })
     } catch (err) {
        console.log("rrrrrr");
         res.status(500).json({ message: err.message })
     }
 });
module.exports = router;


module.exports = router 