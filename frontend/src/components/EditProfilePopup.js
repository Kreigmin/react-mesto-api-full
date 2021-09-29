import React, { useContext, useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function EditProfilePopup({
  isOpen,
  onClose,
  onUpdateUser,
  onRenderLoading,
  isSubmitting,
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [nameValidation, setNameValidation] = useState({
    nameValidationMessage: "",
    isNameValid: true,
  });
  const [descriptionValidation, setDescriptionValidation] = useState({
    descriptionValidationMessage: "",
    isDescriptionValid: true,
  });
  const currentUser = useContext(CurrentUserContext);

  function handleNameChange(evt) {
    setName(evt.target.value);
    const { value, validationMessage } = evt.target;
    setNameValidation({
      nameValidationMessage: validationMessage,
      isNameValid: value.valid,
    });
  }

  function handleDescriptionChange(evt) {
    setDescription(evt.target.value);
    const { value, validationMessage } = evt.target;
    setDescriptionValidation({
      descriptionValidationMessage: validationMessage,
      isDescriptionValid: value.valid,
    });
  }

  function closePopupAndClearInputsError() {
    onClose();
    setNameValidation({
      nameValidationMessage: "",
      isNameValid: true,
    });
    setDescriptionValidation({
      descriptionValidationMessage: "",
      isDescriptionValid: true,
    });
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    onRenderLoading(true);
    onUpdateUser({
      name,
      about: description,
    });
  }

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [isOpen, currentUser]);

  return (
    <PopupWithForm
      name="edit_profile"
      color="dark"
      title="Редактировать профиль"
      marginSize="large"
      btnName={isSubmitting ? "Сохранение..." : "Сохранить"}
      isOpen={isOpen}
      onClose={closePopupAndClearInputsError}
      onSubmit={handleSubmit}
    >
      <div className="form__field">
        <input
          type="text"
          className="form__input form__input_name_value form__input_text-color_black"
          id="name-input"
          name="profileName"
          value={name || ""}
          autoComplete="off"
          placeholder="Имя"
          minLength="2"
          maxLength="40"
          required
          onChange={handleNameChange}
        />
        <span
          className={`form__input-error name-input-error ${
            !nameValidation.isNameValid ? "form__input-error_active" : ""
          }`}
        >
          {nameValidation.nameValidationMessage}
        </span>
      </div>
      <div className="form__field">
        <input
          type="text"
          className="form__input form__input_job_value form__input_text-color_black"
          id="about-me-input"
          name="profileJob"
          value={description || ""}
          autoComplete="off"
          placeholder="О себе"
          minLength="2"
          maxLength="200"
          required
          noValidate
          onChange={handleDescriptionChange}
        />
        <span
          className={`form__input-error about-me-input-error ${
            !descriptionValidation.isDescriptionValid
              ? "form__input-error_active"
              : ""
          }`}
        >
          {descriptionValidation.descriptionValidationMessage}
        </span>
      </div>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
