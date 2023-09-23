const express = require("express");
const adminModel = require("../models/admins");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const { saveAdmin } = require("../controllers/admin");

router.post("/signup", async (req, res) => {
  const { adminName, password, email } = req.body;

  if (!adminName || !password || !email) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const newAdmin = await saveAdmin(req.body);
    res.status(201).json({ data: newAdmin });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide username or password" });
  }

  try {
    var admin = await adminModel.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
    var isValid = await bcrypt.compare(password, admin.password);
    if (!isValid) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    var token = jwt.sign(
      { id: admin._id, name: admin.adminName },
      process.env.SECRET
    );
    res.status(200).json({ token, status: "success" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});



module.exports = router;
