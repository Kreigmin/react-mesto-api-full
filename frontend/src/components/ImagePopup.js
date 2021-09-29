import React from "react";

function ImagePopup({ card, onClose }) {
  return (
    <div
      className={`popup popup_bg-alfa_black popup_type_image ${
        card.link ? "popup_opened" : ""
      }`}
    >
      <figure className="image-popup">
        <button
          className="close-btn close-image-popup popup__close"
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
        ></button>
        <img
          className="image-popup__full-img"
          src={card.link ? card.link : "#"}
          alt={card.name ? card.name : ""}
        />
        <figcaption className="image-popup__caption">
          {card.name ? card.name : ""}
        </figcaption>
      </figure>
    </div>
  );
}

export default ImagePopup;
