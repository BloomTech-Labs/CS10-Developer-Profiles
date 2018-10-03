require('dotenv').config();

const jwt = require('jsonwebtoken');
const { sendErr } = require('../utils/apiResponses');

const jwtSecret = process.env.JWT_SECRET;

module.exports = {
  createToken: function createToken(data) {
    const options = {
      expiresIn: '1h',
    };
    const payload = { ...data };
    return jwt.sign(payload, jwtSecret, options);
  },
  userHasToken: function hasToken(req, res, next) {
    const token = req.headers.authorization;

    if (!token) return sendErr(res, '401', 'You must register or login to continue.');

    return jwt.verify(token, jwtSecret, (err, tokenDecoded) => {
      if (err) {
        sendErr(res, '401', 'Oh ohh. We can not validate your credentials, try again!');
      } else {
        req.token = token;
        req.decodedToken = tokenDecoded;
        next();
      }
    });
  },
};
