import React from "react";
import { Redirect, Route, useRouteMatch } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import auth from "../utils/auth";

function App() {
  React.useEffect(() => {
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");
      auth.getUser(token).then((user) => {
        setCurrentEmail(user.data.email);
        setLoggedIn(true);
      });
    }
  }, []);
  //============================================constants================================================
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

  function handleSignIn({ email, password }) {
    return auth.signIn({ email, password }).then((data) => {
      return data;
    });
  }

  function getUser(jwt) {
    return auth.getUser(jwt).then((data) => data);
  }

  function handleSignUp({ email, password }) {
    return auth.signUp({ email, password }).then((data) => data);
  }

  function handleSignOut() {
    setLoggedIn(false);
    localStorage.removeItem('token');
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
          <Login
            onSubmit={handleSignIn}
            setIsInfoPopupOpened={setIsInfoPopupOpened}
            getUser={getUser}
            setCurrentEmail={setCurrentEmail}
            setLoggedIn={setLoggedIn}
          />
        </Route>
        <Route exact path="/">
          <ProtectedRoute
            component={Main}
            setCurrentUser={setCurrentUser}
            loggedIn={loggedIn}
            isEditProfilePopupOpened={isEditProfilePopupOpened}
            setEditProfilePopupOpened={setEditProfilePopupOpened}
            isAddPlacePopupOpened={isAddPlacePopupOpened}
            setIsAddPlacePopupOpened={setIsAddPlacePopupOpened}
            isEditAvatarPopupOpened={isEditAvatarPopupOpened}
            setIsEditAvatarPopupOpened={setIsEditAvatarPopupOpened}
            isImagePopupOpened={isImagePopupOpened}
            setIsImagePopupOpened={setIsImagePopupOpened}
            isDeletePopupOpened={isDeletePopupOpened}
            setIsDeletePopupOpened={setIsDeletePopupOpened}
            closeAllPopups={closeAllPopups}
            handleOverlayClick={handleOverlayClick}
            escClosing={escClosing}
          />
        </Route>
      </CurrentUserContext.Provider>
    </div>
  );
}
export default App;
