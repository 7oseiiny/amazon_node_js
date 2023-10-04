const sellerModel = require("../models/seller");
const User_model = require("../models/user");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
require("dotenv").config({ path: "config.env" });

const { getSellerById, updatestatus } = require("./seller");

function saveNewUser(user) {
  return User_model.create(user);
}

function getAllUsers() {
  return User_model.find();
}

function deleteUser(id) {
  return User_model.findByIdAndDelete(id, { new: true });
}

function getUserById(id) {
  return User_model.findOne({ _id: id });
}
function updateUser(id, user) {
  return User_model.findByIdAndUpdate(id, user, { new: true });
}

async function report(sellerId, userId) {
  seller = await getSellerById(sellerId);

  if (seller.usersReport.includes(userId)) {
    return "Already reported";
  } else {
    if (seller.usersReport.length + 1 > 1) {
      if (seller.status != "blocked") {
        await updatestatus(sellerId, "warning");
      }
    }
    newUsersReport = [...seller.usersReport, userId];
    return sellerModel.findByIdAndUpdate(
      { _id: sellerId },
      { usersReport: newUsersReport },
      { new: true }
    );
  }
}
async function userLogin(req, res) {
  const { email, pwd } = req.body;
  try {
    if (!email || !pwd) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }
    const findUser = await User_model.findOne({ email: email });
    if (!findUser) {
      return res.status(401).json({ message: "User not found." });
    }

    bcrypt
      .compare(pwd.trim(), findUser.password)
      .then(async () => {
        const accessToken = jwt.sign(
          { id: findUser._id, name: findUser.username, role: findUser.role },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "15m" }
        );

        const refreshToken = jwt.sign(
          { id: findUser._id, name: findUser.username, role: findUser.role },
          process.env.REFRESH_TOKEN_SECRET,
          { expiresIn: "7d" }
        );

        try {
          findUser.refreshToken = refreshToken;
          await findUser.save();
          res.cookie("jwt", refreshToken, {
            httpOnly: true,
            sameSite: "None",
            secure: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
          });

          res.json({ accessToken ,userId:findUser._id});
        } catch (err) {
          console.error("Error saving refreshToken:", err);
          res.status(500).json({ message: "Internal server error." });
        }
      })
      .catch((err) => {
        res.status(401).json({ message: "Invalid password." });
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
}

async function handleRefreshToken(req, res) {
  const cookies = req.cookies.jwt;
  // console.log("getCookies:", cookies);
  if (!cookies) {  
    console.log("getCookies:", cookies);
    return res.sendStatus(401);
  }
  const refreshToken = cookies;
  try {
    const findUser = await User_model.findOne({ refreshToken: refreshToken });
       console.log('findUser:', findUser);
    if (!findUser) {
      return res.sendStatus(403);
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, encoded) => {
      if (err || findUser._id.toString() !== encoded.id) {
        console.log("encoded : ",encoded)
        console.error(err);
        return res.sendStatus(403);
      }
      const accessToken = jwt.sign(
        { id: encoded.id, name: encoded.userName, role: encoded.role },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" }
      );
      res.json({ accessToken });
    });
  } catch (err) {
    console.error(err); // Log the error for debugging
    return res.sendStatus(500);
  }
}

const handleLogout = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); //No content
  const refreshToken = cookies.jwt;

  // Is refreshToken in db?
  const foundUser = await User_model.findOne({ refreshToken: refreshToken });
  foundUser.refreshToken = "";
  foundUser.save();
  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    return res.sendStatus(204);
  }

  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
  res.sendStatus(204);
};
module.exports = {
  saveNewUser,
  getAllUsers,
  deleteUser,
  getUserById,
  updateUser,
  report,
  userLogin,
  handleRefreshToken,
  handleLogout,
};
