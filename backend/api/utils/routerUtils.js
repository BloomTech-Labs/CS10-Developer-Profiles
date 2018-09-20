const utils = require('../utils/authUtils');

module.exports = {
  login: function loginUser(model, req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(422).json({ Error: 'email and password are required fields.' });
      return;
    }

    // prettier-ignore
    model
      .findOne({ email }, { __v: 0 })
      .then((user) => {
        if (!user) {
          res
            .status(204)
            .json({ 'No Content': 'There are no document for the requested parameters in the DB.' });
          return;
        }

        // console.log({ LOGIN: { user } });
        const { _id } = user;
        // console.log(companyName);
        user
          .isValidPassword(password)
          .then((validPassword) => {
            if (!validPassword) {
              res
                .status(422)
                .json({ 'Bad Credentials': 'Please, check your credentials, there are some wrong data.' });
              return;
            }

            const jwt = utils.createToken({ _id, email });

            // eslint-disable-next-line no-underscore-dangle, no-param-reassign
            user._doc.password = undefined; // Remove password form 'user'.
            res.status(200).json({ user, jwt });
          })
          .catch((e) => {
            // console.log('error', e);
            res.status(404).json({ e });
          });
      })
      .catch((e) => {
        // console.log('error', e);
        res.status(500).json({ e });
      });
  },
  register: function registerUser(model, req, res) {
    // prettier-ignore
    model
      .create(req.body)
      .then((newUser) => {
        const { _id, email } = newUser;
        // console.log({ name, username, password });
        const jwt = utils.createToken({ _id, email });
        res.status(201).json({ newUser, jwt });
      })
      .catch(err => res.status(500).json({ ERROR: err.message }));
  },
};
