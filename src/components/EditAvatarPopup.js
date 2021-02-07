import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const avatarInputRef = React.useRef();
  const [avatar, setAvatar] = React.useState({ value: "" });
  const [isFormValid, setIsFormValid] = React.useState(false);

  function handleClick(e) {
    e.preventDefault();
    props.onUpdateAvatar(avatarInputRef.current.value);
  }

  function handleChange(e) {
    setAvatar({
      value: e.target.value,
      isValid: e.target.validity.valid,
      validationMessage: e.target.validationMessage,
    });
  }

  React.useEffect(() => {
    if (avatar.isValid) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [avatar.isValid]);

  React.useEffect(() => {
    if (!props.isOpened) {
      setAvatar({ value: "" });
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
        ref={avatarInputRef}
        type="url"
        className="popup__input"
        id="container-avatar"
        name="avatar"
        placeholder="Ссылка на аватар"
        required
        minLength="2"
        maxLength="200"
        value={avatar.value}
        onChange={handleChange}
      />
      <span
        className={`popup__input-error container-avatar-error ${
          avatar.isValid ? `` : `popup__input-error_visible`
        }`}
      >
        {avatar.validationMessage}
      </span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
