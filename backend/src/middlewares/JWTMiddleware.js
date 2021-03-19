const jwt = require("jsonwebtoken");

const JWTSecret = require("../auth/secrets").JWTSecret;

function vaildateJWT(req, res, next) {
  if (req.headers["authorization"] == null) {
    return res.status(403).send({ errors: ["No token"] });
  }

  try {
    const authorization = req.headers["authorization"].split(" ");

    if (authorization[0] !== "Bearer") {
      return res.status(401).send();
    }

    req.jwt = jwt.verify(authorization[1], JWTSecret);

    return next();
  } catch (err) {
    res.status(403).send({ errors: ["Invalid token"] });
  }
}

module.exports = vaildateJWT;
