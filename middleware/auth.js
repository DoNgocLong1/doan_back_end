import jwt from "jsonwebtoken";
const authToken = (req, res, next) => {
  const authHeader = req.header['authorization']
  const token = authHeader.split(' ')[1]
  if (!token) res.sendStatus(401)
  jwt.verify(token, process.env.JWT_KEY, (err, data) => {
    if (err) res.sendStatus(403)
    next()
  })
}
module.exports = {
  authToken
}
