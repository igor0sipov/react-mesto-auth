import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Card from "./Card";
import editAvatarIconPath from "../images/edit-avatar-icon.svg";

function Main(props) {
  const user = React.useContext(CurrentUserContext);

  return (
    <>
      <main className="main sizer">
        <section className="profile profile_spaced sizer">
          <div className="profile__avatar-wrapper">
            <img
              src={user.avatar}
              alt="User Avatar"
              className="profile__avatar"
            />
            <button
              className="profile__edit-avatar-button"
              onClick={props.handleEditAvatarClick}
            >
              <img
                src={editAvatarIconPath}
                alt=""
                className="profile__edit-avatar-icon"
              />
            </button>
          </div>

          <div className="profile__info">
            <h1 className="profile__name">{user.name}</h1>
            <p className="profile__bio">{user.about}</p>
            <button
              className="profile__edit-button"
              onClick={props.handleEditProfileClick}
            ></button>
          </div>
          <button
            className="profile__add-button"
            onClick={props.handleAddPlaceClick}
          ></button>
        </section>

        <ul className="elements">
          {props.cards.map((card) => {
            return (
              <Card
                key={card._id}
                card={card}
                onCardClick={props.handleCardClick}
                onDeleteClick={props.handleDeleteButtonClick}
                onCardLike={props.handleCardLike}
                currentUser={user}
              />
            );
          })}
        </ul>
      </main>
    </>
  );
}

export default Main;
