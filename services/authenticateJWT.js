const jwt = require("jsonwebtoken");

const accessTokenSecret = 'this_cooking_canvas_access_token_secret';



exports.authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, accessTokenSecret, (err, user) => {

      if (err) {
        return res.sendStatus(403);
      }

      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

exports.getAccessToken = (user) => jwt.sign({
  id: user.id,
  email: user.email
}, accessTokenSecret);
