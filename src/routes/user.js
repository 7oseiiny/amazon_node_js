const express =require('express')
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var {promisify}=require('util')
var router=express.Router()
const userModel = require('../models/user');
var {saveNewUser,getAllUsers,deleteUser,getUserById,updateUser} = require('../controllers/user');


router.post("/signup", async (req, res) => {
    var user = req.body
    try {

        var newuser = await saveNewUser(user)
        res.status(201).json({ data: newuser })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.post("/login", async (req, res) => {
    var{email,password}=req.body

    if (!email||!password) {
        res.send({message:'pls provide email and pass'})
    }
    else{
        var user =await userModel.findOne({email:email})
        if (!user) {
            res.send({message:'invalid email or pass'})
        }
        else{
            var isvalid =await bcrypt.compare(password,user.password)
            if (!isvalid) {
                res.send({message:'wrong pass'})
            }
            else{
                var token = jwt.sign({userID:user.id,name:user.username},process.env.SECRET)
                // var decoded= await promisify(jwt.verify) (token,process.env.SECRET)
                // console.log(decoded);
                console.log(req.headers.authorization);
                req.headers.authorization=token
                console.log(req.headers.authorization);
                res.send({token:token,status:'success'+process.env.SECRET})

            }
        }
    }
})


router.get("/", async (req, res) => {

    try {
        var users = await getAllUsers()
        res.json({ data: users })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})


router.get("/:id", async (req, res) => {

    var id = req.params.id
    console.log(req.params);

    try {
        var user = await getUserById(id)

        if (user) {
            res.status(200).json({ data: user })
        }
        else {
            res.status(404).json({ message: `${id} not found` })
        }
    } catch (err) { res.status(404).json({ message: `${id} not found` }) }
})


router.patch("/:id",async (req, res) => {
    var user = req.body
    const id = (req.params.id)
    updatedat= Date.now()

    try{
        var user = await updateUser(id, user)

    res.status(200).json({ data: user })
    }catch{
        res.status(404).json({ message: `${id} not found` })
    }

})


router.delete("/:id", async(req, res) => {

    var id = req.params.id

    try {
        var user = await deleteUser(id)

        if (user) {
            res.status(200).json({ data: user })
        }
        else {
            res.status(404).json({ message: `${id} not found` })
        }
    } catch (err) { res.status(404).json({ message: `${id} not found` }) }
})



module.exports = router 