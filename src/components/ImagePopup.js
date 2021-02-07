function ImagePopup(props) {
  return (
    <section
      className={`popup fullsize-picture ${props.isOpened && `popup_opened`}`}
      onClick={props.onOverlay}
    >
      <figure className="popup__content">
        <button
          type="button"
          className="popup__close-icon"
          onClick={props.onClose}
        ></button>
        <img
          src={props.card.link}
          alt={props.card.name}
          className="popup__picture"
        />
        <figcaption className="popup__caption">{props.card.name}</figcaption>
      </figure>
    </section>
  );
}

export default ImagePopup;
