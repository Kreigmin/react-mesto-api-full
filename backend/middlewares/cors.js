const allowedCors = [
  "https://beautiful-places.nomoredomains.club",
  "http://beautiful-places.nomoredomains.club",
  "https://localhost:3000",
  "http://localhost:3000",
];

module.exports = (req, res, next) => {
  const { origin } = req.headers;
  const DEFAULT_ALLOWED_METHODS = "GET,HEAD,PUT,PATCH,POST,DELETE";
  if (allowedCors.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }

  if (req.method === "OPTIONS") {
    console.log(req.method);
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.header("Access-Control-Allow-Methods", DEFAULT_ALLOWED_METHODS);
    return res.end();
  }

  next();
};
