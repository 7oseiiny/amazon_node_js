const express = require("express");
const adminModel = require("../models/admins");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const authMiddleware = require("../middlewares/auth");
const { saveAdmin } = require("../controllers/admin");

router.post("/signup", async (req, res) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const newadmin = await saveAdmin(req.body);
    res.status(201).json({ data: newadmin });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Please provide username or password" });
  }

  try {
    var user = await adminModel.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
    var isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    var token = jwt.sign(
      { id: user._id, name: user.username },
      process.env.SECRET
    );
    res.status(200).json({ token, status: "success" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// router.get("/", authMiddleware, (req, res) => {
//   res.json({
//     message: `Hello, ${admin.username}! This is a protected admin route.`,
//   });
// });

module.exports = router;
