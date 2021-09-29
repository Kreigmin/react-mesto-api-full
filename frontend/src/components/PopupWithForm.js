import React from "react";

function PopupWithForm({
  name,
  color,
  title,
  marginSize,
  btnName,
  isOpen,
  onClose,
  onSubmit,
  children,
}) {
  return (
    <div
      className={`popup popup_type_${name} popup_bg-alfa_${color} ${
        isOpen ? "popup_opened" : ""
      }`}
    >
      <div className="popup__container">
        <button
          className="close-btn close-edit-popup popup__close"
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
        ></button>
        <form className="form" name={name} onSubmit={onSubmit}>
          <h2 className="form__title form__title_text-color_black form__title_position_default">
            {title}
          </h2>
          {children}
          <fieldset className="form__fieldset">
            <button
              className={`form__submit-btn form__submit-btn_color_black form__submit-btn_margin_${marginSize}`}
              type="submit"
              aria-label="Сохранить"
            >
              {btnName}
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
