const allowedCors = [
  "https://beautiful-places.nomoredomains.club",
  "http://beautiful-places.nomoredomains.club",
  "localhost:3000",
];

module.exports = function (req, res, next) {
  const { origin } = req.headers;
  const requestHeaders = req.headers["Access-Control-Request-Headers"];
  const { method } = req.method;
  const DEFAULT_ALLOWED_METHODS = "GET,HEAD,PUT,PATCH,POST,DELETE";
  console.log([origin, requestHeaders, method]);

  if (allowedCors.includes(origin)) {
    res.header("Access-Control-Allow-Origin", "*");
  }

  if (method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", DEFAULT_ALLOWED_METHODS);
    res.header("Access-Control-Allow-Headers", requestHeaders);
    return res.end();
  }

  next();
};
