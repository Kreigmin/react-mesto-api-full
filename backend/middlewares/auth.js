const jwt = require("jsonwebtoken");
const UnauthorizedError = require("../errors/unauthorized-error");
// const ForbiddenError = require("../errors/forbidden-error");

const { NODE_ENV, JWT_SECRET } = process.env;
// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  // if (!req.cookies.jwt) {
  //   return next(new ForbiddenError("Необходима авторизация"));
  // }
  if (!req.cookies.jwt) {
    res.status(200).send({});
  }
  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(
      token,
      // eslint-disable-next-line comma-dangle
      NODE_ENV === "production" ? JWT_SECRET : "dev-secret"
    );
  } catch (err) {
    return next(new UnauthorizedError("С токеном что-то не так."));
  }

  req.user = payload;

  next();
};
