import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const [inputs, setInputs] = React.useState({
    avatar: { value: "" },
  });
  const [isFormValid, setIsFormValid] = React.useState(false);

  function handleClick(e) {
    e.preventDefault();
    props.onUpdateAvatar(inputs.avatar.value);
  }

  function handleInputChange(e) {
    props.setValues(inputs, setInputs, e);
  }

  React.useEffect(() => {
    if (inputs.avatar.isValid) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [inputs.avatar.isValid]);

  React.useEffect(() => {
    if (!props.isOpened) {
      setInputs({ avatar: { value: "" } });
    }
  }, [props.isOpened]);

  return (
    <PopupWithForm
      name="updateAvatar"
      title="Обновить аватар"
      isOpened={props.isOpened}
      onClose={props.onClose}
      buttonText={props.buttonText}
      onSubmit={handleClick}
      isValid={isFormValid}
      onOverlay={props.onOverlay}
    >
      <input
        name="avatar"
        type="url"
        className="popup__input"
        placeholder="Ссылка на аватар"
        required
        minLength="2"
        maxLength="200"
        value={inputs.avatar.value}
        onChange={handleInputChange}
      />
      <span
        className={`popup__input-error ${
          inputs.avatar.isValid ? `` : `popup__input-error_visible`
        }`}
      >
        {inputs.avatar.validationMessage}
      </span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
