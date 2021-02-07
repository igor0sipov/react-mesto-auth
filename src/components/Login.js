import React from "react";
import { withRouter } from "react-router-dom";

function Login(props) {
  const [email, setEmail] = React.useState({ value: "" });
  const [password, setPassword] = React.useState({ value: "" });
  const [isFormValid, setIsFormValid] = React.useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    props
      .onSubmit({ email: email.value, password: password.value })
      .then((data) => {
        props
          .getUser(data.token)
          .then((user) => {
            props.setCurrentEmail(user.data.email);
          })
          .then(() => {
            props.setLoggedIn(true);
            props.history.push("/");
          });
        localStorage.setItem("token", data.token);
      })
      .catch((err) => {
        console.log(err);
        props.setIsInfoPopupOpened({
          state: true,
          status: false,
        });
        setTimeout(() => {
          props.setIsInfoPopupOpened({
            state: false,
            status: false,
          });
        }, 2000);
      });
  }
  function handleEmailChange(e) {
    setEmail({
      value: e.target.value,
      isValid: e.target.validity.valid,
      validationMessage: e.target.validationMessage,
    });
  }

  function handlePasswordChange(e) {
    setPassword({
      value: e.target.value,
      isValid: e.target.validity.valid,
      validationMessage: e.target.validationMessage,
    });
  }

  React.useEffect(() => {
    if (email.isValid && password.isValid) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [email.isValid, password.isValid]);

  return (
    <section className="auth sizer">
      <h1 className="auth__type">Вход</h1>
      <form className="auth__form" onSubmit={handleSubmit} noValidate>
        <input
          className="auth__input"
          type="email"
          placeholder="Email"
          onChange={handleEmailChange}
          minLength="2"
          maxLength="30"
          required
        />
        <span
          className={`auth__input-error ${
            email.isValid ? `` : `auth__input-error_visible`
          }`}
        >
          {email.validationMessage}
        </span>
        <input
          className="auth__input"
          type="password"
          placeholder="Пароль"
          autoComplete="on"
          onChange={handlePasswordChange}
          minLength="2"
          maxLength="30"
          required
        />
        <span
          className={`auth__input-error ${
            password.isValid ? `` : `auth__input-error_visible`
          }`}
        >
          {password.validationMessage}
        </span>
        <button
          type="submit"
          className={`auth__button ${
            isFormValid ? "" : `auth__button_disabled`
          }`}
        >
          Войти
        </button>
      </form>
    </section>
  );
}

export default withRouter(Login);
