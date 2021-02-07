import React from "react";
import { Link, withRouter } from "react-router-dom";

function Register(props) {
  const [email, setEmail] = React.useState({ value: "" });
  const [password, setPassword] = React.useState({ value: "" });
  const [isFormValid, setIsFormValid] = React.useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    props
      .onSubmit({ email: email.value, password: password.value })
      .then((data) => {
        console.log(data);
        props.setIsInfoPopupOpened({
          state: true,
          status: true,
        });
        setTimeout(() => {
          props.setIsInfoPopupOpened({
            state: false,
            status: true,
          });
          props.history.push("/sign-in");
        }, 2000);
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
      <h1 className="auth__type">Регистрация</h1>
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
          Зарегистрироваться
        </button>
        <Link className="auth__link" to="/sign-in">
          Уже зарегистрированы? Войти
        </Link>
      </form>
    </section>
  );
}

export default withRouter(Register);
