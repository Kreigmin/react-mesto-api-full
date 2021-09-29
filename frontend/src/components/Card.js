import React, { useContext } from "react";
import "../index.css";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Card({
  card,
  onCardClick,
  onCardLike,
  onDeleteCardClick,
  onCurrentCard,
}) {
  const currentUser = useContext(CurrentUserContext);

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onDeleteCardClick();
    onCurrentCard(card);
  }

  const isOwn = card.owner._id === currentUser._id;

  const cardDeleteButtonClassName = `card__delete-btn ${
    isOwn ? "card__delete-btn_state_visible" : "card__delete-btn_state_hidden"
  }`;

  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `card__like ${
    isLiked ? "card__like_state_active" : "card__like_state_inactive"
  }`;

  return (
    <li className="card">
      <button className="card__full-img-btn" onClick={handleClick}>
        <img className="card__image" src={card.link} alt={card.name} />
      </button>
      <div className="card__footer">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__like-container">
          <button
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
            type="button"
            aria-label="Нравится"
          ></button>
          <p className="card__like-number">{card.likes.length}</p>
        </div>
      </div>
      <button
        className={cardDeleteButtonClassName}
        onClick={handleDeleteClick}
        type="button"
        aria-label="Удалить"
      ></button>
    </li>
  );
}

export default Card;
