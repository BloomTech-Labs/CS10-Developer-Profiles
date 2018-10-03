require('dotenv').config();

const jwt = require('jsonwebtoken');
const { sendErr, sendRes } = require('../utils/apiResponses');

const createToken = (data) => {
  const payload = { ...data };
  const options = {
    expiresIn: '1h',
  };
  return jwt.sign(payload, process.env.JWT_SECRET, options);
};

const userHasToken = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) return sendErr(res, '401', 'You must register or login to continue.');

  return jwt.verify(authorization, process.env.JWT_SECRET, (err, tokenDecoded) => {
    if (err) {
      sendErr(res, '401', 'Oh ohh. We can not validate your credentials, try again!');
    } else {
      req.token = authorization;
      req.decodedToken = tokenDecoded;
      next();
    }
  });
};

const login = (model, req, res) => {
  const { email, password } = req.body;

  if (!email || !password) return sendErr(res, 'ValidationError', 'Email and password are required.');

  return model
    .findOne({ email }, { __v: 0 })
    .then((user) => {
      if (user) {
        const { _id } = user;
        user
          .isValidPassword(password)
          .then((validPassword) => {
            if (!validPassword) return sendErr(res, '401', 'Invalid credentials');
            return sendRes(res, '200', { user: _id, jwt: createToken({ _id, email }) });
          })
          .catch(err => sendErr(res, '500', err));
      } else {
        return sendErr(res, '401', 'Invalid credentials');
      }

      return null;
    })
    .catch(err => sendErr(res, '500', err));
};

const register = (model, req, res) => {
  model
    .create(req.body)
    .then((newUser) => {
      const { _id, email } = newUser;
      return sendRes(res, '201', { newUser: _id, jwt: createToken({ _id, email }) });
    })
    .catch(err => sendErr(res, '500', err));
};

module.exports = {
  createToken,
  userHasToken,
  login,
  register,
};
