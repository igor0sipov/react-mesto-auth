import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [name, setName] = React.useState({ value: "" });
  const [link, setLink] = React.useState({ value: "" });
  const [isFormValid, setIsFormValid] = React.useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    props.onSubmit({ name: name.value, link: link.value });
  }
  function handleNameChange(e) {
    setName({
      value: e.target.value,
      isValid: e.target.validity.valid,
      validationMessage: e.target.validationMessage,
    });
  }

  function handleLinkChange(e) {
    setLink({
      value: e.target.value,
      isValid: e.target.validity.valid,
      validationMessage: e.target.validationMessage,
    });
  }

  React.useEffect(() => {
    if (name.isValid && link.isValid) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [name.isValid, link.isValid]);

  React.useEffect(() => {
    if (!props.isOpened) {
      setName({ value: "" });
      setLink({ value: "" });
    }
  }, [props.isOpened]);

  return (
    <PopupWithForm
      name="addPlace"
      title="Новое место"
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
        id="container-title"
        name="title"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        required
        value={name.value}
        onChange={handleNameChange}
      />
      <span
        className={`popup__input-error container-title-error ${
          name.isValid ? `` : `popup__input-error_visible`
        }`}
      >
        {name.validationMessage}
      </span>
      <input
        type="url"
        className="popup__input"
        id="container-url"
        name="url"
        placeholder="Ссылка на картинку"
        required
        value={link.value}
        onChange={handleLinkChange}
      />
      <span
        className={`popup__input-error container-url-error ${
          link.isValid ? `` : `popup__input-error_visible`
        }`}
      >
        {link.validationMessage}
      </span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
