import React from "react";

function InfoToolTip({ isOpen, onClose, authInfoImageClass, authInfoCaption }) {
  return (
    <div
      className={`popup popup_type_info popup_bg-alfa_dark ${
        isOpen ? "popup_opened" : ""
      }`}
    >
      <div className="popup__container">
        <div className={`popup__image ${authInfoImageClass}`}></div>
        <p className="popup__image-caption">{authInfoCaption}</p>
        <button
          className="close-btn close-edit-popup popup__close"
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}

export default InfoToolTip;
