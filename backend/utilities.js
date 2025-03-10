const jwt = require('jsonwebtoken')

function authenticationToken(req, res, next) {
  // The Authorization header format is:\
  // Authorization: Bearer <TOKEN>, ex -> const authHeader = "Bearer abc123xyz";
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if(!token)  return res.sendStatus(401);

  // jwt.verify() checks if the token is valid, and decodes the token.
  // It uses process.env.ACCESS_TOKEN_SECRET (a secret key) to DECODE and verify the token.
  // If verification is successful, the decoded user data is stored in user.
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if(err) return res.sendStatus(401);

    req.user = user;
    next();
  })
}

module.exports = {authenticationToken}