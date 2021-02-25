import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [inputs, setInputs] = React.useState({
    name: { value: "" },
    link: { value: "" },
  });
  const [isFormValid, setIsFormValid] = React.useState(false);

  function handleInputChange(e) {
    props.setValues(inputs, setInputs, e);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onSubmit({ name: inputs.name.value, link: inputs.link.value });
  }

  React.useEffect(() => {
    if (inputs.name.isValid && inputs.link.isValid) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [inputs.name.isValid, inputs.link.isValid]);

  React.useEffect(() => {
    if (!props.isOpened) {
      setInputs({
        name: { value: "" },
        link: { value: "" },
      });
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
        name="name"
        type="text"
        className="popup__input"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        required
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
        name="link"
        type="url"
        className="popup__input"
        placeholder="Ссылка на картинку"
        required
        value={inputs.link.value}
        onChange={handleInputChange}
      />
      <span
        className={`popup__input-error ${
          inputs.link.isValid ? `` : `popup__input-error_visible`
        }`}
      >
        {inputs.link.validationMessage}
      </span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
