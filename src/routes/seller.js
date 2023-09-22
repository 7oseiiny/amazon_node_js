const express = require('express')
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var router = express.Router()
const sellerModel = require('../models/seller');
var { saveNewSeller, getAllUSellers, deleteSeller, getSellerById, updateSeller,updatestatus ,report } = require('../controllers/seller');



// Create a new seller
router.post('/signup', async (req, res) => {
  const seller = req.body;
  try {
    var newSeller = await saveNewSeller(seller)
    res.status(201).json({ data: 'Seller created', newSeller });
  } catch (err) {
    res.status(500).json({ message: err.message })
  }

});

router.post("/login", async (req, res) => {
  var { email, password } = req.body

  if (!email || !password) {
    res.send({ message: 'pls provide email and pass' })
  }
  else {
    var seller = await sellerModel.findOne({ email: email })
    if (!seller) {
      res.send({ message: 'invalid email or pass' })
    }
    else {
      var isvalid = await bcrypt.compare(password, seller.password)
      if (!isvalid) {
        res.send({ message: 'wrong pass' })
      }
      else {
        var token = jwt.sign({ sellerID: seller.id, name: seller.username }, process.env.SECRET)
        req.headers.authorization = token
        // console.log(req.headers.authorization);
        res.send({ token: token, status: 'success' + process.env.SECRET })

      }
    }
  }
})

// Read all sellers
router.get('/', async (req, res) => {

  try {
    var sellers = await getAllUSellers()
    res.status(200).json({ data: sellers });
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
});

// Read a specific seller by ID
router.get('/:id', async (req, res) => {
  const sellerId = req.params.id;
  try {
    var seller = await getSellerById(sellerId)
    if (!seller) {
      res.status(404).json({ message: 'Seller not found' });
    } else {
      res.status(200).json({ data: seller })
    }
  }
  catch (err) {
    res.status(404).json({ message: `${id} not found` })
  }
});

// Update a seller by ID
router.patch('/:id', async (req, res) => {
  const sellerId = req.params.id;
  const updatedSeller = req.body;
  try {
    const sellerIndex = await updateSeller(sellerId, updatedSeller)
    res.status(200).json({ data: updatedSeller, message: 'Seller updated' })
  } catch {
    res.status(404).json({ message: `${sellerId} not found` })
  }
});

// Delete a seller by ID
router.delete('/:id', async (req, res) => {
  const sellerId = req.params.id;
  try {
    const sellerIndex = await deleteSeller(sellerId)
    if (sellerIndex) {
      res.status(200).json({ data: sellerIndex, message: 'Seller deleted' })
    }
    else {
      res.status(404).json({ message: `${sellerId} not found` })
    }
  } catch (err) {
    res.status(404).json({ message: `${sellerId} not found` })
  }
});

router.patch('/:id/updatestatus', async (req, res) => {
  const sellerId = req.params.id;
  const status = req.body.status;
  try {
    const new_update = await updatestatus(sellerId, status)
    res.status(200).json({ data: new_update })
  } catch {
    res.status(404).json({ message: `${sellerId} not found` })
  }
});

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