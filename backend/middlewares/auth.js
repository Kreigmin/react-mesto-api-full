const jwt = require("jsonwebtoken");
const UnauthorizedError = require("../errors/unauthorized-error");

const { NODE_ENV, JWT_SECRET } = process.env;
// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;
  // я думал что условием исправил то, чтобы не приходила ошибка с сервера если нет токена.
  // Через https не было таких ошибок поэтому думал что правильно сделал.
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
