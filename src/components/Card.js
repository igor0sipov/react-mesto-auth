function Card(props) {
  const isOwn = props.card.owner._id === props.currentUser._id;
  const isLiked = props.card.likes.some(
    (like) => like._id === props.currentUser._id
  );
  function handleLikeClick() {
    props.onCardLike(props.card, isLiked);
  }

  function handleDeleteClick() {
    props.onDeleteClick(props.card);
  }

  function handleClick() {
    props.onCardClick(props.card);
  }

  return (
    <li className="element">
      <button
        className={`element__delete-button ${
          isOwn ? "" : `element__delete-button_hidden`
        }`}
        onClick={handleDeleteClick}
      ></button>
      <img
        src={props.card.link}
        alt="#"
        className="element__picture"
        onClick={handleClick}
      />
      <h2 className="element__name">{props.card.name}</h2>
      <figure className="element__like">
        <button
          className={`element__like-button ${
            isLiked ? `element__like-button_active` : ""
          }`}
          onClick={handleLikeClick}
        ></button>
        <figcaption className="element__like-counter">
          {props.card.likes.length}
        </figcaption>
      </figure>
    </li>
  );
}

export default Card;
