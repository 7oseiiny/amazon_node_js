const jwt = require('jsonwebtoken');
var {promisify} = require('util')

async function authMiddleware (req, res, next){
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ message: 'You are not authorized, please login first' });
  }

  try {
    const decoded =await promisify(jwt.verify) (token, process.env.SECRET);
    console.log(decoded);
    // if (!decoded.admin) {
    //   return res.status(403).json({ message: 'Access denied' });
    // }

    // req.admin = decoded.admin;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token, You are not authorized' });
  }
};

 

module.exports = authMiddleware;