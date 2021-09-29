import React, { useEffect, useRef, useState } from "react";
import PopupWithForm from "./PopupWithForm.js";

function EditAvatarPopup({
  isOpen,
  onClose,
  onUpdateAvatar,
  onRenderLoading,
  isSubmitting,
}) {
  const avatarLinkRef = useRef();
  const [linkValidation, setLinkValidation] = useState({
    linkValidationMessage: "",
    isLinkValid: true,
  });

  function handleLinkChange() {
    if (!avatarLinkRef.current.validity.valid) {
      setLinkValidation({
        linkValidationMessage: avatarLinkRef.current.validationMessage,
        isLinkValid: false,
      });
    } else {
      setLinkValidation({
        linkValidationMessage: "",
        isLinkValid: true,
      });
    }
  }

  function closePopupAndClearInputsError() {
    onClose();
    setLinkValidation({
      linkValidationMessage: "",
      isLinkValid: true,
    });
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    onRenderLoading(true);
    onUpdateAvatar({
      avatar: avatarLinkRef.current.value,
    });
  }

  useEffect(() => {
    avatarLinkRef.current.value = "";
  }, [isOpen]);

  return (
    <PopupWithForm
      name="change_avatar"
      color="dark"
      title="Обновить аватар"
      marginSize="large"
      btnName={isSubmitting ? "Cохранение..." : "Сохранить"}
      isOpen={isOpen}
      onClose={closePopupAndClearInputsError}
      onSubmit={handleSubmit}
    >
      <div className="form__field">
        <input
          type="url"
          className="form__input form__input_card-link_value form__input_text-color_black"
          id="avatar-link-input"
          name="avatarImage"
          autoComplete="off"
          placeholder="Ссылка на аватар"
          required
          ref={avatarLinkRef}
          onChange={handleLinkChange}
        />
        <span
          className={`form__input-error avatar-link-input-error ${
            !linkValidation.isLinkValid ? "form__input-error_active" : ""
          }`}
        >
          {linkValidation.linkValidationMessage}
        </span>
      </div>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
