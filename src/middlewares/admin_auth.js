const jwt = require('jsonwebtoken');
var {promisify} = require('util')
const dotenv = require("dotenv")
dotenv.config({ path: "config.env" })

async function adminAuth (req, res, next){

  

  try {
    var decoded =await promisify(jwt.verify) (req.headers.authorization, process.env.JWT_SECRET);

    if (req.params.userId == decoded.userID) {
      next();
    }
    else{
      res.status(401).json({ message: 'Invalid token, You are not authorized' });

    }
    
  } catch (err) {
    res.status(401).json({ message: 'Invalid token, You are not authorized' });
  }
};

 

module.exports = adminAuth;