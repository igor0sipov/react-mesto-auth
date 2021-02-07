import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Card from "./Card";
import editAvatarIconPath from "../images/edit-avatar-icon.svg";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeleteConfirmPopup from "./DeleteConfirmPopup";

function Main(props) {
  const user = React.useContext(CurrentUserContext);

  function handleError(error) {
    console.log(error);
  }

  const saveText = "Сохранить";
  const savingText = "Сохранение...";
  const yesText = "Да";
  const deletionText = "Удаление...";

  const [selectedCard, setSelectedCard] = React.useState({});
  const [buttonText, setButtonText] = React.useState({
    addPlace: saveText,
    editProfile: saveText,
    editAvatar: saveText,
    confirmDelete: yesText,
  });
  const [deleteCard, setDeleteCard] = React.useState({});
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getCards()])
      .then(([userInfo, cards]) => {
        props.setCurrentUser(userInfo);
        setCards(cards);
      })
      .catch(handleError);
  }, []);

  //===========================================profile========================================
  function handleUpdateUser({ name, about }) {
    setButtonText({ ...buttonText, editProfile: savingText });
    api
      .editProfile({ name, about })
      .then((newProfileInfo) => {
        props.setCurrentUser(newProfileInfo);
        setButtonText({ ...buttonText, editProfile: saveText });
        props.closeAllPopups();
      })
      .catch(handleError);
  }

  function handleUpdateAvatar(avatar) {
    setButtonText({ ...buttonText, editAvatar: savingText });
    api
      .updateAvatar(avatar)
      .then((newProfileInfo) => {
        props.setCurrentUser(newProfileInfo);
        setButtonText({ ...buttonText, editAvatar: saveText });
        props.closeAllPopups();
      })
      .catch(handleError);
  }

  function handleEditAvatarClick() {
    props.setIsEditAvatarPopupOpened(true);
  }

  function handleEditProfileClick() {
    props.setEditProfilePopupOpened(true);
  }

  //===========================================popups========================================

  React.useEffect(() => {
    document.addEventListener("keydown", props.escClosing);
    return () => {
      document.removeEventListener("keydown", props.escClosing);
    };
  }, []);

  //===========================================cards========================================
  function handleAddPlaceClick() {
    props.setIsAddPlacePopupOpened(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    props.setIsImagePopupOpened(true);
  }

  function handleCardLike(card, isLiked) {
    function getNewCards(newCard) {
      const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
      setCards(newCards);
    }

    if (isLiked) {
      api.removeLike(card._id).then(getNewCards).catch(handleError);
    } else {
      api.like(card._id).then(getNewCards).catch(handleError);
    }
  }

  function handleDeleteButtonClick(card) {
    props.setIsDeletePopupOpened(true);
    setDeleteCard(card);
  }

  function handleDelteCard(card) {
    setButtonText({ ...buttonText, confirmDelete: deletionText });
    api
      .deleteCard(card._id)
      .then((result) => {
        if (result.ok) {
          const newCards = cards.filter((c) => c._id !== card._id);
          setCards(newCards);
        } else {
          console.log("Ошибка: ", result.status);
        }
        setButtonText({ ...buttonText, confirmDelete: yesText });
        props.closeAllPopups();
      })
      .catch(handleError);
  }

  function handleAddCard({ name, link }) {
    setButtonText({ ...buttonText, addPlace: savingText });
    api
      .addCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        setButtonText({ ...buttonText, addPlace: saveText });
        props.closeAllPopups();
      })
      .catch(handleError);
  }

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
              onClick={handleEditAvatarClick}
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
              onClick={handleEditProfileClick}
            ></button>
          </div>
          <button
            className="profile__add-button"
            onClick={handleAddPlaceClick}
          ></button>
        </section>

        <ul className="elements">
          {cards.map((card) => {
            return (
              <Card
                key={card._id}
                card={card}
                onCardClick={handleCardClick}
                onDeleteClick={handleDeleteButtonClick}
                onCardLike={handleCardLike}
                currentUser={user}
              />
            );
          })}
        </ul>
      </main>
      <Footer />
      <EditProfilePopup
        isOpened={props.isEditProfilePopupOpened}
        onClose={props.closeAllPopups}
        onUpdateUser={handleUpdateUser}
        buttonText={buttonText.editProfile}
        onOverlay={props.handleOverlayClick}
      />

      <AddPlacePopup
        isOpened={props.isAddPlacePopupOpened}
        onClose={props.closeAllPopups}
        onSubmit={handleAddCard}
        buttonText={buttonText.addPlace}
        onOverlay={props.handleOverlayClick}
      />

      <EditAvatarPopup
        isOpened={props.isEditAvatarPopupOpened}
        onClose={props.closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
        buttonText={buttonText.editAvatar}
        onOverlay={props.handleOverlayClick}
      />
      <DeleteConfirmPopup
        isOpened={props.isDeletePopupOpened}
        onClose={props.closeAllPopups}
        buttonText={buttonText.confirmDelete}
        onOverlay={props.handleOverlayClick}
        onSubmit={handleDelteCard}
        deleteCard={deleteCard}
      />

      <ImagePopup
        card={selectedCard}
        isOpened={props.isImagePopupOpened}
        onClose={props.closeAllPopups}
        onOverlay={props.handleOverlayClick}
      />
    </>
  );
}

export default Main;
