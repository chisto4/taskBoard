import jwt from 'jsonwebtoken'
import {secretKey} from '../Controller/userController.js'

export const genAccessToken = (id, email) => {
  const payload = {
      id, email
    }

  return jwt.sign(payload, secretKey, {expiresIn: '5m'})
}

export const tokenModule = async (req, res, next) => {
  if(req.method === "OPTION") {
    next();
  }
try {
console.log(req.headers);
  const token = req.headers.authorization.split(' ')[1]
  if(!token){
      return res.status(403).json({message:'Users not  authorization first Falls'})
  }
  let decodedData = jwt.verify(token, secretKey)
  try {
    decodedData = jwt.verify(token, secretKey);
  } catch(err) {
    if (err.name ===  'TokenExpiredError') return res.status(401).json({message: 'Live time token end'});
    if (err.name ===  'JsonWebTokenError') return res.status(401).json({message: 'Incorrect token'});
  }
  req.user = decodedData
  console.log('decodata', decodedData)
  next()
} catch(e) {
  console.log(e)
  return res.status(403).json({message:'Users not  authorization second Falls'})
}
}

