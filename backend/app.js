/* eslint-disable comma-dangle */
const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const { errors, Joi, celebrate } = require("celebrate");
const validator = require("validator");
// const cors = require("cors");
const userRoutes = require("./routes/users");
const cardRoutes = require("./routes/cards");
const { login, createUser, signOut } = require("./controllers/users");
const auth = require("./middlewares/auth");
const NotFoundError = require("./errors/not-found-error");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const cors = require("./middlewares/cors");

const BASE_ERROR_CODE = 500;
const { PORT = 3000 } = process.env;
const app = express();
mongoose.connect("mongodb://localhost:27017/mestodb");

app.use(helmet());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(requestLogger);

app.use(cors);

// const whitelist = [
//   "https://beautiful-places.nomoredomains.club",
//   "http://beautiful-places.nomoredomains.club",
// ];
// const corsOptions = {
//   origin: "https://beautiful-places.nomoredomains.club",
//   methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//   allowedHeaders: "Origin,X-Requested-With,Content-Type,Accept,Authorization",
//   credentials: true,
//   preflightContinue: false,
//   optionsSuccessStatus: 204,
// };

// app.use(cors(corsOptions));

app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Сервер сейчас упадёт");
  }, 0);
});

app.post(
  "/signin",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(6),
    }),
  }),
  login
);

app.post(
  "/signup",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().custom((value) => {
        if (!validator.isURL(value, { require_protocol: true })) {
          throw new Error("Неправильный формат ссылки");
        }
        return value;
      }),
      email: Joi.string().required().email(),
      password: Joi.string().required().min(6),
    }),
  }),
  createUser
);

app.post("/signout", signOut);

app.use(auth);

app.use(userRoutes);

app.use(cardRoutes);

app.use((req, res, next) => {
  next(new NotFoundError("Запрашиваемый ресурс не найден"));
});

app.use(errorLogger);

app.use(errors());

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const { statusCode = BASE_ERROR_CODE, message } = err;
  res.status(statusCode).send({
    message:
      statusCode === BASE_ERROR_CODE ? "На сервере произошла ошибка" : message,
  });
});

app.listen(PORT);
