const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET;

module.exports = {
  createToken: function createToken(data) {
    const options = {
      expiresIn: '1h',
    };
    const payload = { ...data };
    return jwt.sign(payload, jwtSecret, options);
  },
  // eslint-disable-next-line consistent-return
  userHasToken: function hasToken(req, res, next) {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json('You must be registered/logged in before go on');
    jwt.verify(token, jwtSecret, (err, tokenDecoded) => {
      if (err) {
        res.status(500).json({ Error: 'Oh ohh, We can not validate your credentials, try again!' });
      } else {
        req.token = token;
        req.decodedToken = tokenDecoded;
        next();
      }
    });
  },
};
