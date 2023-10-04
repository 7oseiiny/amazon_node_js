const express =require('express')
var {promisify}=require('util')
var router=express.Router()
var {saveNewUser,getAllUsers,deleteUser,getUserById,updateUser,report ,userLogin} = require('../controllers/user');
var {addNewCart} = require('../controllers/cart');
const cors = require("cors");
const multer  = require('multer');
const path = require("path");

router.use(cors());
const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null,path.join(__dirname, "../../image")); //important this is a direct path fron our current file to storage location
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });
  const upload = multer({ storage: fileStorageEngine});

// Single File Route Handler
router.post("/single", upload.single("image"), (req, res) => {
  console.log(req.file);
  res.send("Single FIle upload success");
});

router.get("/single", async (req, res) => {
    res.sendFile(path.join(__dirname, './image'));

});

router.post("/signup", async (req, res) => {
    var user = req.body

    try {

        var newuser = await saveNewUser(user)
        var newcart ={"user":newuser._id}
        await addNewCart(newcart)

        res.status(201).json({ data: newuser })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.post("/login", async (req, res) => {
    var{email,password}=req.body
    try {

      var login=await userLogin(email ,password, req)
        res.status(201).json({ data: login })
    } catch (err) {
        res.status(500).json({ message: err.message })
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


router.patch('/:sellerId/report/:userId', async (req, res) => {
    const sellerId = req.params.sellerId;
    const userId = req.params.userId;
    try {

      const newReport = await report(sellerId,userId)
      res.status(200).json({ data: newReport })
    } catch {
      res.status(404).json({ message: `${sellerId} not found` })
    }
  });



module.exports = router 