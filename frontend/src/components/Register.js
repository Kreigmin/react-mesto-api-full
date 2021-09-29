import React, { useState } from "react";
import Header from "./Header";
import { Link } from "react-router-dom";

function Register({ onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailValidation, setEmailValidation] = useState({
    EmailValidationMessage: "",
    isEmailValid: true,
  });
  const [passwordValidation, setPasswordValidation] = useState({
    passwordValidationMessage: "",
    isPasswordValid: true,
  });

  function handleEmailChange(evt) {
    setEmail(evt.target.value);
    const { value, validationMessage } = evt.target;
    setEmailValidation({
      emailValidationMessage: validationMessage,
      isEmailValid: value.valid,
    });
  }

  function handlePasswordChange(evt) {
    setPassword(evt.target.value);

    const { value, validationMessage } = evt.target;
    setPasswordValidation({
      passwordValidationMessage: validationMessage,
      isPasswordValid: value.valid,
    });
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onRegister(email, password);
  }

  return (
    <>
      <Header />
      <div className="form__container">
        <form className="form" name="register" onSubmit={handleSubmit}>
          <h2 className="form__title form__title_text-color_white form__title_position_center">
            Регистрация
          </h2>
          <div className="form__field">
            <input
              type="email"
              className="form__input form__input_text-color_white form__input_register-email_value"
              id="registration-email-input"
              name="logginEmail"
              value={email}
              autoComplete="off"
              placeholder="Email"
              minLength="2"
              maxLength="40"
              required
              onChange={handleEmailChange}
            />
            <span
              className={`form__input-error register-email-input-error ${
                !emailValidation.isEmailValid ? "form__input-error_active" : ""
              }`}
            >
              {emailValidation.emailValidationMessage}
            </span>
          </div>
          <div className="form__field">
            <input
              type="password"
              className="form__input form__input_text-color_white form__input_register-password_value"
              id="registration-password-input"
              name="logginPassword"
              value={password}
              autoComplete="off"
              placeholder="Пароль"
              minLength="7"
              maxLength="100"
              required
              onChange={handlePasswordChange}
            />
            <span
              className={`form__input-error register-password-input-error ${
                !passwordValidation.isPasswordValid
                  ? "form__input-error_active"
                  : ""
              }`}
            >
              {passwordValidation.passwordValidationMessage}
            </span>
          </div>
          <fieldset className="form__fieldset">
            <button
              className={`form__submit-btn form__submit-btn_color_white form__submit-btn_margin_very-large`}
              type="submit"
              aria-label="Войти"
            >
              Зарегистрироваться
            </button>
          </fieldset>
          <p className="form__caption">
            Уже зарегистрированы?&nbsp;
            <span>
              <Link to="/sign-in" className="form__caption-link">
                Войти
              </Link>
            </span>
          </p>
        </form>
      </div>
    </>
  );
}

export default Register;
