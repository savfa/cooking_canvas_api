const userModel = require('../models/userModel');
const { getAccessToken } = require("../services/authenticateJWT");
const { getPasswordHash } = require("../services/password")


exports.getUser = function (req, res) {
  const { id, email } = req.user;

  userModel.getUser(id, email).then((user) => res.send({ data: user }))
    .catch((err) => {
    res.status(400);
    res.json({ error: err.message });
  })
};

exports.login = function (req, res) {
  const { email, password } = req.body;

  userModel.getLogin(email, password).then((user) => {
    res.send({
      user,
      token: { access: getAccessToken(user) },
    });
  }).catch((err) => {
    res.status(400);
    res.json({ error: err.message });
  })
};

exports.register = function (req, res) {
  const { login, email, password } = req.body;
  // todo перед регистрацией проверять email на уникальность (привести к нижнему регистру)

  userModel.register( login, email, getPasswordHash(password))
    .then((user) => {
    res.send({
      user,
      token: { access: getAccessToken(user) },
    });
  }).catch((err) => {
    res.status(400);
    res.json({ error: err.message });
  })
};
