import React from "react";
import { Redirect, Route } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import auth from "../utils/auth";
import api from "../utils/api";

import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeleteConfirmPopup from "./DeleteConfirmPopup";
import ImagePopup from "./ImagePopup";

function App() {
  function handleError(error) {
    console.log(error);
  }

  React.useEffect(() => {
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");
      auth
        .getUser(token)
        .then((user) => {
          setCurrentEmail(user.data.email);
          setLoggedIn(true);
        })
        .catch(handleError);
    }
  }, []);

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getCards()])
      .then(([userInfo, cards]) => {
        setCurrentUser(userInfo);
        setCards(cards);
      })
      .catch(handleError);
  }, []);

  //============================================constants================================================
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
  const [currentUser, setCurrentUser] = React.useState({
    name: "User Name",
    about: "User Bio",
  });
  const [currentEmail, setCurrentEmail] = React.useState("");
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isInfoPopupOpened, setIsInfoPopupOpened] = React.useState({
    state: false,
    status: true,
  });
  const [isEditProfilePopupOpened, setEditProfilePopupOpened] = React.useState(
    false
  );
  const [isAddPlacePopupOpened, setIsAddPlacePopupOpened] = React.useState(
    false
  );
  const [isEditAvatarPopupOpened, setIsEditAvatarPopupOpened] = React.useState(
    false
  );
  const [isImagePopupOpened, setIsImagePopupOpened] = React.useState(false);
  const [isDeletePopupOpened, setIsDeletePopupOpened] = React.useState(false);

  //===========================================auth========================================
  function handleSignIn({ email, password }, props) {
    auth
      .signIn({ email, password })
      .then((data) => {
        setCurrentEmail(email);
        setLoggedIn(true);
        props.history.push("/");
        localStorage.setItem("token", data.token);
      })
      .catch((err) => {
        console.log(err);
        setIsInfoPopupOpened({
          state: true,
          status: false,
        });
        setTimeout(() => {
          setIsInfoPopupOpened({
            state: false,
            status: false,
          });
        }, 2000);
      });
  }

  function handleSignUp({ email, password }, props) {
    auth
      .signUp({ email, password })
      .then(() => {
        setIsInfoPopupOpened({
          state: true,
          status: true,
        });
        setTimeout(() => {
          setIsInfoPopupOpened({
            state: false,
            status: true,
          });
          props.history.push("/sign-in");
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
        setIsInfoPopupOpened({
          state: true,
          status: false,
        });
        setTimeout(() => {
          setIsInfoPopupOpened({
            state: false,
            status: false,
          });
        }, 2000);
      });
  }

  function handleSignOut() {
    setLoggedIn(false);
    localStorage.removeItem("token");
    setCurrentEmail("");
  }

  //===========================================profile========================================
  function handleUpdateUser({ name, about }) {
    setButtonText({ ...buttonText, editProfile: savingText });
    api
      .editProfile({ name, about })
      .then((newProfileInfo) => {
        setCurrentUser(newProfileInfo);
        setButtonText({ ...buttonText, editProfile: saveText });
        closeAllPopups();
      })
      .catch(handleError);
  }

  function handleUpdateAvatar(avatar) {
    setButtonText({ ...buttonText, editAvatar: savingText });
    api
      .updateAvatar(avatar)
      .then((newProfileInfo) => {
        setCurrentUser(newProfileInfo);
        setButtonText({ ...buttonText, editAvatar: saveText });
        closeAllPopups();
      })
      .catch(handleError);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpened(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpened(true);
  }

  //===========================================popups========================================

  function closeAllPopups() {
    setIsEditAvatarPopupOpened(false);
    setEditProfilePopupOpened(false);
    setIsAddPlacePopupOpened(false);
    setIsImagePopupOpened(false);
    setIsDeletePopupOpened(false);
    setIsInfoPopupOpened(false);
  }

  function handleOverlayClick(e) {
    if (e.target !== e.currentTarget) {
      return;
    }
    closeAllPopups();
  }

  function escClosing(e) {
    if (e.keyCode === 27) {
      closeAllPopups();
    }
  }

  React.useEffect(() => {
    document.addEventListener("keydown", escClosing);
    return () => {
      document.removeEventListener("keydown", escClosing);
    };
  }, []);

  //===========================================cards========================================
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpened(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpened(true);
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
    setIsDeletePopupOpened(true);
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
        closeAllPopups();
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
        closeAllPopups();
      })
      .catch(handleError);
  }

  return (
    <div className="page">
      {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
      <CurrentUserContext.Provider value={currentUser}>
        <Header
          loggedIn={loggedIn}
          setLoggedIn={setLoggedIn}
          currentEmail={currentEmail}
          handleSignOut={handleSignOut}
        />
        <InfoTooltip
          isOpened={isInfoPopupOpened}
          onClose={closeAllPopups}
          onOverlay={handleOverlayClick}
          escClosing={escClosing}
        />
        <Route path="/sign-up">
          <Register
            onSubmit={handleSignUp}
            setIsInfoPopupOpened={setIsInfoPopupOpened}
          />
        </Route>
        <Route path="/sign-in">
          <Login onSubmit={handleSignIn} />
        </Route>
        <ProtectedRoute
          exact path="/"
          component={Main}
          cards={cards}
          loggedIn={loggedIn}
          handleEditAvatarClick={handleEditAvatarClick}
          handleEditProfileClick={handleEditProfileClick}
          handleAddPlaceClick={handleAddPlaceClick}
          handleCardClick={handleCardClick}
          handleDeleteButtonClick={handleDeleteButtonClick}
          handleCardLike={handleCardLike}
        />
        <EditProfilePopup
          isOpened={isEditProfilePopupOpened}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          buttonText={buttonText.editProfile}
          onOverlay={handleOverlayClick}
        />

        <AddPlacePopup
          isOpened={isAddPlacePopupOpened}
          onClose={closeAllPopups}
          onSubmit={handleAddCard}
          buttonText={buttonText.addPlace}
          onOverlay={handleOverlayClick}
        />

        <EditAvatarPopup
          isOpened={isEditAvatarPopupOpened}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          buttonText={buttonText.editAvatar}
          onOverlay={handleOverlayClick}
        />
        <DeleteConfirmPopup
          isOpened={isDeletePopupOpened}
          onClose={closeAllPopups}
          buttonText={buttonText.confirmDelete}
          onOverlay={handleOverlayClick}
          onSubmit={handleDelteCard}
          deleteCard={deleteCard}
        />

        <ImagePopup
          card={selectedCard}
          isOpened={isImagePopupOpened}
          onClose={closeAllPopups}
          onOverlay={handleOverlayClick}
        />
        <Footer />
      </CurrentUserContext.Provider>
    </div>
  );
}
export default App;
