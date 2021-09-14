const jwt = require('jsonwebtoken');
const { key } = require('../utils/constants')

exports.genAccessToken = (id, email) => {
  const payload = {
    id, email
  }

  return jwt.sign(payload, key, { expiresIn: '5h' })
}

exports.tokenModule = async (req, res, next) => {
  if (req.method === "OPTION") {
    next();
  }
  try {
    console.log(req.headers);
    const token = req.headers.authorization.split(' ')[1]
    if (!token) {
      return res.status(403).json({ message: 'Users not  authorization first Falls' })
    }
    let decodedData = jwt.verify(token, key)
    
    try {
      decodedData = jwt.verify(token, key);
    } catch (err) {
      if (err.name === 'TokenExpiredError') return res.status(401).json({ message: 'Live time token end' });
      if (err.name === 'JsonWebTokenError') return res.status(401).json({ message: 'Incorrect token' });
    }
    req.user = decodedData
    next()
  } catch (e) {
    console.log(e)
    return res.status(403).json({ message: 'Users not  authorization second Falls' })
  }
}

// const authJwt = {
//   genAccessToken,
//   tokenModule,
// };
// module.exports = authJwt;