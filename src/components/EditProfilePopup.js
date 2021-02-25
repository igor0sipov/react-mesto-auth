import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const user = React.useContext(CurrentUserContext);
  const [inputs, setInputs] = React.useState({
    name: { value: user.name, isValid: true },
    about: { value: user.about, isvalid: true },
  });
  const [isFormValid, setIsFormValid] = React.useState(false);

  function handleInputChange(e) {
    props.setValues(inputs, setInputs, e);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name: inputs.name.value,
      about: inputs.about.value,
    });
  }

  React.useEffect(() => {
    setInputs({
      name: { value: user.name, isValid: true },
      about: { value: user.about, isValid: true },
    });
  }, [user, props.isOpened]);

  React.useEffect(() => {
    if (inputs.name.isValid && inputs.about.isValid) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [inputs.name.isValid, inputs.about.isValid]);

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
        name="name"
        type="text"
        className="popup__input"
        placeholder="Имя"
        required
        minLength="2"
        maxLength="40"
        value={inputs.name.value}
        onChange={handleInputChange}
      />
      <span
        className={`popup__input-error ${
          inputs.name.isValid ? `` : `popup__input-error_visible`
        }`}
      >
        {inputs.name.validationMessage}
      </span>
      <input
        name="about"
        type="text"
        className="popup__input"
        placeholder="О себе"
        required
        minLength="2"
        maxLength="200"
        value={inputs.about.value}
        onChange={handleInputChange}
      />
      <span
        className={`popup__input-error ${
          inputs.about.isValid ? `` : `popup__input-error_visible`
        }`}
      >
        {inputs.about.validationMessage}
      </span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
