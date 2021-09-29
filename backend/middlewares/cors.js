const allowedCors = [
  "https://beautiful-places.nomoredomains.club",
  "http://beautiful-places.nomoredomains.club",
  "localhost:3000",
];

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers["access-control-request-headers"];

  if (allowedCors.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }

  if (method === "OPTIONS") {
    res.header("Access-Control-Allow-Headers", requestHeaders);
    return res.end();
  }

  next();
};
