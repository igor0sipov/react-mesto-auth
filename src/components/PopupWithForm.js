function PopupWithForm(props) {
  return (
    <section
      className={`popup popup_type_${props.name} ${
        props.isOpened && `popup_opened`
      }`}
      onClick={props.onOverlay}
    >
      <form
        className="popup__content container"
        name={props.name}
        onSubmit={props.onSubmit}
        noValidate
      >
        <button
          type="button"
          className="popup__close-icon"
          onClick={props.onClose}
        ></button>
        <h3 className="popup__title">{props.title}</h3>
        {props.children}
        <button
          type="submit"
          className={`popup__submit-button ${
            props.isValid ? "" : `popup__submit-button_disabled`
          }`}
        >
          {props.buttonText}
        </button>
      </form>
    </section>
  );
}

export default PopupWithForm;
