import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const user = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState({ value: user.name, isValid: true });
  const [description, setDescription] = React.useState({
    value: user.about,
    isvalid: true,
  });
  const [isFormValid, setIsFormValid] = React.useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name: name.value,
      about: description.value,
    });
  }

  function handleNameChange(e) {
    setName({
      value: e.target.value,
      isValid: e.target.validity.valid,
      validationMessage: e.target.validationMessage,
    });
  }

  function handleDescriptionChange(e) {
    setDescription({
      value: e.target.value,
      isValid: e.target.validity.valid,
      validationMessage: e.target.validationMessage,
    });
  }

  React.useEffect(() => {
    setName({ value: user.name, isValid: true });
    setDescription({ value: user.about, isValid: true });
  }, [user]);

  React.useEffect(() => {
    if (name.isValid && description.isValid) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [name.isValid, description.isValid]);

  return (
    <PopupWithForm
      name="editProfile"
      title="Редактировать профиль"
      isOpened={props.isOpened}
      onClose={props.onClose}
      buttonText={props.buttonText}
      onSubmit={handleSubmit}
      isValid={isFormValid}
      onOverlay={props.onOverlay}
    >
      <input
        type="text"
        className="popup__input"
        id="container-name"
        name="name"
        placeholder="Имя"
        required
        minLength="2"
        maxLength="40"
        value={name.value}
        onChange={handleNameChange}
      />
      <span
        className={`popup__input-error container-name-error ${
          name.isValid ? `` : `popup__input-error_visible`
        }`}
      >
        {name.validationMessage}
      </span>
      <input
        type="text"
        className="popup__input"
        id="container-bio"
        name="bio"
        placeholder="О себе"
        required
        minLength="2"
        maxLength="200"
        value={description.value}
        onChange={handleDescriptionChange}
      />
      <span
        className={`popup__input-error container-name-error ${
          description.isValid ? `` : `popup__input-error_visible`
        }`}
      >
        {description.validationMessage}
      </span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
