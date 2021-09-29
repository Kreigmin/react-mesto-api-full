import React from "react";
import PopupWithForm from "./PopupWithForm.js";

function DeleteCardPopup({
  isOpen,
  onClose,
  onDeleteCard,
  onRenderLoading,
  isSubmitting,
}) {
  function handleSubmit(evt) {
    evt.preventDefault();

    onRenderLoading(true);
    onDeleteCard();
  }

  return (
    <PopupWithForm
      name="delete_card"
      color="dark"
      title="Вы уверены?"
      marginSize="medium"
      btnName={isSubmitting ? "Удаление..." : "Да"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  );
}

export default DeleteCardPopup;
