const jwt = require('jsonwebtoken');
var {promisify} = require('util')

async function loginAuth (req, res, next){
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ message: 'You are not authorized, please login first' });
  }

  try {
    const decoded =await promisify(jwt.verify) (token, process.env.SECRET);
    console.log(decoded);
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token, You are not authorized' });
  }
};

 

module.exports = loginAuth;